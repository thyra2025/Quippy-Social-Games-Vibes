import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.58.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { action, roomId, secretToken, updates, newPhase, currentPrompt } = await req.json();

    console.log('Manage room request:', { action, roomId, hasToken: !!secretToken });

    // Validate required fields
    if (!action || !roomId || !secretToken) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: action, roomId, and secretToken are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify the secret token matches the room (from secure table)
    const { data: roomSecret, error: verifyError } = await supabase
      .from('room_secrets')
      .select('room_id, secret_token')
      .eq('room_id', roomId)
      .eq('secret_token', secretToken)
      .single();

    if (verifyError || !roomSecret) {
      console.error('Token verification failed:', verifyError);
      return new Response(
        JSON.stringify({ error: 'Invalid room or unauthorized access' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Token verified successfully for room:', roomId);

    // Handle different actions
    if (action === 'update-phase') {
      // Dedicated action for phase updates (faster, clearer intent)
      if (!newPhase) {
        return new Response(
          JSON.stringify({ error: 'newPhase is required for update-phase action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Validate phase value
      const validPhases = ['lobby', 'playing', 'voting', 'reveal', 'recap'];
      if (!validPhases.includes(newPhase)) {
        return new Response(
          JSON.stringify({ error: 'Invalid phase value. Must be one of: lobby, playing, voting, reveal, recap' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Update game phase in database
      const updateData: any = { game_phase: newPhase };
      if (currentPrompt !== undefined) {
        updateData.current_prompt = currentPrompt;
      }

      const { data, error: updateError } = await supabase
        .from('rooms')
        .update(updateData)
        .eq('id', roomId)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating phase:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to update phase' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log(`✅ Phase updated to ${newPhase} for room ${roomId}`);
      
      return new Response(
        JSON.stringify({ success: true, newPhase, data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else if (action === 'update') {
      if (!updates) {
        return new Response(
          JSON.stringify({ error: 'Updates object is required for update action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Prevent updating sensitive fields
      const allowedFields = ['mode', 'game_phase', 'language', 'current_prompt'];
      const sanitizedUpdates: Record<string, any> = {};
      
      for (const field of allowedFields) {
        if (field in updates) {
          sanitizedUpdates[field] = updates[field];
        }
      }

      if (Object.keys(sanitizedUpdates).length === 0) {
        return new Response(
          JSON.stringify({ error: 'No valid fields to update' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const { data, error } = await supabase
        .from('rooms')
        .update(sanitizedUpdates)
        .eq('id', roomId)
        .select()
        .single();

      if (error) {
        console.error('Update error:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to update room' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Room updated successfully:', roomId);
      return new Response(
        JSON.stringify({ success: true, data }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else if (action === 'delete') {
      const { error } = await supabase
        .from('rooms')
        .delete()
        .eq('id', roomId);

      if (error) {
        console.error('Delete error:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to delete room' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      console.log('Room deleted successfully:', roomId);
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } else {
      return new Response(
        JSON.stringify({ error: 'Invalid action. Supported actions: update-phase, update, delete' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error) {
    console.error('Error in manage-room function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

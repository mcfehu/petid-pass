import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we're actually connected to Supabase
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

if (!isSupabaseConfigured) {
  console.warn('Supabase is not configured yet. Please connect using the "Connect to Supabase" button.');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: { 'x-my-custom-header': 'pet-passport' },
  },
});

export const testConnection = async () => {
  if (!isSupabaseConfigured) {
    console.warn('Supabase configuration is missing');
    return false;
  }

  try {
    // First check if we can connect to Supabase
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError) throw authError;

    // Then verify if our tables exist by checking the subscribers table
    const { error: tableError } = await supabase
      .from('subscribers')
      .select('count')
      .limit(0)
      .single();

    if (tableError?.message?.includes('does not exist')) {
      console.warn('Database tables not found. Please ensure migrations are applied.');
      return false;
    }
    
    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Supabase connection test failed:', error.message);
    } else {
      console.error('Supabase connection test failed:', error);
    }
    return false;
  }
};
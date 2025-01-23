import { supabase } from './supabase';

export const validateToken = async (token: string) => {
  const { data, error } = await supabase
    .from('access_tokens')
    .select('*')
    .eq('token', token)
    .single();

  if (error) {
    console.error('Token validation error:', error);
    return false;
  }

  if (!data || data.used || new Date(data.expires_at) < new Date()) {
    return false;
  }

  return true;
};

export const markTokenAsUsed = async (token: string) => {
  const { error } = await supabase
    .from('access_tokens')
    .update({ used: true })
    .eq('token', token);

  if (error) {
    console.error('Error marking token as used:', error);
    return false;
  }

  return true;
};
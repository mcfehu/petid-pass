import { supabase } from './supabase';

const createSubscribersTable = `
CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Enable insert for service role only"
  ON subscribers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
`;

export const setupDatabase = async () => {
  try {
    const { error } = await supabase.rpc('exec', { sql: createSubscribersTable });
    if (error) throw error;
    console.log('Database tables created successfully');
    return true;
  } catch (error) {
    console.error('Error setting up database:', error);
    return false;
  }
};
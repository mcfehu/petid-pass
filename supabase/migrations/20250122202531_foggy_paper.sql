/*
  # Access Tokens for Pet Form

  1. New Tables
    - `access_tokens`
      - `id` (uuid, primary key)
      - `token` (text, unique)
      - `email` (text)
      - `used` (boolean)
      - `expires_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `access_tokens` table
    - Add policies for token validation
*/

CREATE TABLE IF NOT EXISTS access_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text UNIQUE NOT NULL,
  email text NOT NULL,
  used boolean DEFAULT false,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE access_tokens ENABLE ROW LEVEL SECURITY;

-- Allow anyone to validate a token
CREATE POLICY "Allow token validation"
  ON access_tokens
  FOR SELECT
  TO anon
  USING (
    used = false AND
    expires_at > now()
  );

-- Allow updating token status
CREATE POLICY "Allow marking token as used"
  ON access_tokens
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
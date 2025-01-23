/*
  # Pet Passport Core Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `pets`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references profiles)
      - `name` (text)
      - `species` (text)
      - `breed` (text)
      - `birth_date` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `health_records`
      - `id` (uuid, primary key)
      - `pet_id` (uuid, references pets)
      - `type` (text)
      - `date` (date)
      - `description` (text)
      - `provider` (text)
      - `created_at` (timestamp)
    - `qr_tags`
      - `id` (uuid, primary key)
      - `pet_id` (uuid, references pets)
      - `tag_id` (text, unique)
      - `active` (boolean)
      - `created_at` (timestamp)
    - `emergency_contacts`
      - `id` (uuid, primary key)
      - `pet_id` (uuid, references pets)
      - `name` (text)
      - `phone` (text)
      - `email` (text)
      - `relationship` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create pets table
CREATE TABLE IF NOT EXISTS pets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles NOT NULL,
  name text NOT NULL,
  species text NOT NULL,
  breed text,
  birth_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create health_records table
CREATE TABLE IF NOT EXISTS health_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id uuid REFERENCES pets NOT NULL,
  type text NOT NULL,
  date date NOT NULL,
  description text NOT NULL,
  provider text,
  created_at timestamptz DEFAULT now()
);

-- Create qr_tags table
CREATE TABLE IF NOT EXISTS qr_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id uuid REFERENCES pets NOT NULL,
  tag_id text UNIQUE NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create emergency_contacts table
CREATE TABLE IF NOT EXISTS emergency_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id uuid REFERENCES pets NOT NULL,
  name text NOT NULL,
  phone text,
  email text,
  relationship text,
  created_at timestamptz DEFAULT now(),
  CHECK (phone IS NOT NULL OR email IS NOT NULL)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for pets
CREATE POLICY "Users can view own pets"
  ON pets FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = pets.profile_id
    AND profiles.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own pets"
  ON pets FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = profile_id
    AND profiles.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own pets"
  ON pets FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = pets.profile_id
    AND profiles.user_id = auth.uid()
  ));

-- Create policies for health records
CREATE POLICY "Users can view own pet health records"
  ON health_records FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM pets
    JOIN profiles ON profiles.id = pets.profile_id
    WHERE pets.id = health_records.pet_id
    AND profiles.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own pet health records"
  ON health_records FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM pets
    JOIN profiles ON profiles.id = pets.profile_id
    WHERE pets.id = pet_id
    AND profiles.user_id = auth.uid()
  ));

-- Create policies for QR tags
CREATE POLICY "Users can view own pet QR tags"
  ON qr_tags FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM pets
    JOIN profiles ON profiles.id = pets.profile_id
    WHERE pets.id = qr_tags.pet_id
    AND profiles.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own pet QR tags"
  ON qr_tags FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM pets
    JOIN profiles ON profiles.id = pets.profile_id
    WHERE pets.id = pet_id
    AND profiles.user_id = auth.uid()
  ));

-- Create policies for emergency contacts
CREATE POLICY "Users can view own pet emergency contacts"
  ON emergency_contacts FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM pets
    JOIN profiles ON profiles.id = pets.profile_id
    WHERE pets.id = emergency_contacts.pet_id
    AND profiles.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own pet emergency contacts"
  ON emergency_contacts FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM pets
    JOIN profiles ON profiles.id = pets.profile_id
    WHERE pets.id = pet_id
    AND profiles.user_id = auth.uid()
  ));

CREATE POLICY "Users can update own pet emergency contacts"
  ON emergency_contacts FOR UPDATE
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM pets
    JOIN profiles ON profiles.id = pets.profile_id
    WHERE pets.id = emergency_contacts.pet_id
    AND profiles.user_id = auth.uid()
  ));
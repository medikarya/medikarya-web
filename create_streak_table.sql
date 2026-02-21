-- To implement streak tracking, please log into your Supabase Dashboard
-- and run this SQL query in the SQL Editor:

CREATE TABLE user_profiles (
  clerk_user_id TEXT PRIMARY KEY,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_active_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security if needed:
-- ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

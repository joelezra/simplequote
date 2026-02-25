CREATE TABLE waitlist_signups (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email varchar(320) NOT NULL UNIQUE,
  trade_type varchar(64) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert" ON waitlist_signups
  FOR INSERT TO anon WITH CHECK (true);

CREATE OR REPLACE FUNCTION get_waitlist_count()
RETURNS bigint LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT count(*) FROM waitlist_signups;
$$;

CREATE TABLE IF NOT EXISTS opportunities (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  estimated_revenue TEXT,
  estimated_cost TEXT,
  autonomy_score INTEGER,
  url TEXT,
  raw_data TEXT,
  status TEXT DEFAULT 'discovered',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS prps (
  id TEXT PRIMARY KEY,
  opportunity_id TEXT REFERENCES opportunities(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  template_used TEXT,
  validation_status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS executions (
  id TEXT PRIMARY KEY,
  prp_id TEXT REFERENCES prps(id),
  status TEXT DEFAULT 'pending',
  generated_code TEXT,
  deploy_url TEXT,
  checkpoints TEXT,
  logs TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS monitors (
  id TEXT PRIMARY KEY,
  execution_id TEXT REFERENCES executions(id),
  name TEXT NOT NULL,
  deploy_url TEXT,
  status TEXT DEFAULT 'active',
  last_check TEXT,
  health_data TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

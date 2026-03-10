import 'server-only'
import Database from 'better-sqlite3'
import { readFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

declare global {
  // eslint-disable-next-line no-var
  var __db: Database.Database | undefined
}

const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build'

function createDb(): Database.Database {
  const dataDir = join(process.cwd(), 'data')
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true })
  }

  const dbPath = join(dataDir, 'autonomous-biz.db')
  const db = new Database(dbPath)

  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')
  db.pragma('synchronous = NORMAL')
  db.pragma('busy_timeout = 5000')

  const schema = readFileSync(join(process.cwd(), 'lib', 'db', 'schema.sql'), 'utf-8')
  db.exec(schema)

  return db
}

function getDb(): Database.Database {
  if (isBuildTime) {
    throw new Error('Database cannot be accessed during build time')
  }
  if (!global.__db) {
    global.__db = createDb()
  }
  return global.__db
}

export const db = new Proxy({} as Database.Database, {
  get(_target, prop) {
    const instance = getDb()
    const value = (instance as unknown as Record<string | symbol, unknown>)[prop]
    if (typeof value === 'function') {
      return value.bind(instance)
    }
    return value
  },
})

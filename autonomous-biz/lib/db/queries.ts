import 'server-only'
import { db } from './index'
import { nanoid } from 'nanoid'

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

export interface OpportunityRow {
  id: string
  source: string
  title: string
  description: string | null
  category: string | null
  estimated_revenue: string | null
  estimated_cost: string | null
  autonomy_score: number | null
  url: string | null
  raw_data: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface PRPRow {
  id: string
  opportunity_id: string | null
  title: string
  content: string
  template_used: string | null
  validation_status: string
  created_at: string
}

export interface ExecutionRow {
  id: string
  prp_id: string | null
  status: string
  generated_code: string | null
  deploy_url: string | null
  checkpoints: string | null
  logs: string | null
  created_at: string
  updated_at: string
}

export interface MessageRow {
  id: string
  role: string
  content: string
  metadata: string | null
  created_at: string
}

export interface MonitorRow {
  id: string
  execution_id: string | null
  name: string
  deploy_url: string | null
  status: string
  last_check: string | null
  health_data: string | null
  created_at: string
}

// ---------------------------------------------------------------------------
// Opportunities
// ---------------------------------------------------------------------------

export function createOpportunity(data: {
  source: string
  title: string
  description?: string | null
  category?: string | null
  estimatedRevenue?: string | null
  estimatedCost?: string | null
  autonomyScore?: number | null
  url?: string | null
  rawData?: string | null
  status?: string
}): OpportunityRow {
  const id = nanoid()
  db.prepare(`
    INSERT INTO opportunities (id, source, title, description, category, estimated_revenue, estimated_cost, autonomy_score, url, raw_data, status)
    VALUES (@id, @source, @title, @description, @category, @estimated_revenue, @estimated_cost, @autonomy_score, @url, @raw_data, @status)
  `).run({
    id,
    source: data.source,
    title: data.title,
    description: data.description ?? null,
    category: data.category ?? null,
    estimated_revenue: data.estimatedRevenue ?? null,
    estimated_cost: data.estimatedCost ?? null,
    autonomy_score: data.autonomyScore ?? null,
    url: data.url ?? null,
    raw_data: data.rawData ?? null,
    status: data.status ?? 'discovered',
  })
  return db.prepare('SELECT * FROM opportunities WHERE id = ?').get(id) as OpportunityRow
}

export function getOpportunity(id: string): OpportunityRow | undefined {
  return db.prepare('SELECT * FROM opportunities WHERE id = ?').get(id) as OpportunityRow | undefined
}

export function listOpportunities(): OpportunityRow[] {
  return db.prepare('SELECT * FROM opportunities ORDER BY created_at DESC').all() as OpportunityRow[]
}

export function listOpportunitiesByStatus(status: string): OpportunityRow[] {
  return db.prepare('SELECT * FROM opportunities WHERE status = ? ORDER BY created_at DESC').all(status) as OpportunityRow[]
}

export function updateOpportunityStatus(id: string, status: string): void {
  db.prepare("UPDATE opportunities SET status = @status, updated_at = datetime('now') WHERE id = @id").run({ id, status })
}

// ---------------------------------------------------------------------------
// PRPs
// ---------------------------------------------------------------------------

export function createPRP(data: {
  opportunityId?: string | null
  title: string
  content: string
  templateUsed?: string | null
  validationStatus?: string
}): PRPRow {
  const id = nanoid()
  db.prepare(`
    INSERT INTO prps (id, opportunity_id, title, content, template_used, validation_status)
    VALUES (@id, @opportunity_id, @title, @content, @template_used, @validation_status)
  `).run({
    id,
    opportunity_id: data.opportunityId ?? null,
    title: data.title,
    content: data.content,
    template_used: data.templateUsed ?? null,
    validation_status: data.validationStatus ?? 'pending',
  })
  return db.prepare('SELECT * FROM prps WHERE id = ?').get(id) as PRPRow
}

export function getPRP(id: string): PRPRow | undefined {
  return db.prepare('SELECT * FROM prps WHERE id = ?').get(id) as PRPRow | undefined
}

export function getPRPByOpportunity(opportunityId: string): PRPRow | undefined {
  return db.prepare('SELECT * FROM prps WHERE opportunity_id = ? ORDER BY created_at DESC LIMIT 1').get(opportunityId) as PRPRow | undefined
}

export function updatePRPValidation(id: string, validationStatus: string): void {
  db.prepare('UPDATE prps SET validation_status = @validation_status WHERE id = @id').run({ id, validation_status: validationStatus })
}

// ---------------------------------------------------------------------------
// Executions
// ---------------------------------------------------------------------------

export function createExecution(data: {
  prpId?: string | null
  status?: string
}): ExecutionRow {
  const id = nanoid()
  db.prepare(`
    INSERT INTO executions (id, prp_id, status)
    VALUES (@id, @prp_id, @status)
  `).run({
    id,
    prp_id: data.prpId ?? null,
    status: data.status ?? 'pending',
  })
  return db.prepare('SELECT * FROM executions WHERE id = ?').get(id) as ExecutionRow
}

export function getExecution(id: string): ExecutionRow | undefined {
  return db.prepare('SELECT * FROM executions WHERE id = ?').get(id) as ExecutionRow | undefined
}

export function getExecutionByPRP(prpId: string): ExecutionRow | undefined {
  return db.prepare('SELECT * FROM executions WHERE prp_id = ? ORDER BY created_at DESC LIMIT 1').get(prpId) as ExecutionRow | undefined
}

export function updateExecutionStatus(id: string, status: string): void {
  db.prepare("UPDATE executions SET status = @status, updated_at = datetime('now') WHERE id = @id").run({ id, status })
}

export function updateExecutionDeployUrl(id: string, deployUrl: string): void {
  db.prepare("UPDATE executions SET deploy_url = @deploy_url, updated_at = datetime('now') WHERE id = @id").run({ id, deploy_url: deployUrl })
}

// ---------------------------------------------------------------------------
// Messages
// ---------------------------------------------------------------------------

export function createMessage(data: {
  role: string
  content: string
  metadata?: string | null
}): MessageRow {
  const id = nanoid()
  db.prepare(`
    INSERT INTO messages (id, role, content, metadata)
    VALUES (@id, @role, @content, @metadata)
  `).run({
    id,
    role: data.role,
    content: data.content,
    metadata: data.metadata ?? null,
  })
  return {
    id,
    role: data.role,
    content: data.content,
    metadata: data.metadata ?? null,
    created_at: new Date().toISOString(),
  }
}

export function listMessages(): MessageRow[] {
  return db.prepare('SELECT * FROM messages ORDER BY created_at ASC').all() as MessageRow[]
}

// ---------------------------------------------------------------------------
// Monitors
// ---------------------------------------------------------------------------

export function createMonitor(data: {
  executionId?: string | null
  name: string
  deployUrl?: string | null
  status?: string
}): MonitorRow {
  const id = nanoid()
  db.prepare(`
    INSERT INTO monitors (id, execution_id, name, deploy_url, status)
    VALUES (@id, @execution_id, @name, @deploy_url, @status)
  `).run({
    id,
    execution_id: data.executionId ?? null,
    name: data.name,
    deploy_url: data.deployUrl ?? null,
    status: data.status ?? 'active',
  })
  return db.prepare('SELECT * FROM monitors WHERE id = ?').get(id) as MonitorRow
}

export function getMonitor(id: string): MonitorRow | undefined {
  return db.prepare('SELECT * FROM monitors WHERE id = ?').get(id) as MonitorRow | undefined
}

export function updateMonitorHealth(id: string, healthData: Record<string, unknown>): void {
  db.prepare('UPDATE monitors SET last_check = @last_check, health_data = @health_data WHERE id = @id').run({
    id,
    last_check: new Date().toISOString(),
    health_data: JSON.stringify(healthData),
  })
}

export function listActiveMonitors(): MonitorRow[] {
  return db.prepare("SELECT * FROM monitors WHERE status = 'active' ORDER BY created_at DESC").all() as MonitorRow[]
}

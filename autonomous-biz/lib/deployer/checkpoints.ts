import 'server-only'
import { db } from '@/lib/db'
import { getExecution } from '@/lib/db/queries'

export interface Checkpoint {
  gate: string
  description: string
  status: 'pending' | 'approved' | 'rejected'
  timestamp: string
}

function getCheckpointArray(executionId: string): Checkpoint[] {
  const execution = getExecution(executionId)
  if (!execution) throw new Error(`Execution ${executionId} not found`)

  if (!execution.checkpoints) return []
  return JSON.parse(execution.checkpoints) as Checkpoint[]
}

function saveCheckpoints(executionId: string, checkpoints: Checkpoint[]): void {
  const stmt = db.prepare(
    "UPDATE executions SET checkpoints = @checkpoints, updated_at = datetime('now') WHERE id = @id"
  )
  stmt.run({ id: executionId, checkpoints: JSON.stringify(checkpoints) })
}

export function createCheckpoint(
  executionId: string,
  gate: string,
  description: string
): Checkpoint {
  const checkpoints = getCheckpointArray(executionId)

  const checkpoint: Checkpoint = {
    gate,
    description,
    status: 'pending',
    timestamp: new Date().toISOString(),
  }

  checkpoints.push(checkpoint)
  saveCheckpoints(executionId, checkpoints)

  return checkpoint
}

export function approveCheckpoint(
  executionId: string,
  gate: string
): { checkpoint: Checkpoint; nextAction: string } {
  const checkpoints = getCheckpointArray(executionId)
  const checkpoint = checkpoints.find((c) => c.gate === gate && c.status === 'pending')

  if (!checkpoint) {
    throw new Error(`No pending checkpoint found for gate "${gate}" in execution ${executionId}`)
  }

  checkpoint.status = 'approved'
  checkpoint.timestamp = new Date().toISOString()
  saveCheckpoints(executionId, checkpoints)

  // Determine next action based on the gate that was just approved
  const gateOrder = ['prp-review', 'code-review', 'deploy-approval', 'go-live']
  const currentIndex = gateOrder.indexOf(gate)
  const nextGate = currentIndex >= 0 && currentIndex < gateOrder.length - 1
    ? gateOrder[currentIndex + 1]
    : 'complete'

  return {
    checkpoint,
    nextAction: nextGate === 'complete'
      ? 'Pipeline complete. Business is live.'
      : `Proceed to ${nextGate}`,
  }
}

export function rejectCheckpoint(executionId: string, gate: string): Checkpoint {
  const checkpoints = getCheckpointArray(executionId)
  const checkpoint = checkpoints.find((c) => c.gate === gate && c.status === 'pending')

  if (!checkpoint) {
    throw new Error(`No pending checkpoint found for gate "${gate}" in execution ${executionId}`)
  }

  checkpoint.status = 'rejected'
  checkpoint.timestamp = new Date().toISOString()
  saveCheckpoints(executionId, checkpoints)

  return checkpoint
}

export function getCheckpoints(executionId: string): Checkpoint[] {
  return getCheckpointArray(executionId)
}

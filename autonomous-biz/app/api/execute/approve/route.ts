import { approveCheckpoint, rejectCheckpoint } from '@/lib/deployer/checkpoints'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { executionId, gate, action } = (await req.json()) as {
      executionId: string
      gate: string
      action: 'approve' | 'reject'
    }

    if (!executionId || !gate || !action) {
      return Response.json(
        { error: 'executionId, gate, and action are required' },
        { status: 400 }
      )
    }

    if (action !== 'approve' && action !== 'reject') {
      return Response.json(
        { error: 'action must be "approve" or "reject"' },
        { status: 400 }
      )
    }

    if (action === 'approve') {
      const result = approveCheckpoint(executionId, gate)
      return Response.json({
        status: 'approved',
        checkpoint: result.checkpoint,
        nextAction: result.nextAction,
      })
    } else {
      const checkpoint = rejectCheckpoint(executionId, gate)
      return Response.json({
        status: 'rejected',
        checkpoint,
      })
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}

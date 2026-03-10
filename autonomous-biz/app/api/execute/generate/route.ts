import { generateProject } from '@/lib/deployer/code-generator'
import { getPRP, createExecution, updateExecutionStatus } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { prpId } = (await req.json()) as { prpId: string }

    if (!prpId) {
      return Response.json({ error: 'prpId is required' }, { status: 400 })
    }

    const prp = getPRP(prpId)
    if (!prp) {
      return Response.json({ error: 'PRP not found' }, { status: 404 })
    }

    // Create an execution record
    const execution = createExecution({ prpId: prp.id, status: 'generating' })

    // Generate project code
    const files = await generateProject({
      title: prp.title,
      content: prp.content,
      category: 'saas_micro_saas',
    })

    // Update execution with generated code
    const { db } = await import('@/lib/db')
    db.prepare(
      "UPDATE executions SET generated_code = ?, status = 'generated', updated_at = datetime('now') WHERE id = ?"
    ).run(JSON.stringify(files), execution.id)

    updateExecutionStatus(execution.id, 'generated')

    return Response.json({
      executionId: execution.id,
      fileCount: files.length,
      files: files.map((f) => f.path),
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}

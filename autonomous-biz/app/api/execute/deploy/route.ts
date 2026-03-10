import {
  getExecution,
  updateExecutionStatus,
  updateExecutionDeployUrl,
} from '@/lib/db/queries'

export const dynamic = 'force-dynamic'
import {
  createProject,
  deployProject,
  waitForDeployment,
} from '@/lib/deployer/vercel'

export async function POST(req: Request) {
  try {
    const { executionId } = (await req.json()) as { executionId: string }

    if (!executionId) {
      return Response.json(
        { error: 'executionId is required' },
        { status: 400 }
      )
    }

    const execution = getExecution(executionId)
    if (!execution) {
      return Response.json(
        { error: 'Execution not found' },
        { status: 404 }
      )
    }

    if (!execution.generated_code) {
      return Response.json(
        { error: 'No generated code found for this execution' },
        { status: 400 }
      )
    }

    const files = JSON.parse(execution.generated_code) as {
      path: string
      content: string
    }[]

    const projectName = `abiz-${executionId.slice(0, 8)}`

    // Create Vercel project (may already exist)
    try {
      await createProject(projectName)
    } catch {
      // Project may already exist, continue
    }

    // Deploy files
    updateExecutionStatus(executionId, 'deploying')

    const deployment = await deployProject(
      projectName,
      files.map((f) => ({ file: f.path, data: f.content }))
    )

    // Wait for deployment to complete
    const result = await waitForDeployment(deployment.id)

    const deployUrl = `https://${result.url}`
    updateExecutionDeployUrl(executionId, deployUrl)
    updateExecutionStatus(executionId, 'deployed')

    return Response.json({
      url: deployUrl,
      status: 'deployed',
      deploymentId: result.id,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}

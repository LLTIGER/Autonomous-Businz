import { listActiveMonitors } from '@/lib/db/queries'
import { checkHealth } from '@/lib/monitoring/health'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const monitors = listActiveMonitors()

    // Check health for each monitor with a deploy URL
    const monitorsWithHealth = await Promise.all(
      monitors.map(async (monitor) => {
        let health = null
        if (monitor.deploy_url) {
          try {
            health = await checkHealth(monitor.deploy_url)
          } catch {
            health = { healthy: false, statusCode: 0, responseTime: 0 }
          }
        }

        return {
          id: monitor.id,
          name: monitor.name,
          deployUrl: monitor.deploy_url,
          status: monitor.status,
          lastCheck: monitor.last_check,
          healthData: monitor.health_data ? JSON.parse(monitor.health_data) : null,
          currentHealth: health,
          createdAt: monitor.created_at,
        }
      })
    )

    return Response.json({ monitors: monitorsWithHealth })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}

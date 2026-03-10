import 'server-only'
import { updateMonitorHealth } from '@/lib/db/queries'

export interface HealthCheckResult {
  healthy: boolean
  statusCode: number
  responseTime: number
}

export async function checkHealth(url: string): Promise<HealthCheckResult> {
  const start = Date.now()

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(10_000),
    })

    const responseTime = Date.now() - start

    return {
      healthy: response.ok,
      statusCode: response.status,
      responseTime,
    }
  } catch {
    const responseTime = Date.now() - start

    return {
      healthy: false,
      statusCode: 0,
      responseTime,
    }
  }
}

export async function recordHealthCheck(
  monitorId: string,
  result: HealthCheckResult
): Promise<void> {
  updateMonitorHealth(monitorId, {
    healthy: result.healthy,
    statusCode: result.statusCode,
    responseTime: result.responseTime,
    checkedAt: new Date().toISOString(),
  })
}

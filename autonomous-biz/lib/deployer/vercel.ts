import 'server-only'
import { Vercel } from '@vercel/sdk'

let _client: Vercel | null = null

function getClient(): Vercel {
  if (_client) return _client
  _client = new Vercel({
    bearerToken: process.env.VERCEL_TOKEN,
  })
  return _client
}

export async function createProject(name: string): Promise<{ id: string; name: string }> {
  const client = getClient()
  const result = await client.projects.createProject({
    requestBody: { name, framework: 'nextjs' },
  })
  return { id: result.id, name: result.name }
}

export async function deployProject(
  name: string,
  files: { file: string; data: string }[]
): Promise<{ id: string; url: string; readyState: string }> {
  const client = getClient()

  const inlineFiles = files.map((f) => ({
    file: f.file,
    data: f.data,
  }))

  const result = await client.deployments.createDeployment({
    requestBody: {
      name,
      files: inlineFiles as unknown[],
      projectSettings: {
        framework: 'nextjs',
      },
    },
  })

  return {
    id: result.id,
    url: result.url ?? '',
    readyState: String(result.readyState ?? 'QUEUED'),
  }
}

export async function getDeploymentStatus(
  id: string
): Promise<{ id: string; readyState: string; url: string }> {
  const client = getClient()
  const result = await client.deployments.getDeployment({ idOrUrl: id })
  return {
    id: result.id,
    readyState: String(result.readyState ?? 'UNKNOWN'),
    url: result.url ?? '',
  }
}

export async function waitForDeployment(
  id: string,
  timeoutMs = 300_000
): Promise<{ id: string; readyState: string; url: string }> {
  const start = Date.now()

  while (Date.now() - start < timeoutMs) {
    const status = await getDeploymentStatus(id)
    if (status.readyState === 'READY' || status.readyState === 'ERROR') {
      return status
    }
    await new Promise((resolve) => setTimeout(resolve, 3000))
  }

  throw new Error(`Deployment ${id} timed out after ${timeoutMs}ms`)
}

export async function setEnvVars(
  projectId: string,
  vars: Record<string, string>
): Promise<void> {
  const client = getClient()

  for (const [key, value] of Object.entries(vars)) {
    await client.projects.createProjectEnv({
      idOrName: projectId,
      upsert: 'true',
      requestBody: {
        key,
        value,
        type: 'encrypted',
        target: ['production', 'preview', 'development'],
      },
    })
  }
}

export async function deleteProject(nameOrId: string): Promise<void> {
  const client = getClient()
  await client.projects.deleteProject({ idOrName: nameOrId })
}

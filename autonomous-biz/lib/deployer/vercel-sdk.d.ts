declare module '@vercel/sdk' {
  export class Vercel {
    constructor(options: { bearerToken?: string })
    projects: {
      createProject(options: {
        requestBody: { name: string; framework?: string }
      }): Promise<{ id: string; name: string }>
      deleteProject(options: { idOrName: string }): Promise<void>
      createProjectEnv(options: {
        idOrName: string
        upsert?: string
        requestBody: {
          key: string
          value: string
          type: string
          target: string[]
        }
      }): Promise<unknown>
    }
    deployments: {
      createDeployment(options: {
        requestBody: {
          name: string
          files: unknown[]
          projectSettings?: { framework?: string }
        }
      }): Promise<{
        id: string
        url?: string
        readyState?: string
      }>
      getDeployment(options: {
        idOrUrl: string
      }): Promise<{
        id: string
        url?: string
        readyState?: string
      }>
    }
  }
}

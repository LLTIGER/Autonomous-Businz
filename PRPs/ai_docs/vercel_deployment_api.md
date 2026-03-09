# Vercel REST API -- Deployment Reference

## Purpose
Complete reference for programmatic project creation, deployment, monitoring, and management via Vercel REST API. Used by the Autonomous Business Launcher for auto-deploying generated businesses.

---

## Base URL & Authentication

```
Base URL: https://api.vercel.com
Auth: Authorization: Bearer <YOUR_VERCEL_TOKEN>
Team scope: append ?teamId=team_xxx to any endpoint
```

Generate token at Vercel Dashboard > Settings > Tokens.

**Recommended:** Use `@vercel/sdk` npm package for TypeScript.

```bash
npm add @vercel/sdk
```

---

## 1. Create a New Project

**Endpoint:** `POST /v11/projects`

```typescript
async function createProject(name: string) {
  const res = await fetch(`https://api.vercel.com/v11/projects`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      framework: "nextjs",
      buildCommand: "npm run build",
      installCommand: "npm install",
      outputDirectory: ".next",
      environmentVariables: [
        { key: "NODE_ENV", value: "production", target: ["production"], type: "plain" },
      ],
    }),
  });
  return res.json(); // { id: "prj_xxx", name }
}
```

---

## 2. Deploy Code (Inline Files)

**Endpoint:** `POST /v13/deployments`

```typescript
interface DeploymentFile {
  file: string;       // relative path
  data: string;       // content
  encoding?: "utf-8" | "base64";
}

async function deploy(projectName: string, files: DeploymentFile[]) {
  const res = await fetch(`https://api.vercel.com/v13/deployments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: projectName,
      project: projectName,
      target: "production",
      projectSettings: { framework: "nextjs", nodeVersion: "20.x" },
      files,
    }),
  });
  return res.json(); // { id, url, readyState }
}
```

### SHA-Based Upload (Large Projects)

Step 1: Upload each file to `POST /v2/files` with `x-vercel-digest: <sha1>` header
Step 2: Reference in deployment as `{ file, sha, size }`

```typescript
import { createHash } from "crypto";

async function uploadFile(content: Buffer) {
  const sha = createHash("sha1").update(content).digest("hex");
  await fetch(`https://api.vercel.com/v2/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      "Content-Type": "application/octet-stream",
      "x-vercel-digest": sha,
    },
    body: content,
  });
  return { sha, size: content.length };
}
```

---

## 3. Check Deployment Status

**Endpoint:** `GET /v13/deployments/{idOrUrl}`

```typescript
async function getStatus(deploymentId: string) {
  const res = await fetch(`https://api.vercel.com/v13/deployments/${deploymentId}`, {
    headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` },
  });
  return res.json();
  // readyState: "QUEUED" | "BUILDING" | "INITIALIZING" | "READY" | "ERROR" | "CANCELED"
}

async function waitForReady(deploymentId: string, timeoutMs = 300000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const { readyState } = await getStatus(deploymentId);
    if (readyState === "READY") return true;
    if (readyState === "ERROR" || readyState === "CANCELED") throw new Error(readyState);
    await new Promise((r) => setTimeout(r, 3000));
  }
  throw new Error("Timeout");
}
```

---

## 4. Environment Variables

**Create/Update:** `POST /v10/projects/{name}/env?upsert=true`

```typescript
async function setEnvVars(project: string, vars: Array<{
  key: string; value: string;
  target: ("production" | "preview" | "development")[];
  type?: "plain" | "encrypted" | "sensitive";
}>) {
  const res = await fetch(`https://api.vercel.com/v10/projects/${project}/env?upsert=true`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vars),
  });
  return res.json();
}
```

---

## 5. Delete / Redeploy

```typescript
// Delete project
await fetch(`https://api.vercel.com/v9/projects/${name}`, {
  method: "DELETE",
  headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` },
}); // 204 = success

// Redeploy from existing deployment
await fetch(`https://api.vercel.com/v13/deployments`, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify({ name, deploymentId: existingId, target: "production" }),
});
```

---

## 6. Using @vercel/sdk

```typescript
import { Vercel } from "@vercel/sdk";

const vercel = new Vercel({ bearerToken: process.env.VERCEL_TOKEN! });

// Create project
await vercel.projects.createProject({ requestBody: { name: "my-app", framework: "nextjs" } });

// Deploy
await vercel.deployments.createDeployment({
  requestBody: { name: "my-app", project: "my-app", target: "production", files: [...] },
});

// Get status
await vercel.deployments.getDeployment({ idOrUrl: deploymentId });

// Set env vars
await vercel.projects.createProjectEnv({
  idOrName: "my-app", upsert: "true",
  requestBody: { key: "API_KEY", value: "secret", type: "encrypted", target: ["production"] },
});
```

---

## Rate Limits

| Operation | Hobby | Pro |
|-----------|-------|-----|
| Deployments/day | 100 | 6,000 |
| Deployments/hour | 100 | 450 |
| File uploads/day | 5,000 | 40,000 |
| Projects max | 200 | Unlimited |
| Source files/deploy | 15,000 | 15,000 |
| Upload size | 100 MB | 1 GB |
| Concurrent builds | 1 | 12 |

## Key Gotchas

- `files` and `gitSource` are mutually exclusive
- SHA algorithm is SHA-1, not SHA-256
- `target: "production"` assigns production aliases; omit for preview
- `upsert=true` on env vars prevents 403 on existing keys
- First deployment auto-creates project if it doesn't exist
- No webhooks for deployment status -- must poll
- Hobby = 1 concurrent build, Pro = 12

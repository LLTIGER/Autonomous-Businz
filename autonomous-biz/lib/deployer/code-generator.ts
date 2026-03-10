import 'server-only'
import { generateJSON } from '@/lib/ai/claude'

export interface GeneratedFile {
  path: string
  content: string
}

export interface PRPInput {
  title: string
  content: string
  category: string
}

export async function generateProject(prp: PRPInput): Promise<GeneratedFile[]> {
  const prompt = `You are a senior full-stack developer. Generate a complete, deployable Next.js project based on the following Product Requirement Prompt (PRP).

## PRP Title: ${prp.title}

## Category: ${prp.category}

## PRP Content:
${prp.content}

## Requirements:
- Use Next.js App Router (app/ directory)
- Use TypeScript throughout
- Use Tailwind CSS for styling
- Include a package.json with all required dependencies
- Include a next.config.ts
- Create app/layout.tsx, app/page.tsx, and any needed route files
- Include relevant API routes under app/api/
- Include reusable components under components/
- Include a global CSS file with Tailwind directives
- Make it production-ready and deployable to Vercel

Return a JSON array where each element has:
- "path": the file path relative to project root (e.g. "package.json", "app/page.tsx")
- "content": the full file content as a string

Generate all files needed for a working, deployable project.`

  const files = await generateJSON<GeneratedFile[]>(prompt, 'You are an expert Next.js developer. Generate production-quality code.')

  return files
}

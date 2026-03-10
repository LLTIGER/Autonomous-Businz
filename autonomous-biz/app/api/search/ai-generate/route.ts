import { generateIdeas } from '@/lib/search/ai-ideas'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { niche, budget, skills, autonomyLevel } = body as {
      niche?: string
      budget?: number
      skills?: string[]
      autonomyLevel?: number
    }

    const results = await generateIdeas({
      niche,
      budget: budget ? String(budget) : undefined,
      skills: skills ? skills.join(', ') : undefined,
      autonomyLevel,
    })

    return Response.json({ results })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}

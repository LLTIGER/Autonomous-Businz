import 'server-only'
import { generateJSON } from '@/lib/ai/claude'
import { getCategoriesForPrompt } from '@/lib/knowledge/categories'
import { getStrategiesForPrompt } from '@/lib/knowledge/strategies'
import type { Opportunity } from './empire-flippers'

export interface IdeaGenerationParams {
  niche?: string
  budget?: string
  skills?: string
  autonomyLevel?: number
}

interface GeneratedIdea {
  title: string
  description: string
  category: string
  estimatedRevenue: string
  estimatedCost: string
  autonomyScore: number
}

export async function generateIdeas(params: IdeaGenerationParams = {}): Promise<Opportunity[]> {
  const categoriesContext = getCategoriesForPrompt()
  const strategiesContext = getStrategiesForPrompt()

  const constraints: string[] = []
  if (params.niche) constraints.push(`Target niche: ${params.niche}`)
  if (params.budget) constraints.push(`Available budget: ${params.budget}`)
  if (params.skills) constraints.push(`User skills: ${params.skills}`)
  if (params.autonomyLevel) constraints.push(`Minimum autonomy score: ${params.autonomyLevel}/10`)

  const constraintBlock = constraints.length > 0
    ? `\nUser constraints:\n${constraints.join('\n')}\n`
    : ''

  const prompt = `Generate 5 unique autonomous online business ideas.

## Available Business Categories
${categoriesContext}

## Proven Strategies
${strategiesContext}
${constraintBlock}
For each idea, provide:
- title: short business name/concept
- description: 2-3 sentence description of the business model
- category: one of the category IDs (digital_products, ai_as_a_service, content_automation, saas_micro_saas, marketplace_platform, ecommerce, ai_trading_finance)
- estimatedRevenue: realistic monthly revenue range (e.g. "$1,000-$5,000/mo")
- estimatedCost: startup cost estimate (e.g. "$200")
- autonomyScore: 1-10 score for how autonomous this can be

Return a JSON array of exactly 5 objects with these fields.`

  const ideas = await generateJSON<GeneratedIdea[]>(prompt)

  return ideas.map((idea, index): Opportunity => ({
    id: `ai-${Date.now()}-${index}`,
    source: 'ai-generated',
    title: idea.title,
    description: idea.description,
    category: idea.category,
    estimatedRevenue: idea.estimatedRevenue,
    estimatedCost: idea.estimatedCost,
    autonomyScore: idea.autonomyScore,
    url: '',
    rawData: JSON.stringify(idea),
    status: 'discovered',
  }))
}

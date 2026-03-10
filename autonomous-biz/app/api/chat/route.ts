import { streamText, UIMessage, convertToModelMessages, tool, stepCountIs } from 'ai'

export const dynamic = 'force-dynamic'
import { anthropic } from '@ai-sdk/anthropic'
import { z } from 'zod'
import { buildSystemPrompt } from '@/lib/ai/prompts'

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: anthropic('claude-sonnet-4-6'),
    system: buildSystemPrompt(),
    messages: await convertToModelMessages(messages),
    tools: {
      searchMarketplace: tool({
        description:
          'Search for business opportunities on marketplaces like Empire Flippers',
        inputSchema: z.object({
          query: z.string().optional().describe('Search query'),
          monetizations: z
            .string()
            .optional()
            .describe('Filter by type: SaaS, Affiliate, etc.'),
          priceFrom: z
            .number()
            .optional()
            .describe('Min listing price USD'),
          priceTo: z
            .number()
            .optional()
            .describe('Max listing price USD'),
        }),
        execute: async (params) => {
          const { searchListings } = await import(
            '@/lib/search/empire-flippers'
          )
          return searchListings({
            query: params.query,
            monetizations: params.monetizations
              ? [params.monetizations]
              : undefined,
            priceFrom: params.priceFrom,
            priceTo: params.priceTo,
          })
        },
      }),
      generateIdeas: tool({
        description:
          'Generate AI-powered autonomous business ideas based on criteria',
        inputSchema: z.object({
          niche: z
            .string()
            .optional()
            .describe('Business niche or industry'),
          budget: z.number().optional().describe('Budget in USD'),
          skills: z
            .array(z.string())
            .optional()
            .describe('User skills'),
          autonomyLevel: z
            .number()
            .min(1)
            .max(10)
            .optional()
            .describe('Desired autonomy level 1-10'),
        }),
        execute: async (params) => {
          const { generateIdeas } = await import('@/lib/search/ai-ideas')
          return generateIdeas({
            niche: params.niche,
            budget: params.budget ? String(params.budget) : undefined,
            skills: params.skills ? params.skills.join(', ') : undefined,
            autonomyLevel: params.autonomyLevel,
          })
        },
      }),
      createPRP: tool({
        description:
          'Create a PRP for a selected business opportunity. Use after user selects an opportunity.',
        inputSchema: z.object({
          opportunityId: z.string(),
        }),
        execute: async ({ opportunityId }) => {
          const { generatePRP } = await import('@/lib/ai/prp-generator')
          const { getOpportunity } = await import('@/lib/db/queries')
          const opp = getOpportunity(opportunityId)
          if (!opp) return { error: 'Opportunity not found' }
          return generatePRP({
            id: opp.id,
            source: opp.source,
            title: opp.title,
            description: opp.description ?? '',
            category: opp.category ?? 'digital_products',
            estimatedRevenue: opp.estimated_revenue ?? '',
            estimatedCost: opp.estimated_cost ?? '',
            autonomyScore: opp.autonomy_score ?? 5,
            url: opp.url ?? '',
            rawData: opp.raw_data ?? '',
            status: opp.status,
          })
        },
      }),
      generateCode: tool({
        description:
          'Generate project code from an approved PRP. Use after user approves PRP.',
        inputSchema: z.object({
          prpId: z.string(),
        }),
        execute: async ({ prpId }) => {
          const { generateProject } = await import(
            '@/lib/deployer/code-generator'
          )
          const { getPRP } = await import('@/lib/db/queries')
          const prp = getPRP(prpId)
          if (!prp) return { error: 'PRP not found' }
          return generateProject({
            title: prp.title,
            content: prp.content,
            category: 'saas_micro_saas',
          })
        },
      }),
      deployToVercel: tool({
        description:
          'Deploy generated code to Vercel. Use after user approves generated code.',
        inputSchema: z.object({
          executionId: z.string(),
        }),
        execute: async ({ executionId }) => {
          const {
            deployProject,
            createProject,
            waitForDeployment,
          } = await import('@/lib/deployer/vercel')
          const {
            getExecution,
            updateExecutionStatus,
            updateExecutionDeployUrl,
          } = await import('@/lib/db/queries')
          const execution = getExecution(executionId)
          if (!execution) return { error: 'Execution not found' }
          const files = JSON.parse(execution.generated_code || '[]')
          const projectName = `abiz-${executionId.slice(0, 8)}`
          try {
            await createProject(projectName)
          } catch {
            // Project may already exist
          }
          const deployment = await deployProject(
            projectName,
            files.map((f: { path: string; content: string }) => ({
              file: f.path,
              data: f.content,
            }))
          )
          const result = await waitForDeployment(deployment.id)
          updateExecutionDeployUrl(executionId, `https://${result.url}`)
          updateExecutionStatus(executionId, 'deployed')
          return { url: `https://${result.url}`, status: 'deployed' }
        },
      }),
    },
    stopWhen: stepCountIs(5),
  })

  return result.toUIMessageStreamResponse()
}

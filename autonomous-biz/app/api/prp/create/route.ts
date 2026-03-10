import { generatePRP } from '@/lib/ai/prp-generator'
import { getOpportunity } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { opportunityId } = (await req.json()) as { opportunityId: string }

    if (!opportunityId) {
      return Response.json({ error: 'opportunityId is required' }, { status: 400 })
    }

    const opp = getOpportunity(opportunityId)
    if (!opp) {
      return Response.json({ error: 'Opportunity not found' }, { status: 404 })
    }

    const prp = await generatePRP({
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

    return Response.json(prp)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}

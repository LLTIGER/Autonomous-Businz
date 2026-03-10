import { PipelineBoard } from '@/components/pipeline/PipelineBoard'

export const dynamic = 'force-dynamic'

interface Opportunity {
  id: string
  source: string
  title: string
  description: string | null
  category: string | null
  estimated_revenue: string | null
  estimated_cost: string | null
  autonomy_score: number | null
  url: string | null
  status: string
  created_at: string
}

async function getOpportunities(): Promise<Opportunity[]> {
  try {
    // Use dynamic import to avoid build-time errors
    const { db } = await import('@/lib/db')
    const rows = db.prepare('SELECT * FROM opportunities ORDER BY created_at DESC').all()
    return rows as Opportunity[]
  } catch {
    // Return empty array if DB not initialized yet
    return []
  }
}

export default async function PipelinePage() {
  const opportunities = await getOpportunities()

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-6 border-b border-gray-200 bg-white">
        <h1 className="text-2xl font-bold text-gray-900">Pipeline</h1>
        <p className="text-gray-500 text-sm mt-1">
          Track your business opportunities from discovery to deployment.
        </p>
      </div>

      <div className="flex-1 overflow-hidden">
        <PipelineBoard opportunities={opportunities} />
      </div>
    </div>
  )
}

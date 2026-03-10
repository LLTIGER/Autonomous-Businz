'use client'

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

interface BusinessCardProps {
  opportunity: Opportunity
}

const sourceColors: Record<string, string> = {
  marketplace: 'bg-green-100 text-green-700',
  'ai-generated': 'bg-blue-100 text-blue-700',
  'empire_flippers': 'bg-green-100 text-green-700',
  'product_hunt': 'bg-purple-100 text-purple-700',
}

const statusColors: Record<string, string> = {
  discovered: 'bg-gray-100 text-gray-600',
  selected: 'bg-blue-100 text-blue-700',
  prp_created: 'bg-purple-100 text-purple-700',
  generating: 'bg-yellow-100 text-yellow-700',
  deployed: 'bg-green-100 text-green-700',
  running: 'bg-emerald-100 text-emerald-700',
}

export function BusinessCard({ opportunity }: BusinessCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      {/* Badges */}
      <div className="flex items-center gap-1.5 mb-2">
        <span
          className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
            sourceColors[opportunity.source] || 'bg-gray-100 text-gray-600'
          }`}
        >
          {opportunity.source.replace(/_/g, ' ')}
        </span>
        {opportunity.category && (
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-brand-50 text-brand-600">
            {opportunity.category.replace(/_/g, ' ')}
          </span>
        )}
      </div>

      {/* Title */}
      <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
        {opportunity.title}
      </h4>

      {/* Status & revenue */}
      <div className="flex items-center justify-between">
        <span
          className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${
            statusColors[opportunity.status] || 'bg-gray-100 text-gray-600'
          }`}
        >
          {opportunity.status.replace(/_/g, ' ')}
        </span>
        {opportunity.estimated_revenue && (
          <span className="text-xs font-medium text-gray-600">
            {opportunity.estimated_revenue}
          </span>
        )}
      </div>
    </div>
  )
}

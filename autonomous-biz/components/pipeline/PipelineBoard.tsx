'use client'

import { BusinessCard } from './BusinessCard'
import { useTranslation } from '@/lib/i18n/context'

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

interface PipelineBoardProps {
  opportunities: Opportunity[]
}

export function PipelineBoard({ opportunities }: PipelineBoardProps) {
  const t = useTranslation()

  const columns = [
    { id: 'discovered', label: t.pipeline.discovered, color: 'bg-gray-100 border-gray-300' },
    { id: 'selected', label: t.pipeline.selected, color: 'bg-blue-50 border-blue-300' },
    { id: 'prp_created', label: t.pipeline.prpCreated, color: 'bg-purple-50 border-purple-300' },
    { id: 'generating', label: t.pipeline.generating, color: 'bg-yellow-50 border-yellow-300' },
    { id: 'deployed', label: t.pipeline.deployed, color: 'bg-green-50 border-green-300' },
    { id: 'running', label: t.pipeline.running, color: 'bg-emerald-50 border-emerald-300' },
  ]

  const getColumnItems = (columnId: string) =>
    opportunities.filter((o) => o.status === columnId)

  return (
    <div className="flex gap-4 p-6 h-full overflow-x-auto">
      {columns.map((column) => {
        const items = getColumnItems(column.id)
        return (
          <div
            key={column.id}
            className="flex-shrink-0 w-72 flex flex-col"
          >
            <div className={`flex items-center justify-between px-3 py-2.5 rounded-t-lg border-t-2 ${column.color}`}>
              <h3 className="text-sm font-semibold text-gray-700">{column.label}</h3>
              <span className="text-xs font-medium px-2 py-0.5 bg-white/80 rounded-full text-gray-600">
                {items.length}
              </span>
            </div>

            <div className="flex-1 bg-gray-50/50 rounded-b-lg border border-t-0 border-gray-200 p-2 space-y-2 overflow-y-auto min-h-[200px]">
              {items.length === 0 ? (
                <div className="flex items-center justify-center h-32 text-sm text-gray-400">
                  <p>{t.pipeline.noItems}</p>
                </div>
              ) : (
                items.map((item) => (
                  <BusinessCard key={item.id} opportunity={item} />
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

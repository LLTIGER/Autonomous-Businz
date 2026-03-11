'use client'

import { useTranslation } from '@/lib/i18n/context'

interface Opportunity {
  id: string
  title: string
  source: string
  description: string
  category: string
  estimatedRevenue: string
  autonomyScore: number
  url: string
}

interface OpportunityCardProps {
  opportunity: Opportunity
  onSelect: (id: string) => void
}

function getSourceColor(source: string) {
  switch (source.toLowerCase()) {
    case 'marketplace':
    case 'empire_flippers':
    case 'flippa':
      return 'bg-green-100 text-green-700'
    case 'ai-generated':
    case 'ai':
      return 'bg-blue-100 text-blue-700'
    case 'product_hunt':
    case 'discovery':
      return 'bg-purple-100 text-purple-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

export function OpportunityCard({ opportunity, onSelect }: OpportunityCardProps) {
  const t = useTranslation()
  const scorePercent = (opportunity.autonomyScore / 10) * 100

  function getSourceLabel(source: string) {
    switch (source.toLowerCase()) {
      case 'marketplace':
      case 'empire_flippers':
        return t.opportunity.marketplace
      case 'ai-generated':
      case 'ai':
        return t.opportunity.aiGenerated
      case 'product_hunt':
        return t.opportunity.productHunt
      default:
        return source
    }
  }

  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getSourceColor(opportunity.source)}`}>
              {getSourceLabel(opportunity.source)}
            </span>
            {opportunity.category && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-50 text-brand-600">
                {opportunity.category.replace(/_/g, ' ')}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-gray-900 text-base">{opportunity.title}</h3>
        </div>
      </div>

      {opportunity.description && (
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {opportunity.description}
        </p>
      )}

      <div className="flex items-center gap-4 mb-3 text-sm">
        {opportunity.estimatedRevenue && (
          <div className="flex items-center gap-1">
            <span className="text-gray-400">{'\u{1F4B0}'}</span>
            <span className="font-medium text-gray-700">{opportunity.estimatedRevenue}</span>
          </div>
        )}
        {opportunity.autonomyScore > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-xs">{t.opportunity.autonomy}</span>
            <div className="flex items-center gap-1">
              <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    opportunity.autonomyScore >= 8
                      ? 'bg-green-500'
                      : opportunity.autonomyScore >= 5
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${scorePercent}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-600">
                {opportunity.autonomyScore}/10
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        {opportunity.url && (
          <a
            href={opportunity.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand-500 hover:underline"
          >
            {t.opportunity.viewListing} {'\u2197'}
          </a>
        )}
        <button
          onClick={() => onSelect(opportunity.id)}
          className="ml-auto px-4 py-1.5 bg-brand-500 text-white text-sm font-medium rounded-lg hover:bg-brand-600 transition-colors"
        >
          {t.opportunity.selectThis}
        </button>
      </div>
    </div>
  )
}

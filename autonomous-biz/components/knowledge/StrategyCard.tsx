'use client'

import { useTranslation } from '@/lib/i18n/context'

interface Strategy {
  id: string
  category: string
  title: string
  description: string
  automationLevel: string
  tools: string[]
  estimatedRevenue: string
  difficulty: string
}

interface StrategyCardProps {
  strategy: Strategy
}

const categoryColors: Record<string, string> = {
  digital_products: 'bg-amber-100 text-amber-700',
  ai_as_a_service: 'bg-blue-100 text-blue-700',
  content_automation: 'bg-purple-100 text-purple-700',
  saas_micro_saas: 'bg-indigo-100 text-indigo-700',
  marketplace_platform: 'bg-teal-100 text-teal-700',
  ecommerce: 'bg-pink-100 text-pink-700',
  ai_trading_finance: 'bg-green-100 text-green-700',
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-50 text-green-600',
  intermediate: 'bg-yellow-50 text-yellow-600',
  advanced: 'bg-red-50 text-red-600',
}

export function StrategyCard({ strategy }: StrategyCardProps) {
  const t = useTranslation()

  const categoryLabels: Record<string, string> = {
    digital_products: t.strategiesPage.digitalProducts,
    ai_as_a_service: t.strategiesPage.aiAsAService,
    content_automation: t.strategiesPage.contentAutomation,
    saas_micro_saas: t.strategiesPage.saas,
    marketplace_platform: t.strategiesPage.marketplace,
    ecommerce: t.strategiesPage.ecommerce,
    ai_trading_finance: t.strategiesPage.aiTrading,
  }

  const automationLabels: Record<string, string> = {
    high: t.strategiesPage.highAutomation,
    medium: t.strategiesPage.mediumAutomation,
    low: t.strategiesPage.lowAutomation,
  }

  const automationColors: Record<string, { bg: string; text: string }> = {
    high: { bg: 'bg-green-100', text: 'text-green-700' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    low: { bg: 'bg-red-100', text: 'text-red-700' },
  }

  const automation = automationColors[strategy.automationLevel] || automationColors.medium
  const automationLabel = automationLabels[strategy.automationLevel] || strategy.automationLevel
  const catColor = categoryColors[strategy.category] || 'bg-gray-100 text-gray-700'
  const catLabel = categoryLabels[strategy.category] || strategy.category
  const diffColor = difficultyColors[strategy.difficulty] || 'bg-gray-50 text-gray-600'

  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${catColor}`}>
          {catLabel}
        </span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${automation.bg} ${automation.text}`}>
          {automationLabel}
        </span>
      </div>

      <h3 className="font-semibold text-gray-900 text-base mb-2">{strategy.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3 mb-3 flex-1">{strategy.description}</p>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-gray-400 text-sm">{'\u{1F4B0}'}</span>
          <span className="text-sm font-medium text-gray-700">{strategy.estimatedRevenue}</span>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${diffColor}`}>
          {strategy.difficulty}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {strategy.tools.map((tool) => (
          <span
            key={tool}
            className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  )
}

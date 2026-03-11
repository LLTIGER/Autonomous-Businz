'use client'

import { useState } from 'react'
import { StrategyCard } from './StrategyCard'
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

interface StrategiesViewProps {
  strategies: Strategy[]
  categories: string[]
}

export function StrategiesView({ strategies, categories }: StrategiesViewProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const t = useTranslation()

  const categoryLabels: Record<string, string> = {
    digital_products: t.strategiesPage.digitalProducts,
    ai_as_a_service: t.strategiesPage.aiAsAService,
    content_automation: t.strategiesPage.contentAutomation,
    saas_micro_saas: t.strategiesPage.saas,
    marketplace_platform: t.strategiesPage.marketplacePlatform,
    ecommerce: t.strategiesPage.ecommerce,
    ai_trading_finance: t.strategiesPage.aiTradingFinance,
  }

  const filtered = activeCategory
    ? strategies.filter((s) => s.category === activeCategory)
    : strategies

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeCategory === null
              ? 'bg-brand-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {t.strategiesPage.all} ({strategies.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeCategory === cat
                ? 'bg-brand-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {categoryLabels[cat] || cat} ({strategies.filter((s) => s.category === cat).length})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((strategy) => (
          <StrategyCard key={strategy.id} strategy={strategy} />
        ))}
      </div>
    </div>
  )
}

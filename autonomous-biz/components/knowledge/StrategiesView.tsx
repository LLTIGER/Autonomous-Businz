'use client'

import { useState } from 'react'
import { StrategyCard } from './StrategyCard'

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

const categoryLabels: Record<string, string> = {
  digital_products: 'Digital Products',
  ai_as_a_service: 'AI-as-a-Service',
  content_automation: 'Content Automation',
  saas_micro_saas: 'SaaS / Micro-SaaS',
  marketplace_platform: 'Marketplace / Platform',
  ecommerce: 'E-Commerce',
  ai_trading_finance: 'AI Trading & Finance',
}

export function StrategiesView({ strategies, categories }: StrategiesViewProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = activeCategory
    ? strategies.filter((s) => s.category === activeCategory)
    : strategies

  return (
    <div>
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeCategory === null
              ? 'bg-brand-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All ({strategies.length})
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

      {/* Strategy grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((strategy) => (
          <StrategyCard key={strategy.id} strategy={strategy} />
        ))}
      </div>
    </div>
  )
}

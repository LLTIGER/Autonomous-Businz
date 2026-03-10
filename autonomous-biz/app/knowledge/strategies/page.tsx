import { readFileSync } from 'fs'
import { join } from 'path'
import { StrategiesView } from '@/components/knowledge/StrategiesView'

export interface Strategy {
  id: string
  category: string
  title: string
  description: string
  automationLevel: string
  tools: string[]
  estimatedRevenue: string
  difficulty: string
}

function getStrategies(): Strategy[] {
  const filePath = join(process.cwd(), 'data', 'strategies.json')
  const raw = readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

export default function StrategiesPage() {
  const strategies = getStrategies()

  // Get unique categories
  const categories = Array.from(new Set(strategies.map((s) => s.category)))

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Strategies</h1>
        <p className="text-gray-500 text-lg">
          {strategies.length} curated strategies across {categories.length} categories.
        </p>
      </div>

      <StrategiesView strategies={strategies} categories={categories} />
    </div>
  )
}

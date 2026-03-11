import { readFileSync } from 'fs'
import { join } from 'path'
import { StrategiesView } from '@/components/knowledge/StrategiesView'
import { T } from '@/components/TranslatedText'

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
  const categories = Array.from(new Set(strategies.map((s) => s.category)))

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <T section="strategiesPage" tkey="title" as="h1" className="text-3xl font-bold text-gray-900 mb-2" />
        <T section="strategiesPage" tkey="description" as="p" className="text-gray-500 text-lg" replacements={{ count: strategies.length, catCount: categories.length }} />
      </div>

      <StrategiesView strategies={strategies} categories={categories} />
    </div>
  )
}

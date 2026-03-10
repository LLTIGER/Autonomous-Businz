import { readFileSync } from 'fs'
import { join } from 'path'
import { CategoryTree } from '@/components/knowledge/CategoryTree'

export interface Category {
  id: string
  name: string
  autonomyScore: number
  examples: string[]
  revenueModel: string
  typicalMonthly: string
  description: string
  keyMetrics: string[]
}

function getCategories(): Category[] {
  const filePath = join(process.cwd(), 'data', 'categories.json')
  const raw = readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

export default function CategoriesPage() {
  const categories = getCategories()

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Categories</h1>
        <p className="text-gray-500 text-lg">
          {categories.length} categories ranked by autonomy potential.
        </p>
      </div>

      <CategoryTree categories={categories} />
    </div>
  )
}

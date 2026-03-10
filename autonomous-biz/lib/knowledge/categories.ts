import 'server-only'
import { readFileSync } from 'fs'
import { join } from 'path'

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

let _categories: Category[] | null = null

function loadCategories(): Category[] {
  if (_categories) return _categories
  const raw = readFileSync(join(process.cwd(), 'data', 'categories.json'), 'utf-8')
  _categories = JSON.parse(raw) as Category[]
  return _categories
}

export function getCategories(): Category[] {
  return loadCategories()
}

export function getCategoryById(id: string): Category | undefined {
  return loadCategories().find((c) => c.id === id)
}

export function getCategoriesForPrompt(): string {
  const categories = loadCategories()
  return categories
    .map((c) => {
      return `${c.name} (autonomy: ${c.autonomyScore}/10) - ${c.revenueModel} - ${c.typicalMonthly}/mo\n  ${c.description}\n  Examples: ${c.examples.join(', ')}\n  Key metrics: ${c.keyMetrics.join(', ')}`
    })
    .join('\n\n')
}

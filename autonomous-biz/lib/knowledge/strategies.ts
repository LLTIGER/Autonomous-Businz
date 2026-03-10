import 'server-only'
import { readFileSync } from 'fs'
import { join } from 'path'

export interface Strategy {
  id: string
  name: string
  category: string
  description: string
  steps: string[]
  bestFor: string[]
}

let _strategies: Strategy[] | null = null

function loadStrategies(): Strategy[] {
  if (_strategies) return _strategies
  const raw = readFileSync(join(process.cwd(), 'data', 'strategies.json'), 'utf-8')
  _strategies = JSON.parse(raw) as Strategy[]
  return _strategies
}

export function getStrategies(): Strategy[] {
  return loadStrategies()
}

export function getStrategiesByCategory(category: string): Strategy[] {
  return loadStrategies().filter((s) => s.category === category)
}

export function getStrategiesForPrompt(): string {
  const strategies = loadStrategies()
  return strategies
    .map((s) => {
      const steps = s.steps.map((step, i) => `  ${i + 1}. ${step}`).join('\n')
      return `Strategy: ${s.name} [${s.category}]\n${s.description}\nSteps:\n${steps}\nBest for: ${s.bestFor.join(', ')}`
    })
    .join('\n\n')
}

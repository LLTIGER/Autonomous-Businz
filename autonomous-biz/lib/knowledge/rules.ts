import 'server-only'
import { readFileSync } from 'fs'
import { join } from 'path'

export interface SubRule {
  text: string
}

export interface Rule {
  id: string
  number: number
  title: string
  description: string
  implementation: string
  source: string
  subRules: string[]
}

let _rules: Rule[] | null = null

function loadRules(): Rule[] {
  if (_rules) return _rules
  const raw = readFileSync(join(process.cwd(), 'data', 'rules.json'), 'utf-8')
  _rules = JSON.parse(raw) as Rule[]
  return _rules
}

export function getRules(): Rule[] {
  return loadRules()
}

export function getRuleById(id: string): Rule | undefined {
  return loadRules().find((r) => r.id === id)
}

export function getRulesForPrompt(): string {
  const rules = loadRules()
  return rules
    .map((r) => {
      const subs = r.subRules.map((s, i) => `  ${i + 1}. ${s}`).join('\n')
      return `Rule #${r.number}: ${r.title}\n${r.description}\n${subs}`
    })
    .join('\n\n')
}

import { readFileSync } from 'fs'
import { join } from 'path'
import { RuleCard } from '@/components/knowledge/RuleCard'

interface Rule {
  id: string
  number: number
  title: string
  description: string
  implementation: string
  source: string
  subRules: string[]
}

function getRules(): Rule[] {
  const filePath = join(process.cwd(), 'data', 'rules.json')
  const raw = readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

export default function RulesPage() {
  const rules = getRules()

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          The 10 Golden Rules of Autonomous Business
        </h1>
        <p className="text-gray-500 text-lg">
          Foundational principles for building safe, scalable, and profitable autonomous businesses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rules.map((rule) => (
          <RuleCard key={rule.id} rule={rule} />
        ))}
      </div>
    </div>
  )
}

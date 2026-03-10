'use client'

interface Category {
  id: string
  name: string
  autonomyScore: number
  examples: string[]
  revenueModel: string
  typicalMonthly: string
  description: string
  keyMetrics: string[]
}

interface CategoryTreeProps {
  categories: Category[]
}

function getScoreColor(score: number): string {
  if (score >= 8) return 'bg-green-500'
  if (score >= 6) return 'bg-yellow-500'
  return 'bg-red-500'
}

function getScoreBadgeColor(score: number): string {
  if (score >= 8) return 'bg-green-100 text-green-700'
  if (score >= 6) return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-700'
}

export function CategoryTree({ categories }: CategoryTreeProps) {
  const sorted = [...categories].sort((a, b) => b.autonomyScore - a.autonomyScore)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {sorted.map((category) => (
        <div
          key={category.id}
          className="border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow p-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900 text-lg">{category.name}</h3>
            <span className={`text-sm font-bold px-2.5 py-1 rounded-lg ${getScoreBadgeColor(category.autonomyScore)}`}>
              {category.autonomyScore}/10
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">{category.description}</p>

          {/* Autonomy Score Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Autonomy Score</span>
              <span>{category.autonomyScore}/10</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${getScoreColor(category.autonomyScore)}`}
                style={{ width: `${(category.autonomyScore / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Revenue */}
          <div className="mb-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Revenue Model</span>
              <span className="text-xs font-medium text-gray-700">{category.revenueModel}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Typical Monthly</span>
              <span className="text-xs font-medium text-gray-900">{category.typicalMonthly}</span>
            </div>
          </div>

          {/* Examples */}
          <div className="mb-3">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Examples</h4>
            <div className="flex flex-wrap gap-1.5">
              {category.examples.map((example) => (
                <span
                  key={example}
                  className="text-xs px-2 py-0.5 bg-brand-50 text-brand-600 rounded-md"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Metrics</h4>
            <div className="flex flex-wrap gap-1.5">
              {category.keyMetrics.map((metric) => (
                <span
                  key={metric}
                  className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md"
                >
                  {metric}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

import { readFileSync } from 'fs'
import { join } from 'path'

interface Source {
  id: string
  name: string
  type: string
  baseUrl: string
  authMethod: string
  rateLimit: string
  enabled: boolean
  requiredEnvVars: string[]
  description: string
}

function getSources(): Source[] {
  const filePath = join(process.cwd(), 'data', 'sources.json')
  const raw = readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

const typeColors: Record<string, string> = {
  marketplace: 'bg-green-100 text-green-700',
  discovery: 'bg-purple-100 text-purple-700',
  intelligence: 'bg-blue-100 text-blue-700',
}

const authLabels: Record<string, string> = {
  none: 'No Auth',
  apikey: 'API Key',
  oauth2: 'OAuth 2.0',
}

export default function SourcesPage() {
  const sources = getSources()

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Sources</h1>
        <p className="text-gray-500 text-lg">
          APIs and marketplaces used for discovering business opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {sources.map((source) => (
          <div
            key={source.id}
            className="border border-gray-200 rounded-xl bg-white shadow-sm p-5"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      source.enabled ? 'bg-green-500' : 'bg-red-400'
                    }`}
                    title={source.enabled ? 'Enabled' : 'Disabled'}
                  />
                  <h3 className="font-semibold text-gray-900 text-lg">{source.name}</h3>
                </div>
              </div>
              <span
                className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                  typeColors[source.type] || 'bg-gray-100 text-gray-700'
                }`}
              >
                {source.type}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{source.description}</p>

            {/* Details */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Base URL</span>
                <code className="text-xs bg-gray-50 px-2 py-0.5 rounded font-mono text-gray-700 max-w-[280px] truncate">
                  {source.baseUrl}
                </code>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Auth Method</span>
                <span className="text-gray-700 font-medium">
                  {authLabels[source.authMethod] || source.authMethod}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Rate Limit</span>
                <span className="text-gray-700 font-medium">{source.rateLimit}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">Status</span>
                <span
                  className={`font-medium ${
                    source.enabled ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {source.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>

              {source.requiredEnvVars.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs text-gray-500 font-medium">Required Env Vars</span>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {source.requiredEnvVars.map((envVar) => (
                      <code
                        key={envVar}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded font-mono"
                      >
                        {envVar}
                      </code>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

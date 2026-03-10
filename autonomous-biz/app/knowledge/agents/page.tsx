import { getNexusAgents, getBrainTiers, getNexusPlatform } from '@/lib/knowledge/nexus-agents'

export default function AgentsPage() {
  const platform = getNexusPlatform()
  const agents = getNexusAgents()
  const tiers = getBrainTiers()

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">NexusAI Agents</h1>
        <p className="text-gray-600">
          AI agents from{' '}
          <a
            href={platform.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-500 underline hover:text-brand-600"
          >
            {platform.name}
          </a>{' '}
          that autonomously run your deployed businesses across {platform.channels.join(', ')}.
        </p>
      </div>

      {/* Agent Cards */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Agents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="border border-gray-200 rounded-xl p-5 hover:border-brand-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                  <span className="text-sm text-brand-600 font-medium">{agent.specialty}</span>
                </div>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    agent.category === 'universal'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {agent.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{agent.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {agent.capabilities.slice(0, 4).map((cap) => (
                  <span
                    key={cap}
                    className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                  >
                    {cap}
                  </span>
                ))}
                {agent.capabilities.length > 4 && (
                  <span className="text-xs text-gray-400">
                    +{agent.capabilities.length - 4} more
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  Best for: {agent.bestFor.join(', ')}
                </span>
                <span className="font-semibold text-brand-600">
                  Autonomy: {agent.autonomyScore}/10
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brain Tiers */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Brain Tiers</h2>
        <p className="text-sm text-gray-500 mb-4">
          Each agent requires a brain tier that determines its intelligence level and capacity.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tier</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Model</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Token Budget</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Best For</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier) => (
                <tr key={tier.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-brand-600">{tier.name}</td>
                  <td className="py-3 px-4 font-mono">${tier.monthlyPrice}/mo</td>
                  <td className="py-3 px-4">{tier.model}</td>
                  <td className="py-3 px-4">{tier.tokenBudget}</td>
                  <td className="py-3 px-4 text-gray-500">{tier.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

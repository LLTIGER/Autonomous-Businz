'use client'

import { useTranslation } from '@/lib/i18n/context'
import { useState, useEffect } from 'react'

interface Agent {
  id: string
  name: string
  specialty: string
  description: string
  capabilities: string[]
  autonomyScore: number
  category: string
  bestFor: string[]
}

interface BrainTier {
  id: string
  name: string
  monthlyPrice: number
  model: string
  tokenBudget: string
  bestFor: string
}

interface Platform {
  name: string
  website: string
  channels: string[]
}

export default function AgentsPage() {
  const t = useTranslation()
  const [agents, setAgents] = useState<Agent[]>([])
  const [tiers, setTiers] = useState<BrainTier[]>([])
  const [platform, setPlatform] = useState<Platform>({ name: '', website: '', channels: [] })

  useEffect(() => {
    fetch('/api/knowledge/agents')
      .then((r) => r.json())
      .then((data) => {
        setAgents(data.agents)
        setTiers(data.tiers)
        setPlatform(data.platform)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.agents.title}</h1>
        <p className="text-gray-600">
          {t.agents.intro
            .replace('{platform}', platform.name)
            .replace('{channels}', platform.channels.join(', '))}
          {platform.website && (
            <>
              {' '}
              <a
                href={platform.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-500 underline hover:text-brand-600"
              >
                {platform.name}
              </a>
            </>
          )}
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{t.agents.availableAgents}</h2>
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
                    {t.agents.more.replace('{count}', String(agent.capabilities.length - 4))}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {t.agents.bestFor}{agent.bestFor.join(', ')}
                </span>
                <span className="font-semibold text-brand-600">
                  {t.agents.autonomy}{agent.autonomyScore}/10
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{t.agents.brainTiers}</h2>
        <p className="text-sm text-gray-500 mb-4">{t.agents.brainDescription}</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.agents.tier}</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.agents.price}</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.agents.model}</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.agents.tokenBudget}</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.agents.bestForCol}</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier) => (
                <tr key={tier.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-brand-600">{tier.name}</td>
                  <td className="py-3 px-4 font-mono">${tier.monthlyPrice}{t.agents.perMonth}</td>
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

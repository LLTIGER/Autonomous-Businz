'use client'

import { useTranslation } from '@/lib/i18n/context'

interface Agent {
  id: string
  name: string
  specialty: string
  description: string
  capabilities: string[]
  autonomyScore: number
}

interface AgentRecommendationProps {
  platform: { name: string; website: string; channels: string[] }
  agents: Agent[]
  brain: { tier: string; price: string; model: string; tokenBudget: string } | null
  totalCost: string
}

export function AgentRecommendation({
  platform,
  agents,
  brain,
  totalCost,
}: AgentRecommendationProps) {
  const t = useTranslation()

  return (
    <div className="my-3 border border-brand-200 rounded-xl overflow-hidden">
      <div className="bg-brand-50 px-4 py-3 border-b border-brand-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{'\u{1F916}'}</span>
            <span className="font-semibold text-brand-800">
              {t.agents.recommendations.replace('{platform}', platform.name)}
            </span>
          </div>
          <a
            href={platform.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand-500 underline hover:text-brand-600"
          >
            {t.agents.visit.replace('{platform}', platform.name)}
          </a>
        </div>
        <p className="text-xs text-brand-600 mt-1">
          {t.agents.availableOn}{platform.channels.join(' | ')}
        </p>
      </div>

      <div className="p-4 space-y-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-lg"
          >
            <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center text-brand-600 font-bold text-sm flex-shrink-0">
              {agent.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 text-sm">{agent.name}</span>
                <span className="text-xs text-brand-500">{agent.specialty}</span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                {agent.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {agent.capabilities.slice(0, 3).map((cap) => (
                  <span
                    key={cap}
                    className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-xs font-bold text-brand-600 flex-shrink-0">
              {agent.autonomyScore}/10
            </span>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        {brain && (
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">
              {t.agents.recommendedBrain}<strong className="text-gray-900">{brain.tier}</strong> ({brain.model})
            </span>
            <span className="font-semibold text-gray-900">{brain.price}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{t.agents.totalCost}</span>
          <span className="font-bold text-brand-600">{totalCost}</span>
        </div>
      </div>
    </div>
  )
}

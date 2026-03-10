'use client'

import { useState } from 'react'

interface Rule {
  id: string
  number: number
  title: string
  description: string
  implementation: string
  source: string
  subRules: string[]
}

interface RuleCardProps {
  rule: Rule
}

export function RuleCard({ rule }: RuleCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`border rounded-xl bg-white transition-all cursor-pointer hover:shadow-md ${
        expanded ? 'border-brand-500 shadow-md' : 'border-gray-200 shadow-sm'
      }`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-500 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
            {rule.number}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base">{rule.title}</h3>
            <p className={`text-sm text-gray-600 mt-1 ${expanded ? '' : 'line-clamp-2'}`}>
              {rule.description}
            </p>
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-4 space-y-4 border-t border-gray-100 pt-4">
            {/* Implementation */}
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Implementation
              </h4>
              <p className="text-sm text-gray-700">{rule.implementation}</p>
            </div>

            {/* Source */}
            <div>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Source
              </h4>
              <p className="text-sm text-gray-600 italic">{rule.source}</p>
            </div>

            {/* Sub-rules */}
            {rule.subRules && rule.subRules.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Sub-Rules
                </h4>
                <ul className="space-y-2">
                  {rule.subRules.map((subRule, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-5 h-5 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{subRule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

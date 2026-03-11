'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/context'

export default function KnowledgePage() {
  const t = useTranslation()

  const sections = [
    {
      title: t.knowledge.goldenRules,
      description: t.knowledge.goldenRulesDesc,
      href: '/knowledge/rules',
      icon: '\u{1F4CB}',
      count: 10,
      color: 'bg-amber-50 border-amber-200 hover:border-amber-400',
      iconBg: 'bg-amber-100',
    },
    {
      title: t.knowledge.strategies,
      description: t.knowledge.strategiesDesc,
      href: '/knowledge/strategies',
      icon: '\u{1F9E0}',
      count: 30,
      color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
      iconBg: 'bg-blue-100',
    },
    {
      title: t.knowledge.categories,
      description: t.knowledge.categoriesDesc,
      href: '/knowledge/categories',
      icon: '\u{1F3F7}\uFE0F',
      count: 7,
      color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
      iconBg: 'bg-purple-100',
    },
    {
      title: t.knowledge.sources,
      description: t.knowledge.sourcesDesc,
      href: '/knowledge/sources',
      icon: '\u{1F50C}',
      count: 4,
      color: 'bg-green-50 border-green-200 hover:border-green-400',
      iconBg: 'bg-green-100',
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.knowledge.title}</h1>
        <p className="text-gray-500 text-lg">
          {t.knowledge.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className={`block p-6 rounded-xl border-2 transition-all ${section.color} group`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${section.iconBg} flex items-center justify-center flex-shrink-0`}>
                <span className="text-2xl">{section.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                    {section.title}
                  </h2>
                  <span className="text-xs font-medium px-2.5 py-1 bg-white/80 rounded-full text-gray-600">
                    {section.count} {t.knowledge.items}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {section.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

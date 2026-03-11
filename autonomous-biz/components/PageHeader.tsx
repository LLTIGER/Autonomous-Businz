'use client'

import { useTranslation } from '@/lib/i18n/context'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'

type DictKey = keyof Dictionary

interface PageHeaderProps {
  section: DictKey
  titleKey: string
  descriptionKey?: string
  descriptionReplacements?: Record<string, string | number>
}

export function PageHeader({ section, titleKey, descriptionKey, descriptionReplacements }: PageHeaderProps) {
  const t = useTranslation()
  const dict = t[section] as Record<string, string>
  const title = dict[titleKey] || titleKey

  let description = descriptionKey ? (dict[descriptionKey] || '') : ''
  if (description && descriptionReplacements) {
    for (const [key, value] of Object.entries(descriptionReplacements)) {
      description = description.replace(`{${key}}`, String(value))
    }
  }

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  )
}

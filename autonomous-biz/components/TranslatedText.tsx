'use client'

import { useTranslation } from '@/lib/i18n/context'
import type { Dictionary } from '@/lib/i18n/dictionaries/en'

type DictSection = keyof Dictionary

interface TranslatedTextProps {
  section: DictSection
  tkey: string
  replacements?: Record<string, string | number>
  as?: keyof React.JSX.IntrinsicElements
  className?: string
}

export function T({ section, tkey, replacements, as: Tag = 'span', className }: TranslatedTextProps) {
  const t = useTranslation()
  const dict = t[section] as Record<string, string>
  let text = dict[tkey] || tkey

  if (replacements) {
    for (const [key, value] of Object.entries(replacements)) {
      text = text.replace(`{${key}}`, String(value))
    }
  }

  return <Tag className={className}>{text}</Tag>
}

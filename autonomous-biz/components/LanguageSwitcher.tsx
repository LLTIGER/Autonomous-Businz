'use client'

import { useLocale } from '@/lib/i18n/context'
import { LOCALES } from '@/lib/i18n'

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as typeof locale)}
      className="w-full text-xs bg-gray-100 border border-gray-200 rounded-md px-2 py-1.5 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-400"
      aria-label="Select language"
    >
      {LOCALES.map((l) => (
        <option key={l.code} value={l.code}>
          {l.flag} {l.label}
        </option>
      ))}
    </select>
  )
}

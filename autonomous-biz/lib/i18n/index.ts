import type { Dictionary } from './dictionaries/en'
import en from './dictionaries/en'

export type { Dictionary }
export type Locale = 'en' | 'fr' | 'es' | 'zh' | 'pt' | 'ar'

export const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
]

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => Promise.resolve(en),
  fr: () => import('./dictionaries/fr').then((m) => m.default),
  es: () => import('./dictionaries/es').then((m) => m.default),
  zh: () => import('./dictionaries/zh').then((m) => m.default),
  pt: () => import('./dictionaries/pt').then((m) => m.default),
  ar: () => import('./dictionaries/ar').then((m) => m.default),
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const loader = dictionaries[locale] ?? dictionaries.en
  return loader()
}

export function getDefaultLocale(): Locale {
  return 'en'
}

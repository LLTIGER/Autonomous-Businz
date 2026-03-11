'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { Dictionary } from './dictionaries/en'
import en from './dictionaries/en'
import type { Locale } from './index'
import { LOCALES } from './index'

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Dictionary
  isRTL: boolean
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: en,
  isRTL: false,
})

const RTL_LOCALES: Locale[] = ['ar']

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [dictionary, setDictionary] = useState<Dictionary>(en)

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null
    if (saved && LOCALES.some((l) => l.code === saved)) {
      setLocaleState(saved)
      loadDictionary(saved)
    }
  }, [])

  const loadDictionary = useCallback(async (loc: Locale) => {
    if (loc === 'en') {
      setDictionary(en)
      return
    }
    try {
      const mod = await import(`./dictionaries/${loc}.ts`)
      setDictionary(mod.default)
    } catch {
      setDictionary(en)
    }
  }, [])

  const setLocale = useCallback(
    (loc: Locale) => {
      setLocaleState(loc)
      localStorage.setItem('locale', loc)
      document.documentElement.lang = loc
      document.documentElement.dir = RTL_LOCALES.includes(loc) ? 'rtl' : 'ltr'
      loadDictionary(loc)
    },
    [loadDictionary]
  )

  const isRTL = RTL_LOCALES.includes(locale)

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: dictionary, isRTL }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(LocaleContext)
  return ctx.t
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  return { locale: ctx.locale, setLocale: ctx.setLocale, isRTL: ctx.isRTL }
}

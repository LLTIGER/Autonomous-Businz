import 'server-only'

const BASE_URL = 'https://api.empireflippers.com/api/v1'

export interface Opportunity {
  id: string
  source: string
  title: string
  description: string
  category: string
  estimatedRevenue: string
  estimatedCost: string
  autonomyScore: number
  url: string
  rawData: string
  status: string
}

export interface SearchParams {
  query?: string
  monetizations?: string[]
  priceFrom?: number
  priceTo?: number
  profitFrom?: number
  page?: number
  limit?: number
}

export interface EFConfig {
  niches: string[]
  monetizations: string[]
}

interface EFListing {
  id: number | string
  title?: string
  description?: string
  niche?: string
  monetization?: string[]
  listing_price?: number
  net_profit?: number
  url?: string
  [key: string]: unknown
}

interface EFListResponse {
  listings: EFListing[]
  total?: number
  page?: number
}

// Rate-limit: 1 request per second
let lastRequestTime = 0

async function rateLimitedFetch(url: string): Promise<Response> {
  const now = Date.now()
  const elapsed = now - lastRequestTime
  if (elapsed < 1000) {
    await new Promise((resolve) => setTimeout(resolve, 1000 - elapsed))
  }
  lastRequestTime = Date.now()
  return fetch(url)
}

function mapNicheToCategory(niche: string | undefined): string {
  if (!niche) return 'digital_products'
  const lower = niche.toLowerCase()
  if (lower.includes('saas') || lower.includes('software')) return 'saas_micro_saas'
  if (lower.includes('content') || lower.includes('blog') || lower.includes('media'))
    return 'content_automation'
  if (lower.includes('ecommerce') || lower.includes('commerce') || lower.includes('store'))
    return 'ecommerce'
  if (lower.includes('marketplace') || lower.includes('directory'))
    return 'marketplace_platform'
  if (lower.includes('ai') || lower.includes('automation')) return 'ai_as_a_service'
  if (lower.includes('trading') || lower.includes('finance')) return 'ai_trading_finance'
  return 'digital_products'
}

function estimateAutonomyScore(monetizations: string[] | undefined): number {
  if (!monetizations || monetizations.length === 0) return 5
  const lower = monetizations.map((m) => m.toLowerCase())
  if (lower.some((m) => m.includes('saas') || m.includes('subscription'))) return 8
  if (lower.some((m) => m.includes('digital') || m.includes('info'))) return 9
  if (lower.some((m) => m.includes('affiliate') || m.includes('advertising'))) return 7
  if (lower.some((m) => m.includes('ecommerce') || m.includes('fba'))) return 6
  return 5
}

function mapListingToOpportunity(listing: EFListing): Opportunity {
  const category = mapNicheToCategory(listing.niche)
  const autonomyScore = estimateAutonomyScore(listing.monetization)

  return {
    id: `ef-${listing.id}`,
    source: 'empire-flippers',
    title: listing.title ?? `Empire Flippers Listing #${listing.id}`,
    description: listing.description ?? '',
    category,
    estimatedRevenue: listing.net_profit
      ? `$${listing.net_profit.toLocaleString()}/mo`
      : 'Unknown',
    estimatedCost: listing.listing_price
      ? `$${listing.listing_price.toLocaleString()}`
      : 'Unknown',
    autonomyScore,
    url: listing.url ?? `https://empireflippers.com/listing/${listing.id}`,
    rawData: JSON.stringify(listing),
    status: 'discovered',
  }
}

export async function searchListings(params: SearchParams = {}): Promise<Opportunity[]> {
  const searchParams = new URLSearchParams()

  if (params.query) searchParams.set('q', params.query)
  if (params.monetizations && params.monetizations.length > 0) {
    params.monetizations.forEach((m) => searchParams.append('monetizations[]', m))
  }
  if (params.priceFrom !== undefined) searchParams.set('price_from', String(params.priceFrom))
  if (params.priceTo !== undefined) searchParams.set('price_to', String(params.priceTo))
  if (params.profitFrom !== undefined) searchParams.set('profit_from', String(params.profitFrom))
  if (params.page !== undefined) searchParams.set('page', String(params.page))
  if (params.limit !== undefined) searchParams.set('limit', String(params.limit))

  const url = `${BASE_URL}/listings/list?${searchParams.toString()}`

  const response = await rateLimitedFetch(url)
  if (!response.ok) {
    throw new Error(`Empire Flippers API error: ${response.status} ${response.statusText}`)
  }

  const data = (await response.json()) as EFListResponse
  const listings = data.listings ?? []

  return listings.map(mapListingToOpportunity)
}

export async function getConfig(): Promise<EFConfig> {
  const url = `${BASE_URL}/ef-config`

  const response = await rateLimitedFetch(url)
  if (!response.ok) {
    throw new Error(`Empire Flippers config error: ${response.status} ${response.statusText}`)
  }

  const data = (await response.json()) as EFConfig
  return data
}

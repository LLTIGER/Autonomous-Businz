import { readFileSync } from 'fs'
import { join } from 'path'

export interface NexusAgent {
  id: string
  name: string
  category: string
  specialty: string
  description: string
  capabilities: string[]
  bestFor: string[]
  autonomyScore: number
}

export interface BrainTier {
  id: string
  name: string
  monthlyPrice: number
  model: string
  tokenBudget: string
  description: string
  bestFor: string
}

export interface NexusPlatform {
  name: string
  website: string
  description: string
  runtime: string
  infrastructure: string
  channels: string[]
}

interface NexusData {
  platform: NexusPlatform
  agents: NexusAgent[]
  brainTiers: BrainTier[]
  integrationPoints: Record<string, string>
}

let cached: NexusData | null = null

function loadNexusData(): NexusData {
  if (cached) return cached
  const raw = readFileSync(join(process.cwd(), 'data', 'nexus-agents.json'), 'utf-8')
  cached = JSON.parse(raw) as NexusData
  return cached
}

export function getNexusPlatform(): NexusPlatform {
  return loadNexusData().platform
}

export function getNexusAgents(): NexusAgent[] {
  return loadNexusData().agents
}

export function getNexusAgent(id: string): NexusAgent | undefined {
  return loadNexusData().agents.find((a) => a.id === id)
}

export function getBrainTiers(): BrainTier[] {
  return loadNexusData().brainTiers
}

export function getBrainTier(id: string): BrainTier | undefined {
  return loadNexusData().brainTiers.find((t) => t.id === id)
}

export function recommendAgentsForBusiness(category: string): NexusAgent[] {
  const agents = getNexusAgents()
  const categoryMap: Record<string, string[]> = {
    saas_micro_saas: ['kai', 'marcus', 'aria'],
    digital_products: ['nova', 'marcus', 'aria'],
    content_automation: ['nova', 'aria', 'marcus'],
    ecommerce: ['storefront', 'marcus', 'finley'],
    marketplace: ['storefront', 'marcus', 'aria'],
    service_business: ['sage', 'aria', 'marcus'],
    affiliate_marketing: ['nova', 'finley', 'aria'],
  }
  const recommended = categoryMap[category] || ['aria', 'marcus', 'nova']
  return recommended
    .map((id) => agents.find((a) => a.id === id))
    .filter((a): a is NexusAgent => a !== undefined)
}

export function recommendBrainTier(budget: number): BrainTier {
  const tiers = getBrainTiers()
  // Find highest tier within budget
  const affordable = tiers.filter((t) => t.monthlyPrice <= budget)
  return affordable.length > 0 ? affordable[affordable.length - 1] : tiers[0]
}

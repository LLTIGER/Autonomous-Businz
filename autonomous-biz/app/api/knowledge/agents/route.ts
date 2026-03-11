import { NextResponse } from 'next/server'
import { getNexusAgents, getBrainTiers, getNexusPlatform } from '@/lib/knowledge/nexus-agents'

export async function GET() {
  return NextResponse.json({
    agents: getNexusAgents(),
    tiers: getBrainTiers(),
    platform: getNexusPlatform(),
  })
}

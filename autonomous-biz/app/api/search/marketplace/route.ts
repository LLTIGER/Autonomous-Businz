import { NextRequest } from 'next/server'
import { searchListings } from '@/lib/search/empire-flippers'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const query = searchParams.get('query') || undefined
    const monetizations = searchParams.get('monetizations') || undefined
    const priceFrom = searchParams.get('priceFrom')
    const priceTo = searchParams.get('priceTo')

    const results = await searchListings({
      query,
      monetizations: monetizations ? [monetizations] : undefined,
      priceFrom: priceFrom ? Number(priceFrom) : undefined,
      priceTo: priceTo ? Number(priceTo) : undefined,
    })

    return Response.json({ results })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}

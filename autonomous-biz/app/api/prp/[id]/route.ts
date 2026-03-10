import { getPRP } from '@/lib/db/queries'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const prp = getPRP(id)
    if (!prp) {
      return Response.json({ error: 'PRP not found' }, { status: 404 })
    }

    return Response.json(prp)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: message }, { status: 500 })
  }
}

import { readFileSync } from 'fs'
import { join } from 'path'
import { NextResponse } from 'next/server'

export async function GET() {
  const filePath = join(process.cwd(), 'data', 'sources.json')
  const raw = readFileSync(filePath, 'utf-8')
  return NextResponse.json(JSON.parse(raw))
}

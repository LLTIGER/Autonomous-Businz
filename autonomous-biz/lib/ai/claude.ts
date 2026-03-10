import 'server-only'
import Anthropic from '@anthropic-ai/sdk'

let _client: Anthropic | null = null

export function getClient(): Anthropic {
  if (_client) return _client
  _client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })
  return _client
}

export async function generateText(
  prompt: string,
  system?: string
): Promise<string> {
  const client = getClient()
  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    ...(system ? { system } : {}),
    messages: [{ role: 'user', content: prompt }],
  })

  const block = message.content[0]
  if (block.type === 'text') {
    return block.text
  }
  throw new Error(`Unexpected content block type: ${block.type}`)
}

export async function generateJSON<T>(
  prompt: string,
  system?: string
): Promise<T> {
  const jsonSystem = [
    system ?? '',
    'You MUST respond with valid JSON only. No markdown fences, no explanation, no text outside the JSON object.',
  ]
    .filter(Boolean)
    .join('\n\n')

  const text = await generateText(prompt, jsonSystem)

  // Strip any accidental markdown fences
  const cleaned = text
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim()

  return JSON.parse(cleaned) as T
}

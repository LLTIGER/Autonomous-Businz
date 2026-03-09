# Next.js 16 Stack: Implementation Patterns & Reference

Curated from official documentation as of March 2026.
Covers: Next.js 16, Vercel AI SDK 6, @anthropic-ai/sdk, better-sqlite3 v12, Tailwind CSS v4.

---

## 1. Next.js 16

### Install

```bash
# New project
npx create-next-app@latest

# Upgrade existing
npm install next@latest react@latest react-dom@latest
# Or use codemod
npx @next/codemod@canary upgrade latest
```

**Version:** 16.1.6 (stable as of Feb 2026)
**Min Node.js:** 20.9.0 (Node 18 dropped)
**Min TypeScript:** 5.1.0

### next.config.ts — key options

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Cache Components (replaces experimental.dynamicIO + experimental.ppr)
  cacheComponents: true,

  // Turbopack filesystem cache (beta) — significant dev speedup
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },

  // React Compiler (stable, opt-in)
  reactCompiler: true,

  // Turbopack alias config (replaces webpack resolve.alias)
  turbopack: {
    resolveAlias: {
      // Example: alias native-only module away from client bundle
      'better-sqlite3': './lib/db-server-stub.ts',
    },
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
}

export default nextConfig
```

**REMOVED in v16 (breaking changes):**
- `middleware.ts` → renamed to `proxy.ts` (function export renamed to `proxy`); `middleware.ts` still works but deprecated
- `experimental.ppr` flag → replaced by `cacheComponents: true`
- `experimental.dynamicIO` → renamed to `cacheComponents`
- `experimental.turbopack` → moved to top-level `turbopack` key
- `serverRuntimeConfig` / `publicRuntimeConfig` → use `.env` files
- Sync `params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` → must be awaited

### Async params/headers — critical pattern

```ts
// app/blog/[slug]/page.tsx
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ q: string }>
}) {
  const { slug } = await params        // MUST await
  const { q } = await searchParams     // MUST await

  const cookieStore = await cookies()  // MUST await
  const headersList = await headers()  // MUST await

  return <div>{slug}</div>
}
```

### Route Handlers (app/api/.../route.ts)

```ts
// app/api/items/route.ts

// Static GET — prerendered at build time
export const dynamic = 'force-static'
export async function GET() {
  return Response.json({ items: [] })
}

// Dynamic GET — runs at request time (default)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  return Response.json({ q: searchParams.get('q') })
}

// POST with typed context
import type { NextRequest } from 'next/server'

export async function POST(
  req: NextRequest,
  ctx: RouteContext<'/api/users/[id]'>
) {
  const { id } = await ctx.params
  const body = await req.json()
  return Response.json({ id, body })
}
```

**Pitfall:** `use cache` cannot be used directly inside a Route Handler body.
Extract to a helper function:

```ts
// WRONG
export async function GET() {
  'use cache'   // ERROR: cannot use here
  return Response.json(await db.query('...'))
}

// CORRECT
async function getProducts() {
  'use cache'
  cacheLife('hours')
  return db.query('SELECT * FROM products')
}

export async function GET() {
  const products = await getProducts()  // call the cached helper
  return Response.json(products)
}
```

### `use cache` directive

Requires `cacheComponents: true` in `next.config.ts`.

```ts
// File-level: all exports cached
'use cache'
export default async function Page() { ... }

// Component-level
export async function ProductList({ category }: { category: string }) {
  'use cache'
  cacheLife('hours')          // built-in profiles: 'seconds','minutes','hours','days','weeks','max'
  cacheTag(`products-${category}`)  // for on-demand invalidation
  const data = await fetch(`/api/products?cat=${category}`)
  return data
}

// Function-level
export async function getUser(id: string) {
  'use cache'
  cacheLife({ stale: 60, revalidate: 300, expire: 86400 })
  cacheTag(`user-${id}`)
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id)
}
```

**Constraints:**
- Cannot call `cookies()`, `headers()`, `searchParams` inside `use cache` — read outside and pass as args
- Arguments and return values must be serializable (no class instances, no Symbols, no functions)
- Children/slots can be passed through as non-introspected pass-through values
- `React.cache` is isolated inside `use cache` boundaries — do not use it to share data inward

**Cache invalidation:**

```ts
// In Server Actions — read-your-writes semantics
'use server'
import { updateTag } from 'next/cache'

export async function saveProduct(id: string, data: ProductData) {
  await db.update(id, data)
  updateTag(`products-${id}`)   // expires immediately, re-fetches in same request
}

// For SWR (stale-while-revalidate) — use revalidateTag with profile
import { revalidateTag } from 'next/cache'
revalidateTag('products', 'max')   // second arg required in v16
```

### proxy.ts (replaces middleware.ts)

```ts
// proxy.ts  (runs on Node.js runtime, not Edge)
import { NextRequest, NextResponse } from 'next/server'

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('token')
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
```

### Turbopack — native module handling

`better-sqlite3` is a native Node.js addon. It must NEVER be imported in client components. For Turbopack, ensure the module is only used in Server Components / Route Handlers and is not accidentally bundled for the client:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      // Prevent accidental client-side import of native addon
      // Only needed if client code accidentally imports it
      'better-sqlite3': false,
    },
  },
}
```

The safer approach: use `server-only` package as a guard.

---

## 2. Vercel AI SDK 6 (`ai` package)

### Install

```bash
npm install ai @ai-sdk/react @ai-sdk/anthropic zod
```

**Packages:**
- `ai` — core (v6.0.116+, March 2026)
- `@ai-sdk/react` — useChat / useCompletion hooks
- `@ai-sdk/anthropic` — Anthropic/Claude provider
- `zod` — tool input schemas

### Provider setup

```ts
// lib/ai.ts
import { createAnthropic } from '@ai-sdk/anthropic'

export const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Model references
export const claude = anthropic('claude-sonnet-4-6')        // recommended
export const claudeOpus = anthropic('claude-opus-4-6')      // most capable
export const claudeHaiku = anthropic('claude-haiku-4-5')    // fastest/cheapest
```

### Route Handler — streaming chat (Next.js App Router)

```ts
// app/api/chat/route.ts
import { streamText, UIMessage, convertToModelMessages, tool } from 'ai'
import { claude } from '@/lib/ai'
import { z } from 'zod'

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: claude,
    system: 'You are a helpful assistant.',
    messages: await convertToModelMessages(messages),
    tools: {
      getWeather: tool({
        description: 'Get current weather for a location',
        inputSchema: z.object({
          location: z.string().describe('City name or coordinates'),
        }),
        execute: async ({ location }) => {
          // Call actual weather API
          return { temperature: 22, condition: 'sunny', location }
        },
      }),
    },
    // Allow up to 5 tool-call rounds before stopping
    maxSteps: 5,
    onFinish: ({ usage }) => {
      console.log('Tokens used:', usage)
    },
  })

  return result.toUIMessageStreamResponse()
}
```

### useChat hook (Client Component)

```tsx
// app/components/Chat.tsx
'use client'

import { useChat } from '@ai-sdk/react'

export function Chat() {
  const {
    messages,
    sendMessage,
    status,
    error,
    stop,
  } = useChat({
    api: '/api/chat',
    onFinish: (message) => {
      console.log('Final message:', message)
    },
    onError: (err) => {
      console.error('Chat error:', err)
    },
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  return (
    <div>
      <div>
        {messages.map((msg) => (
          <div key={msg.id} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            {msg.parts.map((part, i) => {
              if (part.type === 'text') return <p key={i}>{part.text}</p>
              if (part.type === 'tool-call') return <div key={i}>Calling: {part.toolName}</div>
              if (part.type === 'tool-result') return <div key={i}>Result received</div>
              return null
            })}
          </div>
        ))}
      </div>

      {error && <p className="text-red-500">Something went wrong. Please try again.</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          const input = e.currentTarget.elements.namedItem('message') as HTMLInputElement
          if (!input.value.trim()) return
          sendMessage({ role: 'user', content: input.value })
          input.value = ''
        }}
      >
        <input name="message" disabled={isLoading} placeholder="Type a message..." />
        <button type="submit" disabled={isLoading}>Send</button>
        {isLoading && <button type="button" onClick={stop}>Stop</button>}
      </form>
    </div>
  )
}
```

**useChat status values:** `"ready"` | `"submitted"` | `"streaming"` | `"error"`

**Message parts types:**
- `{ type: 'text', text: string }`
- `{ type: 'tool-call', toolName: string, args: unknown }`
- `{ type: 'tool-result', toolName: string, result: unknown }`
- `{ type: 'reasoning', text: string }`
- `{ type: 'file', mediaType: string, url: string }`

### generateText (non-streaming, server-side)

```ts
import { generateText } from 'ai'
import { claude } from '@/lib/ai'

const { text, usage } = await generateText({
  model: claude,
  prompt: 'Summarize this document: ...',
})
```

### Pitfalls with Next.js 16

- `toUIMessageStreamResponse()` replaces the old `StreamingTextResponse` from AI SDK 3/4
- `convertToModelMessages()` is required — do not pass `UIMessage[]` directly to `messages`
- `sendMessage()` replaces `handleSubmit()` from older SDK versions
- The `@ai-sdk/react` package is separate from `ai` — install both
- Do NOT import `@ai-sdk/anthropic` in Client Components; keep in Route Handlers only

---

## 3. @anthropic-ai/sdk (Direct Anthropic Client)

Use this when you need direct control over the Anthropic API without going through the Vercel AI SDK abstraction (e.g., batch processing, files API, MCP helpers).

### Install

```bash
npm install @anthropic-ai/sdk
```

**Version:** latest (check `npm view @anthropic-ai/sdk version`)
**Requirements:** Node.js 20+, TypeScript 4.9+

### Basic message creation

```ts
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,  // default: reads ANTHROPIC_API_KEY env var
  maxRetries: 2,     // default — retries on 408, 409, 429, 5xx
  timeout: 60_000,   // ms; default is 10 min for non-streaming
})

const message = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  system: 'You are a helpful assistant.',
  messages: [{ role: 'user', content: 'Hello, Claude' }],
})

console.log(message.content[0].type)  // 'text'
console.log((message.content[0] as Anthropic.TextBlock).text)
console.log(message.usage)            // { input_tokens: N, output_tokens: N }
```

### Streaming with event helpers (recommended)

```ts
const stream = anthropic.messages.stream({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Write a poem about the ocean.' }],
})

// Event-based — accumulates full message
stream.on('text', (text) => process.stdout.write(text))

const finalMessage = await stream.finalMessage()
// finalMessage.content[0].text — complete text
// finalMessage.usage — token counts
```

### Streaming with async iterator (lower memory)

```ts
const stream = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello' }],
  stream: true,
})

for await (const event of stream) {
  if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
    process.stdout.write(event.delta.text)
  }
  // Cancel early: break from loop or stream.controller.abort()
}
```

### Tool use (function calling)

```ts
import { betaZodTool } from '@anthropic-ai/sdk/helpers/beta/zod'
import { z } from 'zod'

const weatherTool = betaZodTool({
  name: 'get_weather',
  description: 'Get current weather for a location',
  inputSchema: z.object({
    location: z.string(),
    unit: z.enum(['celsius', 'fahrenheit']).default('celsius'),
  }),
  run: async (input) => {
    // Returns tool result — can be string or content blocks
    return `Weather in ${input.location}: 22°${input.unit === 'celsius' ? 'C' : 'F'}, sunny`
  },
})

const result = await anthropic.beta.messages.toolRunner({
  model: 'claude-opus-4-6',
  max_tokens: 1000,
  messages: [{ role: 'user', content: 'What is the weather in Tokyo?' }],
  tools: [weatherTool],
})
// Automatically handles tool call → tool result → final response loop
console.log(result.content)
```

### Manual tool use (without toolRunner)

```ts
const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  tools: [
    {
      name: 'search_database',
      description: 'Search the product database',
      input_schema: {
        type: 'object' as const,
        properties: {
          query: { type: 'string', description: 'Search query' },
        },
        required: ['query'],
      },
    },
  ],
  messages: [{ role: 'user', content: 'Find red shoes under $100' }],
})

if (response.stop_reason === 'tool_use') {
  const toolUse = response.content.find(
    (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use'
  )
  if (toolUse) {
    const toolResult = await runSearch((toolUse.input as { query: string }).query)

    // Continue conversation with tool result
    const finalResponse = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [
        { role: 'user', content: 'Find red shoes under $100' },
        { role: 'assistant', content: response.content },
        {
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: toolUse.id,
              content: JSON.stringify(toolResult),
            },
          ],
        },
      ],
    })
  }
}
```

### Error handling

```ts
import Anthropic from '@anthropic-ai/sdk'

try {
  const msg = await client.messages.create({ ... })
} catch (err) {
  if (err instanceof Anthropic.APIError) {
    console.error(err.status)   // HTTP status code
    console.error(err.name)     // e.g. 'RateLimitError', 'AuthenticationError'
    console.error(err.message)
    console.error(err._request_id)  // for reporting to Anthropic support
  }
}
```

**Error types:** `BadRequestError` (400), `AuthenticationError` (401), `PermissionDeniedError` (403), `NotFoundError` (404), `RateLimitError` (429), `InternalServerError` (5xx), `APIConnectionError` (network)

### Using in Next.js App Router

```ts
// app/api/analyze/route.ts
import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const client = new Anthropic()   // singleton — create outside handler

export async function POST(req: NextRequest) {
  const { text } = await req.json()

  // Stream directly to client
  const stream = anthropic.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{ role: 'user', content: text }],
  })

  const readableStream = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          controller.enqueue(new TextEncoder().encode(event.delta.text))
        }
      }
      controller.close()
    },
  })

  return new Response(readableStream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
```

---

## 4. better-sqlite3

### Install

```bash
npm install better-sqlite3
npm install --save-dev @types/better-sqlite3
```

**Version:** 12.6.2 (Jan 2026)
**Requirements:** Node.js 14.21.1+ (prebuilt binaries available for LTS versions)

### Database setup — singleton pattern for Next.js

```ts
// lib/db.ts
import Database from 'better-sqlite3'
import path from 'path'

// Singleton — prevents multiple connections in dev (Next.js hot reload)
declare global {
  var __db: Database.Database | undefined
}

function createDb(): Database.Database {
  const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'app.db')
  const db = new Database(dbPath, {
    // verbose: console.log,  // uncomment to log all SQL
  })

  // WAL mode — essential for concurrent reads + single writer
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')
  db.pragma('synchronous = NORMAL')  // safe with WAL, faster than FULL

  return db
}

// In development, reuse across hot reloads
export const db: Database.Database =
  process.env.NODE_ENV === 'production'
    ? createDb()
    : (global.__db ??= createDb())

export default db
```

**Pitfall:** Without the singleton pattern, Next.js hot reloads in development will create a new database connection on every save, potentially hitting OS file descriptor limits.

### Schema migrations

```ts
// lib/migrations.ts
import db from './db'

export function runMigrations() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY NOT NULL,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY NOT NULL,
      user_id TEXT NOT NULL REFERENCES users(id),
      content TEXT NOT NULL,
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
  `)
}
```

### Prepared statement patterns

```ts
// lib/queries.ts
import db from './db'

// Prepare once — execute many times (performance critical)
const getUserById = db.prepare<[string], { id: string; email: string; name: string }>(
  'SELECT id, email, name FROM users WHERE id = ?'
)

const getUserByEmail = db.prepare<[string], { id: string; email: string }>(
  'SELECT id, email FROM users WHERE email = ?'
)

const insertUser = db.prepare<{ id: string; email: string; name: string }>(
  'INSERT INTO users (id, email, name) VALUES (@id, @email, @name)'
)

const updateUser = db.prepare<{ id: string; name: string }>(
  'UPDATE users SET name = @name WHERE id = @id'
)

const deleteUser = db.prepare<[string]>(
  'DELETE FROM users WHERE id = ?'
)

export const userQueries = {
  getById: (id: string) => getUserById.get(id),
  getByEmail: (email: string) => getUserByEmail.get(email),
  create: (user: { id: string; email: string; name: string }) =>
    insertUser.run(user),
  update: (id: string, name: string) => updateUser.run({ id, name }),
  delete: (id: string) => deleteUser.run(id),
}
```

### Transaction pattern

```ts
// lib/transactions.ts
import db from './db'

interface Message {
  id: string
  userId: string
  content: string
}

const insertMessage = db.prepare<Message>(
  'INSERT INTO messages (id, user_id, content) VALUES (@id, @userId, @content)'
)

const updateMessageCount = db.prepare<[string]>(
  'UPDATE users SET message_count = message_count + 1 WHERE id = ?'
)

// Wrap in transaction for atomicity
// better-sqlite3 transactions are SYNCHRONOUS — do not use async inside
export const saveMessage = db.transaction((msg: Message) => {
  insertMessage.run(msg)
  updateMessageCount.run(msg.userId)
  return msg
})

// Bulk insert — dramatically faster than individual inserts
export const bulkInsertMessages = db.transaction((messages: Message[]) => {
  for (const msg of messages) {
    insertMessage.run(msg)
  }
  return { count: messages.length }
})
```

### Using in Server Components and Route Handlers

```ts
// app/api/users/[id]/route.ts
import { userQueries } from '@/lib/queries'
import { NextRequest } from 'next/server'

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<'/api/users/[id]'>
) {
  const { id } = await ctx.params
  const user = userQueries.getById(id)

  if (!user) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }
  return Response.json(user)
}

export async function PATCH(
  req: NextRequest,
  ctx: RouteContext<'/api/users/[id]'>
) {
  const { id } = await ctx.params
  const { name } = await req.json()
  userQueries.update(id, name)
  return Response.json({ success: true })
}
```

```ts
// app/users/page.tsx — Server Component
import db from '@/lib/db'

export default async function UsersPage() {
  // Synchronous call is fine in Server Components
  const users = db.prepare('SELECT id, name FROM users ORDER BY created_at DESC LIMIT 50').all()
  return (
    <ul>
      {users.map((u: { id: string; name: string }) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  )
}
```

### Statement API reference

```ts
const stmt = db.prepare('SELECT * FROM users WHERE id = ? AND active = ?')

stmt.get(id, true)           // → single row object or undefined
stmt.all(id, true)           // → array of row objects
stmt.run(id, true)           // → { changes: number, lastInsertRowid: bigint }
stmt.iterate(id, true)       // → IterableIterator<row> — lazy, memory efficient

// Named parameters
const stmt2 = db.prepare('INSERT INTO users VALUES (@id, @name)')
stmt2.run({ id: '123', name: 'Alice' })

// Pragma
const journalMode = db.pragma('journal_mode', { simple: true })  // returns 'wal'
```

### Turbopack / Next.js 16 compatibility

`better-sqlite3` is a native Node.js addon (.node binary). It works fine in:
- Server Components
- Route Handlers
- Server Actions

It must NEVER be imported in Client Components (`'use client'`).

Add `server-only` as a guard to your db module:

```ts
// lib/db.ts
import 'server-only'   // throws build-time error if imported client-side
import Database from 'better-sqlite3'
// ...
```

If Turbopack incorrectly bundles it for the client, add a `resolveAlias` in `next.config.ts`:

```ts
turbopack: {
  resolveAlias: {
    'better-sqlite3': false,   // silences accidental client-side import
  },
}
```

---

## 5. Tailwind CSS v4

### Install (Next.js with PostCSS)

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

**Version:** v4.x (4.1+)
**No `tailwind.config.js` required** for basic setup.

### PostCSS config

```js
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
export default config
```

### CSS entry point

```css
/* app/globals.css */
@import "tailwindcss";

/* That's it for basic setup. No @tailwind base/components/utilities directives. */
```

### Theme customization — @theme directive (replaces tailwind.config.js)

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors — generates bg-*, text-*, border-*, etc. */
  --color-brand-50: oklch(0.97 0.01 240);
  --color-brand-500: oklch(0.55 0.18 240);
  --color-brand-900: oklch(0.25 0.09 240);

  /* Custom font families — generates font-* utilities */
  --font-display: "Inter", sans-serif;
  --font-body: "Georgia", serif;

  /* Breakpoints */
  --breakpoint-3xl: 120rem;

  /* Custom spacing */
  --spacing-18: 4.5rem;
  --spacing-128: 32rem;

  /* Border radius */
  --radius-card: 0.75rem;

  /* Custom animation */
  --animate-slide-in: slide-in 0.3s ease-out;

  @keyframes slide-in {
    from { transform: translateY(-10px); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
  }
}
```

### Theme overrides and resets

```css
@import "tailwindcss";

@theme {
  /* Override a default */
  --breakpoint-sm: 30rem;    /* instead of default 40rem */

  /* Remove ALL default colors and define custom palette */
  --color-*: initial;
  --color-white: #ffffff;
  --color-black: #000000;
  --color-primary: oklch(0.55 0.18 240);
  --color-secondary: oklch(0.74 0.17 40);
}
```

### CSS variable access

All `@theme` variables compile to CSS custom properties on `:root`:

```css
/* Use in custom CSS */
.custom-card {
  background: var(--color-brand-50);
  border-radius: var(--radius-card);
}

/* Use in arbitrary values */
.special {
  @apply rounded-[calc(var(--radius-card)+2px)];
}
```

```ts
// Access in JavaScript/TypeScript
const brandColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-brand-500')
  .trim()
```

### v3 → v4 migration comparison

| v3 (tailwind.config.js) | v4 (@theme in CSS) |
|---|---|
| `theme.extend.colors.brand` | `--color-brand-500: ...` |
| `theme.extend.fontFamily.display` | `--font-display: ...` |
| `theme.extend.spacing['18']` | `--spacing-18: 4.5rem` |
| `theme.screens.3xl` | `--breakpoint-3xl: 120rem` |
| `@tailwind base; @tailwind components; @tailwind utilities;` | `@import "tailwindcss"` |
| `postcss.config.js` with `tailwindcss: {}` | `postcss.config.mjs` with `"@tailwindcss/postcss": {}` |

### Dark mode

```css
@import "tailwindcss";

@theme {
  --color-background: oklch(1 0 0);         /* light */
  --color-foreground: oklch(0.1 0 0);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: oklch(0.1 0 0);     /* dark */
    --color-foreground: oklch(0.95 0 0);
  }
}
```

Or class-based dark mode (add `.dark` to `<html>`):

```css
.dark {
  --color-background: oklch(0.1 0 0);
  --color-foreground: oklch(0.95 0 0);
}
```

Then use: `bg-[--color-background]` or define CSS layer utilities.

---

## Compatibility Matrix

| Concern | Details |
|---|---|
| Next.js 16 + Tailwind v4 | Works via `@tailwindcss/postcss`. Turbopack processes PostCSS natively. |
| Next.js 16 + AI SDK 6 | `toUIMessageStreamResponse()` returns a standard Web Response — fully compatible with App Router route handlers. |
| Next.js 16 + @anthropic-ai/sdk | Server-only. Use in Route Handlers, Server Components, Server Actions. Never in Client Components. |
| Next.js 16 + better-sqlite3 | Server-only (native addon). Add `import 'server-only'` guard. Use singleton pattern to survive HMR. |
| AI SDK 6 + @anthropic-ai/sdk | Use one or the other per route; do not mix in the same call. AI SDK wraps @anthropic-ai/sdk internally when using `@ai-sdk/anthropic`. |
| better-sqlite3 + Server Actions | Synchronous API works without issues in Server Actions. Transactions are fully synchronous. |
| `use cache` + better-sqlite3 | Cache the helper function, not the route handler. SQLite calls inside `'use cache'` functions are fine at build time; at runtime depends on whether prerendering is enabled. |

---

## Full Stack Integration Example

```ts
// lib/db.ts
import 'server-only'
import Database from 'better-sqlite3'

declare global { var __db: Database.Database | undefined }

const db = process.env.NODE_ENV === 'production'
  ? (() => {
      const d = new Database('./data/app.db')
      d.pragma('journal_mode = WAL')
      d.pragma('foreign_keys = ON')
      return d
    })()
  : (global.__db ??= (() => {
      const d = new Database('./data/app.db')
      d.pragma('journal_mode = WAL')
      d.pragma('foreign_keys = ON')
      return d
    })())

export default db
```

```ts
// app/api/chat/route.ts
import { streamText, UIMessage, convertToModelMessages } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { cacheLife } from 'next/cache'
import db from '@/lib/db'

async function getUserContext(userId: string) {
  'use cache'
  cacheLife('minutes')
  return db.prepare('SELECT name, preferences FROM users WHERE id = ?').get(userId)
}

export async function POST(req: Request) {
  const { messages, userId }: { messages: UIMessage[]; userId: string } = await req.json()
  const userCtx = await getUserContext(userId)

  const result = streamText({
    model: anthropic('claude-sonnet-4-6'),
    system: `You are helping ${userCtx?.name ?? 'a user'}. Preferences: ${JSON.stringify(userCtx)}`,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
```

```tsx
// app/globals.css
@import "tailwindcss";
@theme {
  --color-brand-500: oklch(0.55 0.18 240);
  --font-sans: "Inter", sans-serif;
}
```

```ts
// next.config.ts
import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}
export default nextConfig
```

---

## Sources

- [Next.js 16 Blog Post](https://nextjs.org/blog/next-16)
- [Next.js use cache directive docs](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- [Next.js Route Handlers docs](https://nextjs.org/docs/app/getting-started/route-handlers)
- [Next.js Turbopack API Reference](https://nextjs.org/docs/app/api-reference/turbopack)
- [AI SDK Introduction](https://ai-sdk.dev/docs/introduction)
- [AI SDK Next.js App Router Guide](https://ai-sdk.dev/docs/getting-started/nextjs-app-router)
- [AI SDK Anthropic Provider](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic)
- [AI SDK 6 Release](https://vercel.com/blog/ai-sdk-6)
- [Anthropic TypeScript SDK](https://platform.claude.com/docs/en/api/sdks/typescript)
- [better-sqlite3 GitHub](https://github.com/WiseLibs/better-sqlite3)
- [better-sqlite3 API Reference](https://wchargin.com/better-sqlite3/api.html)
- [Tailwind CSS v4 Blog](https://tailwindcss.com/blog/tailwindcss-v4)
- [Tailwind CSS @theme docs](https://tailwindcss.com/docs/theme)
- [Tailwind CSS Next.js install guide](https://tailwindcss.com/docs/installation/framework-guides/nextjs)

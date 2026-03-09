name: "Autonomous Business Launcher - Next.js 16 Chat-First Application"
description: |
  Complete PRP for building a Next.js 16 application that discovers, plans, builds, and deploys
  autonomous businesses through a chat-first AI interface powered by Claude. Dual-mode operation:
  live marketplace search + AI idea generation, feeding into a PRP pipeline with human checkpoints
  and auto-deployment to Vercel.

---

## Goal

**Feature Goal**: Build a production-ready Next.js 16 chat-first application ("Autonomous Business Launcher") that enables users to discover autonomous business opportunities (via live API search or AI generation), create business PRPs, generate complete codebases, and auto-deploy to Vercel — all through a conversational AI interface with human approval checkpoints.

**Deliverable**: A fully functional Next.js 16 monolith application with:
- AI chat interface (Claude-powered, streaming)
- Dual-mode opportunity search (marketplace APIs + AI generation)
- PRP generation engine
- Code generation pipeline
- Vercel auto-deployment with checkpoints
- Knowledge base (10 Golden Rules, strategies, categories)
- SQLite-backed persistence
- Pipeline management view

**Success Definition**:
1. User can chat with AI to search for business opportunities from Empire Flippers and Product Hunt
2. User can ask AI to generate autonomous business ideas
3. Selected opportunities get converted into structured PRPs
4. PRPs can trigger code generation via Claude
5. Generated code can be deployed to Vercel with human approval at each gate
6. All 10 Golden Rules and strategies are browsable and injected into AI context
7. Full pipeline view shows status of all businesses (discovered → deployed → running)

---

## Why

**Business Value**: Enables rapid discovery and deployment of autonomous businesses by combining AI intelligence with automated execution. Reduces the time from "business idea" to "deployed and running" from weeks to hours.

**User Impact**: Founders/entrepreneurs get a single interface to search the global marketplace, evaluate opportunities, and launch businesses with AI-generated code — while maintaining human control at critical decision points.

---

## What

### User-Visible Behavior

1. **Chat Interface** (`/chat`) — Primary interaction surface
   - User types natural language requests ("Find me a SaaS in healthcare", "Generate ideas for passive income with $500 budget")
   - AI responds with search results as interactive cards, or generates tailored ideas
   - Inline PRP preview, code generation status, and deployment controls
   - Streaming responses via Vercel AI SDK

2. **Knowledge Base** (`/knowledge`) — Browsable reference
   - `/knowledge/rules` — The 10 Golden Rules of Autonomous Business
   - `/knowledge/strategies` — 50+ proven strategies by category
   - `/knowledge/categories` — Business taxonomy with autonomy scores
   - `/knowledge/sources` — Search source configurations and status

3. **Pipeline View** (`/pipeline`) — Business lifecycle tracking
   - Kanban board showing all businesses: Discovered → Selected → PRP Created → Generating → Deployed → Running
   - Click into any business for full details, PRP, deploy URL, health data

4. **Human Checkpoints** — 4 approval gates embedded in chat
   - Gate 1: Select opportunity from search results
   - Gate 2: Approve PRP before code generation
   - Gate 3: Approve generated code before deployment
   - Gate 4: Approve deployment to go live

---

## All Needed Context

### Architecture Reference

```yaml
design_document: "docs/plans/2026-03-09-autonomous-business-launcher-design.md"
  description: "Full approved design with database schema, project structure, chat flow, tech stack"
  critical_sections:
    - "Section 5: Project Structure" — exact file tree to implement
    - "Section 6: Database Schema" — 5 tables with full SQL
    - "Section 7: Chat Flow & Human Checkpoints" — interaction patterns
    - "Section 8: Tech Stack" — all versions and packages
```

### Tech Stack (Exact Versions)

```yaml
tech_stack:
  framework: "Next.js 16"
  node: ">=20.9"
  react: "19.2"
  typescript: "5.x"
  tailwind: "4"
  database: "better-sqlite3"
  ai_chat: "ai@6 + @ai-sdk/anthropic + @ai-sdk/react"
  ai_direct: "@anthropic-ai/sdk"
  deployment: "@vercel/sdk"
  id_generation: "nanoid"
  schema_validation: "zod"
```

### Library Documentation (MUST READ)

```yaml
ai_docs:
  nextjs16_stack:
    file: "PRPs/ai_docs/nextjs16_stack_patterns.md"
    critical_for: "Next.js 16 config, AI SDK 6 useChat/streamText patterns, better-sqlite3 singleton, Tailwind v4 @theme config"
    key_gotchas:
      - "AI SDK 6: use sendMessage() not handleSubmit(), use convertToModelMessages(), use toUIMessageStreamResponse()"
      - "AI SDK 6: messages use .parts array [{type:'text',text:'...'},{type:'tool-call',...}] not flat content"
      - "AI SDK 6: import useChat from @ai-sdk/react not from ai"
      - "better-sqlite3: MUST use singleton pattern with server-only guard for HMR safety"
      - "Tailwind v4: use @import 'tailwindcss' + @theme {} in CSS, NOT tailwind.config.js"
      - "Next.js 16: params and searchParams are async — use await"
      - "Next.js 16: use cache directive requires cacheComponents: true in next.config.ts"

  marketplace_apis:
    file: "PRPs/ai_docs/marketplace_apis.md"
    critical_for: "Empire Flippers, Product Hunt, Flippa, Harmonic.ai API integration"
    key_gotchas:
      - "Empire Flippers: NO auth needed for marketplace API, 1 req/sec rate limit"
      - "Empire Flippers: monetization filter uses || delimiter (e.g., SaaS||Affiliate)"
      - "Product Hunt: GraphQL API, needs OAuth2 token, 6250 complexity pts/15min"
      - "Harmonic.ai: uses apikey header (NOT Bearer), 10 req/sec"
      - "Flippa: API is gated, needs developer approval — implement as optional source"

  vercel_deployment:
    file: "PRPs/ai_docs/vercel_deployment_api.md"
    critical_for: "Programmatic project creation, code deployment, status monitoring"
    key_gotchas:
      - "Use @vercel/sdk npm package for TypeScript"
      - "Inline files use { file, data, encoding } format"
      - "SHA-based upload uses SHA-1 not SHA-256"
      - "target: 'production' assigns production aliases"
      - "upsert=true on env vars prevents 403 errors"
      - "Hobby plan: 100 deploys/day, 1 concurrent build"
      - "No webhooks for status — must poll GET /v13/deployments/{id}"
```

### External Documentation URLs

```yaml
documentation_urls:
  nextjs_16:
    blog: "https://nextjs.org/blog/next-16"
    app_router: "https://nextjs.org/docs/app"
    route_handlers: "https://nextjs.org/docs/app/getting-started/route-handlers"
    use_cache: "https://nextjs.org/docs/app/api-reference/directives/use-cache"
    upgrading: "https://nextjs.org/docs/app/guides/upgrading/version-16"

  ai_sdk:
    intro: "https://ai-sdk.dev/docs/introduction"
    nextjs_getting_started: "https://ai-sdk.dev/docs/getting-started/nextjs-app-router"
    anthropic_provider: "https://ai-sdk.dev/providers/ai-sdk-providers/anthropic"
    use_chat: "https://ai-sdk.dev/docs/ai-sdk-ui/chatbot"
    tool_calling: "https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling"

  anthropic_sdk:
    docs: "https://docs.anthropic.com/en/docs"
    typescript: "https://platform.claude.com/docs/en/api/sdks/typescript"

  vercel_api:
    rest_api: "https://vercel.com/docs/rest-api"
    create_deployment: "https://vercel.com/docs/rest-api/deployments/create-a-new-deployment"
    sdk: "https://github.com/vercel/sdk"
    limits: "https://vercel.com/docs/limits"

  tailwind_v4:
    docs: "https://tailwindcss.com/docs"
    theme: "https://tailwindcss.com/docs/theme"

  empire_flippers_api: "https://empireflippers.com/marketplace-api/"
  product_hunt_api: "https://api.producthunt.com/v2/docs"
```

### The 10 Golden Rules (Embedded in App)

```yaml
golden_rules:
  1_governance_first:
    rule: "Define action boundaries, permissions, and human checkpoints before anything runs autonomously"
    implementation: "4 human approval gates in chat flow, audit trail in SQLite"
    source: "Singapore Model AI Governance Framework for Agentic AI (2026)"

  2_zero_waste:
    rule: "Zero waste, zero defects, zero downtime"
    implementation: "Validation loops at every stage, error handling, health monitoring"
    source: "World Class Manufacturing methodology"

  3_agentic_constitution:
    rule: "Every autonomous business needs a constitution defining what AI can and cannot do"
    implementation: "PRP includes explicit capability boundaries for each generated business"
    source: "CIO - Agentic Constitution framework"

  4_human_in_loop:
    rule: "Autonomous for routine, human approval for high-stakes/irreversible actions"
    implementation: "ApprovalGate component, all deployments require human click"

  5_build_systems:
    rule: "Build systems, not tasks — own AI systems for passive income"
    implementation: "Each business is a deployable system, not a one-off task"

  6_validation_loops:
    rule: "Every autonomous action must be verifiable and auditable"
    implementation: "Execution logs, checkpoint history, deploy status tracking"

  7_progressive_autonomy:
    rule: "Start manual, automate incrementally, validate at each level"
    implementation: "Phased deployment: manual review → semi-auto → monitored auto"

  8_multi_revenue:
    rule: "Don't depend on one income source"
    implementation: "Pipeline supports multiple concurrent businesses"

  9_api_first:
    rule: "Everything connected, everything automatable"
    implementation: "All features exposed as API routes, JSON data formats"

  10_fractal_organization:
    rule: "Each business unit mirrors the whole, operates independently"
    implementation: "Each deployed business is self-contained with its own monitoring"
```

### Business Categories (Embedded in App)

```yaml
categories:
  digital_products:
    autonomy_score: 9
    examples: ["Templates", "Courses", "Prompt libraries", "AI-generated assets"]
    revenue_model: "One-time + subscription"
    typical_monthly: "$500-$50,000"

  ai_as_a_service:
    autonomy_score: 8
    examples: ["Custom AI agents", "Workflow automation", "AI consulting platforms"]
    revenue_model: "Usage-based + subscription"
    typical_monthly: "$1,000-$100,000"

  content_automation:
    autonomy_score: 8
    examples: ["AI YouTube channels", "Newsletters", "Affiliate sites", "Blog networks"]
    revenue_model: "Advertising + affiliate + sponsorship"
    typical_monthly: "$200-$20,000"

  saas_micro_saas:
    autonomy_score: 8
    examples: ["Niche tools", "API services", "Developer tools", "Vertical SaaS"]
    revenue_model: "Subscription (MRR)"
    typical_monthly: "$500-$200,000"

  marketplace_platform:
    autonomy_score: 7
    examples: ["B2B directories", "Niche marketplaces", "Service platforms"]
    revenue_model: "Commission + listing fees + subscription"
    typical_monthly: "$1,000-$50,000"

  ecommerce:
    autonomy_score: 6
    examples: ["Print-on-demand", "Dropshipping", "Digital downloads"]
    revenue_model: "Product margin"
    typical_monthly: "$500-$30,000"

  ai_trading_finance:
    autonomy_score: 6
    examples: ["Algorithmic trading", "Robo-advisory", "Financial analytics"]
    revenue_model: "Performance fees + subscription"
    typical_monthly: "Variable"
```

---

## Implementation Blueprint

### Environment Variables Required

```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-...          # Claude API key (required)
VERCEL_TOKEN=...                       # Vercel deployment token (required for deploy)
VERCEL_TEAM_ID=...                     # Optional: Vercel team ID
EMPIRE_FLIPPERS_API_KEY=...            # Optional: for valuation tool
PRODUCT_HUNT_CLIENT_ID=...             # Optional: for Product Hunt search
PRODUCT_HUNT_CLIENT_SECRET=...         # Optional: for Product Hunt search
HARMONIC_API_KEY=...                   # Optional: for Harmonic.ai search
```

### Task 1: Project Scaffolding & Configuration

**Dependencies**: None
**Files to create/modify**: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `app/globals.css`, `.env.local.example`, `.gitignore`

```bash
npx create-next-app@latest autonomous-biz --typescript --tailwind --eslint --app --turbopack --no-src-dir
cd autonomous-biz
npm install ai @ai-sdk/react @ai-sdk/anthropic @anthropic-ai/sdk better-sqlite3 @vercel/sdk nanoid zod
npm install -D @types/better-sqlite3
```

**next.config.ts:**
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ['better-sqlite3'],
}
export default nextConfig
```

**postcss.config.mjs:**
```javascript
export default {
  plugins: { "@tailwindcss/postcss": {} },
}
```

**app/globals.css:**
```css
@import "tailwindcss";

@theme {
  --color-brand-50: oklch(0.97 0.01 250);
  --color-brand-100: oklch(0.93 0.03 250);
  --color-brand-500: oklch(0.55 0.18 250);
  --color-brand-600: oklch(0.48 0.18 250);
  --color-brand-900: oklch(0.25 0.09 250);
  --color-surface: oklch(0.98 0.005 250);
  --color-surface-dark: oklch(0.15 0.02 250);
  --color-success: oklch(0.65 0.15 145);
  --color-warning: oklch(0.75 0.15 85);
  --color-danger: oklch(0.60 0.20 25);
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
}
```

### Task 2: SQLite Database Layer

**Dependencies**: Task 1
**Files to create**: `lib/db/index.ts`, `lib/db/schema.sql`, `lib/db/queries.ts`
**Reference**: `PRPs/ai_docs/nextjs16_stack_patterns.md` (better-sqlite3 singleton pattern)

**lib/db/index.ts** — Singleton with WAL mode:
```typescript
import 'server-only'
import Database from 'better-sqlite3'
import { readFileSync } from 'fs'
import { join } from 'path'

declare global { var __db: Database.Database | undefined }

function createDb() {
  const db = new Database(join(process.cwd(), 'data', 'autonomous-biz.db'))
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')
  db.pragma('synchronous = NORMAL')

  // Run schema migration
  const schema = readFileSync(join(process.cwd(), 'lib', 'db', 'schema.sql'), 'utf-8')
  db.exec(schema)

  return db
}

export const db =
  process.env.NODE_ENV === 'production'
    ? createDb()
    : (global.__db ??= createDb())
```

**lib/db/schema.sql** — Full schema from design document:
```sql
CREATE TABLE IF NOT EXISTS opportunities (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  estimated_revenue TEXT,
  estimated_cost TEXT,
  autonomy_score INTEGER,
  url TEXT,
  raw_data TEXT,
  status TEXT DEFAULT 'discovered',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS prps (
  id TEXT PRIMARY KEY,
  opportunity_id TEXT REFERENCES opportunities(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  template_used TEXT,
  validation_status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS executions (
  id TEXT PRIMARY KEY,
  prp_id TEXT REFERENCES prps(id),
  status TEXT DEFAULT 'pending',
  generated_code TEXT,
  deploy_url TEXT,
  checkpoints TEXT,
  logs TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS monitors (
  id TEXT PRIMARY KEY,
  execution_id TEXT REFERENCES executions(id),
  name TEXT NOT NULL,
  deploy_url TEXT,
  status TEXT DEFAULT 'active',
  last_check TEXT,
  health_data TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
```

**lib/db/queries.ts** — Typed query helpers using prepared statements for all CRUD operations on each table. Use `nanoid()` for ID generation. Return typed results.

### Task 3: Data Layer — Knowledge Base JSON Files

**Dependencies**: Task 1
**Files to create**: `data/rules.json`, `data/strategies.json`, `data/categories.json`, `data/sources.json`, `data/prp-templates/*.json`
**Also create**: `lib/knowledge/rules.ts`, `lib/knowledge/strategies.ts`, `lib/knowledge/categories.ts`

Each JSON file contains the structured data from the "All Needed Context" section above. The TypeScript modules in `lib/knowledge/` export typed access functions that read and parse these files.

**data/rules.json** — Array of 10 rules, each with: `id`, `number`, `title`, `description`, `implementation`, `source`, `subRules[]` (array of specific actionable sub-rules).

**data/strategies.json** — Array of 50+ strategies organized by category, each with: `id`, `category`, `title`, `description`, `automationLevel`, `tools`, `estimatedRevenue`, `difficulty`.

**data/categories.json** — The 7 categories from the design with: `id`, `name`, `autonomyScore`, `examples[]`, `revenueModel`, `typicalMonthly`.

**data/sources.json** — Configuration for each search source: `id`, `name`, `type`, `baseUrl`, `authMethod`, `rateLimit`, `enabled`, `requiredEnvVars[]`.

### Task 4: Root Layout & Navigation

**Dependencies**: Task 1
**Files to create**: `app/layout.tsx`, `app/page.tsx`, `components/Sidebar.tsx`

**app/layout.tsx** — Root layout with dark sidebar navigation:
- Sidebar with links: Chat (primary), Knowledge, Pipeline
- Knowledge sub-nav: Rules, Strategies, Categories, Sources
- Main content area with proper responsive behavior
- Import globals.css, set Inter font
- Use Tailwind v4 classes throughout

**app/page.tsx** — Redirect to `/chat`

### Task 5: Chat Interface (Core Feature)

**Dependencies**: Tasks 2, 3, 4
**Files to create**: `app/chat/page.tsx`, `components/chat/ChatInterface.tsx`, `components/chat/MessageBubble.tsx`, `components/chat/OpportunityCard.tsx`, `components/chat/PRPPreview.tsx`, `components/chat/ApprovalGate.tsx`
**Reference**: `PRPs/ai_docs/nextjs16_stack_patterns.md` (AI SDK 6 useChat pattern)

**app/chat/page.tsx** — Server component wrapper, loads chat history from SQLite.

**components/chat/ChatInterface.tsx** — Client component ('use client'):
```typescript
// CRITICAL: AI SDK 6 patterns
import { useChat } from '@ai-sdk/react'

// Use sendMessage() not handleSubmit()
// Messages have .parts array: [{type:'text',text:'...'},{type:'tool-call',...}]
// Status: "ready" | "submitted" | "streaming" | "error"
```

Key behaviors:
- Streaming chat with auto-scroll
- Render different message types: text, opportunity cards, PRP preview, approval gates
- Parse tool call results to render rich components inline
- Input area with send button, supports Enter to submit
- Loading states during search/generation

**components/chat/OpportunityCard.tsx** — Displays a business opportunity:
- Title, source badge (Empire Flippers / AI Generated / Product Hunt)
- Key metrics: revenue, price, autonomy score
- Category tag, description excerpt
- "Select this opportunity" button → triggers PRP creation

**components/chat/PRPPreview.tsx** — Renders PRP markdown:
- Collapsible sections for Goal, Why, What, Blueprint
- Syntax-highlighted code blocks
- Action buttons: Approve / Edit / Cancel

**components/chat/ApprovalGate.tsx** — Human checkpoint UI:
- Gate name and description
- Action buttons with appropriate colors (green=approve, yellow=edit, red=cancel)
- Shows what happens next if approved

### Task 6: Chat API Route with Tool Calling

**Dependencies**: Tasks 2, 3, 5
**Files to create**: `app/api/chat/route.ts`, `lib/ai/claude.ts`, `lib/ai/prompts.ts`
**Reference**: `PRPs/ai_docs/nextjs16_stack_patterns.md` (AI SDK 6 streamText + tools pattern)

**app/api/chat/route.ts:**
```typescript
import { streamText, UIMessage, convertToModelMessages, tool } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { z } from 'zod'

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: anthropic('claude-sonnet-4-6'),
    system: SYSTEM_PROMPT, // from lib/ai/prompts.ts — includes rules, categories, instructions
    messages: await convertToModelMessages(messages),
    tools: {
      searchMarketplace: tool({
        description: 'Search Empire Flippers and other marketplaces for business opportunities',
        inputSchema: z.object({
          query: z.string().optional(),
          monetizations: z.string().optional(),
          priceFrom: z.number().optional(),
          priceTo: z.number().optional(),
        }),
        execute: async (params) => { /* calls lib/search/empire-flippers.ts */ },
      }),
      generateIdeas: tool({
        description: 'Generate AI-powered autonomous business ideas based on criteria',
        inputSchema: z.object({
          niche: z.string().optional(),
          budget: z.number().optional(),
          skills: z.array(z.string()).optional(),
          autonomyLevel: z.number().min(1).max(10).optional(),
        }),
        execute: async (params) => { /* calls lib/search/ai-ideas.ts */ },
      }),
      createPRP: tool({
        description: 'Create a PRP (Product Requirement Prompt) for a selected business opportunity',
        inputSchema: z.object({
          opportunityId: z.string(),
        }),
        execute: async ({ opportunityId }) => { /* calls lib/ai/prp-generator.ts */ },
      }),
      generateCode: tool({
        description: 'Generate a complete project codebase from an approved PRP',
        inputSchema: z.object({
          prpId: z.string(),
        }),
        execute: async ({ prpId }) => { /* calls lib/deployer/code-generator.ts */ },
      }),
      deployToVercel: tool({
        description: 'Deploy generated code to Vercel',
        inputSchema: z.object({
          executionId: z.string(),
        }),
        execute: async ({ executionId }) => { /* calls lib/deployer/vercel.ts */ },
      }),
    },
    maxSteps: 5,
  })

  return result.toUIMessageStreamResponse()
}
```

**lib/ai/prompts.ts** — System prompt that includes:
- The 10 Golden Rules (loaded from data/rules.json)
- Business categories with autonomy scores
- Instructions for when to use each tool
- PRP structure format
- Checkpoint protocol (always ask for approval before irreversible actions)

### Task 7: Search & Discovery APIs

**Dependencies**: Tasks 2, 3
**Files to create**: `lib/search/empire-flippers.ts`, `lib/search/web-search.ts`, `lib/search/ai-ideas.ts`, `app/api/search/marketplace/route.ts`, `app/api/search/ai-generate/route.ts`
**Reference**: `PRPs/ai_docs/marketplace_apis.md`

**lib/search/empire-flippers.ts:**
- `searchListings(params)` — calls EF API `/listings/list`, no auth needed
- `getConfig()` — fetches available niches/monetization types from `/ef-config`
- `getRecommendations(id)` — similar listings
- Maps EF response to normalized `Opportunity` type
- Rate limiting: 1 req/sec (use simple delay)

**lib/search/ai-ideas.ts:**
- Takes user criteria (niche, budget, skills, autonomy level)
- Uses `@anthropic-ai/sdk` directly to generate ideas (not via AI SDK, since this is a batch call)
- Returns array of `Opportunity` objects with `source: 'ai-generated'`
- Includes the categories and strategies from knowledge base in the prompt context

**app/api/search/marketplace/route.ts** — REST endpoint for direct search (used by knowledge/sources page).
**app/api/search/ai-generate/route.ts** — REST endpoint for AI idea generation.

### Task 8: PRP Generation Engine

**Dependencies**: Tasks 2, 3, 6
**Files to create**: `lib/ai/prp-generator.ts`, `data/prp-templates/saas.json`, `data/prp-templates/digital-product.json`, `data/prp-templates/content-automation.json`, `data/prp-templates/ecommerce.json`, `data/prp-templates/marketplace.json`, `app/api/prp/create/route.ts`, `app/api/prp/[id]/route.ts`

**lib/ai/prp-generator.ts:**
- `generatePRP(opportunity: Opportunity): Promise<PRP>`
- Loads matching category template from `data/prp-templates/`
- Injects opportunity data, golden rules as constraints
- Uses Claude (`@anthropic-ai/sdk`) to generate comprehensive PRP markdown
- Saves to `prps` table with link to opportunity
- Returns structured PRP with sections: Goal, Why, What, Context, Blueprint, Validation

**PRP templates** — Each `data/prp-templates/*.json` contains:
- `category` — matches categories.json
- `sections` — pre-filled template sections for that business type
- `techStack` — recommended technology for that category
- `validationGates` — category-specific validation commands
- `commonPitfalls` — known issues for that business type

### Task 9: Code Generation Pipeline

**Dependencies**: Tasks 2, 8
**Files to create**: `lib/deployer/code-generator.ts`, `app/api/execute/generate/route.ts`

**lib/deployer/code-generator.ts:**
- `generateProject(prp: PRP): Promise<GeneratedProject>`
- Uses Claude (`@anthropic-ai/sdk`) with extended context to generate a full project
- Generates: `package.json`, `next.config.ts`, app router pages, API routes, components, styles
- Returns file tree as `Array<{ path: string, content: string }>`
- Stores generated code in `executions` table as JSON
- Updates execution status: `pending` → `generating` → `awaiting_approval`

### Task 10: Vercel Auto-Deployment

**Dependencies**: Tasks 2, 9
**Files to create**: `lib/deployer/vercel.ts`, `lib/deployer/checkpoints.ts`, `app/api/execute/deploy/route.ts`, `app/api/execute/approve/route.ts`
**Reference**: `PRPs/ai_docs/vercel_deployment_api.md`

**lib/deployer/vercel.ts:**
```typescript
import { Vercel } from '@vercel/sdk'

// createProject(name) — POST /v11/projects
// deployProject(name, files) — POST /v13/deployments with inline files
// getDeploymentStatus(id) — GET /v13/deployments/{id}, poll until READY
// setEnvVars(project, vars) — POST /v10/projects/{name}/env?upsert=true
// deleteProject(name) — DELETE /v9/projects/{name}
```

**lib/deployer/checkpoints.ts:**
- `createCheckpoint(executionId, gate, description)`
- `approveCheckpoint(executionId, gate)` — marks gate as approved, triggers next step
- `rejectCheckpoint(executionId, gate)` — marks as rejected, stops pipeline
- Stores checkpoint history in `executions.checkpoints` JSON field

**app/api/execute/approve/route.ts** — POST endpoint for human checkpoint approval:
- Validates execution exists and is in correct state
- Updates checkpoint status
- If gate 3 (code approved): triggers deployment
- If gate 4 (deploy approved): sets up monitoring
- Returns updated execution status

### Task 11: Knowledge Base Pages

**Dependencies**: Tasks 3, 4
**Files to create**: `app/knowledge/page.tsx`, `app/knowledge/rules/page.tsx`, `app/knowledge/strategies/page.tsx`, `app/knowledge/categories/page.tsx`, `app/knowledge/sources/page.tsx`, `components/knowledge/RuleCard.tsx`, `components/knowledge/StrategyCard.tsx`, `components/knowledge/CategoryTree.tsx`

All pages are Server Components reading from JSON files. Styled with Tailwind v4.

**RuleCard** — Expandable card showing rule number, title, description, implementation detail.
**StrategyCard** — Card with category badge, automation level indicator, revenue estimate.
**CategoryTree** — Hierarchical view of business categories with autonomy score visual indicators.

### Task 12: Pipeline Management View

**Dependencies**: Tasks 2, 4
**Files to create**: `app/pipeline/page.tsx`, `components/pipeline/PipelineBoard.tsx`, `components/pipeline/BusinessCard.tsx`

**PipelineBoard** — Kanban-style columns:
- Discovered | Selected | PRP Created | Generating | Deployed | Running
- Each column lists BusinessCards for that status
- Drag not required — status changes happen through chat or direct actions

**BusinessCard** — Summary card:
- Business title, category, source
- Status badge with color
- Key metrics (revenue, autonomy score)
- Quick actions: View PRP, View Deploy, Open Chat
- Click to expand full details

### Task 13: Monitoring System

**Dependencies**: Tasks 2, 10
**Files to create**: `lib/monitoring/health.ts`, `app/api/monitor/route.ts`

**lib/monitoring/health.ts:**
- `checkHealth(monitor)` — HTTP HEAD request to deploy URL, records status
- `getHealthHistory(monitorId)` — returns health check history from monitors table
- Basic uptime tracking: is the deployed site responding?

---

## Validation Loop

### Level 1: Syntax & Lint
```bash
npx tsc --noEmit
npx next lint
```

### Level 2: Build Verification
```bash
npm run build
# Verify: no build errors, all pages pre-render correctly
# Verify: better-sqlite3 works server-side, not bundled client-side
```

### Level 3: Integration Testing
```bash
npm run dev
# Test 1: Navigate to /chat — chat interface loads, can send message
# Test 2: Navigate to /knowledge/rules — all 10 rules display
# Test 3: Navigate to /knowledge/categories — all 7 categories display
# Test 4: Navigate to /pipeline — empty state renders
# Test 5: In chat, ask "Search for SaaS businesses" — should call Empire Flippers API
# Test 6: In chat, ask "Generate ideas for passive income" — should return AI ideas
# Test 7: Select an opportunity — should create PRP and show preview
# Test 8: Approve PRP — should trigger code generation
```

### Level 4: Deployment Verification
```bash
# Verify Vercel deployment works:
# 1. Set VERCEL_TOKEN in .env.local
# 2. In chat, complete full flow: search → select → PRP → generate → deploy
# 3. Verify deployed URL is accessible
# 4. Check /pipeline shows the deployed business
```

---

## Final Validation Checklist

- [ ] Next.js 16 app bootstrapped with App Router, TypeScript, Tailwind v4
- [ ] SQLite database initializes on first request with all 5 tables
- [ ] All 10 Golden Rules render on /knowledge/rules
- [ ] All 7 business categories render on /knowledge/categories
- [ ] 50+ strategies render on /knowledge/strategies
- [ ] Search sources configuration renders on /knowledge/sources
- [ ] Chat interface streams responses from Claude
- [ ] Chat tools work: searchMarketplace, generateIdeas, createPRP, generateCode, deployToVercel
- [ ] OpportunityCard renders inline in chat from search results
- [ ] PRPPreview renders inline in chat from PRP generation
- [ ] ApprovalGate renders with Approve/Edit/Cancel buttons
- [ ] 4 human checkpoints work in sequence
- [ ] Empire Flippers API returns real listings
- [ ] AI idea generation returns structured opportunities
- [ ] PRP generation creates valid markdown with all sections
- [ ] Code generation produces deployable project files
- [ ] Vercel deployment creates project and deploys successfully
- [ ] Pipeline board shows businesses in correct status columns
- [ ] All pages are responsive (mobile + desktop)
- [ ] No client-side imports of server-only modules (better-sqlite3)
- [ ] Environment variables documented in .env.local.example
- [ ] TypeScript compiles with no errors
- [ ] Next.js build succeeds with no errors

---

## Confidence Score: 8/10

**Strengths:**
- Extremely detailed tech stack documentation with exact code patterns
- All API endpoints documented with TypeScript examples
- Clear task dependency ordering
- Comprehensive validation checklist
- AI SDK 6 breaking changes documented (critical for success)

**Risks:**
- Flippa API access is gated (implement as optional)
- Code generation quality depends on Claude prompt engineering
- Vercel Hobby plan limits (100 deploys/day) may be constraining
- Full end-to-end flow is complex — incremental validation essential

# Autonomous Business Launcher - Design Document

**Date**: 2026-03-09
**Status**: Approved
**App**: Next.js 16 Monolith
**Interface**: Chat-first AI
**Database**: SQLite (local, file-based)
**Deploy Target**: Vercel

---

## 1. Vision

A Next.js 16 application that serves as both a **knowledge base** and **execution engine** for discovering, planning, building, and deploying autonomous businesses — all driven through a chat interface powered by Claude AI.

### Dual-Mode Operation

1. **Search Mode** — Live search across marketplace APIs (Empire Flippers, Flippa, Product Hunt, Harmonic.ai) + web scraping to find existing business opportunities
2. **Idea Mode** — Describe a niche/budget/skill and AI generates tailored autonomous business ideas

Both paths feed into the same PRP pipeline: **Search/Idea → Select → PRP → Generate Code → Deploy → Monitor**

---

## 2. The 10 Golden Rules of Autonomous Business

| # | Rule | Description |
|---|------|-------------|
| 1 | **Governance First** | Define action boundaries, permissions, and human checkpoints before anything runs autonomously |
| 2 | **Zero-Waste Mindset** | Zero waste, zero defects, zero downtime — borrowed from World Class Manufacturing |
| 3 | **Agentic Constitution** | Every autonomous business needs a "constitution" defining what AI can and cannot do |
| 4 | **Human-in-the-Loop for Irreversible Actions** | Autonomous for routine, human approval for high-stakes decisions |
| 5 | **Build Systems, Not Tasks** | The shift from "doing AI tasks" to "owning AI systems" is the key to passive income |
| 6 | **Validation Loops** | Every autonomous action must be verifiable and auditable |
| 7 | **Progressive Autonomy** | Start manual, automate incrementally, validate at each level |
| 8 | **Multi-Revenue Streams** | Don't depend on one income source |
| 9 | **API-First Architecture** | Everything connected, everything automatable |
| 10 | **Fractal Organization** | Each business unit mirrors the whole, can operate independently |

---

## 3. Business Categories & Autonomy Levels

| Category | Autonomy Level | Examples |
|----------|---------------|----------|
| **Digital Products** | Very High | Templates, courses, prompt libraries, AI-generated assets |
| **AI-as-a-Service (AIaaS)** | High | Custom AI agents, workflow automation for clients |
| **Content Automation** | High | AI YouTube channels, newsletters, affiliate sites |
| **SaaS / Micro-SaaS** | High | Niche tools with recurring revenue |
| **Marketplace/Platform** | Medium-High | Connecting buyers & sellers, taking commission |
| **E-commerce (POD/Dropship)** | Medium | Print-on-demand, automated fulfillment |
| **AI Trading/Finance** | Medium | Algorithmic trading, robo-advisory |

---

## 4. Best Sources for Opportunity Search

| Source | Type | API Available | Notes |
|--------|------|--------------|-------|
| Empire Flippers | Curated marketplace | Yes (Marketplace API + Valuation API) | Inc. 5000, highest quality listings |
| Flippa | Largest marketplace | Limited | 600K+ buyers, broad range |
| Acquire.com | SaaS/startup focused | Limited | Mandatory financial data verification |
| Harmonic.ai | Company database (30M+) | Yes (REST/GraphQL) | Best for discovery research |
| Y Combinator | Startup directory | Public listings | Trend indicator |
| Product Hunt | New product launches | Yes | Early-stage opportunity signals |
| Shopify Blog | Curated idea lists | N/A | Validated business models |

---

## 5. Project Structure

```
autonomous-biz/
├── app/
│   ├── layout.tsx                    ← Root layout with sidebar nav
│   ├── page.tsx                      ← Landing → redirects to /chat
│   ├── chat/
│   │   └── page.tsx                  ← Main AI chat interface
│   ├── knowledge/
│   │   ├── page.tsx                  ← Browse all rules/strategies/docs
│   │   ├── rules/page.tsx            ← The 10 Golden Rules
│   │   ├── strategies/page.tsx       ← Business strategies database
│   │   ├── categories/page.tsx       ← Business taxonomy browser
│   │   └── sources/page.tsx          ← Search source configs
│   ├── pipeline/
│   │   └── page.tsx                  ← View all businesses in pipeline
│   ├── api/
│   │   ├── chat/route.ts             ← Claude API streaming chat
│   │   ├── search/
│   │   │   ├── marketplace/route.ts  ← Empire Flippers, Flippa APIs
│   │   │   └── ai-generate/route.ts  ← AI opportunity generation
│   │   ├── prp/
│   │   │   ├── create/route.ts       ← PRP generation from opportunity
│   │   │   └── [id]/route.ts         ← Get/update specific PRP
│   │   ├── execute/
│   │   │   ├── generate/route.ts     ← Code generation via Claude
│   │   │   ├── deploy/route.ts       ← Vercel API deployment
│   │   │   └── approve/route.ts      ← Human checkpoint approval
│   │   └── monitor/
│   │       └── route.ts              ← Business health check
│   └── globals.css
├── components/
│   ├── chat/
│   │   ├── ChatInterface.tsx         ← Main chat with message stream
│   │   ├── MessageBubble.tsx         ← Individual messages
│   │   ├── OpportunityCard.tsx       ← Search result cards in chat
│   │   ├── PRPPreview.tsx            ← PRP preview inline in chat
│   │   └── ApprovalGate.tsx          ← Human checkpoint buttons
│   ├── knowledge/
│   │   ├── RuleCard.tsx
│   │   ├── StrategyCard.tsx
│   │   └── CategoryTree.tsx
│   └── pipeline/
│       ├── PipelineBoard.tsx         ← Kanban-style pipeline view
│       └── BusinessCard.tsx
├── lib/
│   ├── ai/
│   │   ├── claude.ts                 ← Claude API client (chat + generation)
│   │   ├── prompts.ts                ← System prompts for each mode
│   │   └── prp-generator.ts          ← PRP creation logic
│   ├── search/
│   │   ├── empire-flippers.ts        ← EF Marketplace API adapter
│   │   ├── web-search.ts             ← General web opportunity search
│   │   └── ai-ideas.ts              ← AI-powered idea generation
│   ├── deployer/
│   │   ├── vercel.ts                 ← Vercel API integration
│   │   ├── code-generator.ts         ← Project scaffolding
│   │   └── checkpoints.ts            ← Approval gate logic
│   ├── db/
│   │   ├── index.ts                  ← SQLite connection (better-sqlite3)
│   │   ├── schema.sql                ← Tables definition
│   │   └── queries.ts                ← Typed query helpers
│   └── knowledge/
│       ├── rules.ts                  ← Load & serve rules
│       ├── strategies.ts             ← Load & serve strategies
│       └── categories.ts             ← Business taxonomy
├── data/
│   ├── rules.json                    ← 10 Golden Rules with sub-rules
│   ├── strategies.json               ← 50+ proven strategies by category
│   ├── categories.json               ← Full business taxonomy
│   ├── sources.json                  ← API configs for search sources
│   ├── prp-templates/                ← Category-specific PRP templates
│   │   ├── saas.json
│   │   ├── digital-product.json
│   │   ├── content-automation.json
│   │   ├── ecommerce.json
│   │   └── marketplace.json
│   └── knowledge/
│       ├── governance.md             ← Agentic AI governance guide
│       ├── business-models.md        ← Business model deep dives
│       ├── execution-playbooks.md    ← Step-by-step playbooks
│       ├── revenue-models.md         ← Pricing strategies, monetization
│       └── automation-stack.md       ← Best tools/APIs per layer
└── autonomous-biz.db                 ← SQLite database file
```

---

## 6. Database Schema

```sql
-- Opportunities (from search or AI-generated)
CREATE TABLE opportunities (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,            -- 'marketplace', 'ai-generated', 'manual'
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,                   -- from categories.json
  estimated_revenue TEXT,
  estimated_cost TEXT,
  autonomy_score INTEGER,          -- 1-10 how autonomous it can be
  url TEXT,                        -- source URL if from marketplace
  raw_data TEXT,                   -- full JSON from source
  status TEXT DEFAULT 'discovered', -- discovered, selected, prp_created, executing, deployed, running
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- PRPs generated for opportunities
CREATE TABLE prps (
  id TEXT PRIMARY KEY,
  opportunity_id TEXT REFERENCES opportunities(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,            -- full PRP markdown
  template_used TEXT,               -- which template was base
  validation_status TEXT,           -- pending, passed, failed
  created_at TEXT DEFAULT (datetime('now'))
);

-- Execution pipeline
CREATE TABLE executions (
  id TEXT PRIMARY KEY,
  prp_id TEXT REFERENCES prps(id),
  status TEXT DEFAULT 'pending',    -- pending, generating, awaiting_approval, deploying, deployed, failed
  generated_code TEXT,              -- path to generated project
  deploy_url TEXT,                  -- Vercel URL once deployed
  checkpoints TEXT,                 -- JSON array of approval gates
  logs TEXT,                        -- execution log
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Chat history
CREATE TABLE messages (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,                -- user, assistant, system
  content TEXT NOT NULL,
  metadata TEXT,                     -- JSON: linked opportunity_id, prp_id, etc.
  created_at TEXT DEFAULT (datetime('now'))
);

-- Business monitoring
CREATE TABLE monitors (
  id TEXT PRIMARY KEY,
  execution_id TEXT REFERENCES executions(id),
  name TEXT NOT NULL,
  deploy_url TEXT,
  status TEXT DEFAULT 'active',     -- active, paused, stopped
  last_check TEXT,
  health_data TEXT,                  -- JSON: uptime, errors, revenue
  created_at TEXT DEFAULT (datetime('now'))
);
```

---

## 7. Chat Flow & Human Checkpoints

```
User: "Find me a SaaS opportunity in healthcare"
  ↓
System: [Calls /api/search/marketplace + /api/search/ai-generate in parallel]
  ↓
Assistant: Shows OpportunityCards inline in chat
  ↓
User: "I like #3, the patient scheduling micro-SaaS"
  ↓
System: [Calls /api/prp/create with opportunity data]
  ↓
Assistant: Shows PRPPreview
  "Ready to generate the code? [Approve] [Edit] [Cancel]"     ← CHECKPOINT 1
  ↓
User: [Clicks Approve]
  ↓
System: [Calls /api/execute/generate - Claude generates full project]
  ↓
Assistant: Shows file tree + key decisions
  "Ready to deploy to Vercel? [Deploy] [Review Code] [Cancel]" ← CHECKPOINT 2
  ↓
User: [Clicks Deploy]
  ↓
System: [Calls /api/execute/deploy - Vercel API]
  ↓
Assistant: "Deployed! Live at https://your-app.vercel.app"
  "Monitoring set up. I'll alert you if anything needs attention."
```

### The 4 Human Checkpoints

| # | Gate | What Happens | User Action |
|---|------|-------------|-------------|
| 1 | **Select Opportunity** | Choose from search results or AI ideas | Click on preferred opportunity |
| 2 | **Approve PRP** | Review the full business plan | Approve / Edit / Cancel |
| 3 | **Approve Code** | Review generated codebase summary | Deploy / Review Code / Cancel |
| 4 | **Approve Deploy** | Final go/no-go before going live | Deploy / Cancel |

---

## 8. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router, Turbopack, React 19.2) | 16 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4 |
| Database | SQLite via `better-sqlite3` | latest |
| AI | Claude API via `@anthropic-ai/sdk` | latest |
| Chat Streaming | Vercel AI SDK (`ai` package) | latest |
| Deployment | Vercel API for auto-deploy | latest |
| Search APIs | Empire Flippers Marketplace API, web adapters | — |
| State | React 19.2 built-in (no external state lib) | — |

---

## 9. Key AI System Prompts

### Chat System Prompt

The chat AI has access to:
- All 10 Golden Rules (injected as context)
- Business category taxonomy
- Strategy database
- Search tool functions
- PRP generation capabilities
- Code generation and deployment functions

### PRP Generator Prompt

When generating a PRP, the system:
1. Loads the matching category template (e.g., `saas.json`)
2. Injects the opportunity data
3. Applies the 10 Golden Rules as constraints
4. Generates a full PRP following the framework structure:
   - Goal, Why, What
   - All Needed Context
   - Implementation Blueprint
   - Validation Loop (4 levels)

---

## 10. Governance & Safety

Based on Singapore's Model AI Governance Framework for Agentic AI (2026):

- **Action Space**: Clearly defined what the AI can and cannot do
- **Autonomy Level**: Progressive — starts with suggestions, escalates to execution with approval
- **Irreversible Action Protection**: All deployments, payments, and public actions require human approval
- **Audit Trail**: Every action logged in SQLite with timestamps
- **Kill Switch**: Any deployed business can be paused/stopped from the pipeline view

---

## 11. Implementation Phases

### Phase 1: Foundation
- Next.js 16 project setup with Tailwind CSS 4
- SQLite database with schema
- Basic chat interface with Claude API streaming
- Knowledge pages (rules, strategies, categories)

### Phase 2: Search & Discovery
- Empire Flippers API integration
- Web search adapters
- AI idea generation
- Opportunity cards in chat

### Phase 3: PRP Pipeline
- PRP template system
- PRP generation from opportunities
- PRP preview in chat
- Human approval gates

### Phase 4: Code Generation & Deployment
- Claude-powered code generation
- Vercel API auto-deployment
- Deployment checkpoints
- Post-deploy monitoring

### Phase 5: Monitoring & Optimization
- Business health dashboard
- Revenue tracking
- Automated alerts
- Performance optimization suggestions

---

## Sources & References

- [Agentic AI Governance - Mayer Brown](https://www.mayerbrown.com/en/insights/publications/2026/02/governance-of-agentic-artificial-intelligence-systems)
- [Agentic AI Strategy - Deloitte](https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2026/agentic-ai-strategy.html)
- [Agentic Constitution for IT - CIO](https://www.cio.com/article/4118138/why-your-2026-it-strategy-needs-an-agentic-constitution.html)
- [AI in Business 2026 - ScrumLaunch](https://www.scrumlaunch.com/blog/ai-in-business-2026-trends-use-cases-and-real-world-implementation)
- [Rise of Autonomous AI - Decidr](https://www.decidr.ai/blog/2026-isn-t-waiting-how-agentic-ai-will-automate-your-business-before-you-re-ready)
- [AI Business Ideas - Shopify](https://www.shopify.com/blog/ai-business-ideas)
- [How to Make Money with AI - Shopify](https://www.shopify.com/blog/how-to-make-money-using-ai)
- [AI Passive Income 2026 - University Magazine](https://www.universitymagazine.ca/ai-passive-income-systems-2026-guide/)
- [Empire Flippers Marketplace API](https://empireflippers.com/marketplace-api/)
- [Holacracy - 18 Modern Frameworks](https://www.holacracy.org/blog/18-modern-frameworks-for-reinventing-management/)
- [Next.js 16 Features](https://nextjs.org/blog/next-16)
- [Next.js 16 - Makerkit](https://makerkit.dev/blog/tutorials/nextjs-16)
- [Singapore AGF Framework - Palo Alto Networks](https://www.paloaltonetworks.com/cyberpedia/what-is-agentic-ai-governance)
- [WEF - Agentic AI Rewriting Rules](https://www.weforum.org/stories/2026/01/how-agentic-physical-and-sovereign-ai-are-rewriting-the-rules-of-enterprise-innovation/)

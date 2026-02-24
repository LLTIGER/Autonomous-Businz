# Skills Master Catalog

> **Purpose**: Complete inventory of all installed skills, plugins, and commands. Use this document to auto-provision any new Claude Code agent with the full skill set.
>
> **Last Updated**: 2026-02-14
> **Total Skills**: 64 (community) + 21 (plugins) + 47 (project commands)

---

## How This System Works

1. **Skills** (`~/.claude/skills/`) - Community-installed via symlinks to `~/.agents/skills/`
2. **Plugins** (`~/.claude/plugins/`) - Official & marketplace plugins via `/plugin install`
3. **Project Commands** (`.claude/commands/`) - Custom slash commands in this repo

An agent reads this document, runs the install script, and gets the full capability set.

---

## PART 1: Community Skills (64 skills)

### Category: AI Image & Video Generation

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 1 | `nano-banana-pro` | Generate/edit images via Google Nano Banana Pro (Gemini 3 Pro Image) API. Text-to-image and image-to-image editing. | `npx @anthropic-ai/claude-code skill add nano-banana-pro` |
| 2 | `nano-banana-pro-prompts-recommend-skill` | Recommend prompts from 6000+ curated image generation prompts for Nano Banana Pro. | `npx @anthropic-ai/claude-code skill add nano-banana-pro-prompts-recommend-skill` |
| 3 | `flux-best-practices` | BFL FLUX image generation - prompting, T2I, I2I, structured JSON, hex colors, typography, multi-reference editing. | `npx @anthropic-ai/claude-code skill add flux-best-practices` |
| 4 | `midjourney-replicate-flux` | Midjourney-style image prompts optimized for FLUX 1.1 Pro on Replicate. Cinematic, editorial-quality aesthetics. | `npx @anthropic-ai/claude-code skill add midjourney-replicate-flux` |
| 5 | `seedream-image` | AI image generation via ByteDance Seedream 4.5. Text-to-image and style transfer. | `npx @anthropic-ai/claude-code skill add seedream-image` |
| 6 | `seedance` | AI video generation via BytePlus Seedance. Text-to-video and image-to-video. | `npx @anthropic-ai/claude-code skill add seedance` |
| 7 | `image-upscaling` | Upscale/enhance images with Real-ESRGAN, Thera, Topaz, FLUX Upscaler via inference.sh. | `npx @anthropic-ai/claude-code skill add image-upscaling` |
| 8 | `remotion-best-practices` | Video creation in React with Remotion. Animation, composition patterns. | `npx @anthropic-ai/claude-code skill add remotion-best-practices` |

### Category: Logo & Branding

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 9 | `logo-creator` | Create logos via AI image gen. Style discussion, variations, crop, bg removal, SVG export. | `npx @anthropic-ai/claude-code skill add logo-creator` |
| 10 | `logo-design-guide` | Logo design principles and AI image gen best practices. Types, prompting, scalability. | `npx @anthropic-ai/claude-code skill add logo-design-guide` |
| 11 | `favicon-gen` | Generate favicons from logos/text/brand colors. SVG, ICO, apple-touch-icon, manifest. | `npx @anthropic-ai/claude-code skill add favicon-gen` |
| 12 | `svg-icon-generator` | Auto-activating SVG icon generation from descriptions. | `npx @anthropic-ai/claude-code skill add svg-icon-generator` |

### Category: Typography & Fonts

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 13 | `typography` | Professional typography principles - type scales, font choice, spacing, dark mode, hierarchy. | `npx @anthropic-ai/claude-code skill add typography` |
| 14 | `typography-expert` | Master typographer - font pairing, OpenType features, variable fonts, performance optimization. | `npx @anthropic-ai/claude-code skill add typography-expert` |
| 15 | `web-typography` | Web typography framework from Jason Santa Maria. Typeface selection, scales, responsive, loading. | `npx @anthropic-ai/claude-code skill add web-typography` |
| 16 | `brand-typography-systems` | Brand typography selection, modular scale, font classification, WCAG accessibility, design tokens. | `npx @anthropic-ai/claude-code skill add brand-typography-systems` |
| 17 | `font-pairing-suggester` | Font combination recommendations. Google Fonts alternatives to premium with hierarchy examples. | `npx @anthropic-ai/claude-code skill add font-pairing-suggester` |

### Category: UI/UX Design & Components

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 18 | `ui-ux-pro-max` | UI/UX intelligence - 50 styles, 21 palettes, 50 font pairings, 9 stacks. Full design system. | `npx @anthropic-ai/claude-code skill add ui-ux-pro-max` |
| 19 | `ui-design-system` | React UI component systems with TailwindCSS + Radix + shadcn/ui. Design system architecture. | `npx @anthropic-ai/claude-code skill add ui-design-system` |
| 20 | `frontend-design` | Production-grade frontend interfaces. Creative, polished code avoiding generic AI aesthetics. | `npx @anthropic-ai/claude-code skill add frontend-design` |
| 21 | `web-design-guidelines` | Review UI code for Web Interface Guidelines compliance. Accessibility, UX audit. | `npx @anthropic-ai/claude-code skill add web-design-guidelines` |
| 22 | `icon-design` | Semantic icon selection for websites using Lucide, Heroicons, Phosphor. React/HTML templates. | `npx @anthropic-ai/claude-code skill add icon-design` |
| 23 | `better-icons` | CLI for searching 200+ icon libraries (Iconify). Search and retrieve SVGs. | `npx @anthropic-ai/claude-code skill add better-icons` |
| 24 | `mobile-touch` | iOS/Android gestures, haptic feedback, touch interactions, native mobile animations. | `npx @anthropic-ai/claude-code skill add mobile-touch` |
| 25 | `youtube-thumbnail-design` | YouTube thumbnail design - dimensions, contrast, mobile preview, safe zones, A/B testing. | `npx @anthropic-ai/claude-code skill add youtube-thumbnail-design` |

### Category: CSS & Layout

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 26 | `tailwind-design-system` | Scalable design systems with Tailwind CSS v4. Design tokens, component libraries, responsive. | `npx @anthropic-ai/claude-code skill add tailwind-design-system` |
| 27 | `tailwindcss-advanced-layouts` | Advanced CSS Grid and Flexbox layout patterns with Tailwind CSS. | `npx @anthropic-ai/claude-code skill add tailwindcss-advanced-layouts` |

### Category: React & Next.js

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 28 | `react-best-practices` | React patterns - hooks, effects, refs, component design, escape hatches, anti-patterns. | `npx @anthropic-ai/claude-code skill add react-best-practices` |
| 29 | `react-components` | Convert Stitch designs into modular Vite/React components with AST validation. | `npx @anthropic-ai/claude-code skill add react-components` |
| 30 | `nextjs-supabase-auth` | Supabase Auth + Next.js App Router integration. Login, middleware, protected routes. | `npx @anthropic-ai/claude-code skill add nextjs-supabase-auth` |
| 31 | `vercel-react-native-skills` | React Native and Expo best practices for performant mobile apps. | `npx @anthropic-ai/claude-code skill add vercel-react-native-skills` |

### Category: Flutter & Dart

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 32 | `flutter-expert` | Cross-platform Flutter 3+ and Dart. Riverpod/Bloc, GoRouter, platform-specific, performance. | `npx @anthropic-ai/claude-code skill add flutter-expert` |
| 33 | `flutter-adaptive-ui` | Adaptive/responsive Flutter UIs across all platforms and screen sizes. | `npx @anthropic-ai/claude-code skill add flutter-adaptive-ui` |
| 34 | `flutter-animations` | Flutter animation guide - implicit, explicit, hero, staggered, physics-based animations. | `npx @anthropic-ai/claude-code skill add flutter-animations` |
| 35 | `flutter-internationalization` | Flutter i18n with gen-l10n and intl. Multi-language, number/date formatting. | `npx @anthropic-ai/claude-code skill add flutter-internationalization` |
| 36 | `flutter-testing` | Flutter testing - unit, widget, integration tests. Mocking, debugging, build modes. | `npx @anthropic-ai/claude-code skill add flutter-testing` |

### Category: Backend & APIs

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 37 | `python-pro` | Python 3.14+ - type safety, async, pytest, dataclasses, mypy. Production-grade patterns. | `npx @anthropic-ai/claude-code skill add python-pro` |
| 38 | `nodejs-backend-patterns` | Production Node.js backends - Express/Fastify, middleware, auth, database, API design. | `npx @anthropic-ai/claude-code skill add nodejs-backend-patterns` |
| 39 | `better-auth-best-practices` | Better Auth TypeScript authentication framework integration. | `npx @anthropic-ai/claude-code skill add better-auth-best-practices` |

### Category: AI/ML & Replicate

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 40 | `replicate-cli` | Replicate CLI - run AI models, predictions, deployments, fine-tuning. | `npx @anthropic-ai/claude-code skill add replicate-cli` |
| 41 | `replicate-integration` | Replicate API integration - Flux, SDXL, LoRA model deployment. | `npx @anthropic-ai/claude-code skill add replicate-integration` |

### Category: Browser & Automation

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 42 | `agent-browser` | Browser automation for AI agents via inference.sh. Navigate, interact, screenshot, video. | `npx @anthropic-ai/claude-code skill add agent-browser` |
| 43 | `agent-tools` | 150+ AI apps via inference.sh CLI - FLUX, Veo, Gemini, Grok, Claude, Seedance, etc. | `npx @anthropic-ai/claude-code skill add agent-tools` |
| 44 | `agent-ui` | Batteries-included React/Next.js agent component from ui.inference.sh. | `npx @anthropic-ai/claude-code skill add agent-ui` |
| 45 | `browser-use` | Browser automation for web testing, form filling, screenshots, data extraction. | `npx @anthropic-ai/claude-code skill add browser-use` |

### Category: Content & Writing

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 46 | `human-writing` | Write natural, conversational content avoiding AI patterns and corporate speak. | `npx @anthropic-ai/claude-code skill add human-writing` |
| 47 | `humanizer-zh` | Remove AI-generated traces from Chinese text. Based on Wikipedia AI writing characteristics. | `npx @anthropic-ai/claude-code skill add humanizer-zh` |
| 48 | `social-content` | Social media content creation - LinkedIn, Twitter/X, Instagram, TikTok, Facebook strategies. | `npx @anthropic-ai/claude-code skill add social-content` |

### Category: SEO & Website Audit

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 49 | `seo-audit` | SEO audit - technical SEO, meta tags, on-page analysis, health check. | `npx @anthropic-ai/claude-code skill add seo-audit` |
| 50 | `audit-website` | Website audit - SEO, performance, security, 230+ rules, squirrelscan CLI. | `npx @anthropic-ai/claude-code skill add audit-website` |

### Category: Document & PDF

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 51 | `html-to-pdf` | HTML to PDF with pixel-perfect rendering and Hebrew/RTL support. | `npx @anthropic-ai/claude-code skill add html-to-pdf` |
| 52 | `markdown-to-pdf` | Markdown to professional PDF white papers in Apple design style. | `npx @anthropic-ai/claude-code skill add markdown-to-pdf` |
| 53 | `extracting-pdf-text` | Extract text from PDFs for RAG/analysis. API (Mistral OCR) and local (PyMuPDF). | `npx @anthropic-ai/claude-code skill add extracting-pdf-text` |

### Category: Business & Strategy

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 54 | `pricing-strategy` | Pricing decisions, packaging, monetization. Van Westendorp, tiers, freemium. | `npx @anthropic-ai/claude-code skill add pricing-strategy` |
| 55 | `finance-expert` | Financial systems, FinTech, banking, payments, financial technology. | `npx @anthropic-ai/claude-code skill add finance-expert` |

### Category: Diagrams & Visualization

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 56 | `eraser-diagrams` | Architecture diagrams from code/descriptions via Eraser API. | `npx @anthropic-ai/claude-code skill add eraser-diagrams` |

### Category: MCP & Integration

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 57 | `mcp-builder` | Guide for creating MCP servers. Python (FastMCP) and Node/TypeScript (MCP SDK). | `npx @anthropic-ai/claude-code skill add mcp-builder` |
| 58 | `api-bible-automation` | Automate API Bible tasks via Rube MCP (Composio). Requires MCP: rube. | `npx @anthropic-ai/claude-code skill add api-bible-automation` |

### Category: Agent Meta-Skills

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 59 | `proactive-agent` | Transform agents from task-followers to proactive partners. WAL Protocol, Working Buffer. | `npx @anthropic-ai/claude-code skill add proactive-agent` |
| 60 | `self-learning` | Autonomous skill generator - learn new tech from web, extract docs, create reusable skills. | `npx @anthropic-ai/claude-code skill add self-learning` |
| 61 | `skill-creator` | Guide for creating effective Claude Code skills. | `npx @anthropic-ai/claude-code skill add skill-creator` |
| 62 | `find-skills` | Discover and install agent skills from the ecosystem. | `npx @anthropic-ai/claude-code skill add find-skills` |

### Category: Music & Media

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 63 | `music-downloader` | Download audio from YouTube, SoundCloud, Spotify via yt-dlp and spotdl. | `npx @anthropic-ai/claude-code skill add music-downloader` |

### Category: AI Components

| # | Skill Name | Description | Install Command |
|---|-----------|-------------|-----------------|
| 64 | `ai-elements` | AI chat interface components library. shadcn/ui integration, Vercel AI SDK conventions. | `npx @anthropic-ai/claude-code skill add ai-elements` |

---

## PART 2: Official & Marketplace Plugins (21 plugins)

### Source: `claude-plugins-official` (anthropics/claude-plugins-official)

| # | Plugin Name | Type | Description |
|---|-----------|------|-------------|
| 1 | `context7` | MCP Integration | Up-to-date library documentation and code examples |
| 2 | `github` | MCP Integration | GitHub operations (PRs, issues, repos) |
| 3 | `typescript-lsp` | Code Intelligence | TypeScript language server protocol integration |
| 4 | `superpowers` | Dev Workflows | Enhanced agent capabilities - brainstorming, parallel agents, TDD, debugging |
| 5 | `playwright` | Browser Automation | Browser testing and automation |
| 6 | `commit-commands` | Git Workflows | Git commit, push, PR creation workflows |
| 7 | `serena` | Code Intelligence | Advanced code understanding |
| 8 | `pr-review-toolkit` | Code Review | Specialized PR review agents |
| 9 | `figma` | Design Integration | Figma design-to-code, component connection |
| 10 | `agent-sdk-dev` | Agent Development | Claude Agent SDK development tools |
| 11 | `vercel` | Deployment | Vercel deploy, logs, setup |
| 12 | `claude-code-setup` | Setup | Claude Code automation recommendations |
| 13 | `stripe` | Payments | Stripe error codes, test cards, best practices |
| 14 | `php-lsp` | Code Intelligence | PHP language server |
| 15 | `firebase` | Backend | Firebase MCP, real-time DB, cloud functions |
| 16 | `huggingface-skills` | ML/AI | Hugging Face Hub operations, model training |
| 17 | `kotlin-lsp` | Code Intelligence | Kotlin language server |
| 18 | `firecrawl` | Web Scraping | Web operations with Firecrawl |

### Source: `claude-code-plugins` (anthropics/claude-code)

| # | Plugin Name | Type | Description |
|---|-----------|------|-------------|
| 19 | `claude-opus-4-5-migration` | Migration | Migrate prompts/code between Claude model versions |
| 20 | `code-review` | Code Quality | Comprehensive code review |
| 21 | `frontend-design` | Design | Production-grade frontend interface generation |

### Install Plugins

```bash
# Add marketplaces
/plugin marketplace add anthropics/claude-plugins-official
/plugin marketplace add anthropics/claude-code

# Install all official plugins
/plugin install context7@claude-plugins-official
/plugin install github@claude-plugins-official
/plugin install typescript-lsp@claude-plugins-official
/plugin install superpowers@claude-plugins-official
/plugin install playwright@claude-plugins-official
/plugin install commit-commands@claude-plugins-official
/plugin install serena@claude-plugins-official
/plugin install pr-review-toolkit@claude-plugins-official
/plugin install figma@claude-plugins-official
/plugin install agent-sdk-dev@claude-plugins-official
/plugin install vercel@claude-plugins-official
/plugin install claude-code-setup@claude-plugins-official
/plugin install stripe@claude-plugins-official
/plugin install php-lsp@claude-plugins-official
/plugin install firebase@claude-plugins-official
/plugin install huggingface-skills@claude-plugins-official
/plugin install kotlin-lsp@claude-plugins-official
/plugin install firecrawl@claude-plugins-official

# Install demo marketplace plugins
/plugin install claude-opus-4-5-migration@claude-code-plugins
/plugin install code-review@claude-code-plugins
/plugin install commit-commands@claude-code-plugins
/plugin install frontend-design@claude-code-plugins
```

---

## PART 3: Project Commands (47 commands)

### PRP Core (11)
| Command | Path | Purpose |
|---------|------|---------|
| `/prp-base-create` | `prp-commands/prp-base-create.md` | Generate comprehensive PRPs with research |
| `/prp-base-execute` | `prp-commands/prp-base-execute.md` | Execute PRPs with 4-level validation |
| `/prp-planning-create` | `prp-commands/prp-planning-create.md` | Transform ideas into PRDs with diagrams |
| `/prp-spec-create` | `prp-commands/prp-spec-create.md` | Specification-driven PRPs |
| `/prp-spec-execute` | `prp-commands/prp-spec-execute.md` | Execute spec PRPs |
| `/prp-story-create` | `prp-commands/prp-story-create.md` | User story to PRP conversion |
| `/prp-story-execute` | `prp-commands/prp-story-execute.md` | Execute story PRPs |
| `/prp-task-create` | `prp-commands/prp-task-create.md` | Task-focused PRP creation |
| `/prp-task-execute` | `prp-commands/prp-task-execute.md` | Execute task PRPs |
| `/prp-ts-create` | `prp-commands/prp-ts-create.md` | TypeScript-specific PRP creation |
| `/prp-ts-execute` | `prp-commands/prp-ts-execute.md` | Execute TypeScript PRPs |

### Language-Specific (8)
| Command | Path | Purpose |
|---------|------|---------|
| `/TS-create-base-prp` | `typescript/TS-create-base-prp.md` | TypeScript PRP creation |
| `/TS-execute-base-prp` | `typescript/TS-execute-base-prp.md` | Execute TypeScript PRP |
| `/TS-review-general` | `typescript/TS-review-general.md` | TypeScript code review |
| `/TS-review-staged-unstaged` | `typescript/TS-review-staged-unstaged.md` | Review TS git changes |
| `/nextjs-create-base-prp` | `nextjs/nextjs-create-base-prp.md` | Next.js PRP creation |
| `/nextjs-execute-base-prp` | `nextjs/nextjs-execute-base-prp.md` | Execute Next.js PRP |
| `/flutter-create-base-prp` | `flutter/flutter-create-base-prp.md` | Flutter PRP creation |
| `/flutter-execute-base-prp` | `flutter/flutter-execute-base-prp.md` | Execute Flutter PRP |

### Development (6)
| Command | Path | Purpose |
|---------|------|---------|
| `/prime-core` | `development/prime-core.md` | Prime agent with project context |
| `/onboarding` | `development/onboarding.md` | Comprehensive developer onboarding |
| `/new-dev-branch` | `development/new-dev-branch.md` | Create development branch |
| `/debug-RCA` | `development/debug-RCA.md` | Root cause analysis debugging |
| `/smart-commit` | `development/smart-commit.md` | Intelligent git commits |
| `/create-pr` | `development/create-pr.md` | Create pull requests |

### Code Quality (3)
| Command | Path | Purpose |
|---------|------|---------|
| `/review-general` | `code-quality/review-general.md` | Comprehensive code review |
| `/review-staged-unstaged` | `code-quality/review-staged-unstaged.md` | Review git changes |
| `/refactor-simple` | `code-quality/refactor-simple.md` | Quick Python refactoring |

### Git Operations (3)
| Command | Path | Purpose |
|---------|------|---------|
| `/conflict-resolver-general` | `git-operations/conflict-resolver-general.md` | Intelligent merge conflict resolution |
| `/conflict-resolver-specific` | `git-operations/conflict-resolver-specific.md` | Strategy-based conflict resolution |
| `/smart-resolver` | `git-operations/smart-resolver.md` | Deep context-aware merge resolution |

### N8N (2)
| Command | Path | Purpose |
|---------|------|---------|
| `/n8n-create-base-prp` | `n8n/n8n-create-base-prp.md` | N8N workflow PRP creation |
| `/n8n-execute-base-prp` | `n8n/n8n-execute-base-prp.md` | Execute N8N PRP |

### Rapid Development (8)
| Command | Path | Purpose |
|---------|------|---------|
| `/create-base-prp-parallel` | `rapid-development/experimental/` | Parallel PRP creation |
| `/create-planning-parallel` | `rapid-development/experimental/` | Parallel planning docs |
| `/hackathon-prp-parallel` | `rapid-development/experimental/` | Fast-track hackathon PRPs |
| `/hackathon-research` | `rapid-development/experimental/` | Rapid hackathon research |
| `/parallel-prp-creation` | `rapid-development/experimental/` | General parallel PRPs |
| `/prp-analyze-run` | `rapid-development/experimental/` | Post-execution analysis |
| `/prp-validate` | `rapid-development/experimental/` | Pre-flight PRP validation |
| `/user-story-rapid` | `rapid-development/experimental/` | Rapid story-to-PRP |

### Other (6)
| Command | Path | Purpose |
|---------|------|---------|
| `/task-list-init` | `prp-commands/task-list-init.md` | Create task checklist |
| `/api-contract-define` | `prp-commands/api-contract-define.md` | API contract definition |
| `/prp-poc-create-parallel` | `prp-commands/prp-poc-create-parallel.md` | Parallel React POCs |
| `/prp-poc-execute-parallel` | `prp-commands/prp-poc-execute-parallel.md` | Execute parallel POCs |
| `/nexus-n8n-architect` | `agents/nexus-n8n-architect.md` | N8N workflow architect agent |

---

## PART 4: Settings Configuration

### Global Settings (`~/.claude/settings.json`)

```json
{
  "model": "opus",
  "enabledPlugins": {
    "context7@claude-plugins-official": true,
    "github@claude-plugins-official": true,
    "typescript-lsp@claude-plugins-official": true,
    "superpowers@claude-plugins-official": true,
    "playwright@claude-plugins-official": true,
    "commit-commands@claude-plugins-official": true,
    "serena@claude-plugins-official": true,
    "pr-review-toolkit@claude-plugins-official": true,
    "figma@claude-plugins-official": true,
    "agent-sdk-dev@claude-plugins-official": true,
    "vercel@claude-plugins-official": true,
    "claude-code-setup@claude-plugins-official": true,
    "stripe@claude-plugins-official": true,
    "php-lsp@claude-plugins-official": true,
    "firebase@claude-plugins-official": true,
    "huggingface-skills@claude-plugins-official": true,
    "kotlin-lsp@claude-plugins-official": true,
    "firecrawl@claude-plugins-official": true,
    "claude-opus-4-5-migration@claude-code-plugins": true,
    "code-review@claude-code-plugins": true,
    "commit-commands@claude-code-plugins": true,
    "frontend-design@claude-code-plugins": true
  },
  "autoUpdatesChannel": "latest",
  "skipDangerousModePermissionPrompt": true,
  "effortLevel": "medium"
}
```

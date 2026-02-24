# Skill-to-PRP Mapping Guide

> Maps which skills should be activated for each PRP template type and use case.
> When creating a PRP, reference this mapping to include relevant skills in the context section.

---

## How to Use This Mapping

When creating a new PRP, look up your PRP type below. Copy the relevant skill block into your PRP's context section:

```yaml
## Recommended Skills for This PRP
skills:
  - skill: "skill-name"
    when: "Specific scenario"
    invoke: "/skill-name" or auto-activated
```

---

## 1. NEXT.JS / WEB DEVELOPMENT PRPs

**Templates**: `prp_nextjs_enhanced.md`, `prp_base_typescript.md`, `prp_base.md`
**Commands**: `/nextjs-create-base-prp`, `/TS-create-base-prp`, `/prp-base-create`

### Design & UI Skills
| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `ui-ux-pro-max` | Layout planning, color palettes, font pairings, design system setup | Auto-activated on UI work |
| `ui-design-system` | shadcn/ui components, Radix UI, TailwindCSS theming, dark mode | Auto-activated on component work |
| `frontend-design` | Production-grade interfaces, avoiding generic AI aesthetics | Auto-activated on web pages |
| `tailwind-design-system` | Design tokens, Tailwind v4 configuration, responsive patterns | When using TailwindCSS |
| `tailwindcss-advanced-layouts` | Complex CSS Grid/Flexbox patterns | For advanced layouts |
| `web-design-guidelines` | UI review, accessibility audit, UX compliance | Post-implementation review |

### Typography Skills
| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `typography` | Type scales, font selection, spacing, hierarchy | When setting up fonts |
| `typography-expert` | Font pairing, variable fonts, OpenType, performance | Font optimization |
| `web-typography` | Responsive type, line height, measure, font loading | Web-specific typography |
| `brand-typography-systems` | Brand font selection, modular scale, design tokens | Brand identity work |
| `font-pairing-suggester` | Google Fonts alternatives, heading/body combinations | Quick font decisions |

### Icon & Visual Skills
| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `icon-design` | Semantic icon selection (Lucide, Heroicons, Phosphor) | Icon choosing |
| `better-icons` | Search 200+ icon libraries via CLI | `better-icons search <query>` |
| `svg-icon-generator` | Generate custom SVG icons | Auto-activated for SVG work |
| `favicon-gen` | Generate favicon set (SVG, ICO, apple-touch-icon) | Before deployment |
| `logo-creator` | Logo creation with AI image gen | Brand/logo tasks |

### React/Next.js Specific Skills
| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `react-best-practices` | Hooks, effects, refs, component patterns | **Always** for React code |
| `nextjs-supabase-auth` | Supabase auth integration with App Router | Auth implementation |
| `react-components` | Converting designs to React components | Design-to-code |
| `ai-elements` | AI chat interface components | AI features |

### Backend Skills
| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `nodejs-backend-patterns` | Express/Fastify APIs, middleware, error handling | API development |
| `better-auth-best-practices` | Better Auth TypeScript authentication | Auth setup |
| `mcp-builder` | Creating MCP servers | MCP integration |

### Content & SEO Skills
| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `seo-audit` | On-page SEO, meta tags, technical SEO | Pre-deployment |
| `audit-website` | Full website audit (230+ rules) | Post-deployment |
| `human-writing` | Natural copy, avoiding AI patterns | Content creation |

---

## 2. FLUTTER / MOBILE PRPs

**Templates**: `prp_flutter.md`
**Commands**: `/flutter-create-base-prp`, `/flutter-execute-base-prp`

### Core Flutter Skills
| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `flutter-expert` | **Always** - Riverpod/Bloc, GoRouter, platform-specific, performance | Auto-activated |
| `flutter-adaptive-ui` | Responsive layouts, multi-platform, foldables, input types | Responsive design |
| `flutter-animations` | Implicit, explicit, hero, staggered, physics animations | Adding motion |
| `flutter-internationalization` | gen-l10n, intl packages, locale detection, ARB files | i18n implementation |
| `flutter-testing` | Unit, widget, integration tests, mocking, debugging | Test writing |

### Design Skills (also relevant for mobile)
| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `mobile-touch` | Gestures, haptic feedback, touch interactions | Mobile UX |
| `ui-ux-pro-max` | Design system, color palettes, font pairings | UI planning |
| `icon-design` | Icon selection for mobile UI | Icon choosing |
| `typography` | Mobile typography, type scales | Font setup |

---

## 3. PYTHON / BACKEND PRPs

**Templates**: `prp_base.md`, `prp_spec.md`, `prp_task.md`
**Commands**: `/prp-base-create`, `/prp-spec-create`, `/prp-task-create`

### Core Python Skills
| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `python-pro` | **Always** - Type hints, async, pytest, dataclasses, mypy | Auto-activated on .py |

### API & Backend Skills
| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `nodejs-backend-patterns` | If Node.js backend | Auto-activated |
| `better-auth-best-practices` | Authentication implementation | Auth tasks |
| `mcp-builder` | Building MCP servers (Python FastMCP) | MCP development |

### Integration Skills
| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `replicate-cli` | Running AI models on Replicate | AI model integration |
| `replicate-integration` | Replicate API for Flux, SDXL, LoRA | Image generation |

---

## 4. FULLSTACK / CROSS-PLATFORM PRPs

**Templates**: `prp_fullstack.md`
**Commands**: `/prp-base-create`, `/api-contract-define`

### Use ALL skills from categories 1 + 2 + 3, plus:

| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `eraser-diagrams` | Architecture diagrams from code | System visualization |
| `finance-expert` | Financial systems, payments, FinTech | Financial features |
| `pricing-strategy` | Pricing tiers, packaging, monetization | Pricing features |

---

## 5. N8N / AUTOMATION PRPs

**Templates**: `prp_n8n_enhanced.md`
**Commands**: `/n8n-create-base-prp`, `/n8n-execute-base-prp`

| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `api-bible-automation` | API integration via Rube MCP | API automation |
| `mcp-builder` | Custom MCP servers for n8n | MCP integration |
| `browser-use` | Web automation within workflows | Web scraping nodes |

---

## 6. DESIGN-FIRST / CREATIVE PRPs

**Use Case**: Landing pages, marketing sites, brand work, UI prototyping
**Templates**: `prp_poc_react.md`, `prp_base.md`

### Visual Design Skills (PRIMARY)
| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `ui-ux-pro-max` | **Lead skill** - 50 styles, 21 palettes, full design system | Always |
| `frontend-design` | Production-grade, non-generic design | Always |
| `web-design-guidelines` | Compliance, accessibility, best practices | Review phase |

### Typography (CRITICAL for design)
| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `typography-expert` | **Lead** - Font pairing, OpenType, variable fonts | Always |
| `web-typography` | Responsive type, loading optimization | Implementation |
| `brand-typography-systems` | Brand identity typography, modular scale | Brand work |
| `font-pairing-suggester` | Quick font combination decisions | Start of project |

### Visual Assets
| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `logo-creator` | Logo generation with AI | Brand creation |
| `logo-design-guide` | Logo design principles | Logo projects |
| `favicon-gen` | Favicon generation | Pre-deployment |
| `svg-icon-generator` | Custom SVG icons | Icon needs |
| `better-icons` | Search icon libraries | Icon selection |
| `youtube-thumbnail-design` | YouTube thumbnails | Marketing content |

### AI Image Generation
| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `nano-banana-pro` | Image generation/editing (Gemini 3 Pro) | Hero images, product shots |
| `flux-best-practices` | FLUX model prompting | High-quality image gen |
| `midjourney-replicate-flux` | Midjourney-style prompts for FLUX | Cinematic images |
| `seedream-image` | ByteDance Seedream 4.5 | Alternative image gen |
| `image-upscaling` | Upscale/enhance images | Image quality |

### Animation & Video
| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `seedance` | AI video generation | Video content |
| `remotion-best-practices` | React video creation | Programmatic video |

### Content
| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `human-writing` | Natural, non-AI copy | All text content |
| `social-content` | Social media content | Marketing posts |

---

## 7. AGENT / META PRPs

**Use Case**: Building new agents, extending capabilities
**Templates**: `prp_base.md`

| Skill | When to Use | Invocation |
|-------|-------------|------------|
| `proactive-agent` | Agent behavior patterns, WAL Protocol | Agent architecture |
| `self-learning` | Learning new tech from web | Research phase |
| `skill-creator` | Creating new skills | Extending capabilities |
| `find-skills` | Discovering existing skills | Capability search |
| `agent-browser` | Browser automation for agents | Web interaction |
| `agent-tools` | 150+ AI apps via inference.sh | AI tool integration |
| `agent-ui` | React/Next.js agent components | Agent UI building |
| `browser-use` | Web testing and automation | Testing |

---

## Quick Reference: Skill Categories by PRP Type

| PRP Type | Design | Typography | React | Flutter | Python | Backend | AI/ML | Content | Agent |
|----------|--------|-----------|-------|---------|--------|---------|-------|---------|-------|
| Next.js | X | X | X | - | - | X | - | X | - |
| Flutter | X | X | - | X | - | - | - | - | - |
| Python | - | - | - | - | X | X | X | - | - |
| Fullstack | X | X | X | X | X | X | X | X | - |
| N8N | - | - | - | - | - | X | - | - | X |
| Design | X | X | X | - | - | - | X | X | - |
| Agent | - | - | - | - | - | - | X | - | X |
| POC/React | X | X | X | - | - | - | - | X | - |

# Agent Bootstrap Protocol

> **Purpose**: Read this document to self-provision a new Claude Code agent with the full skill set, plugins, commands, and design knowledge from the PRP framework.
>
> **For**: Any spawned agent, new project setup, or team member onboarding.

---

## Quick Start (3 Steps)

### Step 1: Add Marketplaces

Run these in Claude Code:

```
/plugin marketplace add anthropics/claude-plugins-official
/plugin marketplace add anthropics/claude-code
/plugin marketplace add anthropics/skills
```

### Step 2: Install All Plugins

```bash
# Code Intelligence
/plugin install context7@claude-plugins-official
/plugin install typescript-lsp@claude-plugins-official
/plugin install kotlin-lsp@claude-plugins-official
/plugin install php-lsp@claude-plugins-official
/plugin install serena@claude-plugins-official

# External Integrations
/plugin install github@claude-plugins-official
/plugin install figma@claude-plugins-official
/plugin install vercel@claude-plugins-official
/plugin install firebase@claude-plugins-official
/plugin install stripe@claude-plugins-official
/plugin install firecrawl@claude-plugins-official

# Development Workflows
/plugin install superpowers@claude-plugins-official
/plugin install playwright@claude-plugins-official
/plugin install commit-commands@claude-plugins-official
/plugin install pr-review-toolkit@claude-plugins-official
/plugin install agent-sdk-dev@claude-plugins-official
/plugin install claude-code-setup@claude-plugins-official
/plugin install huggingface-skills@claude-plugins-official

# Demo Marketplace Plugins
/plugin install claude-opus-4-5-migration@claude-code-plugins
/plugin install code-review@claude-code-plugins
/plugin install commit-commands@claude-code-plugins
/plugin install frontend-design@claude-code-plugins
```

### Step 3: Install Community Skills

Run the auto-install script:
```bash
bash skills-ecosystem/auto-install/install-all-skills.sh --all
```

Or install skills individually by category (see sections below).

---

## Skill Installation by Use Case

### I'm building a WEBSITE (Next.js / React)

```bash
# REQUIRED
npx @anthropic-ai/claude-code skill add react-best-practices
npx @anthropic-ai/claude-code skill add ui-ux-pro-max
npx @anthropic-ai/claude-code skill add ui-design-system
npx @anthropic-ai/claude-code skill add frontend-design
npx @anthropic-ai/claude-code skill add tailwind-design-system
npx @anthropic-ai/claude-code skill add typography
npx @anthropic-ai/claude-code skill add icon-design
npx @anthropic-ai/claude-code skill add better-icons
npx @anthropic-ai/claude-code skill add web-design-guidelines

# RECOMMENDED
npx @anthropic-ai/claude-code skill add nextjs-supabase-auth
npx @anthropic-ai/claude-code skill add typography-expert
npx @anthropic-ai/claude-code skill add web-typography
npx @anthropic-ai/claude-code skill add font-pairing-suggester
npx @anthropic-ai/claude-code skill add tailwindcss-advanced-layouts
npx @anthropic-ai/claude-code skill add favicon-gen
npx @anthropic-ai/claude-code skill add seo-audit
npx @anthropic-ai/claude-code skill add human-writing

# OPTIONAL (for image/visual content)
npx @anthropic-ai/claude-code skill add nano-banana-pro
npx @anthropic-ai/claude-code skill add flux-best-practices
npx @anthropic-ai/claude-code skill add image-upscaling
npx @anthropic-ai/claude-code skill add logo-creator
```

### I'm building a MOBILE APP (Flutter)

```bash
# REQUIRED
npx @anthropic-ai/claude-code skill add flutter-expert
npx @anthropic-ai/claude-code skill add flutter-adaptive-ui
npx @anthropic-ai/claude-code skill add flutter-animations
npx @anthropic-ai/claude-code skill add flutter-testing
npx @anthropic-ai/claude-code skill add flutter-internationalization
npx @anthropic-ai/claude-code skill add mobile-touch

# RECOMMENDED
npx @anthropic-ai/claude-code skill add ui-ux-pro-max
npx @anthropic-ai/claude-code skill add typography
npx @anthropic-ai/claude-code skill add icon-design
```

### I'm building a BACKEND (Python / Node.js)

```bash
# REQUIRED
npx @anthropic-ai/claude-code skill add python-pro
npx @anthropic-ai/claude-code skill add nodejs-backend-patterns

# RECOMMENDED
npx @anthropic-ai/claude-code skill add better-auth-best-practices
npx @anthropic-ai/claude-code skill add mcp-builder
```

### I'm DESIGNING (Creative / UI work)

```bash
# ALL DESIGN SKILLS
npx @anthropic-ai/claude-code skill add ui-ux-pro-max
npx @anthropic-ai/claude-code skill add frontend-design
npx @anthropic-ai/claude-code skill add web-design-guidelines
npx @anthropic-ai/claude-code skill add typography-expert
npx @anthropic-ai/claude-code skill add web-typography
npx @anthropic-ai/claude-code skill add brand-typography-systems
npx @anthropic-ai/claude-code skill add font-pairing-suggester
npx @anthropic-ai/claude-code skill add icon-design
npx @anthropic-ai/claude-code skill add better-icons
npx @anthropic-ai/claude-code skill add svg-icon-generator
npx @anthropic-ai/claude-code skill add logo-creator
npx @anthropic-ai/claude-code skill add logo-design-guide
npx @anthropic-ai/claude-code skill add favicon-gen
npx @anthropic-ai/claude-code skill add youtube-thumbnail-design
npx @anthropic-ai/claude-code skill add tailwind-design-system
npx @anthropic-ai/claude-code skill add tailwindcss-advanced-layouts

# IMAGE GENERATION
npx @anthropic-ai/claude-code skill add nano-banana-pro
npx @anthropic-ai/claude-code skill add flux-best-practices
npx @anthropic-ai/claude-code skill add midjourney-replicate-flux
npx @anthropic-ai/claude-code skill add seedream-image
npx @anthropic-ai/claude-code skill add image-upscaling

# CONTENT
npx @anthropic-ai/claude-code skill add human-writing
npx @anthropic-ai/claude-code skill add social-content
```

### I'm building AUTOMATIONS (N8N / Workflows)

```bash
npx @anthropic-ai/claude-code skill add mcp-builder
npx @anthropic-ai/claude-code skill add api-bible-automation
npx @anthropic-ai/claude-code skill add browser-use
npx @anthropic-ai/claude-code skill add agent-browser
npx @anthropic-ai/claude-code skill add agent-tools
```

---

## Copy Project Commands to New Project

To transfer the PRP command system to a new project:

```bash
# From the PRP framework root
cp -r .claude/commands/ /path/to/new/project/.claude/commands/
cp -r .claude/agents/ /path/to/new/project/.claude/agents/

# Or for selective copy (just the essentials)
mkdir -p /path/to/new/project/.claude/commands/{prp-commands,development,code-quality}
cp .claude/commands/prp-commands/prp-base-{create,execute}.md /path/to/new/project/.claude/commands/prp-commands/
cp .claude/commands/development/{prime-core,smart-commit,debug-RCA}.md /path/to/new/project/.claude/commands/development/
cp .claude/commands/code-quality/review-staged-unstaged.md /path/to/new/project/.claude/commands/code-quality/
```

---

## Settings Configuration

Add to your project's `.claude/settings.json` for automatic team provisioning:

```json
{
  "extraKnownMarketplaces": [
    "anthropics/skills",
    "anthropics/claude-code"
  ],
  "enabledPlugins": {
    "context7@claude-plugins-official": true,
    "github@claude-plugins-official": true,
    "typescript-lsp@claude-plugins-official": true,
    "superpowers@claude-plugins-official": true,
    "playwright@claude-plugins-official": true,
    "commit-commands@claude-plugins-official": true,
    "pr-review-toolkit@claude-plugins-official": true,
    "figma@claude-plugins-official": true,
    "vercel@claude-plugins-official": true,
    "firecrawl@claude-plugins-official": true,
    "firebase@claude-plugins-official": true,
    "commit-commands@claude-code-plugins": true,
    "code-review@claude-code-plugins": true,
    "frontend-design@claude-code-plugins": true
  }
}
```

---

## Design Knowledge (Read After Install)

After installing skills, read these documents for design intelligence:

1. **`skills-ecosystem/catalog/DESIGN-INSIGHTS-GEMINI3-ERA.md`** - Key design techniques from professional designer workflow
2. **`skills-ecosystem/prp-skill-maps/SKILL-PRP-MAPPING.md`** - Which skills to activate for which PRP type
3. **`skills-ecosystem/SKILLS-MASTER-CATALOG.md`** - Full inventory with descriptions

### Design Anti-Patterns to Avoid
- Generic purple/blue gradient backgrounds
- Over-rounded corners on everything
- Cookie-cutter SaaS template aesthetics
- Broken icon placeholders (always specify icon library upfront)
- Backgrounds that compete with foreground content

### Design Patterns to Follow
- Reference-driven prompting (screenshots as wireframes)
- Style steering ("in the style of Apple/Stripe/Linear")
- Icon system declaration upfront (iconify solar duotone + SVG logos)
- Big typography with strong hierarchy
- Monochrome + accent color strategy
- Animate on scroll with consistent keyframes
- Test at 3 breakpoints (desktop, tablet, mobile)

---

## Verification

After bootstrapping, verify your setup:

```bash
# Check skills count
ls ~/.claude/skills/ | wc -l
# Expected: 64

# Check plugins
cat ~/.claude/settings.json | grep -c "true"
# Expected: 22

# Check commands (in project)
find .claude/commands -name "*.md" | wc -l
# Expected: 47
```

---

## File Structure After Bootstrap

```
~/.claude/
  skills/           # 64 community skills (symlinked)
  plugins/
    cache/          # Plugin cache
    installed_plugins.json
    known_marketplaces.json
  settings.json     # Global settings with enabled plugins

<project>/
  .claude/
    commands/       # 47 project commands
      prp-commands/ # PRP creation/execution (11)
      development/  # Dev utilities (6)
      code-quality/ # Review/refactor (3)
      git-operations/ # Conflict resolution (3)
      typescript/   # TS-specific (4)
      nextjs/       # Next.js-specific (2)
      flutter/      # Flutter-specific (2)
      n8n/          # N8N workflows (2)
      rapid-development/experimental/ # Parallel/hackathon (8)
      agents/       # Agent commands (1)
    agents/         # 6 specialized subagents
    settings.json   # Project plugin config
  skills-ecosystem/
    SKILLS-MASTER-CATALOG.md    # Full inventory
    auto-install/
      install-all-skills.sh     # Bulk installer script
      AGENT-BOOTSTRAP.md        # This file
    catalog/
      DESIGN-INSIGHTS-GEMINI3-ERA.md  # Design knowledge
    prp-skill-maps/
      SKILL-PRP-MAPPING.md      # Skill-to-PRP type mapping
  PRPs/
    templates/      # 11 PRP templates
    ai_docs/        # Curated documentation
    scripts/        # PRP runner
```

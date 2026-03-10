import 'server-only'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { generateText } from '@/lib/ai/claude'
import { getRulesForPrompt } from '@/lib/knowledge/rules'
import { createPRP } from '@/lib/db/queries'
import type { Opportunity } from '@/lib/search/empire-flippers'

interface PRPTemplate {
  category: string
  sections: {
    Goal: string
    Why: string
    What: string
    Context: string
    Blueprint: string
    Validation: string
  }
  techStack: string[]
  validationGates: {
    level: number
    name: string
    command: string
    description: string
  }[]
}

export interface GeneratedPRP {
  id: string
  title: string
  content: string
  templateUsed: string
}

const CATEGORY_TO_TEMPLATE: Record<string, string> = {
  digital_products: 'digital-product.json',
  ai_as_a_service: 'saas.json',
  content_automation: 'content-automation.json',
  saas_micro_saas: 'saas.json',
  marketplace_platform: 'marketplace.json',
  ecommerce: 'ecommerce.json',
  ai_trading_finance: 'saas.json',
}

function loadTemplate(category: string): PRPTemplate | null {
  const filename = CATEGORY_TO_TEMPLATE[category] ?? 'digital-product.json'
  const templatePath = join(process.cwd(), 'data', 'prp-templates', filename)

  if (!existsSync(templatePath)) return null

  const raw = readFileSync(templatePath, 'utf-8')
  return JSON.parse(raw) as PRPTemplate
}

export async function generatePRP(opportunity: Opportunity): Promise<GeneratedPRP> {
  const template = loadTemplate(opportunity.category)
  const rulesContext = getRulesForPrompt()
  const templateFilename = CATEGORY_TO_TEMPLATE[opportunity.category] ?? 'digital-product.json'

  let templateBlock = ''
  if (template) {
    templateBlock = `
## Template Reference (${templateFilename})
Use this as a structural guide. Adapt each section to the specific opportunity.

- Goal pattern: ${template.sections.Goal}
- Why pattern: ${template.sections.Why}
- What pattern: ${template.sections.What}
- Context pattern: ${template.sections.Context}
- Blueprint pattern: ${template.sections.Blueprint}
- Validation pattern: ${template.sections.Validation}
- Tech stack: ${template.techStack.join(', ')}

Validation gates to include:
${template.validationGates.map((g) => `  Level ${g.level} (${g.name}): ${g.description}`).join('\n')}
`
  }

  const prompt = `Generate a comprehensive Product Requirement Prompt (PRP) for the following business opportunity.

## Opportunity
- Title: ${opportunity.title}
- Category: ${opportunity.category}
- Description: ${opportunity.description}
- Estimated Revenue: ${opportunity.estimatedRevenue}
- Estimated Cost: ${opportunity.estimatedCost}
- Autonomy Score: ${opportunity.autonomyScore}/10
- Source: ${opportunity.source}

## 10 Golden Rules (constraints the PRP must respect)
${rulesContext}
${templateBlock}
## PRP Format

Generate a complete PRP document in Markdown with these sections:

# [Business Title] PRP

## Goal
What exactly this business does and its end state.

## Why
Business value, market opportunity, and user impact.

## What
User-visible behavior, features, and technical requirements.

## All Needed Context
Documentation URLs, tech decisions, architecture patterns, gotchas, and examples.

## Implementation Blueprint
Step-by-step implementation plan with phases, pseudocode for critical paths, and task lists.

## Validation Loop
Executable validation commands for each level (syntax, tests, integration, deployment).

## Governance & Checkpoints
Human approval gates and risk classification for each autonomous action.

Make the PRP comprehensive, specific, and actionable. An AI agent should be able to implement working code from this PRP in a single pass.`

  const content = await generateText(prompt, 'You are an expert technical product manager creating PRPs for autonomous business systems.')

  const title = `PRP: ${opportunity.title}`

  const prpRow = createPRP({
    opportunityId: opportunity.id,
    title,
    content,
    templateUsed: templateFilename,
    validationStatus: 'pending',
  })

  return {
    id: prpRow.id,
    title: prpRow.title,
    content: prpRow.content,
    templateUsed: templateFilename,
  }
}

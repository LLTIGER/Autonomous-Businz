# N8N Workflow Automation Framework - Complete Setup Guide

## Overview

This is the complete N8N Workflow Automation Framework for the PRP (Product Requirement Prompt) system. It enables AI agents to build production-ready N8N workflows on the first pass using the **n8n-MCP server** as the primary tool.

**Agent Name**: **Nexus** - The N8N Workflow Automation Architect

## Framework Architecture

```
N8N Framework Structure:
├── PRPs/templates/
│   └── prp_n8n_enhanced.md          # N8N-specific PRP template
│
├── .claude/commands/
│   ├── n8n/
│   │   ├── n8n-create-base-prp.md   # Create N8N PRPs
│   │   └── n8n-execute-base-prp.md  # Execute N8N PRPs
│   └── agents/
│       └── nexus-n8n-architect.md   # Nexus agent definition
│
├── claude_md_files/
│   └── CLAUDE-N8N.md                # N8N project guidance
│
├── PRPs/ai_docs/
│   └── n8n_patterns.md              # N8N patterns & best practices
│
└── PRPs/
    └── N8N_FRAMEWORK_README.md      # This file
```

## Core Concept: PRP = PRD + N8N Intelligence + n8n-MCP

**PRP (Product Requirement Prompt)** = Product Requirements Document + Curated N8N/Workflow Knowledge + n8n-MCP Server Integration + Validation Loops

The N8N framework enables **one-pass workflow implementation** by providing:
1. Comprehensive workflow context in PRPs
2. n8n-MCP server integration for validation and deployment
3. Template-first development (2,500+ templates)
4. Multi-level validation (node → workflow → execution → production)
5. Progressive validation pattern preventing common errors

## Key Components

### 1. Nexus - N8N Workflow Automation Architect

**Location**: `.claude/commands/agents/nexus-n8n-architect.md`

**Identity**:
- Name: Nexus
- Specialization: N8N workflow automation architecture
- Primary Tool: n8n-MCP server (MANDATORY for all operations)
- Mission: Design, build, validate, and deploy N8N workflows

**Core Capabilities**:
- Template-first workflow discovery (2,500+ templates)
- Node configuration with explicit parameters (NEVER trust defaults)
- Expression language mastery with safe data access
- Multi-level validation (progressive validation pattern)
- Production deployment and monitoring

**MCP-First Development**: ALL N8N operations MUST use n8n-MCP server tools

### 2. N8N PRP Template

**Location**: `PRPs/templates/prp_n8n_enhanced.md`

**Template Structure**:
```markdown
## Goal - Specific workflow automation outcome
## 📸 Visual Workflow Reference - Template/workflow analysis
## 🔧 N8N Node & Template Requirements - Template selection
## ⚙️ N8N Expression Language - Data transformation
## All Needed Context - Complete workflow documentation
## Implementation Blueprint - Workflow architecture
## Validation Loop - 4-level validation
## MCP Server Integration - n8n-MCP tools usage
## Anti-Patterns to Avoid - Common gotchas
```

**Key Sections**:
- Workflow reference analysis (template discovery)
- Node and template requirements
- Expression language patterns
- Credential management
- Validation loops (4 levels)
- n8n-MCP server integration patterns

### 3. N8N Commands

#### Create N8N PRP Command

**Location**: `.claude/commands/n8n/n8n-create-base-prp.md`

**Usage**: `/n8n-create-base-prp [feature-name]`

**Process**:
1. N8N workflow analysis (existing workflows, templates)
2. External research (N8N docs, n8n-MCP documentation, templates)
3. n8n-MCP server integration research
4. Template-first PRP generation
5. Context completeness validation
6. Information density standards

**Output**: `PRPs/n8n-{feature-name}.md`

#### Execute N8N PRP Command

**Location**: `.claude/commands/n8n/n8n-execute-base-prp.md`

**Usage**: `/n8n-execute-base-prp [prp-file-name]`

**Process**:
1. Load and understand N8N PRP
2. Initialize n8n-MCP tools (tools_documentation)
3. Template discovery (if specified in PRP)
4. Node selection and configuration (parallel execution)
5. Progressive validation (4 levels)
6. Implementation following PRP tasks
7. Workflow testing and validation
8. Production deployment (if applicable)

**Success**: Workflow works on first deployment with minimal fixes

### 4. N8N Project Guidance

**Location**: `claude_md_files/CLAUDE-N8N.md`

**Purpose**: Comprehensive N8N guidance for Claude Code integration

**Key Sections**:
- Core development philosophy (KISS, YAGNI, Template-First)
- n8n-MCP server integration (MANDATORY)
- Expression language patterns (safe data access)
- Workflow architecture patterns
- Credential management (security)
- Multi-level validation (progressive)
- Testing strategy
- Production deployment checklist

**Critical Rules**:
- ALWAYS use n8n-MCP tools for all N8N operations
- NEVER trust default node parameter values
- ALWAYS use template-first approach
- MUST use multi-level validation
- ALWAYS execute tools silently (no commentary)
- MUST use parallel execution

### 5. N8N Patterns Documentation

**Location**: `PRPs/ai_docs/n8n_patterns.md`

**Purpose**: Curated N8N patterns and best practices

**Contents**:
- n8n-MCP server integration patterns
- Template-first development strategies
- Common workflow patterns (webhook → API → notification, etc.)
- Node configuration patterns (HTTP, webhook, code, IF, etc.)
- Expression language patterns (data access, transformation, error handling)
- Error handling patterns (node-level, workflow-level, expression-level)
- Credential management patterns
- Performance optimization patterns
- Testing & validation workflows
- Production deployment patterns
- Common gotchas & solutions

## n8n-MCP Server Integration (CRITICAL)

### Core Principle: MCP-First Development

**ALL N8N operations MUST use n8n-MCP server tools. This is NON-NEGOTIABLE.**

### n8n-MCP Tool Categories

**Template & Node Discovery** (parallel execution):
```bash
tools_documentation()  # ALWAYS call first
search_templates_by_metadata({complexity, requiredService, targetAudience})
get_templates_for_task('automation_task')
search_nodes({query: 'keyword', includeExamples: true})
list_nodes({category: 'trigger'})
get_node_essentials(nodeType, {includeExamples: true})
```

**Validation Tools** (progressive validation):
```bash
validate_node_minimal(nodeType, config)  # Level 1: Quick
validate_node_operation(nodeType, config, 'runtime')  # Level 2: Full
validate_workflow(workflow)  # Level 3: Complete
validate_workflow_connections(workflow)  # Level 3: Connections
validate_workflow_expressions(workflow)  # Level 3: Expressions
```

**Deployment & Management**:
```bash
n8n_create_workflow(workflow)  # Deploy
n8n_validate_workflow({id})  # Post-deployment validation
n8n_update_partial_workflow({id, operations: [...]})  # Batch updates
n8n_trigger_webhook_workflow()  # Test webhooks
n8n_list_executions()  # Monitor executions
n8n_autofix_workflow({id})  # Auto-fix errors
```

### MCP Operational Guidelines

**1. Silent Execution** (MANDATORY):
- Execute tools WITHOUT commentary
- Respond ONLY after all tools complete
- ❌ BAD: "Let me search... Now let me validate..."
- ✅ GOOD: [Execute all tools in parallel] → [Respond with results]

**2. Parallel Execution** (MANDATORY):
- Execute independent operations simultaneously
- Single message with multiple tool calls
- Maximizes performance and efficiency

**3. Template-First** (MANDATORY):
- ALWAYS check 2,500+ templates before building
- Use search_templates_by_metadata and get_templates_for_task
- Validate templates with validate_workflow
- Provide MANDATORY attribution

**4. Progressive Validation** (MANDATORY):
- Level 1: validate_node_minimal (quick check)
- Level 2: validate_node_operation (comprehensive)
- Level 3: validate_workflow (complete)
- Level 4: n8n_validate_workflow (production)

**5. Never Trust Defaults** (CRITICAL):
- ALWAYS configure ALL parameters explicitly
- Default values cause runtime failures
- Use examples from get_node_essentials

## Workflow Development Process

### Phase 1: Discovery (using n8n-MCP)

1. Call `tools_documentation()` for best practices
2. Search templates (parallel):
   - `search_templates_by_metadata(...)`
   - `get_templates_for_task(...)`
3. If template exists:
   - Retrieve: `get_template(templateId, {mode: 'full'})`
   - Validate: `validate_workflow(template)`
   - Attribution: "Based on template by **[Author]** (@[username]). View at: [URL]"
4. If building from scratch:
   - Search nodes (parallel): `search_nodes(...)`, `list_nodes(...)`
   - Get details: `get_node_essentials(..., {includeExamples: true})`

### Phase 2: Configuration (using n8n-MCP)

1. Configure nodes with explicit parameters
2. Validate each node:
   - `validate_node_minimal(...)` - quick
   - `validate_node_operation(..., 'runtime')` - full
3. Build workflow structure
4. Validate workflow:
   - `validate_workflow(...)`
   - `validate_workflow_connections(...)`
   - `validate_workflow_expressions(...)`

### Phase 3: Deployment (using n8n-MCP)

1. Deploy: `n8n_create_workflow(...)`
2. Validate: `n8n_validate_workflow(...)`
3. Test: `n8n_trigger_webhook_workflow(...)`
4. Monitor: `n8n_list_executions(...)`
5. Fix: `n8n_autofix_workflow(...)` (if needed)

## Critical N8N Rules

### 1. Connection Format (CRITICAL)

```javascript
// ✅ CORRECT - Four separate string parameters
{
  "type": "addConnection",
  "source": "source-node-id",
  "target": "target-node-id",
  "sourcePort": "main",
  "targetPort": "main"
}

// For IF nodes, add branch parameter
{
  "type": "addConnection",
  "source": "if-node-id",
  "target": "handler-id",
  "sourcePort": "main",
  "targetPort": "main",
  "branch": "true"  // or "false"
}
```

### 2. Expression Language (CRITICAL)

```javascript
// ✅ ALWAYS use safe data access
$json?.field ?? 'default'
$node["NodeName"]?.json?.field ?? null

// ❌ NEVER unsafe access (fails if undefined)
$json.field
```

### 3. Error Handling (MANDATORY)

```javascript
// Code nodes MUST have try-catch
for (const item of items) {
  try {
    // Process
    processedItems.push({json: result});
  } catch (error) {
    // Handle gracefully
    processedItems.push({json: {error: error.message}});
  }
}
```

### 4. Never Trust Defaults (CRITICAL)

```javascript
// ❌ FAILS at runtime
{resource: "message", operation: "post", text: "Hello"}

// ✅ WORKS - all parameters explicit
{resource: "message", operation: "post", select: "channel", channelId: "C123", text: "Hello"}
```

## Usage Examples

### Creating an N8N PRP

```bash
# In Claude Code CLI
/n8n-create-base-prp slack-notification-workflow

# Nexus will:
# 1. Search for slack notification templates (n8n-MCP)
# 2. Analyze existing workflows
# 3. Research N8N docs and patterns
# 4. Create comprehensive PRP at PRPs/n8n-slack-notification-workflow.md
```

### Executing an N8N PRP

```bash
# In Claude Code CLI
/n8n-execute-base-prp n8n-slack-notification-workflow

# Nexus will:
# 1. Load PRP and create todos
# 2. Initialize n8n-MCP tools
# 3. Search templates (if specified)
# 4. Discover and validate nodes
# 5. Build workflow with explicit parameters
# 6. Validate at all levels (progressive)
# 7. Deploy to N8N (if configured)
# 8. Monitor and validate execution
```

## Success Metrics

### One-Pass Implementation
- Workflow works on first deployment with minimal fixes
- Achieved through:
  - Comprehensive PRP context
  - n8n-MCP validation at every step
  - Template-first approach
  - Progressive validation pattern
  - Explicit parameter configuration

### Quality Standards
- 100% n8n-MCP tool usage
- Zero default parameter reliance
- Complete multi-level validation
- Proper error handling everywhere
- Safe expression language usage
- Template attribution when applicable

## Validation Checklist

Before deploying any N8N workflow:

- [ ] Template search completed via n8n-MCP
- [ ] All nodes validated with n8n-MCP tools
- [ ] Workflow structure validated
- [ ] Workflow connections validated
- [ ] Expression syntax validated
- [ ] All parameters explicitly configured
- [ ] Credentials properly secured
- [ ] Error handling implemented
- [ ] Null handling in all expressions
- [ ] IF node branch parameters set
- [ ] All branches tested
- [ ] Template attribution included (if used)
- [ ] Test execution successful
- [ ] Error scenarios tested
- [ ] Production validation passed

## Common Gotchas

1. **Default Parameter Values**: NEVER trust defaults - configure explicitly
2. **Connection Format**: Use 4 separate string parameters
3. **IF Node Branches**: MUST include "branch" parameter
4. **Null/Undefined**: ALWAYS use optional chaining (?.) and nullish coalescing (??)
5. **Template Attribution**: MANDATORY when using templates
6. **Silent Execution**: Execute n8n-MCP tools without commentary
7. **Parallel Execution**: Use for independent operations

## File Locations Summary

| File | Location | Purpose |
|------|----------|---------|
| PRP Template | `PRPs/templates/prp_n8n_enhanced.md` | N8N PRP structure |
| Create Command | `.claude/commands/n8n/n8n-create-base-prp.md` | Generate N8N PRPs |
| Execute Command | `.claude/commands/n8n/n8n-execute-base-prp.md` | Execute N8N PRPs |
| Agent Definition | `.claude/commands/agents/nexus-n8n-architect.md` | Nexus identity |
| Project Guidance | `claude_md_files/CLAUDE-N8N.md` | N8N guidelines |
| Patterns Doc | `PRPs/ai_docs/n8n_patterns.md` | N8N best practices |
| Framework README | `PRPs/N8N_FRAMEWORK_README.md` | This file |

## Integration with Existing PRP Framework

The N8N framework follows the same patterns as:
- Next.js framework (`PRPs/templates/prp_nextjs_enhanced.md`)
- Flutter framework (`PRPs/templates/prp_flutter.md`)
- TypeScript framework (`PRPs/templates/prp_base_typescript.md`)

**Key Pattern**: Template + Commands + Agent + CLAUDE.md + AI Docs

## Next Steps

1. **Install n8n-MCP Server**: Required for all N8N operations
2. **Configure n8n-MCP**: Set up connection to N8N instance (if deploying)
3. **Create First PRP**: Use `/n8n-create-base-prp [workflow-name]`
4. **Execute PRP**: Use `/n8n-execute-base-prp [prp-name]`
5. **Validate**: Ensure all validation levels pass
6. **Deploy**: Use n8n-MCP deployment tools
7. **Monitor**: Track executions with n8n_list_executions

## Support & Documentation

- **N8N Docs**: https://docs.n8n.io/
- **N8N Templates**: https://n8n.io/workflows/
- **n8n-MCP GitHub**: Search for n8n-MCP server documentation
- **PRP Framework**: See main `CLAUDE.md` in repository root
- **N8N Patterns**: Reference `PRPs/ai_docs/n8n_patterns.md`

## Summary

The N8N Framework enables **Nexus**, the N8N Workflow Automation Architect, to build production-ready workflows on the first pass using:

1. **n8n-MCP server** (MANDATORY for all operations)
2. **Template-first development** (2,500+ templates)
3. **Progressive validation** (4 levels)
4. **Explicit configuration** (never trust defaults)
5. **Comprehensive PRPs** (complete workflow context)

**Core Identity**: MCP-powered automation expert who never builds without validation, never trusts defaults, and always leverages the template library.

---

*Framework created: January 2025*
*Agent: Nexus - N8N Workflow Automation Architect*
*Primary Tool: n8n-MCP Server*

# Create N8N Enhanced BASE PRP

## Feature: $ARGUMENTS

## N8N PRP Creation Mission

Create a comprehensive N8N PRP that enables **one-pass workflow automation implementation success** through systematic N8N-specific research and context curation.

**Critical Understanding**: The executing AI agent only receives:

- Start by reading and understanding the PRP concepts PRPs/README.md
- The N8N PRP content you create
- N8N documentation and training data
- Access to n8n-MCP server tools for validation and deployment
- Access to workflow files (but needs guidance on which ones)

**Therefore**: Your N8N research and workflow-first context curation directly determines implementation success. Incomplete workflow context = N8N implementation failure.

## N8N-Specific Research Process

> During the N8N research process, create clear tasks and spawn N8N-specialized agents using the batch tools. Focus on workflow automation patterns, node configurations, expression language, and integration requirements.

1. **N8N Workflow Analysis**
   - Create clear todos and spawn workflow-automation-architect subagent (if available) to analyze existing workflows
   - Identify N8N workflow file structures (workflows/, credentials/, custom_nodes/)
   - Note existing N8N conventions (node types, expression patterns, credential management)
   - Check existing N8N test patterns for workflows and integrations
   - Analyze existing N8N dependencies and version constraints
   - Use workflow-optimizer subagent to identify similar automation patterns

2. **N8N External Research**
   - Create todos and spawn library-researcher subagent for N8N-specific research
   - N8N documentation (include specific URLs with workflow sections)
   - N8N expression language documentation for data transformations
   - For critical N8N patterns, add .md files to PRPs/ai_docs with N8N-specific examples
   - N8N best practices and workflow optimization
   - Integration patterns for common services (Slack, Gmail, databases, APIs)
   - Use library-researcher to find similar N8N workflow templates from n8n.io/workflows

3. **N8N MCP Server Integration Research**
   - Document available n8n-MCP tools and their usage patterns
   - Template discovery strategies (search_templates_by_metadata, get_templates_for_task)
   - Node validation workflows (validate_node_minimal, validate_node_operation)
   - Deployment and monitoring patterns (n8n_create_workflow, n8n_list_executions)
   - Expression validation and testing approaches

## N8N PRP Generation Process

### Step 1: Choose N8N Template

Use `PRPs/templates/prp_n8n_enhanced.md` as your template structure - it contains all necessary N8N-specific sections and workflow automation patterns.

### Step 2: N8N Context Completeness Validation

Before writing, apply the **"N8N Newcomer Test"** from the template:
_"If someone knew nothing about N8N or workflow automation, would they have everything needed to implement this automation successfully?"_

### Step 3: N8N Research Integration

Transform your N8N research findings into the template sections:

**Goal Section**: Define specific workflow automation outcomes and N8N deliverables
**Context Section**: Populate with N8N documentation URLs, workflow templates, existing workflow patterns
**Implementation Tasks**: Create N8N-specific tasks using node types (trigger, processing, logic, output)
**Validation Gates**: Use N8N-specific validation commands (n8n-MCP validation, workflow testing)

### Step 4: Workflow Information Density Standards

Ensure every N8N reference is **workflow-specific and actionable**:

- N8N URLs include specific workflow and node documentation sections
- workflow/ file references include specific N8N patterns to follow
- Task specifications include N8N node types and explicit parameter configurations
- Validation commands are N8N project-specific and tested working
- Expression language examples with actual data access patterns

### Step 5: N8N ULTRATHINK Before Writing

After N8N research completion, create comprehensive N8N PRP writing plan using TodoWrite tool:

- Plan how to structure each N8N template section with workflow research findings
- Identify N8N/automation gaps that need additional research
- Create systematic approach to filling template with N8N-actionable context
- Consider workflow complexity, integration requirements, and error handling needs
- Document n8n-MCP tool usage strategy for validation and deployment

## Output

Save as: `PRPs/n8n-{feature-name}.md`

## N8N PRP Quality Gates

### N8N Context Completeness Check

- [ ] Passes "N8N Newcomer Test" from template
- [ ] All N8N YAML references are specific and accessible
- [ ] Implementation tasks include exact N8N node types and configurations
- [ ] Validation commands are N8N-project-specific and verified working
- [ ] Workflow automation, integration, and error handling considerations addressed
- [ ] n8n-MCP tool usage documented for all validation and deployment steps

### N8N Template Structure Compliance

- [ ] All required N8N template sections completed
- [ ] Goal section has specific workflow automation outcomes and N8N deliverables
- [ ] Implementation Tasks follow workflow pattern (trigger → processing → logic → output)
- [ ] N8N-specific validation checklist is comprehensive
- [ ] Expression language patterns documented with examples

### N8N Information Density Standards

- [ ] No generic references - all are N8N-specific and workflow-actionable
- [ ] workflow/ file patterns point at specific N8N examples to follow
- [ ] N8N documentation URLs include workflow and node anchors for exact guidance
- [ ] Task specifications use N8N information-dense keywords from workflows
- [ ] Integration requirements, credential management, and error handling included
- [ ] All n8n-MCP tools documented with usage patterns

## N8N Success Metrics

**Workflow Confidence Score**: Rate 1-10 for N8N one-pass implementation success likelihood

**N8N Validation**: The completed N8N PRP should enable an AI agent unfamiliar with N8N to implement the workflow automation successfully using only the PRP content, n8n-MCP tools, and workflow file access.

## N8N-Specific Considerations

### N8N Workflow Requirements
- Template-first approach (check 2,500+ templates before building)
- Node selection and validation via n8n-MCP
- Expression language patterns for data transformation
- Credential management and security

### Integration and Automation
- API integration patterns and authentication
- Webhook configuration and security
- Scheduled workflow triggers
- Error handling and retry logic

### N8N Development Workflow
- Template discovery via n8n-MCP
- Node configuration with explicit parameters (NEVER defaults)
- Multi-level validation (node → workflow → execution)
- Deployment and monitoring via n8n-MCP

### Production Deployment
- Workflow testing with sample data
- Credential security and environment variables
- Performance optimization and scalability
- Error monitoring and notification

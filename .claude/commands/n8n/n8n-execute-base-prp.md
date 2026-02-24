# Execute N8N Enhanced BASE PRP

## Feature: $ARGUMENTS

## N8N PRP Execution Mission

Execute an existing N8N PRP to build, validate, and deploy workflow automation with **one-pass implementation success** using n8n-MCP tools and systematic workflow development.

**Critical Understanding**: You are receiving:

- A comprehensive N8N PRP with complete workflow context
- Access to n8n-MCP server tools for all N8N operations
- N8N workflow files and credential configurations
- N8N documentation and expression language references

**Your Mission**: Implement the N8N workflow automation exactly as specified in the PRP, using n8n-MCP tools for validation and deployment at every step.

## N8N Execution Process

> Follow the PRP's implementation tasks systematically, using n8n-MCP tools to ensure workflow correctness before deployment.

### Step 1: Load and Understand N8N PRP

1. **Read the N8N PRP file** specified in $ARGUMENTS
2. **Create implementation todos** using TodoWrite tool based on PRP's Implementation Tasks section
3. **Understand workflow architecture**: trigger → processing → logic → output flow
4. **Identify n8n-MCP tool usage** documented in the PRP
5. **Note credential requirements** and integration patterns

### Step 2: N8N MCP Tools Initialization

**CRITICAL: Initialize n8n-MCP connection and understand available tools**

```bash
# Verify n8n-MCP server is available
# tools_documentation() should be called first for best practices
```

**Available n8n-MCP Tools** (from system instructions):

**Template & Node Discovery** (use in parallel when possible):
- `search_templates_by_metadata({complexity, requiredService, targetAudience})`
- `get_templates_for_task('task_description')`
- `search_nodes({query: 'keyword', includeExamples: true})`
- `list_nodes({category: 'trigger'})`
- `get_node_essentials(nodeType, {includeExamples: true})`

**Validation Tools** (progressive validation):
- `validate_node_minimal(nodeType, config)` - Quick required fields check
- `validate_node_operation(nodeType, config, 'runtime')` - Full validation with fixes
- `validate_workflow(workflow)` - Complete workflow validation
- `validate_workflow_connections(workflow)` - Structure check
- `validate_workflow_expressions(workflow)` - Expression validation

**Deployment & Management** (if n8n API configured):
- `n8n_create_workflow(workflow)` - Deploy workflow
- `n8n_validate_workflow({id})` - Post-deployment check
- `n8n_update_partial_workflow({id, operations: [...]})` - Batch updates
- `n8n_trigger_webhook_workflow()` - Test webhooks
- `n8n_list_executions()` - Monitor executions
- `n8n_autofix_workflow({id})` - Auto-fix common errors

### Step 3: Template Discovery (If PRP specifies template)

**Execute template discovery in parallel** (following PRP specifications):

```bash
# SILENT EXECUTION (no commentary)
# Execute these in parallel as independent operations

search_templates_by_metadata({
  requiredService: '[service from PRP]',
  complexity: '[simple/intermediate/advanced from PRP]',
  targetAudience: '[target user from PRP]'
})

get_templates_for_task('[automation task from PRP]')

# After tools complete, analyze results and select template
```

**If template found**:
- Use `get_template(templateId, {mode: 'full'})` to retrieve complete workflow
- **MANDATORY ATTRIBUTION**: Include author name, username, and n8n.io link in PRP
- Validate template with `validate_workflow(template)`

### Step 4: Node Selection and Configuration

**Execute node discovery in parallel** (for all required nodes):

```bash
# SILENT EXECUTION
# Parallel execution for multiple nodes

search_nodes({query: 'webhook', includeExamples: true})
search_nodes({query: 'slack', includeExamples: true})
search_nodes({query: 'http request', includeExamples: true})

# Get detailed configuration for each node
get_node_essentials('n8n-nodes-base.webhook', {includeExamples: true})
get_node_essentials('n8n-nodes-base.slack', {includeExamples: true})
get_node_essentials('n8n-nodes-base.httpRequest', {includeExamples: true})

# Response after all tools complete
```

**CRITICAL**: Configure ALL node parameters explicitly - NEVER rely on defaults

### Step 5: Progressive Validation During Development

**Use multi-level validation pattern**:

**Level 1 - Quick Validation** (during node configuration):
```bash
# For each node being configured
validate_node_minimal('n8n-nodes-base.webhook', nodeConfig)
# Fix any required field errors immediately
```

**Level 2 - Comprehensive Validation** (before adding to workflow):
```bash
# Full validation with automatic fixes
validate_node_operation('n8n-nodes-base.webhook', fullConfig, 'runtime')
# Apply suggested fixes
```

**Level 3 - Workflow Validation** (after building workflow):
```bash
# Parallel validation of different aspects
validate_workflow(workflowJson)
validate_workflow_connections(workflowJson)
validate_workflow_expressions(workflowJson)
# Fix ALL issues before deployment
```

### Step 6: Implementation Following PRP Tasks

**Execute PRP Implementation Tasks in order** (from PRP's Implementation Tasks section):

```yaml
# Example workflow implementation pattern

Task 0: SETUP credentials
  - Create credential configurations
  - Validate credential format
  - Test authentication (if possible)
  - Mark todo as completed

Task 1: CREATE trigger node
  - Configure trigger with explicit parameters
  - validate_node_minimal for quick check
  - validate_node_operation for full validation
  - Add to workflow structure
  - Mark todo as in_progress → completed

Task 2: CREATE processing nodes
  - Implement data transformation logic
  - Configure expressions with null handling
  - validate_node_operation for each node
  - Test expressions with sample data
  - Mark todo as completed

Task 3: CREATE integration nodes
  - Configure API endpoints and authentication
  - Set retry logic and timeout
  - validate_node_operation with runtime validation
  - Add to workflow
  - Mark todo as completed

Task 4: CREATE conditional logic
  - Implement IF/Switch nodes
  - CRITICAL: Use "branch" parameter for connections
  - validate_workflow_connections for branch routing
  - Test all conditional paths
  - Mark todo as completed

Task 5: CREATE output nodes
  - Configure notification/response nodes
  - Set output formats and templates
  - validate_node_operation for each output
  - Mark todo as completed

Task 6: CREATE error handling
  - Implement error workflow or error nodes
  - Configure retry and fallback logic
  - Test error scenarios
  - Mark todo as completed

Task 7: VALIDATE complete workflow
  - Run all Level 3 validations
  - Fix any validation errors
  - Test end-to-end execution
  - Mark todo as completed
```

### Step 7: Workflow Testing and Validation

**Execute comprehensive testing**:

```bash
# 1. Validate complete workflow
validate_workflow(completeWorkflow)

# 2. If n8n API available, deploy for testing
n8n_create_workflow(workflow)

# 3. Validate deployed workflow
n8n_validate_workflow(workflowId)

# 4. Test workflow execution
n8n_trigger_webhook_workflow(workflowId, testData)

# 5. Monitor execution results
n8n_list_executions({limit: 10, status: 'error'})

# 6. Auto-fix any common errors
n8n_autofix_workflow(workflowId)
```

### Step 8: Validation Loop Execution

**Execute all validation levels from PRP**:

**Level 1: Workflow Structure Validation**
```bash
# JSON structure validation
python -c "import json; json.load(open('workflow.json'))"

# n8n-MCP validation
validate_workflow(workflow)
```

**Level 2: Expression & Logic Validation**
```bash
validate_workflow_expressions(workflow)
validate_workflow_connections(workflow)
```

**Level 3: Workflow Execution Validation**
```bash
# Local testing or n8n-MCP testing
n8n_trigger_webhook_workflow(workflowId, testPayload)
```

**Level 4: Production Validation**
```bash
# Performance testing with concurrent executions
# Error handling with invalid data
# Credential testing
n8n_list_executions({status: 'error'})
```

### Step 9: Final Validation Checklist

**Complete PRP's Final Validation Checklist**:

- [ ] All implementation tasks completed and todos marked done
- [ ] All validation levels passed (1-4)
- [ ] Workflow JSON structure valid
- [ ] All node configurations validated via n8n-MCP
- [ ] No expression syntax errors
- [ ] Workflow executes successfully with test data
- [ ] Credentials properly configured and secured
- [ ] Error handling tested and functional
- [ ] Integration tests passed
- [ ] Template attribution included (if used)
- [ ] All n8n-MCP validations passed
- [ ] Production deployment successful (if applicable)

## N8N Execution Best Practices

### Silent Execution Pattern
- Execute n8n-MCP tools without commentary
- Only respond AFTER all tools complete
- ❌ BAD: "Let me search for nodes... Great! Now let me..."
- ✅ GOOD: [Execute search_nodes and get_node_essentials in parallel, then respond]

### Parallel Execution
- Execute independent operations in parallel
- ✅ GOOD: Multiple search_nodes calls in single message
- ❌ BAD: Sequential tool calls

### Never Trust Defaults
- ⚠️ CRITICAL: Explicitly configure ALL parameters
- Default values cause runtime failures
- Always use explicit configuration from examples

### Template Attribution
- **MANDATORY**: If using template, credit author with name, username, and URL
- Example: "Based on template by **David Ashby** (@cfomodz). View at: https://n8n.io/workflows/2414"

### Progressive Validation
- validate_node_minimal → validate_node_operation → validate_workflow
- Fix errors at each level before proceeding

### Batch Operations
- Use n8n_update_partial_workflow with multiple operations
- ✅ GOOD: Single call with array of operations
- ❌ BAD: Multiple separate update calls

## Critical N8N Execution Rules

1. **ALWAYS use n8n-MCP tools** for validation before deployment
2. **NEVER rely on default node parameters** - configure explicitly
3. **ALWAYS validate at multiple levels** - node → workflow → execution
4. **ALWAYS use "branch" parameter** for IF node connections
5. **ALWAYS attribute templates** if used
6. **ALWAYS handle errors gracefully** with retry logic
7. **ALWAYS test with sample data** before production deployment
8. **ALWAYS use parallel execution** when operations are independent
9. **ALWAYS execute tools silently** and respond after completion
10. **ALWAYS follow PRP's Implementation Tasks** in order

## Success Definition

**Workflow Implementation Success** = All PRP success criteria met + All validation levels passed + Production deployment functional (if applicable)

**One-Pass Success** = Workflow works correctly on first deployment with minimal fixes (enabled by comprehensive PRP context and n8n-MCP validation)

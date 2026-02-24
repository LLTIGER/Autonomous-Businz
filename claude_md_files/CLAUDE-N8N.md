# CLAUDE.md

This file provides comprehensive guidance to Claude Code when working with N8N workflow automation and the n8n-MCP server.

## Core Development Philosophy

### KISS (Keep It Simple, Stupid)
Simplicity should be a key goal in workflow design. Choose straightforward automation solutions over complex ones whenever possible. Simple workflows are easier to understand, maintain, and debug.

### YAGNI (You Aren't Gonna Need It)
Avoid building workflow functionality on speculation. Implement automation only when needed, not when you anticipate it might be useful in the future.

### Design Principles
- **Template-First**: Always check n8n.io/workflows for existing templates before building from scratch (2,500+ available)
- **Explicit Configuration**: NEVER rely on default node parameter values - configure everything explicitly
- **Fail Fast**: Validate node configurations and expressions early using n8n-MCP tools
- **Progressive Validation**: Use validate_node_minimal → validate_node_operation → validate_workflow pattern
- **Silent Execution**: Execute n8n-MCP tools without commentary, respond only after completion

## 🤖 AI Assistant Guidelines

### Context Awareness
- When implementing workflows, ALWAYS check for existing templates first using n8n-MCP
- Use `search_templates_by_metadata` and `get_templates_for_task` for template discovery
- Check for similar workflow patterns in existing workflow files
- Prefer composition of existing nodes over custom code nodes

### Common Pitfalls to Avoid
- **CRITICAL**: Never trust default parameter values - they cause runtime failures
- Never skip n8n-MCP validation steps
- Never use incorrect connection format (must be 4 separate string parameters)
- Never forget "branch" parameter for IF node connections
- Never hardcode credentials - use N8N credential system
- Never ignore expression language null handling

### Workflow Development Patterns
- ALWAYS start with `tools_documentation()` for n8n-MCP best practices
- Template discovery FIRST before building from scratch
- Use parallel execution for independent n8n-MCP tool calls
- Validate at multiple levels: node → workflow → execution
- Test workflows with sample data before production deployment

### N8N MCP Tools Usage Requirements

**CRITICAL**: All N8N operations must use n8n-MCP server tools. The n8n-MCP server provides comprehensive workflow development, validation, and deployment capabilities.

```bash
# ❌ Don't try to manually create workflows without validation
# Create workflow JSON and hope it works

# ✅ Use n8n-MCP tools for template discovery
search_templates_by_metadata({complexity: "simple", requiredService: "slack"})
get_templates_for_task('slack_notification')

# ✅ Use n8n-MCP tools for node validation
validate_node_minimal(nodeType, config)
validate_node_operation(nodeType, config, 'runtime')

# ✅ Use n8n-MCP tools for workflow validation
validate_workflow(workflow)
validate_workflow_connections(workflow)
validate_workflow_expressions(workflow)
```

## 🧱 Workflow Structure & Modularity

### Workflow Organization Limits
- **Keep workflows focused** - one primary automation goal per workflow
- **Use sub-workflows** for complex automation spanning multiple domains
- **Maximum ~20 nodes per workflow** for maintainability
- **Break complex logic into smaller, testable workflows**
- **Use error workflows** for centralized error handling

### Workflow File Organization
```
workflows/
├── active/                    # Production workflows
│   ├── webhook_handlers/     # Webhook trigger workflows
│   ├── scheduled_jobs/       # Scheduled trigger workflows
│   └── integrations/         # Service integration workflows
├── templates/                 # Template workflows for reuse
├── development/              # Development and testing
└── archived/                 # Deprecated workflows

credentials/
├── api_credentials.json      # API authentication
├── oauth_tokens.json         # OAuth configurations
└── database_credentials.json # Database connections
```

## 🚀 N8N Core Features & n8n-MCP Integration

### N8N Core Capabilities
- **2,500+ Workflow Templates**: Pre-built automation patterns for common use cases
- **400+ Integration Nodes**: Direct integrations with popular services
- **Expression Language**: Powerful data transformation with $json, $node, $items
- **Webhook Triggers**: HTTP webhook support for event-driven automation
- **Scheduled Triggers**: Cron-based scheduling for recurring workflows
- **Code Nodes**: JavaScript/Python for custom logic when needed
- **Error Handling**: Built-in retry logic and error workflows

### n8n-MCP Server Integration (MANDATORY)
- **MUST use n8n-MCP tools** for all N8N operations
- **Template discovery**: `search_templates_by_metadata`, `get_templates_for_task`
- **Node discovery**: `search_nodes`, `list_nodes`, `get_node_essentials`
- **Validation**: `validate_node_minimal`, `validate_node_operation`, `validate_workflow`
- **Deployment**: `n8n_create_workflow`, `n8n_validate_workflow`
- **Monitoring**: `n8n_list_executions`, `n8n_autofix_workflow`

### Critical N8N Constraints

**NEVER Trust Default Parameter Values**:
```javascript
// ❌ FAILS at runtime - missing required parameters
{
  resource: "message",
  operation: "post",
  text: "Hello"
}

// ✅ WORKS - all parameters explicit
{
  resource: "message",
  operation: "post",
  select: "channel",
  channelId: "C123ABC",
  text: "Hello"
}
```

**Connection Format** (CRITICAL):
```javascript
// ❌ WRONG - object format causes "Expected string, received object" error
{
  type: "addConnection",
  connection: {
    source: {nodeId: "node-1", outputIndex: 0},
    destination: {nodeId: "node-2", inputIndex: 0}
  }
}

// ❌ WRONG - combined string causes "Source node not found" error
{
  type: "addConnection",
  source: "node-1:main:0",
  target: "node-2:main:0"
}

// ✅ CORRECT - four separate string parameters
{
  type: "addConnection",
  source: "node-id-string",
  target: "target-node-id-string",
  sourcePort: "main",
  targetPort: "main"
}
```

**IF Node Multi-Output Routing** (CRITICAL):
```javascript
// IF nodes have TWO outputs (TRUE and FALSE)
// Use "branch" parameter to route correctly

// ✅ CORRECT - route to TRUE branch
{
  type: "addConnection",
  source: "if-node-id",
  target: "success-handler-id",
  sourcePort: "main",
  targetPort: "main",
  branch: "true"  // REQUIRED
}

// ✅ CORRECT - route to FALSE branch
{
  type: "addConnection",
  source: "if-node-id",
  target: "failure-handler-id",
  sourcePort: "main",
  targetPort: "main",
  branch: "false"  // REQUIRED
}

// ❌ WITHOUT branch parameter, both connections may end up on same output!
```

## 🎯 N8N Expression Language (MANDATORY PATTERNS)

### Expression Syntax Requirements

```javascript
// Data access patterns
$json                          // Current node's JSON output
$json['fieldName']            // Specific field from current node
$node["NodeName"].json        // Specific node's output
$node["NodeName"].json['field'] // Field from specific node
$items                        // All items in current execution
$parameter['paramName']       // Node parameter access

// Safe access with null handling (ALWAYS use)
$json?.optionalField ?? 'default value'
$node["NodeName"]?.json?.field ?? null

// Data transformation
$items.map(item => item.json.value)
$json.arrayField.filter(x => x.status === 'active')
$json.stringField.toLowerCase().trim()

// Date operations
DateTime.now().toISO()
DateTime.fromISO($json.dateString)
DateTime.now().plus({days: 7})

// Type conversion with validation
parseInt($json.numberString) || 0
String($json.value)
Boolean($json.flag)
```

### Code Node Pattern (MANDATORY ERROR HANDLING)

```javascript
// ALWAYS handle errors in Code nodes
const processedItems = [];

for (const item of items) {
  try {
    // Validate required fields
    if (!item.json.requiredField) {
      throw new Error('Missing required field: requiredField');
    }

    // Transform data
    const transformedData = {
      originalId: item.json.id,
      processedValue: item.json.value * 2,
      timestamp: new Date().toISOString(),
      status: 'processed'
    };

    processedItems.push({
      json: transformedData
    });

  } catch (error) {
    // Handle errors gracefully - don't stop entire workflow
    processedItems.push({
      json: {
        error: error.message,
        originalData: item.json,
        status: 'error'
      }
    });
  }
}

return processedItems;
```

## 🏗️ Workflow Architecture Patterns

### Standard Workflow Pattern

```
Trigger Node
  ↓
Data Validation/Transformation
  ↓
IF Node (Conditional Logic)
  ├─→ [TRUE] Success Path
  │     ↓
  │   Integration Nodes (API, Database, etc.)
  │     ↓
  │   Success Notification
  │
  └─→ [FALSE] Error Path
        ↓
      Error Notification
```

### Node Type Categories

**Trigger Nodes** (Workflow Entry Points):
- `n8n-nodes-base.webhook` - HTTP webhooks
- `n8n-nodes-base.scheduleTrigger` - Cron scheduling
- `n8n-nodes-base.manualTrigger` - Manual execution
- `n8n-nodes-base.emailTrigger` - Email-based triggers

**Processing Nodes** (Data Transformation):
- `n8n-nodes-base.set` - Data field mapping
- `n8n-nodes-base.code` - JavaScript/Python logic
- `n8n-nodes-base.function` - Custom functions
- `n8n-nodes-base.merge` - Combine data from multiple branches

**Logic Nodes** (Flow Control):
- `n8n-nodes-base.if` - Binary conditional (true/false branches)
- `n8n-nodes-base.switch` - Multi-way conditional
- `n8n-nodes-base.splitInBatches` - Batch processing

**Integration Nodes** (Popular Services):
- `n8n-nodes-base.httpRequest` - HTTP API calls
- `n8n-nodes-base.slack` - Slack integration
- `n8n-nodes-base.gmail` - Gmail integration
- `n8n-nodes-base.googleSheets` - Google Sheets
- `n8n-nodes-base.telegram` - Telegram bot
- `@n8n/n8n-nodes-langchain.agent` - AI agents

## 🛡️ Credential Management (MANDATORY SECURITY)

### Credential Configuration Rules

- **NEVER hardcode credentials** in workflow JSON
- **ALWAYS use N8N credential system**
- **NEVER commit credentials** to version control
- **ALWAYS use environment variables** for sensitive data
- **VALIDATE credentials** before workflow deployment

### Credential Setup Pattern

```json
// credentials/api_credentials.json
{
  "name": "Service API Credentials",
  "type": "httpHeaderAuth",
  "data": {
    "name": "Authorization",
    "value": "={{$env.API_KEY}}"  // Use environment variable
  }
}

// In workflow node configuration
{
  "authentication": "predefinedCredentialType",
  "credentialName": "Service API Credentials"
}
```

## 🧪 Testing Strategy (MANDATORY VALIDATION)

### Multi-Level Validation (MUST FOLLOW)

**Level 1: Node Configuration Validation**
```bash
# Quick validation during development
validate_node_minimal('n8n-nodes-base.webhook', nodeConfig)
```

**Level 2: Comprehensive Node Validation**
```bash
# Full validation with automatic fixes
validate_node_operation('n8n-nodes-base.webhook', fullConfig, 'runtime')
```

**Level 3: Workflow Validation**
```bash
# Complete workflow validation (parallel execution)
validate_workflow(workflow)
validate_workflow_connections(workflow)
validate_workflow_expressions(workflow)
```

**Level 4: Execution Testing**
```bash
# Deploy and test workflow
n8n_create_workflow(workflow)
n8n_validate_workflow(workflowId)
n8n_trigger_webhook_workflow(workflowId, testData)
n8n_list_executions({limit: 10})
```

### Test Data Requirements

- **ALWAYS test with sample data** before production
- **Test all conditional branches** (true and false paths)
- **Test error scenarios** with invalid data
- **Test null/undefined** handling in expressions
- **Monitor execution results** with n8n_list_executions

## 🎨 Workflow Development Best Practices

### Template-First Development

```bash
# Step 1: Search for existing templates (parallel execution)
search_templates_by_metadata({
  requiredService: 'slack',
  complexity: 'simple',
  targetAudience: 'marketers'
})

get_templates_for_task('slack_notification')

# Step 2: If template found, retrieve and validate
get_template(templateId, {mode: 'full'})
validate_workflow(template)

# Step 3: MANDATORY attribution
# "Based on template by **Author Name** (@username). View at: URL"
```

### Node Configuration Pattern

```bash
# Step 1: Discover available nodes (parallel)
search_nodes({query: 'slack', includeExamples: true})
list_nodes({category: 'communication'})

# Step 2: Get node configuration details
get_node_essentials('n8n-nodes-base.slack', {includeExamples: true})

# Step 3: Validate before using
validate_node_minimal('n8n-nodes-base.slack', config)
validate_node_operation('n8n-nodes-base.slack', fullConfig, 'runtime')
```

### Silent Execution Pattern (CRITICAL)

```bash
# ❌ BAD - commentary between tools
"Let me search for Slack nodes..."
[search_nodes]
"Great! Now let me get details..."
[get_node_essentials]

# ✅ GOOD - silent execution, respond after completion
[search_nodes AND get_node_essentials in parallel]
[All tools complete]
"Found Slack node with 15 configuration examples.
Key parameters: channel, message, authentication."
```

### Parallel Execution Pattern (MANDATORY for performance)

```bash
# ✅ GOOD - parallel execution for independent operations
[Single message with multiple tool calls]:
search_templates_by_metadata(...)
get_templates_for_task(...)
search_nodes(...)
list_nodes(...)

# ❌ BAD - sequential execution
search_templates_by_metadata(...)
[wait for response]
get_templates_for_task(...)
[wait for response]
```

## 📦 N8N Package Management

### Essential N8N Dependencies

```json
{
  "dependencies": {
    "n8n": "^2.8.0"
  }
}
```

### N8N MCP Server (MANDATORY)

The n8n-MCP server must be installed and configured for all N8N development:
- Provides template discovery and validation
- Enables node configuration assistance
- Offers workflow deployment and monitoring
- Includes auto-fix for common errors

## 🔄 Error Handling (MANDATORY PATTERNS)

### Node-Level Error Handling

```json
{
  "continueOnFail": true,  // Continue workflow on node failure
  "retryOnFail": true,
  "maxTries": 3,
  "waitBetweenTries": 1000  // milliseconds
}
```

### Workflow-Level Error Handling

```json
{
  "errorWorkflow": "error-handler-workflow-id",  // Dedicated error workflow
  "settings": {
    "errorWorkflow": {
      "enabled": true
    }
  }
}
```

### Expression Error Handling

```javascript
// ALWAYS use try-catch in Code nodes
try {
  const result = riskyOperation(item.json);
  return { json: result };
} catch (error) {
  return {
    json: {
      error: error.message,
      status: 'failed',
      timestamp: new Date().toISOString()
    }
  };
}

// ALWAYS use null coalescing in expressions
$json?.field ?? 'default'
$node["NodeName"]?.json?.value ?? null
```

## 🔐 Security Requirements (MANDATORY)

### Webhook Security
- **ALWAYS use authentication** for production webhooks
- **Validate webhook payloads** with schema validation
- **Use HTTPS only** for production endpoints
- **Implement rate limiting** for public webhooks

### Credential Security
- **NEVER expose credentials** in workflow JSON
- **Use environment variables** for all sensitive data
- **Rotate credentials regularly**
- **Audit credential access** in workflow executions

### Data Validation
- **VALIDATE all external inputs** with Code nodes
- **Sanitize user data** before processing
- **Check data types** explicitly
- **Handle unexpected data** gracefully

## 🚀 Performance Guidelines

### Workflow Optimization
- **Use batch processing** for large datasets (splitInBatches node)
- **Minimize Code nodes** - use native nodes when possible
- **Parallel branch processing** for independent operations
- **Efficient expression language** - avoid complex transformations in expressions

### Resource Management
- **Set appropriate timeouts** for HTTP requests (default: 5 minutes)
- **Limit concurrent executions** for resource-intensive workflows
- **Clean up temporary data** after processing
- **Monitor execution times** with n8n_list_executions

## 💅 Workflow Development Commands

```bash
# Local N8N instance
n8n start                    # Start N8N
n8n start --tunnel          # Start with webhook tunnel

# n8n-MCP validation
validate_workflow(workflow)          # Validate complete workflow
validate_node_minimal(type, config)  # Quick node validation
validate_node_operation(type, config, 'runtime')  # Full validation

# n8n-MCP deployment
n8n_create_workflow(workflow)       # Deploy workflow
n8n_validate_workflow(id)           # Post-deployment validation
n8n_list_executions()               # Monitor executions
n8n_autofix_workflow(id)            # Auto-fix common errors
```

## ⚠️ CRITICAL GUIDELINES (MUST FOLLOW ALL)

1. **ALWAYS use n8n-MCP tools** - All N8N operations require MCP validation
2. **NEVER trust defaults** - Explicitly configure ALL node parameters
3. **ALWAYS use template-first approach** - Check 2,500+ templates before building
4. **MUST use multi-level validation** - validate_node_minimal → validate_node_operation → validate_workflow
5. **ALWAYS execute tools silently** - No commentary between tool calls, respond after completion
6. **MUST use parallel execution** - Execute independent operations simultaneously
7. **NEVER skip validation** - Validate at every step before proceeding
8. **ALWAYS use 4-parameter connection format** - source, target, sourcePort, targetPort (+ branch for IF nodes)
9. **MUST handle errors gracefully** - Try-catch in Code nodes, null coalescing in expressions
10. **ALWAYS attribute templates** - Mandatory credit with author name, username, and URL
11. **NEVER hardcode credentials** - Use N8N credential system with environment variables
12. **MUST test before deployment** - Use sample data and validate all execution paths

## 📋 Pre-Deployment Checklist (MUST COMPLETE ALL)

- [ ] Template search completed (`search_templates_by_metadata`, `get_templates_for_task`)
- [ ] All nodes validated with n8n-MCP (`validate_node_minimal`, `validate_node_operation`)
- [ ] Workflow structure validated (`validate_workflow`)
- [ ] Workflow connections validated (`validate_workflow_connections`)
- [ ] Expression syntax validated (`validate_workflow_expressions`)
- [ ] All node parameters explicitly configured (NO defaults relied upon)
- [ ] Credentials properly configured using N8N credential system
- [ ] Error handling implemented (retry logic, error workflows, try-catch blocks)
- [ ] Null/undefined handling in all expressions (using ?. and ??)
- [ ] IF node connections include "branch" parameter
- [ ] All conditional branches tested (true, false, all switch cases)
- [ ] Template attribution included (if using template)
- [ ] Test data execution successful
- [ ] Error scenarios tested with invalid data
- [ ] Webhook security configured (authentication, HTTPS)
- [ ] Production deployment validated (`n8n_create_workflow`, `n8n_validate_workflow`)
- [ ] Execution monitoring configured (`n8n_list_executions`)

### FORBIDDEN Practices
- **NEVER rely on default node parameter values** - causes runtime failures
- **NEVER skip n8n-MCP validation** - prevents common errors
- **NEVER use incorrect connection format** - must be 4 separate string parameters
- **NEVER forget IF node branch parameter** - causes routing errors
- **NEVER hardcode credentials** - security risk
- **NEVER ignore template search** - 2,500+ templates available
- **NEVER execute tools with commentary** - silent execution required
- **NEVER use sequential execution for independent operations** - parallel required
- **NEVER skip error handling** - workflows must be resilient
- **NEVER ignore null/undefined** - expressions must handle safely
- **NEVER deploy without testing** - validate with sample data first
- **NEVER use Code nodes unnecessarily** - prefer native nodes

---

## Most Popular N8N Nodes (for get_node_essentials)

1. **n8n-nodes-base.code** - JavaScript/Python scripting
2. **n8n-nodes-base.httpRequest** - HTTP API calls
3. **n8n-nodes-base.webhook** - Event-driven triggers
4. **n8n-nodes-base.set** - Data transformation
5. **n8n-nodes-base.if** - Conditional routing
6. **n8n-nodes-base.manualTrigger** - Manual workflow execution
7. **n8n-nodes-base.respondToWebhook** - Webhook responses
8. **n8n-nodes-base.scheduleTrigger** - Time-based triggers
9. **@n8n/n8n-nodes-langchain.agent** - AI agents
10. **n8n-nodes-base.googleSheets** - Spreadsheet integration
11. **n8n-nodes-base.merge** - Data merging
12. **n8n-nodes-base.switch** - Multi-branch routing
13. **n8n-nodes-base.telegram** - Telegram bot integration
14. **@n8n/n8n-nodes-langchain.lmChatOpenAi** - OpenAI chat models
15. **n8n-nodes-base.splitInBatches** - Batch processing
16. **n8n-nodes-base.openAi** - OpenAI legacy node
17. **n8n-nodes-base.gmail** - Email automation
18. **n8n-nodes-base.function** - Custom functions
19. **n8n-nodes-base.stickyNote** - Workflow documentation
20. **n8n-nodes-base.executeWorkflowTrigger** - Sub-workflow calls

**Note:** LangChain nodes use the `@n8n/n8n-nodes-langchain.` prefix, core nodes use `n8n-nodes-base.`

---

*This guide is optimized for N8N workflow automation with n8n-MCP server integration. Keep it updated as N8N evolves.*
*Focus on template-first development, explicit configuration, and multi-level validation in all workflow development.*
*Last updated: January 2025*

# N8N Workflow Automation Patterns & Best Practices

This document provides curated N8N patterns, common workflows, and best practices for building robust workflow automation with the n8n-MCP server.

## Table of Contents
1. [n8n-MCP Server Integration](#n8n-mcp-server-integration)
2. [Template-First Development](#template-first-development)
3. [Common Workflow Patterns](#common-workflow-patterns)
4. [Node Configuration Patterns](#node-configuration-patterns)
5. [Expression Language Patterns](#expression-language-patterns)
6. [Error Handling Patterns](#error-handling-patterns)
7. [Credential Management](#credential-management)
8. [Performance Optimization](#performance-optimization)
9. [Testing & Validation](#testing--validation)
10. [Production Deployment](#production-deployment)

---

## n8n-MCP Server Integration

### Core Principles

**1. Silent Execution**
Execute n8n-MCP tools without commentary. Only respond AFTER all tools complete.

```
❌ BAD:
"Let me search for Slack nodes..."
[search_nodes]
"Great! Now let me get details..."
[get_node_essentials]

✅ GOOD:
[Execute search_nodes and get_node_essentials in parallel]
[All tools complete]
"Found Slack node with 15 configuration examples. Key parameters: channel, message, authentication."
```

**2. Parallel Execution**
When operations are independent, execute them in parallel for maximum performance.

```bash
# ✅ GOOD - Parallel execution
[Single message with multiple tool calls]:
  search_templates_by_metadata({complexity: "simple"})
  get_templates_for_task('webhook_processing')
  search_nodes({query: 'slack', includeExamples: true})

# ❌ BAD - Sequential execution
search_templates_by_metadata({complexity: "simple"})
[wait for response]
get_templates_for_task('webhook_processing')
[wait for response]
```

**3. Templates First**
ALWAYS check templates before building from scratch (2,500+ available).

```bash
# Step 1: Template discovery (parallel)
search_templates_by_metadata({
  requiredService: 'slack',
  complexity: 'simple',
  targetAudience: 'marketers'
})
get_templates_for_task('slack_notification')

# Step 2: Use template if found
get_template(templateId, {mode: 'full'})
validate_workflow(template)
```

**4. Multi-Level Validation**
Use progressive validation: validate_node_minimal → validate_node_operation → validate_workflow

```bash
# Level 1: Quick check during development
validate_node_minimal(nodeType, config)

# Level 2: Comprehensive validation before building
validate_node_operation(nodeType, config, 'runtime')

# Level 3: Complete workflow validation
validate_workflow(workflow)
validate_workflow_connections(workflow)
validate_workflow_expressions(workflow)
```

**5. Never Trust Defaults**
ALWAYS explicitly configure ALL parameters that control node behavior.

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

---

## Template-First Development

### Template Discovery Strategy

**By Complexity**:
```bash
search_templates_by_metadata({complexity: "simple"})       # Beginners
search_templates_by_metadata({complexity: "intermediate"}) # Standard
search_templates_by_metadata({complexity: "advanced"})     # Complex
```

**By Service**:
```bash
search_templates_by_metadata({requiredService: "slack"})
search_templates_by_metadata({requiredService: "gmail"})
search_templates_by_metadata({requiredService: "googleSheets"})
```

**By Target Audience**:
```bash
search_templates_by_metadata({targetAudience: "marketers"})
search_templates_by_metadata({targetAudience: "developers"})
search_templates_by_metadata({targetAudience: "analysts"})
```

**By Task**:
```bash
get_templates_for_task('slack_notification')
get_templates_for_task('email_automation')
get_templates_for_task('data_sync')
get_templates_for_task('webhook_processing')
```

### Template Attribution (MANDATORY)

When using templates, ALWAYS provide attribution:

```markdown
**Template Attribution**: Based on template by **[Author Name]** (@[username]).
View at: https://n8n.io/workflows/[template-id]
```

Example:
```markdown
**Template Attribution**: Based on template by **David Ashby** (@cfomodz).
View at: https://n8n.io/workflows/2414
```

---

## Common Workflow Patterns

### Pattern 1: Webhook → API → Notification

**Use Case**: Receive webhook, process data, call API, send notification

```yaml
workflow_structure:
  trigger:
    node: "Webhook"
    type: "n8n-nodes-base.webhook"
    config:
      httpMethod: "POST"
      path: "/api/process"
      authentication: "headerAuth"
      responseMode: "lastNode"

  processing:
    - node: "Set"
      type: "n8n-nodes-base.set"
      purpose: "Extract and transform webhook data"

    - node: "HTTP Request"
      type: "n8n-nodes-base.httpRequest"
      purpose: "Call external API with transformed data"

  logic:
    - node: "IF"
      type: "n8n-nodes-base.if"
      purpose: "Check API response status"

  output:
    success:
      - node: "Slack"
        type: "n8n-nodes-base.slack"
        purpose: "Success notification"

    error:
      - node: "Email"
        type: "n8n-nodes-base.gmail"
        purpose: "Error notification"
```

### Pattern 2: Scheduled Data Sync

**Use Case**: Periodic sync between two systems

```yaml
workflow_structure:
  trigger:
    node: "Schedule Trigger"
    type: "n8n-nodes-base.scheduleTrigger"
    config:
      cronExpression: "0 */6 * * *"  # Every 6 hours

  processing:
    - node: "HTTP Request - Source"
      purpose: "Fetch data from source system"

    - node: "Code"
      purpose: "Transform data to target format"

    - node: "Split in Batches"
      purpose: "Process large datasets in chunks"

    - node: "HTTP Request - Target"
      purpose: "Send data to target system"
      continueOnFail: true
      retryOnFail: true
      maxTries: 3
```

### Pattern 3: Conditional Multi-Path Processing

**Use Case**: Route data to different handlers based on conditions

```yaml
workflow_structure:
  trigger:
    node: "Webhook"

  logic:
    - node: "Switch"
      type: "n8n-nodes-base.switch"
      purpose: "Route based on event type"
      rules:
        - condition: "$json.type === 'order'"
          route: "order_processing"
        - condition: "$json.type === 'refund'"
          route: "refund_processing"
        - condition: "$json.type === 'inquiry'"
          route: "inquiry_processing"

  handlers:
    order_processing:
      - node: "Create Invoice"
      - node: "Send Confirmation Email"

    refund_processing:
      - node: "Process Refund"
      - node: "Update Accounting"

    inquiry_processing:
      - node: "Create Support Ticket"
      - node: "Notify Support Team"
```

---

## Node Configuration Patterns

### HTTP Request Node Pattern

```json
{
  "name": "API Call",
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 1,
  "position": [250, 300],
  "parameters": {
    "method": "POST",
    "url": "https://api.example.com/v1/endpoint",
    "authentication": "predefinedCredentialType",
    "credentialName": "API Credentials",
    "options": {
      "timeout": 10000,
      "retry": {
        "enabled": true,
        "maxRetries": 3,
        "retryDelay": 1000
      },
      "response": {
        "responseFormat": "json"
      }
    },
    "bodyParameters": {
      "parameters": [
        {
          "name": "data",
          "value": "={{$json.processedData}}"
        }
      ]
    },
    "headerParameters": {
      "parameters": [
        {
          "name": "Content-Type",
          "value": "application/json"
        },
        {
          "name": "X-Custom-Header",
          "value": "={{$env.CUSTOM_HEADER_VALUE}}"
        }
      ]
    }
  },
  "continueOnFail": false
}
```

### Webhook Node Pattern

```json
{
  "name": "Webhook Trigger",
  "type": "n8n-nodes-base.webhook",
  "typeVersion": 1,
  "position": [250, 300],
  "webhookId": "unique-webhook-id",
  "parameters": {
    "httpMethod": "POST",
    "path": "automation-webhook",
    "authentication": "headerAuth",
    "credentialName": "Webhook Auth",
    "responseMode": "responseNode",
    "options": {
      "noResponseBody": false,
      "responseData": "={{$json}}"
    }
  }
}
```

### Code Node Pattern (JavaScript)

```javascript
// Input: items array with webhook data
// Output: processed items array

const processedItems = [];

for (const item of items) {
  try {
    // Validate required fields
    if (!item.json.email || !item.json.name) {
      throw new Error('Missing required fields: email or name');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(item.json.email)) {
      throw new Error(`Invalid email format: ${item.json.email}`);
    }

    // Transform data
    const transformedData = {
      id: item.json.id || `generated-${Date.now()}`,
      email: item.json.email.toLowerCase().trim(),
      name: item.json.name.trim(),
      createdAt: new Date().toISOString(),
      source: item.json.source || 'webhook',
      metadata: {
        processedBy: 'n8n-workflow',
        version: '1.0'
      }
    };

    processedItems.push({
      json: transformedData,
      pairedItem: { item: items.indexOf(item) }
    });

  } catch (error) {
    // Handle errors gracefully - don't stop workflow
    processedItems.push({
      json: {
        error: error.message,
        originalData: item.json,
        status: 'validation_failed',
        timestamp: new Date().toISOString()
      },
      pairedItem: { item: items.indexOf(item) }
    });
  }
}

return processedItems;
```

### IF Node Pattern with Branch Connections

```json
{
  "name": "Check Status",
  "type": "n8n-nodes-base.if",
  "typeVersion": 1,
  "position": [450, 300],
  "parameters": {
    "conditions": {
      "boolean": [],
      "number": [],
      "string": [
        {
          "value1": "={{$json.status}}",
          "operation": "equal",
          "value2": "success"
        }
      ]
    }
  }
}

// Connection Pattern for IF node (CRITICAL)
// TRUE branch connection
{
  "type": "addConnection",
  "source": "Check Status",
  "target": "Success Handler",
  "sourcePort": "main",
  "targetPort": "main",
  "branch": "true"  // REQUIRED for IF node
}

// FALSE branch connection
{
  "type": "addConnection",
  "source": "Check Status",
  "target": "Error Handler",
  "sourcePort": "main",
  "targetPort": "main",
  "branch": "false"  // REQUIRED for IF node
}
```

---

## Expression Language Patterns

### Data Access Patterns

```javascript
// Current node data
$json                          // All data from current node
$json['fieldName']            // Specific field
$json.nestedObject.field      // Nested field access

// Previous node data
$node["Node Name"].json       // All data from specific node
$node["Node Name"].json['field']  // Specific field from node
$node["HTTP Request"].json.response  // API response data

// All items
$items                        // Array of all items
$items[0].json               // First item's data
$items.length                // Number of items

// Parameters
$parameter['parameterName']   // Node parameter value
$env.VARIABLE_NAME           // Environment variable
```

### Safe Data Access (Always Use)

```javascript
// Optional chaining and nullish coalescing
$json?.optionalField ?? 'default value'
$node["API Call"]?.json?.data ?? null
$json?.user?.email ?? 'no-email@example.com'

// Type checking
typeof $json.field === 'string' ? $json.field : String($json.field)
Array.isArray($json.items) ? $json.items : []
```

### Data Transformation Patterns

```javascript
// String operations
$json.email.toLowerCase().trim()
$json.name.split(' ')[0]  // First name
$json.text.substring(0, 100)  // First 100 characters
$json.url.replace('http://', 'https://')

// Array operations
$json.items.map(item => item.id)  // Extract IDs
$json.items.filter(item => item.active === true)  // Filter active
$json.items.find(item => item.id === 123)  // Find specific
$json.items.reduce((sum, item) => sum + item.value, 0)  // Sum values

// Date operations
DateTime.now().toISO()  // Current timestamp
DateTime.fromISO($json.dateString)  // Parse date
DateTime.now().plus({days: 7}).toISO()  // 7 days from now
DateTime.fromISO($json.date).toFormat('yyyy-MM-dd')  // Format date

// JSON operations
JSON.stringify($json.object)  // Object to string
JSON.parse($json.jsonString)  // String to object
Object.keys($json.object)  // Get object keys
Object.values($json.object)  // Get object values
```

### Conditional Expressions

```javascript
// Ternary operator
$json.status === 'active' ? 'Enabled' : 'Disabled'

// Multiple conditions
$json.age >= 18 && $json.verified === true ? 'Approved' : 'Pending'

// Null/undefined handling
$json.field || 'fallback value'
$json?.field ?? 'default value'
```

---

## Error Handling Patterns

### Node-Level Error Handling

```json
{
  "continueOnFail": true,  // Don't stop workflow on node failure
  "retryOnFail": true,     // Retry on failure
  "maxTries": 3,           // Maximum retry attempts
  "waitBetweenTries": 1000 // Wait 1 second between retries
}
```

### Workflow-Level Error Handling

```json
{
  "settings": {
    "errorWorkflow": {
      "enabled": true,
      "workflowId": "error-handler-workflow-id"
    }
  }
}
```

### Code Node Error Handling

```javascript
// Always wrap risky operations in try-catch
const processedItems = [];

for (const item of items) {
  try {
    // Risky operation
    const result = await externalAPICall(item.json);
    processedItems.push({ json: result });

  } catch (error) {
    // Log error and continue processing
    processedItems.push({
      json: {
        error: error.message,
        stack: error.stack,
        originalData: item.json,
        status: 'error',
        timestamp: new Date().toISOString()
      }
    });
  }
}

return processedItems;
```

### Expression Error Handling

```javascript
// Safe property access
$json?.user?.email ?? 'unknown@example.com'

// Safe array access
$json.items?.[0]?.name ?? 'No items'

// Type conversion with fallback
parseInt($json.count) || 0
parseFloat($json.price) || 0.0
String($json.value || '')

// Validation before use
$json.email && $json.email.includes('@') ? $json.email : null
```

---

## Credential Management

### Credential Types

**API Key (Header Auth)**:
```json
{
  "name": "API Key Credentials",
  "type": "httpHeaderAuth",
  "data": {
    "name": "Authorization",
    "value": "Bearer {{$env.API_KEY}}"
  }
}
```

**OAuth2**:
```json
{
  "name": "OAuth2 Credentials",
  "type": "oAuth2Api",
  "data": {
    "grantType": "authorizationCode",
    "authUrl": "https://api.example.com/oauth/authorize",
    "accessTokenUrl": "https://api.example.com/oauth/token",
    "clientId": "={{$env.OAUTH_CLIENT_ID}}",
    "clientSecret": "={{$env.OAUTH_CLIENT_SECRET}}",
    "scope": "read write"
  }
}
```

**Database Connection**:
```json
{
  "name": "Database Credentials",
  "type": "postgres",
  "data": {
    "host": "={{$env.DB_HOST}}",
    "port": 5432,
    "database": "={{$env.DB_NAME}}",
    "user": "={{$env.DB_USER}}",
    "password": "={{$env.DB_PASSWORD}}",
    "ssl": true
  }
}
```

### Environment Variables

Always use environment variables for sensitive data:

```bash
# .env file (NEVER commit to version control)
API_KEY=your-api-key-here
OAUTH_CLIENT_ID=your-client-id
OAUTH_CLIENT_SECRET=your-client-secret
DB_HOST=localhost
DB_NAME=production_db
DB_USER=db_user
DB_PASSWORD=secure-password
WEBHOOK_SECRET=webhook-secret-key
```

---

## Performance Optimization

### Batch Processing Pattern

```json
{
  "name": "Split in Batches",
  "type": "n8n-nodes-base.splitInBatches",
  "parameters": {
    "batchSize": 100,  // Process 100 items at a time
    "options": {}
  }
}
```

### Parallel Branch Processing

```yaml
workflow_structure:
  trigger:
    - node: "Webhook"

  parallel_processing:
    branch_1:
      - node: "Process Type A"
      - node: "Store Type A Results"

    branch_2:
      - node: "Process Type B"
      - node: "Store Type B Results"

    branch_3:
      - node: "Process Type C"
      - node: "Store Type C Results"

  merge:
    - node: "Merge"
      type: "n8n-nodes-base.merge"
      purpose: "Combine results from parallel branches"
```

### Efficient Expression Language

```javascript
// ✅ GOOD - Simple, direct access
$json.field

// ❌ BAD - Complex transformation in expression
$json.items.map(i => ({...i, new: i.old.split(',').map(x => x.trim())}))

// ✅ GOOD - Use Code node for complex transformations
// Move complex logic to Code node
```

---

## Testing & Validation

### Validation Workflow

```bash
# 1. Node validation during development
validate_node_minimal('n8n-nodes-base.webhook', config)

# 2. Full node validation before adding to workflow
validate_node_operation('n8n-nodes-base.webhook', fullConfig, 'runtime')

# 3. Workflow validation before deployment
validate_workflow(workflow)
validate_workflow_connections(workflow)
validate_workflow_expressions(workflow)

# 4. Deployment validation
n8n_create_workflow(workflow)
n8n_validate_workflow(workflowId)

# 5. Execution testing
n8n_trigger_webhook_workflow(workflowId, testData)
n8n_list_executions({limit: 10, status: 'error'})

# 6. Auto-fix common errors
n8n_autofix_workflow(workflowId)
```

### Test Data Patterns

```json
// Webhook test data
{
  "event": "user.created",
  "user": {
    "id": "test-user-123",
    "email": "test@example.com",
    "name": "Test User",
    "created_at": "2025-01-26T10:00:00Z"
  },
  "metadata": {
    "source": "test",
    "version": "1.0"
  }
}

// Error test data (invalid)
{
  "event": "user.created",
  "user": {
    "id": null,  // Invalid - should fail validation
    "email": "invalid-email",  // Invalid format
    "name": "",  // Empty name
  }
}
```

---

## Production Deployment

### Pre-Deployment Checklist

- [ ] Template search completed
- [ ] All nodes validated with n8n-MCP
- [ ] Workflow structure validated
- [ ] Expression syntax validated
- [ ] All parameters explicitly configured
- [ ] Credentials properly secured
- [ ] Error handling implemented
- [ ] Null handling in expressions
- [ ] IF node branch parameters set
- [ ] All branches tested
- [ ] Template attribution included
- [ ] Test execution successful
- [ ] Error scenarios tested
- [ ] Webhook security configured

### Deployment Pattern

```bash
# 1. Final workflow validation
validate_workflow(finalWorkflow)

# 2. Deploy to production
const deployedWorkflow = n8n_create_workflow(finalWorkflow)

# 3. Post-deployment validation
n8n_validate_workflow(deployedWorkflow.id)

# 4. Test production workflow
n8n_trigger_webhook_workflow(deployedWorkflow.id, testPayload)

# 5. Monitor first executions
n8n_list_executions({workflowId: deployedWorkflow.id, limit: 5})

# 6. Auto-fix if needed
n8n_autofix_workflow(deployedWorkflow.id)
```

### Monitoring Pattern

```bash
# Check recent executions
n8n_list_executions({limit: 20})

# Check failed executions
n8n_list_executions({status: 'error', limit: 10})

# Check specific workflow
n8n_list_executions({workflowId: 'workflow-id', limit: 10})
```

---

## Common Gotchas & Solutions

### Gotcha 1: Default Parameter Values

**Problem**: Relying on defaults causes runtime failures

```javascript
// ❌ FAILS - missing required channelId parameter
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

### Gotcha 2: Connection Format

**Problem**: Using wrong connection format

```javascript
// ❌ WRONG - object format
{
  type: "addConnection",
  connection: {source: {...}, destination: {...}}
}

// ✅ CORRECT - 4 string parameters
{
  type: "addConnection",
  "source": "source-node-id",
  "target": "target-node-id",
  "sourcePort": "main",
  "targetPort": "main"
}
```

### Gotcha 3: IF Node Branch Parameter

**Problem**: Forgetting branch parameter for IF nodes

```javascript
// ❌ WRONG - missing branch parameter
{
  type: "addConnection",
  source: "If Node",
  target: "Handler",
  sourcePort: "main",
  targetPort: "main"
}

// ✅ CORRECT - branch parameter included
{
  type: "addConnection",
  source: "If Node",
  target: "True Handler",
  sourcePort: "main",
  targetPort: "main",
  branch: "true"  // REQUIRED
}
```

### Gotcha 4: Null/Undefined Handling

**Problem**: Not handling null/undefined in expressions

```javascript
// ❌ FAILS if field is null/undefined
$json.user.email

// ✅ SAFE - handles null/undefined
$json?.user?.email ?? 'no-email@example.com'
```

### Gotcha 5: Template Attribution

**Problem**: Forgetting to attribute templates

```markdown
❌ WRONG: Using template without attribution

✅ CORRECT:
**Template Attribution**: Based on template by **David Ashby** (@cfomodz).
View at: https://n8n.io/workflows/2414
```

---

This documentation should be referenced when creating N8N PRPs to ensure comprehensive workflow context and one-pass implementation success.

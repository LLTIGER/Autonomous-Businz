name: "N8N Enhanced PRP Template v1 - Workflow Automation Development"
description: |

---

## Goal

**Workflow Goal**: [Specific, measurable N8N workflow - automation, integration, data transformation, notification system]

**Deliverable**: [Concrete artifact - N8N workflow JSON, custom nodes, credential configuration, integration]

**Success Definition**: [How you'll know this workflow is complete, tested, and deployed successfully]

## 📸 Visual Workflow Reference & Template Analysis Requirements

**N8N Workflow Demo/Reference Analysis (MANDATORY for all workflow projects with visual references)**:

**1. Workflow Reference Source:**
- **Reference Type**: `[N8N workflow template / Workflow screenshot / Diagram / Existing workflow / Template ID]`
- **Reference URL/Location**: `[Provide template ID from n8n.io/workflows, file path, or diagram link]`
- **Reference Screenshots**: `[Required - workflow canvas, node configurations, execution results]`

**2. Comprehensive N8N Workflow Dissection:**
```yaml
n8n_workflow_analysis:
  step_1_workflow_capture:
    - [ ] Full workflow canvas screenshot
    - [ ] Individual node configuration screenshots
    - [ ] Node connection flow diagram
    - [ ] Execution result examples (success and error states)
    - [ ] Credential and authentication setup screenshots
    - [ ] Expression and data transformation examples
    - [ ] Error handling and branching logic visualization

  step_2_workflow_measurement:
    - [ ] Number of nodes and workflow complexity
    - [ ] Data transformation steps and mapping logic
    - [ ] API endpoint configurations and parameters
    - [ ] Execution timing and performance metrics
    - [ ] Error handling coverage and retry logic
    - [ ] Credential requirements and security considerations

  step_3_technical_workflow_analysis:
    - [ ] Node type identification (trigger, action, transform, logic, output)
    - [ ] Expression language usage and complexity
    - [ ] Data structure transformation patterns
    - [ ] API integration patterns and authentication methods
    - [ ] Error handling strategies and fallback mechanisms
    - [ ] Performance optimization opportunities
    - [ ] Workflow versioning and deployment strategy
```

**3. N8N-Specific Reference Requirements:**
- **Template vs Custom Build identification**
- **Node compatibility and version requirements**
- **Performance optimization opportunities**
- **Security and credential management**
- **Integration complexity assessment**

**4. N8N Workflow Analysis Report:**
```yaml
# N8N Workflow Reference Analysis (Auto-generated)
n8n_workflow_reference_analysis:
  workflow_structure:
    trigger_node: "[webhook, schedule, manual, external event]"
    core_processing: "[data transformation, API calls, logic branches]"
    output_nodes: "[notification, database, file, API response]"
    error_handling: "[error workflow, retry logic, notification]"

  node_architecture:
    trigger: "[trigger type, configuration, activation status]"
    data_processing: "[transformation logic, expression usage]"
    integrations: "[service nodes, API configurations, credentials]"
    conditionals: "[IF nodes, Switch nodes, branching logic]"
    output: "[final actions, responses, data storage]"

  performance_targets:
    execution_time: "[target workflow execution time]"
    error_rate: "[acceptable failure rate and retry strategy]"
    scalability: "[concurrent executions, queue management]"
```

## 🔧 N8N Node & Template Requirements

**Required Nodes & Templates**:

**1. Existing N8N Template?**
- [ ] Using n8n.io workflow template? (Specify template ID and customization needs)
- [ ] Using community template? (Template source and modifications required)
- [ ] Building from scratch? (Justify approach and provide workflow design)
- [ ] Adapting existing workflow? (Source workflow and required changes)

**2. Template Structure & Node Framework:**
- **Template Source**: `[n8n.io/workflows/{id} / Community template / Custom build / Existing workflow]`
- **Template ID**: `[Template ID number or name]`
- **Core Nodes Required**: `[List of essential nodes - HTTP Request, Webhook, Code, Set, IF, etc.]`
- **Integration Nodes**: `[Slack, Gmail, Google Sheets, Database, API services, etc.]`
- **Logic Nodes**: `[IF, Switch, Merge, Split in Batches, etc.]`

**3. N8N-Specific Asset Strategy:**
- **Credentials Required**: `[API keys, OAuth tokens, database credentials, webhook URLs]`
- **Data Sources**: `[APIs, databases, files, webhooks, scheduled triggers]`
- **Output Destinations**: `[Notifications, databases, files, API responses, webhooks]`
- **Error Handling**: `[Error workflows, retry mechanisms, notification systems]`
- **Testing Data**: `[Sample payloads, test webhooks, mock API responses]`

**4. Workflow Architecture & Node Pattern:**
- **Trigger Type**: `[Webhook / Schedule / Manual / App trigger / Email / Database]`
- **Processing Pattern**: `[Sequential / Parallel / Conditional / Loop-based]`
- **Data Flow**: `[Linear / Branching / Converging / Complex multi-path]`
- **Error Strategy**: `[Continue on fail / Stop on error / Custom error handling / Retry logic]`

**5. N8N Template & Node Integration:**
```yaml
# N8N Template Configuration (if using template)
n8n_template_setup:
  template_selection:
    - [ ] Template ID and source identified
    - [ ] Template complexity assessment (simple/intermediate/advanced)
    - [ ] Required customizations documented
    - [ ] Node compatibility verified

  node_requirements:
    - [ ] Core nodes: Webhook, HTTP Request, Set, IF
    - [ ] Integration nodes: [Service-specific nodes]
    - [ ] Logic nodes: Switch, Merge, Split operations
    - [ ] Custom Code nodes (if needed)
    - [ ] Error handling nodes

  customizations:
    - [ ] Node configuration modifications
    - [ ] Expression language customizations
    - [ ] Credential setup and security
    - [ ] Performance optimizations
    - [ ] Error handling enhancements

# N8N MCP Server Integration
n8n_mcp_strategy:
  - [ ] Use n8n_mcp for template discovery
  - [ ] Validate nodes before implementation
  - [ ] Test workflow with n8n_mcp tools
  - [ ] Deploy and monitor via MCP
```

**6. Development Workflow Strategy:**
```yaml
pre_development_phase:
  - [ ] Template/workflow analysis and node mapping
  - [ ] Credential inventory and security setup
  - [ ] Node selection and validation (via n8n-MCP)
  - [ ] Expression language pattern identification
  - [ ] Workflow architecture design and approval

development_phase:
  - [ ] Follow template structure or build custom workflow
  - [ ] Configure nodes with explicit parameters (NEVER rely on defaults)
  - [ ] Implement error handling and retry logic
  - [ ] Test expressions and data transformations
  - [ ] Validate workflow connections and data flow
```

## ⚙️ N8N Expression Language & Data Transformation Requirements

**N8N Expression & Data Questions (MANDATORY for Professional Workflow Automation)**:

**1. Expression Language System:**
- **Expression Complexity**: `[Simple $json references / Complex data transformations / Advanced JavaScript]`
- **Data Mapping Strategy**: `[$json, $node, $items, $parameter access patterns]`
- **Expression Validation**: `[Manual testing / Automated validation / MCP validation]`
- **Error Handling**: `[Try-catch in expressions / Default values / Error workflow routing]`

**2. N8N Expression Implementation:**
```yaml
n8n_expressions:
  data_access:
    current_node: "$json['fieldName']"
    previous_node: "$node['NodeName'].json['fieldName']"
    all_items: "$items"
    parameters: "$parameter['paramName']"

  data_transformation:
    string_operations: "[.toLowerCase(), .toUpperCase(), .trim(), .split()]"
    array_operations: "[.map(), .filter(), .reduce(), .length]"
    date_operations: "[DateTime.now(), DateTime.fromISO(), .plus(), .minus()]"
    json_operations: "[JSON.parse(), JSON.stringify(), Object.keys()]"

  validation_patterns:
    null_checks: "[$json?.field ?? 'default', typeof check, undefined handling]"
    type_conversion: "[parseInt(), parseFloat(), String(), Boolean()]"
    error_handling: "[try-catch blocks, default values, error routing]"
```

**3. Data Flow Architecture:**
- **Data Structure**: `[Flat JSON / Nested objects / Arrays / Mixed data types]`
- **Transformation Needs**: `[Field mapping / Data enrichment / Filtering / Aggregation]`
- **Validation Requirements**: `[Schema validation / Type checking / Required fields / Format validation]`

**4. N8N Workflow Expression Implementation:**
```yaml
n8n_workflow_expressions:
  node_connections:
    data_passing: "[main output, multiple outputs, branch-specific data]"
    expression_chaining: "[sequential transformations, data enrichment]"
    conditional_routing: "[IF node expressions, Switch node conditions]"

  performance_optimizations:
    batch_processing: "[Split in Batches node, batch size optimization]"
    parallel_execution: "[parallel branch processing, async operations]"
    memory_management: "[data cleanup, efficient transformations]"

  error_handling:
    validation_expressions: "[required field checks, type validation]"
    error_detection: "[try-catch in Code nodes, conditional error routing]"
    retry_logic: "[retry on fail configuration, exponential backoff]"
```

**5. N8N-Specific Expression Standards:**
- **Performance Impact**: All expressions must execute efficiently without blocking workflow
- **Error Resilience**: Expressions must handle null/undefined gracefully with defaults
- **Testability**: Expressions should be testable with sample data
- **Maintainability**: Complex expressions should be documented and modular

## User Persona (if applicable)

**Target User**: [Workflow executor - end user, admin, system, external service]

**Use Case**: [Primary automation scenario when this workflow will be triggered]

**User Journey**: [Step-by-step trigger → execution → completion flow]

**Pain Points Addressed**: [Manual processes automated, integration gaps bridged, efficiency improvements]

## Why

- [Automation value and operational impact]
- [Integration improvements and data flow optimization]
- [Time savings and error reduction]

## What

[Workflow behavior and technical requirements]

### Success Criteria

- [ ] [Specific measurable workflow execution outcomes]
- [ ] [Performance metrics - execution time, success rate, error handling]
- [ ] [Integration requirements - API connectivity, data accuracy, notification delivery]
- [ ] [Reliability standards - uptime, error recovery, data integrity]

## Recommended Skills for This PRP

> **Reference**: See `skills-ecosystem/prp-skill-maps/SKILL-PRP-MAPPING.md` for full mapping.

```yaml
# N8N workflow skills activation
skills_context:
  automation_core: # REQUIRED
    required:
      - mcp-builder               # MCP server creation for n8n integration
    recommended:
      - api-bible-automation      # API automation via Rube MCP
      - browser-use               # Web automation within workflows

  agent_tools: # For AI-enhanced workflows
    recommended:
      - agent-browser             # Browser automation via inference.sh
      - agent-tools               # 150+ AI apps for workflow nodes
      - replicate-cli             # AI model integration
      - replicate-integration     # Flux, SDXL deployment

  backend: # For custom code nodes
    recommended:
      - python-pro                # Python function nodes
      - nodejs-backend-patterns   # JS function nodes
```

## All Needed Context

### Context Completeness Check

_Before writing this PRP, validate: "If someone knew nothing about N8N or this workflow domain, would they have everything needed to implement this automation successfully?"_

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- url: https://docs.n8n.io/workflows/[specific-feature]
  why: [Specific N8N patterns needed - nodes, expressions, credentials, etc.]
  critical: [Key N8N insights that prevent common workflow development errors]

- url: https://docs.n8n.io/code/[cookbook-or-example]
  why: [Specific expression patterns or code examples needed]
  critical: [Expression language gotchas and best practices]

- url: https://n8n.io/workflows/[template-id]
  why: [Template reference for workflow structure and patterns]
  critical: [Template-specific configuration and customization needs]

- file: workflows/[existing_workflow].json
  why: [Specific N8N workflow pattern to follow - node structure, expressions]
  pattern: [Brief description of workflow pattern to extract]
  gotcha: [Known N8N constraints or node limitations]

- file: credentials/[credential_config].json
  why: [Authentication and credential setup patterns]
  pattern: [Reusable credential configuration]

- docfile: PRPs/ai_docs/n8n_patterns.md
  why: [Custom N8N documentation for complex patterns]
  section: [Specific section if document is large]
```

### Current Workflow/Codebase tree

```bash
workflows/
├── active/
│   ├── webhook_handlers/
│   ├── scheduled_jobs/
│   └── integrations/
├── templates/
└── archived/

credentials/
├── api_credentials.json
├── oauth_tokens.json
└── database_credentials.json

custom_nodes/
└── [custom node packages]
```

### Desired Workflow Structure with files to be added

```bash
workflows/
├── [feature_name]/
│   ├── main_workflow.json          # Primary workflow definition
│   ├── error_handler.json          # Error handling sub-workflow
│   ├── test_data.json              # Sample data for testing
│   ├── README.md                   # Workflow documentation
│   └── config/
│       ├── nodes_config.yaml       # Node configuration specs
│       └── expressions.yaml        # Reusable expression patterns

credentials/
├── [service]_credentials.json      # Service-specific credentials
└── webhook_urls.json               # Webhook endpoint configurations

validation/
├── workflow_schema.json            # Workflow structure validation
├── expression_tests.json           # Expression unit tests
└── integration_tests.json          # End-to-end test scenarios
```

### Known Gotchas of N8N & Node Quirks

```javascript
// CRITICAL: Never trust default parameter values
// ❌ FAILS at runtime
{resource: "message", operation: "post", text: "Hello"}

// ✅ WORKS - all parameters explicit
{resource: "message", operation: "post", select: "channel", channelId: "C123", text: "Hello"}

// CRITICAL: Expression language null handling
// Use optional chaining and nullish coalescing
const value = $json?.field ?? 'default';

// CRITICAL: Node connections require exact parameter format
// addConnection format (4 separate string parameters)
{
  "type": "addConnection",
  "source": "source-node-id",
  "target": "target-node-id",
  "sourcePort": "main",
  "targetPort": "main"
}

// CRITICAL: IF node multi-output routing with branch parameter
{
  "type": "addConnection",
  "source": "If Node",
  "target": "True Handler",
  "sourcePort": "main",
  "targetPort": "main",
  "branch": "true"  // REQUIRED for IF node routing
}

// CRITICAL: Data access patterns in expressions
$json           // Current node's JSON output
$node["NodeName"].json  // Specific node's output
$items          // All items in current execution
$parameter["name"]  // Node parameter access

// CRITICAL: Error handling in Code nodes
try {
  // Processing logic
  return items.map(item => {
    return { json: transformedData };
  });
} catch (error) {
  // Proper error handling with context
  throw new Error(`Transformation failed: ${error.message}`);
}
```

## Implementation Blueprint

### Workflow Architecture and Node Structure

Define workflow architecture with specific node types and configurations.

```yaml
# Workflow Architecture Example:
workflow_structure:
  trigger:
    type: "webhook"
    method: "POST"
    path: "/api/automation"
    authentication: "header_auth"
    response_mode: "immediate"

  processing_nodes:
    - node: "HTTP Request"
      purpose: "Fetch additional data from external API"
      config:
        method: "GET"
        url: "https://api.example.com/data"
        authentication: "predefinedCredentialType"
        response_format: "json"

    - node: "Code"
      purpose: "Transform and validate data"
      language: "javascript"
      validation: "Zod schema or manual validation"

    - node: "IF"
      purpose: "Conditional routing based on data validation"
      conditions: "[expression for validation check]"
      branches: ["true_path", "false_path"]

  output_nodes:
    success:
      - node: "Slack"
        purpose: "Send success notification"
        channel: "#notifications"
        message_template: "Workflow completed: {{$json.result}}"

    error:
      - node: "Email"
        purpose: "Alert team on failure"
        recipients: "team@example.com"
        subject: "Workflow Failed: {{$json.error}}"
```

### Implementation Tasks (ordered by dependencies)

```yaml
Task -2: COMPREHENSIVE workflow reference analysis (IF template provided)
  - FETCH: Template from n8n.io or existing workflow via n8n-MCP
  - ANALYZE: Node structure, connections, expressions, credentials
  - EXTRACT: Reusable patterns, node configurations, expression logic
  - VALIDATE: Node compatibility and version requirements via n8n-MCP
  - IDENTIFY: Customization needs and optimization opportunities
  - DOCUMENT: Complete workflow analysis report for implementation

Task -1: VALIDATE N8N template and node availability
  - SEARCH: Available nodes using n8n-MCP search_nodes
  - VALIDATE: Node configurations using validate_node_minimal and validate_node_operation
  - CHECK: Template compatibility with n8n-MCP get_template
  - IDENTIFY: Required custom nodes or modifications
  - PLAN: Credential setup and security configuration
  - DOCUMENT: Node selection and validation results

Task 0: SETUP N8N credentials and authentication
  - CREATE: Credential configurations for all services
  - CONFIGURE: OAuth flows, API keys, database connections
  - SECURE: Credential storage and environment variable setup
  - TEST: Credential validation and connection testing
  - DOCUMENT: Credential requirements and setup instructions

Task 1: CREATE workflow structure and trigger node
  - IMPLEMENT: Trigger node (webhook, schedule, manual, app trigger)
  - CONFIGURE: Trigger parameters explicitly (NEVER rely on defaults)
  - SETUP: Authentication and security for trigger
  - VALIDATE: Trigger configuration using n8n-MCP validate_node_minimal
  - TEST: Trigger activation and event reception
  - FOLLOW pattern: workflows/existing/trigger_pattern.json
  - NAMING: Descriptive workflow name, clear trigger configuration
  - PLACEMENT: workflows/[feature_name]/

Task 2: CREATE data processing and transformation nodes
  - IMPLEMENT: Data transformation logic (Set, Code, Function nodes)
  - CONFIGURE: Expression language for data mapping and validation
  - SETUP: Error handling with try-catch and default values
  - VALIDATE: Expression syntax and data transformation logic
  - TEST: With sample data payloads
  - FOLLOW pattern: workflows/existing/transformation_pattern.json
  - DEPENDENCIES: Import validation schemas, reusable expressions
  - PLACEMENT: Sequential after trigger node

Task 3: CREATE API integration and service nodes
  - IMPLEMENT: Service nodes (HTTP Request, Slack, Gmail, Database, etc.)
  - CONFIGURE: API endpoints, authentication, request/response formats
  - SETUP: Retry logic, timeout settings, error handling
  - VALIDATE: API connectivity and response handling using n8n-MCP
  - TEST: Integration with actual services or mock endpoints
  - FOLLOW pattern: workflows/existing/integration_pattern.json
  - DEPENDENCIES: Credentials from Task 0
  - PLACEMENT: After data processing nodes

Task 4: CREATE conditional logic and branching
  - IMPLEMENT: Logic nodes (IF, Switch, Merge)
  - CONFIGURE: Conditional expressions and routing logic
  - SETUP: Multiple output branches with proper connections
  - VALIDATE: Branch routing and data flow using validate_workflow_connections
  - TEST: All conditional paths with various data scenarios
  - FOLLOW pattern: workflows/existing/conditional_pattern.json
  - CRITICAL: Use "branch" parameter for IF node connections
  - PLACEMENT: Between processing and output nodes

Task 5: CREATE output and notification nodes
  - IMPLEMENT: Output nodes (notifications, database writes, file creation, responses)
  - CONFIGURE: Output formats, destinations, templates
  - SETUP: Success and error output handling
  - VALIDATE: Output node configurations and data formats
  - TEST: Actual output delivery and formatting
  - FOLLOW pattern: workflows/existing/output_pattern.json
  - DEPENDENCIES: Data from processing and logic nodes
  - PLACEMENT: Final nodes in workflow

Task 6: CREATE error handling workflow
  - IMPLEMENT: Error handling sub-workflow or error nodes
  - CONFIGURE: Error detection, logging, notification
  - SETUP: Retry mechanisms and fallback logic
  - VALIDATE: Error handling completeness
  - TEST: Forced errors and recovery scenarios
  - FOLLOW pattern: workflows/existing/error_handler.json
  - PLACEMENT: Parallel error handling path

Task 7: CREATE workflow tests and validation
  - IMPLEMENT: Test data sets and execution scenarios
  - CONFIGURE: Validation schemas for workflow inputs/outputs
  - SETUP: Automated testing via n8n-MCP or manual execution
  - VALIDATE: Complete workflow using validate_workflow via n8n-MCP
  - TEST: End-to-end execution with multiple scenarios
  - COVERAGE: All branches, error cases, edge cases
  - PLACEMENT: validation/[feature_name]/
```

### Implementation Patterns & Key Details

```javascript
// N8N Workflow Node Pattern (explicit configuration)
{
  "id": "unique-node-id",
  "name": "Descriptive Node Name",
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 1,
  "position": [250, 300],
  "parameters": {
    "method": "POST",
    "url": "https://api.example.com/endpoint",
    "authentication": "predefinedCredentialType",
    "options": {
      "timeout": 10000,
      "retry": {
        "enabled": true,
        "maxRetries": 3
      }
    }
  },
  "continueOnFail": false
}

// Expression Language Pattern (data transformation)
const currentData = $json['fieldName'];
const previousData = $node["Previous Node"].json['fieldName'];
const safeValue = $json?.optionalField ?? 'default value';

// Code Node Pattern (with error handling)
const processedItems = [];
for (const item of items) {
  try {
    if (!item.json.requiredField) {
      throw new Error('Missing required field');
    }
    processedItems.push({
      json: {
        originalId: item.json.id,
        processed: new Date().toISOString()
      }
    });
  } catch (error) {
    processedItems.push({
      json: {
        error: error.message,
        status: 'error'
      }
    });
  }
}
return processedItems;
```

### Integration Points

```yaml
CREDENTIALS:
  - add to: credentials/[service]_credentials.json
  - pattern: Secure credential storage with environment variables

WORKFLOW_CONNECTIONS:
  - add to: workflow connections array
  - pattern: 4-parameter connection format with branch support

ERROR_HANDLING:
  - add to: workflow nodes
  - pattern: continueOnFail and errorWorkflow configuration

VALIDATION:
  - add to: Code node or validation workflow
  - pattern: Schema validation and error handling
```

## Validation Loop

### Level 1: N8N Workflow Structure Validation (Immediate Feedback)

```bash
# Validate workflow JSON structure
python -c "import json; json.load(open('workflow.json'))"

# N8N MCP validation
# validate_workflow, validate_node_minimal via n8n-MCP

# Expected: Zero JSON errors, workflow structure valid
```

### Level 2: Expression & Logic Validation (Component Testing)

```bash
# Expression syntax validation
# validate_workflow_expressions via n8n-MCP

# Node operation validation
# validate_node_operation via n8n-MCP

# Connection validation
# validate_workflow_connections via n8n-MCP

# Expected: All expressions execute correctly
```

### Level 3: N8N Workflow Execution Validation (Full Integration)

```bash
# Local N8N instance testing
n8n start --tunnel

# Test workflow execution
curl -X POST http://localhost:5678/webhook-test/[workflow-path] \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Expected: Workflow executes successfully
```

### Level 4: N8N-Specific & Production Validation

```bash
# ═══════════════════════════════════════════════════════════
# SKILL-POWERED VALIDATION GATES
# ═══════════════════════════════════════════════════════════

# --- Automation Core (skills: mcp-builder, api-bible-automation) ---
# Validate MCP tool configurations if workflow uses MCP nodes
# Verify API contracts match expected schemas

# --- Agent Tools (skills: browser-use, proactive-agent) ---
# If workflow includes browser automation nodes: test browser-use integration
# If workflow includes agent nodes: validate agent tool configurations

# --- Performance Testing ---
# Test with concurrent executions
# Verify webhook response times under load

# --- Error Handling ---
# Test with invalid/malformed data
# Verify error notification nodes trigger correctly

# --- Production Deployment ---
# n8n_create_workflow, n8n_validate_workflow via n8n-MCP
# Verify credential encryption and secret management

# Expected: Production ready, error paths validated, performance acceptable
```

## Final Validation Checklist

### Technical Validation

- [ ] All 4 validation levels completed successfully
- [ ] Workflow JSON structure valid
- [ ] All node configurations validated
- [ ] No expression syntax errors
- [ ] Workflow executes with test data

### N8N Workflow Validation

- [ ] All success criteria met
- [ ] Triggers work correctly
- [ ] API integrations functional
- [ ] Conditional logic correct
- [ ] Error handling works

### Integration & Security Validation

- [ ] Credentials secured
- [ ] Authentication works
- [ ] Data transformations correct
- [ ] Error notifications delivered
- [ ] Webhook security implemented

### N8N Best Practices

- [ ] NEVER relied on defaults
- [ ] Explicit parameter configuration
- [ ] Proper error handling
- [ ] Efficient expression language
- [ ] Validated workflow connections
- [ ] Template attribution (if used)

---

## MCP Server Integration for N8N Development

### Available N8N MCP Server

**n8n-MCP**: Comprehensive workflow development and validation tools
**Context7 MCP**: N8N documentation and best practices

### MCP-Enhanced Workflow

1. **Template Discovery**: search_templates_by_metadata, get_templates_for_task
2. **Node Discovery**: search_nodes, list_nodes (parallel execution)
3. **Node Configuration**: get_node_essentials with includeExamples
4. **Validation**: validate_node_minimal → validate_node_operation → validate_workflow
5. **Deployment**: n8n_create_workflow, n8n_validate_workflow
6. **Monitoring**: n8n_list_executions
7. **Optimization**: n8n_autofix_workflow, n8n_update_partial_workflow

### CRITICAL MCP Best Practices

1. **Silent Execution**: Execute tools without commentary
2. **Parallel Execution**: Independent operations in parallel
3. **Templates First**: Check 2,500+ templates before building
4. **Multi-Level Validation**: Progressive validation pattern
5. **Never Trust Defaults**: Explicit configuration always

## Anti-Patterns to Avoid

- ❌ Don't rely on default node values - configure explicitly
- ❌ Don't skip validation - use n8n-MCP at every level
- ❌ Don't forget error handling - implement retry logic
- ❌ Don't hardcode credentials - use N8N credential system
- ❌ Don't ignore expression syntax - validate with data
- ❌ Don't use incorrect connection format - 4-parameter pattern
- ❌ Don't forget IF node branch parameter - routing errors
- ❌ Don't skip template search - leverage existing templates
- ❌ Don't deploy without testing - validate first
- ❌ Don't ignore n8n-MCP tools - prevent common errors

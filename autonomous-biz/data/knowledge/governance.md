# Agentic AI Governance

## Singapore Model AI Governance Framework 2026

The Singapore AGF provides the foundation for governing autonomous AI systems in business contexts. When AI agents make decisions and take actions on behalf of a business, governance is not optional — it is the first thing you build.

## Core Principles

### Action-Space Definition
Every AI agent must operate within a clearly defined action space. This means explicitly listing what the agent can do, what it cannot do, and what requires escalation. An undefined action space is an ungoverned agent.

### Autonomy Levels
Not all actions carry equal risk. Define four levels:
- **Level 0 (Manual):** Human performs the action, AI observes and learns.
- **Level 1 (Assisted):** AI recommends, human approves and executes.
- **Level 2 (Semi-Autonomous):** AI executes routine actions, human reviews periodically.
- **Level 3 (Autonomous):** AI executes and self-monitors, human intervenes only on alerts.

### Human Oversight
Autonomous does not mean unsupervised. Implement approval gates at critical decision points: financial transactions, public communications, data deletion, and deployment. The goal is autonomous operation for routine tasks with human judgment for high-stakes decisions.

### Audit Trails
Every autonomous action must be logged with: timestamp, agent identity, action taken, context/reasoning, outcome, and any human approvals. These logs serve compliance, debugging, and continuous improvement. Store audit trails immutably — agents must not be able to modify their own logs.

## Implementation
In this system, governance is enforced through the ApprovalGate component, SQLite audit logging, and the 10 Golden Rules that define operational boundaries for every autonomous business.

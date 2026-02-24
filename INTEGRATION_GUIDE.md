# PRP Framework Multi-Language Integration Guide

## Overview

This guide explains how to integrate your existing agents with the enhanced PRP framework that now supports Python, Next.js, Flutter/Dart, and cross-platform development.

## What Was Created

### 📁 Templates Added
- `PRPs/templates/prp_flutter.md` - Flutter mobile development template
- `PRPs/templates/prp_nextjs_enhanced.md` - Enhanced Next.js web development template  
- `PRPs/templates/prp_fullstack.md` - Cross-platform integration template

### 📁 Commands Added
- `.claude/commands/flutter/flutter-create-base-prp.md`
- `.claude/commands/flutter/flutter-execute-base-prp.md`
- `.claude/commands/nextjs/nextjs-create-base-prp.md`
- `.claude/commands/nextjs/nextjs-execute-base-prp.md`

### 📁 Specialized Subagents Added
- `.claude/agents/flutter-architect.md` - Flutter architecture and mobile patterns
- `.claude/agents/nextjs-optimizer.md` - Next.js performance and web optimization
- `.claude/agents/fullstack-coordinator.md` - Cross-platform integration specialist

### 📁 Framework Documentation Added
- `claude_md_files/CLAUDE-FLUTTER.md` - Complete Flutter development guide

## Integration with Your Existing Agent Workflow

### Phase 1: Agent Integration (Immediate)

#### 1. Existing Agent Enhancement
Your current agents automatically gain access to the new specialized subagents:

```yaml
# Your existing agents can now leverage:
- flutter-architect: For mobile app architecture decisions
- nextjs-optimizer: For web performance optimization  
- fullstack-coordinator: For cross-platform integration
```

#### 2. Command Integration
Add these new commands to your workflow:

```bash
# Flutter Development
/flutter-create-base-prp "mobile user authentication"
/flutter-execute-base-prp flutter-authentication.md

# Next.js Development  
/nextjs-create-base-prp "dashboard with real-time updates"
/nextjs-execute-base-prp nextjs-dashboard.md

# Cross-Platform Features
/prp-base-create "user profile sync across mobile and web"
# (Now automatically detects multi-platform requirements)
```

### Phase 2: Workflow Enhancement (Week 1)

#### 1. Multi-Language Project Detection
The PRP framework now automatically detects your project structure:

```bash
# Detects Flutter projects
pubspec.yaml present → Activates Flutter patterns

# Detects Next.js projects  
next.config.js present → Activates Next.js patterns

# Detects multi-platform setup
backend/ + frontend/ + mobile/ → Activates fullstack coordination
```

#### 2. Agent Orchestration
Your agents can now spawn specialized subagents:

```python
# Example: Your existing Python agent now can:
# 1. Detect Flutter mobile app in project
# 2. Spawn flutter-architect for mobile integration
# 3. Coordinate API design with fullstack-coordinator
# 4. Create cross-platform PRP with unified validation
```

### Phase 3: Advanced Integration (Week 2)

#### 1. Cross-Platform PRP Creation
When your agents detect multi-platform requirements:

```yaml
Trigger Conditions:
  - API endpoint needs mobile + web clients
  - User feature spans multiple platforms
  - Data synchronization requirements
  - Authentication across platforms

Automatic Response:
  - Spawn fullstack-coordinator agent
  - Create comprehensive cross-platform PRP
  - Include platform-specific validation commands
  - Coordinate implementation across all platforms
```

#### 2. Specialized Agent Coordination
Your agents now coordinate with specialized subagents:

```mermaid
Your Existing Agent
    ↓ (detects Flutter project)
flutter-architect Agent
    ↓ (needs API integration)
fullstack-coordinator Agent
    ↓ (requires web dashboard)
nextjs-optimizer Agent
```

## How to Use with Your Current Agents

### Scenario 1: Your Agent Building a Mobile Feature

```python
# Your existing agent workflow
1. User: "Build user authentication for mobile app"

2. Your agent detects: pubspec.yaml exists (Flutter project)

3. Your agent automatically:
   - Spawns flutter-architect subagent
   - Creates Flutter-specific PRP using prp_flutter.md template
   - Includes mobile-specific validation (flutter analyze, flutter test)
   - Coordinates with existing Python backend patterns

4. Implementation uses:
   - Flutter Clean Architecture patterns
   - BLoC state management
   - Platform-specific UI adaptations
   - Cross-platform API integration
```

### Scenario 2: Your Agent Building Full-Stack Feature

```python
# Your existing agent workflow
1. User: "Build user dashboard with mobile and web access"

2. Your agent detects: Multi-platform project structure

3. Your agent automatically:
   - Spawns fullstack-coordinator subagent
   - Creates comprehensive cross-platform PRP
   - Coordinates between flutter-architect and nextjs-optimizer
   - Ensures API consistency across platforms

4. Implementation includes:
   - Python backend with consistent API responses
   - Next.js web dashboard with SSR optimization
   - Flutter mobile app with offline support
   - Unified authentication and data synchronization
```

## Validation Integration

### Multi-Platform Validation Commands

Your agents now run validation across all platforms:

```bash
# Level 1: Syntax & Analysis (All Platforms)
python -m ruff check . && flutter analyze && npm run lint

# Level 2: Testing (All Platforms)  
python -m pytest tests/ && flutter test && npm test

# Level 3: Integration (Cross-Platform)
docker-compose up backend && npm run dev && flutter run --debug
python tests/integration/test_full_stack.py

# Level 4: Production (Deployment Ready)
docker build backend/ && npm run build && flutter build apk
```

### Platform-Specific Quality Gates

```yaml
Python Backend:
  - ruff check . --fix
  - mypy .  
  - pytest tests/ --cov=80

Next.js Frontend:
  - npm run lint
  - npm run type-check
  - lighthouse --score=90
  - npm run build

Flutter Mobile:
  - flutter analyze --fatal-infos
  - flutter test --coverage
  - flutter build apk --release
```

## Agent Coordination Patterns

### 1. Detection and Routing
```python
class ProjectDetector:
    def detect_platforms(self, project_path: str) -> List[Platform]:
        platforms = []
        
        if (project_path / "pubspec.yaml").exists():
            platforms.append("flutter")
            
        if (project_path / "next.config.js").exists():
            platforms.append("nextjs")
            
        if (project_path / "requirements.txt").exists():
            platforms.append("python")
            
        return platforms

    def select_agents(self, platforms: List[Platform]) -> List[Agent]:
        agents = []
        
        if "flutter" in platforms:
            agents.append("flutter-architect")
            
        if "nextjs" in platforms:
            agents.append("nextjs-optimizer")
            
        if len(platforms) > 1:
            agents.append("fullstack-coordinator")
            
        return agents
```

### 2. PRP Template Selection
```python
def select_prp_template(platforms: List[Platform], feature_type: str) -> str:
    if len(platforms) > 1:
        return "prp_fullstack.md"
    elif "flutter" in platforms:
        return "prp_flutter.md"
    elif "nextjs" in platforms:
        return "prp_nextjs_enhanced.md"
    else:
        return "prp_base.md"  # Default Python template
```

### 3. Validation Orchestration
```python
def create_validation_pipeline(platforms: List[Platform]) -> List[str]:
    commands = []
    
    for platform in platforms:
        if platform == "python":
            commands.extend([
                "cd backend && ruff check . --fix",
                "cd backend && mypy .",
                "cd backend && pytest tests/"
            ])
        elif platform == "nextjs":
            commands.extend([
                "cd frontend && npm run lint",
                "cd frontend && npm run type-check", 
                "cd frontend && npm test"
            ])
        elif platform == "flutter":
            commands.extend([
                "cd mobile && flutter analyze",
                "cd mobile && dart format lib/ --fix",
                "cd mobile && flutter test"
            ])
    
    # Add integration tests if multi-platform
    if len(platforms) > 1:
        commands.append("python tests/integration/test_cross_platform.py")
        
    return commands
```

## Benefits for Your Workflow

### 1. **Unified Development Experience**
- Single PRP methodology across Python, Next.js, and Flutter
- Consistent validation patterns and quality gates
- Coordinated cross-platform feature development

### 2. **Specialized Expertise Integration**
- Flutter mobile architecture patterns and performance optimization
- Next.js web performance and SEO best practices
- Cross-platform data synchronization and API design

### 3. **Enhanced Agent Capabilities**
- Your agents automatically detect and adapt to project structure
- Specialized subagents provide deep domain expertise
- Cross-platform coordination reduces integration complexity

### 4. **Quality and Performance**
- Platform-specific optimization patterns
- Comprehensive validation across all technologies
- Production-ready code generation with proper testing

## Getting Started

### 1. Immediate Integration
```bash
# Your agents can immediately use:
/flutter-create-base-prp "feature-name"
/nextjs-create-base-prp "feature-name" 
/prp-base-create "cross-platform-feature"

# Subagents are available via:
"Use flutter-architect to design mobile app architecture"
"Use nextjs-optimizer to improve web performance"
"Use fullstack-coordinator for cross-platform integration"
```

### 2. Update Your Agent Logic
Modify your existing agents to detect project types and spawn appropriate subagents for specialized tasks.

### 3. Test Multi-Platform Workflows
Create a test project with backend/ frontend/ mobile/ structure and run cross-platform PRP creation and execution.

## Next Steps

1. **Immediate**: Start using the new commands and subagents in your current projects
2. **Week 1**: Integrate project detection logic into your existing agents
3. **Week 2**: Test full cross-platform workflows with coordinated development
4. **Ongoing**: Contribute improvements and patterns back to the PRP framework

The enhanced PRP framework maintains backward compatibility with your existing Python workflows while adding powerful multi-language and cross-platform capabilities.

<function_calls>
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "Create Flutter PRP template", "status": "completed", "activeForm": "Creating Flutter PRP template"}, {"content": "Create Next.js enhanced template", "status": "completed", "activeForm": "Creating Next.js enhanced template"}, {"content": "Create Flutter command files", "status": "completed", "activeForm": "Creating Flutter command files"}, {"content": "Create Next.js command files", "status": "completed", "activeForm": "Creating Next.js command files"}, {"content": "Create cross-platform PRP template", "status": "completed", "activeForm": "Creating cross-platform PRP template"}, {"content": "Create multi-language subagents", "status": "completed", "activeForm": "Creating multi-language subagents"}, {"content": "Create framework-specific CLAUDE.md files", "status": "completed", "activeForm": "Creating framework-specific CLAUDE.md files"}, {"content": "Document integration steps", "status": "completed", "activeForm": "Documenting integration steps"}]
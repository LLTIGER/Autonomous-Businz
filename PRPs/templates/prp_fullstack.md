name: "Full-Stack Cross-Platform PRP Template v1 - Integrated Development"
description: |

---

## Goal

**Feature Goal**: [Specific, measurable full-stack feature across Python backend + Next.js web + Flutter mobile]

**Deliverable**: [Complete cross-platform solution - API endpoints, web dashboard, mobile app feature]

**Success Definition**: [How you'll know this works end-to-end across all platforms]

## User Persona (if applicable)

**Target Users**: [Multi-platform users - mobile app users, web dashboard users, API consumers]

**Use Cases**: [Primary scenarios across different platforms]

**User Journey**: [Cross-platform user flow - mobile → web → API integration]

**Pain Points Addressed**: [Platform-specific and integration challenges this solves]

## Why

- [Business value across all platforms and user touchpoints]
- [Integration benefits of unified feature across Python/Next.js/Flutter]
- [Cross-platform consistency and user experience improvements]

## What

[User-visible behavior across platforms and comprehensive technical requirements]

### Success Criteria

- [ ] [Backend API functionality and performance metrics]
- [ ] [Web dashboard user experience and accessibility]
- [ ] [Mobile app functionality and platform compatibility]
- [ ] [Cross-platform data synchronization and consistency]
- [ ] [Integration testing across all platforms]

## Recommended Skills for This PRP

> **Reference**: See `skills-ecosystem/prp-skill-maps/SKILL-PRP-MAPPING.md` for full mapping.

```yaml
# Full-stack cross-platform skills activation
skills_context:
  python_backend: # REQUIRED
    required:
      - python-pro                # Type safety, async, pytest, mypy
    recommended:
      - better-auth-best-practices # Authentication
      - mcp-builder               # MCP server integration

  nextjs_frontend: # REQUIRED
    required:
      - react-best-practices      # Hooks, effects, component patterns
      - ui-design-system          # shadcn/ui + Radix + TailwindCSS
      - frontend-design           # Production-grade interfaces
    recommended:
      - tailwind-design-system    # Design tokens
      - nextjs-supabase-auth      # Supabase auth
      - web-typography            # Responsive typography

  flutter_mobile: # REQUIRED
    required:
      - flutter-expert            # Riverpod/Bloc, GoRouter, performance
      - flutter-adaptive-ui       # Multi-platform responsive
      - flutter-testing           # Unit, widget, integration tests
    recommended:
      - flutter-animations        # Motion design
      - flutter-internationalization # i18n
      - mobile-touch              # Gestures, haptics

  cross_platform: # Shared concerns
    recommended:
      - ui-ux-pro-max             # Design consistency across platforms
      - typography                # Consistent type system
      - icon-design               # Consistent iconography
      - eraser-diagrams           # Architecture visualization
      - pricing-strategy          # If pricing features
      - finance-expert            # If financial systems
```

## All Needed Context

### Context Completeness Check

_Before writing this PRP, validate: "If someone knew nothing about full-stack development or this multi-language codebase, would they have everything needed to implement this cross-platform feature successfully?"_

### Documentation & References

```yaml
# BACKEND (Python) - Include these in your context window
- url: [FastAPI/Django documentation with specific sections]
  why: [Specific backend patterns needed for API implementation]
  critical: [Key insights for Python backend architecture]

- file: backend/[domain]/[pattern_file].py
  why: [Specific Python pattern to follow - service layer, data models, etc.]
  pattern: [Brief description of backend pattern to extract]
  gotcha: [Known Python/framework constraints]

# FRONTEND (Next.js) - Web dashboard context
- url: https://nextjs.org/docs/app/building-your-application/[feature]
  why: [Specific Next.js patterns for web dashboard]
  critical: [Next.js insights for web-mobile integration]

- file: frontend/app/[domain]/[component].tsx
  why: [Next.js pattern for API integration and state management]
  pattern: [Web dashboard component patterns]

# MOBILE (Flutter) - Mobile app context  
- url: https://docs.flutter.dev/[specific-widget-category]
  why: [Flutter patterns for mobile-backend integration]
  critical: [Mobile-specific API consumption patterns]

- file: mobile/lib/features/[domain]/[layer]/[file].dart
  why: [Flutter Clean Architecture pattern for API integration]
  pattern: [Mobile data layer and repository patterns]

# INTEGRATION & API DESIGN
- docfile: PRPs/ai_docs/api_design_patterns.md
  why: [RESTful API design for multi-platform consumption]
  section: [Cross-platform API standards]

- docfile: PRPs/ai_docs/data_synchronization.md
  why: [Data sync patterns between platforms]
  section: [Offline/online data consistency]
```

### Current Multi-Platform Codebase Structure

```bash
project/
├── backend/          # Python API server
│   ├── app/
│   ├── models/
│   ├── services/
│   └── tests/
├── frontend/         # Next.js web dashboard
│   ├── app/
│   ├── src/
│   └── __tests__/
└── mobile/          # Flutter mobile app
    ├── lib/
    ├── test/
    └── pubspec.yaml
```

### Desired Cross-Platform Implementation Structure

```bash
# Backend Implementation (Python)
backend/
├── app/api/[feature]/
│   ├── routes.py              # API endpoints for all platforms
│   ├── models.py              # Data models with serialization
│   ├── services.py            # Business logic layer
│   └── schemas.py             # Pydantic request/response models
├── tests/api/[feature]/
│   ├── test_routes.py         # API endpoint tests
│   ├── test_models.py         # Data model tests
│   └── test_services.py       # Service layer tests

# Frontend Implementation (Next.js)
frontend/
├── app/[feature]/
│   ├── page.tsx               # Web dashboard page
│   ├── loading.tsx            # Loading states
│   └── error.tsx              # Error handling
├── src/components/[feature]/
│   ├── [Feature]Dashboard.tsx # Main dashboard component
│   ├── [Feature]Table.tsx     # Data table component
│   └── [Feature]Form.tsx      # Form components
├── src/lib/api/[feature].ts   # API client functions
└── __tests__/[feature]/       # Component and API tests

# Mobile Implementation (Flutter)
mobile/lib/features/[feature]/
├── data/
│   ├── models/[feature]_model.dart          # Data models
│   ├── repositories/[feature]_repository.dart  # Repository implementation
│   └── datasources/[feature]_remote_datasource.dart  # API integration
├── domain/
│   ├── entities/[feature]_entity.dart       # Business entities
│   ├── usecases/[feature]_usecase.dart      # Use cases
│   └── repositories/[feature]_repository.dart  # Repository interface
└── presentation/
    ├── bloc/[feature]_bloc.dart            # State management
    ├── pages/[feature]_page.dart           # Mobile screens
    └── widgets/[feature]_widget.dart       # Mobile widgets
```

### Known Cross-Platform Gotchas & Integration Constraints

```python
# CRITICAL: API Response Format Consistency
# Use consistent JSON structure across all endpoints for all platforms
{
    "success": true,
    "data": {...},
    "message": "Operation completed",
    "errors": []
}

# CRITICAL: Authentication Token Handling
# Ensure JWT tokens work across web (cookies) and mobile (secure storage)
# Web: HttpOnly cookies + CSRF protection
# Mobile: Secure storage with biometric unlock

# CRITICAL: Data Synchronization Patterns
# Handle offline/online state in mobile while web remains real-time
# Implement optimistic updates with conflict resolution

# CRITICAL: Platform-Specific Validations
# Backend: Comprehensive server-side validation (never trust client)
# Web: Client-side validation for UX + server validation
# Mobile: Local validation for offline mode + server validation
```

## Implementation Blueprint

### Shared Data Models and API Design

Create consistent data structures across all platforms with proper serialization.

```python
# Backend Models (Python/Pydantic)
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class FeatureBase(BaseModel):
    title: str
    description: Optional[str] = None
    is_active: bool = False

class FeatureCreate(FeatureBase):
    pass

class FeatureResponse(FeatureBase):
    id: str
    created_at: datetime
    updated_at: datetime
```

```typescript
// Frontend Types (Next.js/TypeScript)
export interface Feature {
  id: string;
  title: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
```

```dart
// Mobile Models (Flutter/Dart)
@freezed
class Feature with _$Feature {
  const factory Feature({
    required String id,
    required String title,
    String? description,
    @Default(false) bool isActive,
    required DateTime createdAt,
    required DateTime updatedAt,
  }) = _Feature;

  factory Feature.fromJson(Map<String, dynamic> json) =>
      _$FeatureFromJson(json);
}
```

### Implementation Tasks (Cross-Platform Dependencies)

```yaml
# Phase 1: Backend Foundation
Task 1: CREATE backend/app/api/[domain]/models.py
  - IMPLEMENT: Pydantic models for API request/response
  - FOLLOW pattern: backend/app/api/existing/models.py
  - NAMING: Clear model names with Create/Update/Response variants
  - DEPENDENCIES: pydantic, sqlalchemy
  - PLACEMENT: Backend API data layer

Task 2: CREATE backend/app/api/[domain]/services.py
  - IMPLEMENT: Business logic layer with async methods
  - FOLLOW pattern: backend/app/api/existing/services.py
  - NAMING: Service classes with CRUD operations
  - DEPENDENCIES: Import models, database connection
  - PLACEMENT: Backend service layer

Task 3: CREATE backend/app/api/[domain]/routes.py
  - IMPLEMENT: FastAPI routes with OpenAPI documentation
  - FOLLOW pattern: backend/app/api/existing/routes.py
  - NAMING: RESTful endpoint naming conventions
  - DEPENDENCIES: Import services and models
  - PLACEMENT: Backend API endpoints

# Phase 2: Web Dashboard Implementation
Task 4: CREATE frontend/src/lib/api/[domain].ts
  - IMPLEMENT: API client functions with error handling
  - FOLLOW pattern: frontend/src/lib/api/existing.ts
  - NAMING: Descriptive function names (getFeatures, createFeature)
  - DEPENDENCIES: fetch/axios, type definitions
  - PLACEMENT: Frontend API integration layer

Task 5: CREATE frontend/src/components/[domain]/[Domain]Dashboard.tsx
  - IMPLEMENT: Main dashboard component with data fetching
  - FOLLOW pattern: frontend/src/components/existing/
  - NAMING: Dashboard component with proper state management
  - DEPENDENCIES: React hooks, API client functions
  - PLACEMENT: Frontend component layer

Task 6: CREATE frontend/app/[domain]/page.tsx
  - IMPLEMENT: Next.js page with Server Components
  - FOLLOW pattern: frontend/app/existing/page.tsx
  - NAMING: page.tsx (required), proper metadata
  - DEPENDENCIES: Dashboard components
  - PLACEMENT: Frontend route/page layer

# Phase 3: Mobile App Implementation
Task 7: CREATE mobile/lib/features/[domain]/data/models/[domain]_model.dart
  - IMPLEMENT: Freezed data models with JSON serialization
  - FOLLOW pattern: mobile/lib/features/existing/data/models/
  - NAMING: Model classes with fromJson/toJson
  - DEPENDENCIES: freezed, json_annotation
  - PLACEMENT: Mobile data layer

Task 8: CREATE mobile/lib/features/[domain]/data/repositories/[domain]_repository.dart
  - IMPLEMENT: Repository implementation with API integration
  - FOLLOW pattern: mobile/lib/features/existing/data/repositories/
  - NAMING: Repository implementation with error handling
  - DEPENDENCIES: HTTP client, data models
  - PLACEMENT: Mobile data access layer

Task 9: CREATE mobile/lib/features/[domain]/presentation/pages/[domain]_page.dart
  - IMPLEMENT: Flutter page with BLoC state management
  - FOLLOW pattern: mobile/lib/features/existing/presentation/pages/
  - NAMING: Page component with responsive design
  - DEPENDENCIES: BLoC, repository, widgets
  - PLACEMENT: Mobile presentation layer

# Phase 4: Integration Testing
Task 10: CREATE tests/integration/test_[domain]_integration.py
  - IMPLEMENT: End-to-end integration tests
  - FOLLOW pattern: tests/integration/existing/
  - NAMING: Integration test scenarios
  - DEPENDENCIES: All platform implementations
  - PLACEMENT: Integration test suite
```

### Cross-Platform Integration Patterns

```python
# API Client Pattern (consistent across web/mobile)
class FeatureAPIClient:
    def __init__(self, base_url: str, auth_token: str):
        self.base_url = base_url
        self.headers = {"Authorization": f"Bearer {auth_token}"}
    
    async def get_features(self) -> List[Feature]:
        # Implementation with error handling
        # Retry logic for mobile offline scenarios
        # Caching for web performance
```

```typescript
// Web API Integration (Next.js)
export async function getFeatures(): Promise<Feature[]> {
  const response = await fetch('/api/features', {
    headers: { 'Content-Type': 'application/json' },
    next: { revalidate: 60 } // ISR caching
  });
  
  if (!response.ok) throw new Error('Failed to fetch features');
  return response.json();
}
```

```dart
// Mobile API Integration (Flutter)
class FeatureRemoteDataSource {
  Future<List<FeatureModel>> getFeatures() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/api/features'),
        headers: {'Authorization': 'Bearer $token'},
      );
      
      if (response.statusCode == 200) {
        final List<dynamic> json = jsonDecode(response.body);
        return json.map((item) => FeatureModel.fromJson(item)).toList();
      }
      throw ServerException();
    } catch (e) {
      throw ServerException();
    }
  }
}
```

## Cross-Platform Validation Loop

### Level 1: Multi-Platform Syntax & Build

```bash
# Backend validation (Python)
cd backend && python -m pytest --co -q              # Test collection
cd backend && ruff check . --fix                    # Python linting
cd backend && mypy .                                 # Type checking

# Frontend validation (Next.js)
cd frontend && npm run lint                          # ESLint
cd frontend && npm run type-check                    # TypeScript
cd frontend && npm run build                         # Next.js build

# Mobile validation (Flutter)
cd mobile && flutter analyze                         # Dart analysis
cd mobile && dart format lib/ --fix                 # Dart formatting
cd mobile && flutter pub get                        # Dependencies

# EXPECTED: All platforms build successfully with zero errors
```

### Level 2: Platform-Specific Testing

```bash
# Backend testing
cd backend && python -m pytest tests/ -v            # Backend tests
cd backend && python -m pytest tests/api/ -v        # API tests

# Frontend testing  
cd frontend && npm test                              # Component tests
cd frontend && npm test -- --coverage               # Coverage report

# Mobile testing
cd mobile && flutter test                           # Unit tests
cd mobile && flutter test --coverage                # Coverage report

# EXPECTED: All platform-specific tests pass
```

### Level 3: Integration Testing

```bash
# Start all services
cd backend && uvicorn main:app --reload --port 8000 &
cd frontend && npm run dev --port 3000 &
cd mobile && flutter run --debug &

# API integration testing
curl -X GET http://localhost:8000/api/features      # Test API
curl -X GET http://localhost:3000/api/features      # Test Next.js API route

# Cross-platform data flow testing
python tests/integration/test_full_stack_flow.py    # End-to-end tests

# EXPECTED: All platforms communicate correctly
```

### Level 4: Production Deployment Validation

```bash
# ═══════════════════════════════════════════════════════════
# SKILL-POWERED CROSS-PLATFORM VALIDATION
# ═══════════════════════════════════════════════════════════

# --- Backend (skills: python-pro, nodejs-backend-patterns) ---
cd backend && docker build -t backend .             # Containerization
cd backend && python -m pytest tests/e2e/          # E2E tests

# --- Frontend Design (skills: ui-ux-pro-max, frontend-design, web-design-guidelines) ---
cd frontend && npm run build && npm start           # Production build
cd frontend && lighthouse http://localhost:3000     # Performance audit
# Check: consistent design language across web and mobile
# Check: typography hierarchy, icon system, color palette consistency

# --- Mobile (skills: flutter-expert, flutter-testing, mobile-touch) ---
cd mobile && flutter build apk --release            # Android build
cd mobile && flutter build ios --release            # iOS build
# Check: touch targets 48dp+, platform-specific UX patterns

# --- Cross-Platform Integration ---
docker-compose up --build                           # Full stack deployment
npm run test:e2e                                     # Cross-platform E2E

# --- SEO & Accessibility (skills: audit-website, seo-audit) ---
# Verify web frontend meets WCAG 2.1 AA, SEO metadata complete

# EXPECTED: Production-ready deployment across all platforms, consistent UX
```

## Final Cross-Platform Validation Checklist

### Technical Integration Validation
- [ ] All 4 validation levels pass across Python/Next.js/Flutter
- [ ] API contracts consistent between backend and clients
- [ ] Data synchronization works offline/online
- [ ] Authentication flows work across all platforms
- [ ] Error handling consistent across platforms

### User Experience Validation
- [ ] Feature works seamlessly across web and mobile
- [ ] Data changes sync in real-time between platforms
- [ ] Offline functionality graceful in mobile app
- [ ] Performance meets standards on all platforms
- [ ] UI/UX consistent with platform guidelines

### Production Readiness
- [ ] Security implemented consistently across platforms
- [ ] Monitoring and logging integrated
- [ ] Deployment pipelines configured for all platforms
- [ ] Documentation complete for API and integration points

---

## Anti-Patterns to Avoid

- ❌ Don't create inconsistent API contracts between platforms
- ❌ Don't ignore platform-specific authentication patterns
- ❌ Don't skip offline/online state handling in mobile
- ❌ Don't use different data validation rules across platforms
- ❌ Don't forget to handle network failures gracefully
- ❌ Don't implement business logic in multiple places
- ❌ Don't skip integration testing between platforms
- ❌ Don't ignore platform-specific performance requirements
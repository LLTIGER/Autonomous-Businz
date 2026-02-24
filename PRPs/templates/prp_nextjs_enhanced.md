name: "Next.js Enhanced PRP Template v1 - Full-Stack Modern Web Development"
description: |

---

## Goal

**Feature Goal**: [Specific, measurable Next.js feature - component, API route, page, integration]

**Deliverable**: [Concrete artifact - React component, API endpoint, middleware, integration, deployment]

**Success Definition**: [How you'll know this is complete and working in production]

## 📸 Visual Reference & Demo Analysis Requirements

**Web Demo/Reference Analysis (MANDATORY for all web projects with visual references)**:

**1. Web Reference Source:**
- **Reference Type**: `[Live website URL / Website screenshot / Figma design / Web demo / Existing web app]`
- **Reference URL/Location**: `[Provide complete URL, file path, or Figma link]`
- **Reference Screenshots**: `[Required - desktop, tablet, mobile views]`

**2. Comprehensive Web Visual Dissection:**
```yaml
web_demo_analysis:
  step_1_capture:
    - [ ] Full desktop screenshot (1920x1080 and 1366x768)
    - [ ] Tablet view screenshots (768px, 1024px)
    - [ ] Mobile screenshots (375px, 414px, 360px)
    - [ ] Component state captures (hover, focus, active, disabled)
    - [ ] Page scroll behavior and sticky elements
    - [ ] Animation and micro-interaction documentation

  step_2_measurement:
    - [ ] Container max-widths and breakpoints
    - [ ] Grid system and column structures
    - [ ] Component spacing and padding systems
    - [ ] Typography scales and line heights
    - [ ] Button sizes, form elements, card dimensions

  step_3_web_technical_analysis:
    - [ ] CSS framework detection (TailwindCSS, Bootstrap, custom)
    - [ ] Component library identification (shadcn/ui, Material-UI, etc.)
    - [ ] Layout methods (CSS Grid, Flexbox, positioning)
    - [ ] Performance analysis (Core Web Vitals, loading patterns)
    - [ ] SEO elements (meta tags, structured data, headings)
```

**3. Next.js-Specific Reference Requirements:**
- **Server Component vs Client Component identification**
- **Static vs Dynamic content analysis**
- **Performance optimization opportunities**
- **SEO metadata extraction**
- **API integration points identification**

**4. Web Demo Analysis Report:**
```yaml
# Next.js Visual Reference Analysis (Auto-generated)
nextjs_reference_analysis:
  responsive_breakpoints:
    desktop: "[1920px, 1366px, 1280px layouts]"
    tablet: "[1024px, 768px layouts]"  
    mobile: "[414px, 375px, 360px layouts]"
  
  component_architecture:
    header: "[sticky, fixed, relative positioning]"
    navigation: "[top nav, hamburger menu, mega menu]"
    hero_section: "[hero type, CTA placement, background treatment]"
    content_sections: "[layout patterns, card designs, grid systems]"
    footer: "[content organization, link structure]"
  
  performance_targets:
    core_web_vitals: "[LCP, FID, CLS targets from reference]"
    loading_patterns: "[progressive loading, skeleton screens]"
    optimization_opportunities: "[image optimization, code splitting]"
```

## 🌐 Multilingual Requirements

**Required Languages**: 
- ✅ English (Primary)
- ✅ French (Required)

**Optional Languages** (implement as needed):
- 🔄 German
- 🔄 Portuguese  
- 🔄 Spanish
- 🔄 Mandarin Chinese

**Next.js i18n Strategy**:
- [ ] next-intl or react-i18next integration from project start
- [ ] Locale-based routing (/en, /fr, etc.)
- [ ] Server Component i18n support
- [ ] Client Component translation hooks
- [ ] Static generation for all supported locales
- [ ] Dynamic imports for large translation files
- [ ] SEO metadata localization

**Implementation Notes**:
- All user-facing text must use translation functions
- Route-based locale detection and switching
- Server-side translations for SEO optimization  
- Client-side translations for interactive elements
- Database content must support multiple languages
- API responses must include locale context

## 🎨 Template & Design System Requirements

**Next.js Template/Design Framework Questions (Must Answer Before Development)**:

**1. Existing UI Framework/Template?**
- [ ] Using shadcn/ui component library? (Specify components: Button, Card, Dialog, etc.)
- [ ] Using TailwindCSS template? (Template name, repo, or marketplace source)
- [ ] Using Next.js template/starter? (Template source and customization needs)
- [ ] Using Figma design? (Provide Figma link and component specifications)
- [ ] Starting from scratch? (Justify approach and design system decisions)

**2. Template Structure & Framework:**
- **Template Source**: `[shadcn/ui / TailwindUI / Next.js Examples / Custom Template / Figma Design]`
- **Template Path**: `[/path/to/template/folder or URL]`
- **Styling Framework**: `[TailwindCSS / CSS Modules / Styled Components / Emotion / Vanilla CSS]`
- **Component Library**: `[shadcn/ui / Radix UI / Headless UI / Material-UI / Custom]`
- **Animation Library**: `[Framer Motion / GSAP / CSS Animations / None]`

**3. Next.js-Specific Asset Strategy:**
- **Image Optimization**: `[Next.js Image / Custom / CDN integration]`
- **Asset Requirements**: 
  - **Hero Images**: `[AI-generated / Stock / Designer-provided / Template assets]`
  - **Icons**: `[Lucide / Heroicons / Custom SVG / Icon library]`
  - **Illustrations**: `[AI-generated / Template assets / Custom / Stock]`
  - **Brand Assets**: `[Logo / Favicon / Social cards / Meta images]`
- **Asset Storage**: `[public/assets / CDN / Database / External service]`

**4. Layout & Component Architecture:**
- **Header/Navigation**: `[Fixed header / Sticky nav / Mega menu / Mobile hamburger / Dashboard sidebar]`
- **Hero Section**: `[Static hero / Image carousel / Video background / Interactive / Animated]`
- **Page Layouts**: `[Dashboard / Landing page / Blog / E-commerce / Documentation]`
- **Footer**: `[Simple / Multi-column / Newsletter / Social links / Sitemap]`

**5. shadcn/ui & TailwindCSS Integration:**
```yaml
# shadcn/ui Configuration (if using)
shadcn_setup:
  components_needed:
    - [ ] Button, Input, Label (forms)
    - [ ] Card, Badge, Avatar (content)
    - [ ] Dialog, Sheet, Popover (overlays)
    - [ ] Table, Pagination (data)
    - [ ] Carousel, Accordion (interactive)
  
  customizations:
    - [ ] Custom color palette override
    - [ ] Typography system modifications  
    - [ ] Spacing/sizing adjustments
    - [ ] Dark mode implementation

# TailwindCSS Configuration
tailwind_strategy:
  - [ ] Use template's tailwind.config.js
  - [ ] Extend with custom utilities
  - [ ] Integrate with design tokens
  - [ ] Responsive breakpoint strategy
```

**6. Development Workflow Strategy:**
```yaml
pre_development_phase:
  - [ ] Template analysis and component mapping
  - [ ] Asset inventory and generation planning
  - [ ] shadcn/ui component selection and customization
  - [ ] TailwindCSS configuration review
  - [ ] Page layout and routing structure
  
development_phase:
  - [ ] Follow template's file organization
  - [ ] Extend existing components vs creating new
  - [ ] Maintain design system consistency
  - [ ] Implement responsive design patterns
```

## 🎬 Next.js Animation & Typography System Requirements

**Web Animation & Typography Questions (MANDATORY for Professional Web Applications)**:

**1. Web Typography System:**
- **Font Loading Strategy**: `[Google Fonts API / next/font optimization / Self-hosted / System fonts]`
- **Primary Web Font**: `[Inter, Roboto, custom - with weights: 300,400,500,600,700,900]`
- **Display/Heading Font**: `[Playfair Display, Montserrat, custom - with weights]`
- **Font Performance**: `[Preload critical fonts / Font-display: swap / FOUT/FOIT strategy]`
- **Typography Responsiveness**: `[Fluid typography / Breakpoint-based scaling / clamp() functions]`

**2. Next.js Typography Implementation:**
```yaml
nextjs_typography:
  font_optimization:
    next_font: "[next/font/google configuration]"
    preload_fonts: "[critical font files to preload]"
    fallback_fonts: "[system font fallbacks for loading states]"
    font_display: "[swap, block, fallback, optional]"
    
  responsive_typography:
    fluid_type: "[use clamp() for responsive font sizes]"
    breakpoint_scales: "[sm: 0.875rem, md: 1rem, lg: 1.125rem base]"
    line_height_ratios: "[headings: 1.2, body: 1.6, captions: 1.4]"
    
  css_custom_properties:
    font_sizes: "[--text-xs through --text-6xl definitions]"
    font_weights: "[--font-light: 300, --font-medium: 500, etc.]"
    line_heights: "[--leading-tight: 1.25, --leading-relaxed: 1.75]"
```

**3. Web Animation System:**
- **Animation Library**: `[Framer Motion / GSAP / CSS Animations / Lottie / Custom]`
- **Performance Target**: `[60fps smooth animations / GPU acceleration / will-change optimization]`
- **Animation Philosophy**: `[Material Design Motion / Apple HIG / Custom brand motion]`
- **Reduced Motion**: `[prefers-reduced-motion media query compliance]`

**4. Next.js Animation Implementation:**
```yaml
nextjs_animations:
  framer_motion_config:
    page_transitions: "[fade, slide, scale entrance/exit animations]"
    component_animations: "[stagger, spring, tween configurations]"
    gesture_animations: "[drag, hover, tap, whileInView triggers]"
    
  performance_optimizations:
    layout_animations: "[layoutId for shared element transitions]"
    will_change: "[transform, opacity - GPU acceleration]"
    animation_fill_mode: "[forwards, backwards, both optimization]"
    
  micro_interactions:
    button_hover: "[scale: 1.05, shadow elevation, color transitions]"
    form_focus: "[outline animation, label float, error states]"
    card_hover: "[subtle lift effect, shadow expansion]"
    loading_states: "[skeleton screens, progress indicators]"
```

**5. Web-Specific Animation & Typography Standards:**
- **Core Web Vitals Impact**: All animations must not negatively affect LCP, FID, CLS
- **Accessibility**: Respect `prefers-reduced-motion` and provide focus indicators
- **Progressive Enhancement**: Fallback styles for animation-disabled environments
- **SEO Considerations**: Text must be crawlable, fonts must not block rendering

## User Persona (if applicable)

**Target User**: [Web user - end user, admin, developer, content creator, etc.]

**Use Case**: [Primary web scenario when this feature will be used]

**User Journey**: [Step-by-step user interaction flow with this feature]

**Pain Points Addressed**: [Web-specific user frustrations this feature solves]

## Why

- [Web user value and business impact]
- [SEO, performance, or accessibility improvements]
- [Integration with existing Next.js app features]

## What

[User-visible web behavior and technical requirements]

### Success Criteria

- [ ] [Specific measurable outcomes for web users]
- [ ] [Performance metrics - Core Web Vitals, load times]
- [ ] [SEO requirements - meta tags, structured data]
- [ ] [Accessibility compliance - WCAG 2.1 AA]

## Recommended Skills for This PRP

> **Reference**: See `skills-ecosystem/prp-skill-maps/SKILL-PRP-MAPPING.md` for full mapping.
> **Design Insights**: See `skills-ecosystem/catalog/DESIGN-INSIGHTS-GEMINI3-ERA.md` for creative techniques.

```yaml
# Next.js skills activation (select applicable)
skills_context:
  design_ui: # REQUIRED for all web projects
    required:
      - ui-ux-pro-max             # Design intelligence - 50 styles, palettes, pairings
      - ui-design-system          # shadcn/ui + Radix + TailwindCSS systems
      - frontend-design           # Production-grade, non-generic interfaces
      - tailwind-design-system    # Tailwind v4 design tokens, responsive
      - web-design-guidelines     # Web Interface Guidelines compliance
    recommended:
      - tailwindcss-advanced-layouts # CSS Grid/Flexbox mastery

  typography: # REQUIRED for content-rich sites
    required:
      - typography-expert         # Font pairing, OpenType, variable fonts
      - web-typography            # Responsive type, font loading, scales
    recommended:
      - brand-typography-systems  # Brand font selection, modular scale
      - font-pairing-suggester   # Google Fonts alternatives with hierarchy

  icons_assets: # REQUIRED - prevents broken icon issues
    required:
      - icon-design               # Lucide, Heroicons, Phosphor selection
      - better-icons              # CLI: `better-icons search <query>`
    recommended:
      - svg-icon-generator        # Custom SVG icons
      - favicon-gen               # Favicon set (SVG, ICO, apple-touch-icon)
      - logo-creator              # Brand logo generation

  react_nextjs: # CORE skills
    required:
      - react-best-practices      # Hooks, effects, refs, anti-patterns
    recommended:
      - nextjs-supabase-auth      # Supabase Auth + App Router
      - react-components          # Design-to-code conversion
      - ai-elements               # AI chat interface components

  backend_api:
    recommended:
      - nodejs-backend-patterns   # API routes, middleware, auth
      - better-auth-best-practices # Authentication framework
      - mcp-builder               # MCP server integration

  content_seo:
    recommended:
      - human-writing             # Natural copy, no AI patterns
      - seo-audit                 # Technical SEO, meta tags
      - audit-website             # Full site audit (230+ rules)
      - social-content            # Social media content

  image_generation: # For hero images, product shots
    optional:
      - nano-banana-pro           # Gemini 3 Pro image gen
      - flux-best-practices       # FLUX model prompting
      - image-upscaling           # Image enhancement

  design_principles: # ALWAYS enforce for Next.js web
    style_steering: "Always specify style reference (e.g., 'in the style of Apple')"
    icon_declaration: "Declare icon system upfront: iconify solar duotone + SVG logos"
    typography_rule: "Big headings, strong hierarchy, non-generic fonts"
    color_strategy: "Monochrome + single accent color, avoid AI purple"
    animation_pattern: "animate on scroll + keyframe, consistent across sections"
    responsive_testing: "Desktop (1440px), iPad (768px), Mobile (375px)"
    anti_patterns:
      - "NO generic purple/blue gradients"
      - "NO over-rounded corners everywhere"
      - "NO backgrounds competing with foreground content"
```

## All Needed Context

### Context Completeness Check

_Before writing this PRP, validate: "If someone knew nothing about Next.js or this codebase, would they have everything needed to implement this web feature successfully?"_

### Documentation & References

```yaml
# MUST READ - Include these in your context window
- url: https://nextjs.org/docs/app/building-your-application/[specific-feature]
  why: [Specific Next.js patterns needed - App Router, Server Components, etc.]
  critical: [Key Next.js insights that prevent common web development errors]

- url: https://react.dev/reference/react/[hook-or-api]
  why: [Specific React patterns needed for implementation]
  critical: [React 19 features, Suspense, Concurrent features]

- file: app/[existing_domain]/[pattern_file].tsx
  why: [Specific Next.js pattern to follow - layout, page, component structure]
  pattern: [Brief description of Next.js pattern to extract]
  gotcha: [Known Next.js constraints or App Router limitations]

- file: lib/[utility_file].ts
  why: [Shared utilities, validation schemas, or API helpers]
  pattern: [Reusable pattern for data fetching, validation, etc.]

- docfile: PRPs/ai_docs/nextjs_patterns.md
  why: [Custom Next.js documentation for complex patterns]
  section: [Specific section if document is large]
```

### Current Codebase tree (run `find . -name "*.tsx" -o -name "*.ts" | grep -E "(app|src|components)" | head -20`)

```bash
app/
├── layout.tsx
├── page.tsx
├── globals.css
├── (routes)/
└── api/
src/
├── components/
├── lib/
└── hooks/
```

### Desired Codebase tree with files to be added and responsibility of file

```bash
app/
├── [feature]/
│   ├── page.tsx                    # Route page component
│   ├── layout.tsx                  # Feature-specific layout (optional)
│   ├── loading.tsx                 # Loading UI
│   ├── error.tsx                   # Error UI
│   └── not-found.tsx              # 404 UI (optional)
├── api/[feature]/
│   ├── route.ts                    # API route handlers (GET, POST, etc.)
│   └── [dynamic]/route.ts         # Dynamic API routes
src/
├── components/[feature]/
│   ├── [Feature]Form.tsx          # Form components
│   ├── [Feature]List.tsx          # List/grid components
│   └── [Feature]Card.tsx          # Individual item components
├── lib/
│   ├── [feature]/                 # Feature-specific utilities
│   ├── validations/[feature].ts   # Zod schemas
│   └── actions/[feature].ts       # Server actions
└── hooks/
    └── use[Feature].ts            # Custom React hooks
```

### Known Gotchas of Next.js & React Quirks

```typescript
// CRITICAL: App Router vs Pages Router patterns
// Use App Router patterns - file-based routing in app/ directory
// Server Components are default - mark 'use client' only when needed

// CRITICAL: Server vs Client Component boundaries
'use client' // Only add when you need browser APIs, event handlers, state

// CRITICAL: Data fetching in Server Components
// Use native fetch with Next.js enhancements, not SWR in Server Components
const data = await fetch('http://localhost:3000/api/data', {
  next: { revalidate: 3600 } // ISR caching
});

// CRITICAL: Metadata API for SEO
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description for SEO',
};

// CRITICAL: Dynamic imports for code splitting
const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});

// CRITICAL: Server Actions require 'use server'
async function createItem(formData: FormData) {
  'use server'
  // Server-side logic here
}
```

## Implementation Blueprint

### Data models and validation schemas

Create type-safe data models with Zod validation for Next.js applications.

```typescript
// Data Models Examples:
// - Zod schemas for runtime validation
// - TypeScript interfaces for type safety
// - Server Action form validation
// - API route input/output validation

import { z } from 'zod';

export const FeatureSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().optional(),
  isActive: z.boolean().default(false),
  createdAt: z.date().optional(),
});

export type Feature = z.infer<typeof FeatureSchema>;
export type CreateFeature = Omit<Feature, 'id' | 'createdAt'>;
```

### Implementation Tasks (ordered by dependencies)

```yaml
Task -2: COMPREHENSIVE web reference analysis (IF reference provided)
  - CAPTURE: Multi-viewport screenshots using composition-maestro + design-review agents
  - DISSECT: Responsive layouts, component hierarchy, and interaction patterns
  - EXTRACT: Color schemes, typography scales, spacing systems, and design tokens
  - MEASURE: Container widths, breakpoints, component dimensions, and grid systems
  - IDENTIFY: CSS frameworks, animation libraries, performance patterns
  - ANALYZE: Next.js architecture opportunities (SSG, SSR, client components)
  - DOCUMENT: Complete web reference analysis report for pixel-perfect implementation

Task -1: ANALYZE Next.js template and design system
  - ANALYZE: Template structure, components, and styling patterns
  - INVENTORY: Available shadcn/ui components, TailwindCSS classes, layouts
  - MAP: Template pages to project requirements
  - IDENTIFY: Required custom components and modifications
  - PLAN: Asset generation strategy (hero images, icons, illustrations)
  - DOCUMENT: Template customization rules and extension patterns
  - VALIDATE: Template compatibility with Next.js App Router and project goals

Task -0.7: SETUP Next.js database and authentication system (IF database required)
  - SETUP: Prisma or Drizzle ORM with database schema definition
  - CONFIGURE: NextAuth.js with database adapter and OAuth providers
  - CREATE: Database migrations for user management (users, accounts, sessions, verification_tokens)
  - IMPLEMENT: Authentication middleware for route protection
  - CREATE: Server Actions for authentication flows (register, login, logout, password reset)
  - SETUP: Role-based access control with middleware and API route protection
  - CONFIGURE: Session management with JWT or database sessions
  - INTEGRATE: Authentication with database connections and user management

Task -0.6: SETUP Next.js payment system (IF payments required)
  - CONFIGURE: Stripe integration with Next.js environment variables
  - SETUP: Stripe Elements integration with shadcn/ui form components
  - CREATE: API routes for payment processing (/api/payments/*, /api/webhooks/stripe)
  - IMPLEMENT: Shopping cart state management with zustand or React Context
  - CREATE: Checkout flow pages with form validation and error handling
  - SETUP: Stripe webhooks for payment status updates and subscription management
  - IMPLEMENT: Order management and receipt generation
  - INTEGRATE: Payment system with authentication and user accounts

Task -0.5: SETUP Next.js animation and typography systems
  - CONFIGURE: next/font optimization for Google Fonts or custom fonts
  - IMPLEMENT: CSS custom properties for typography scale and responsive fonts  
  - SETUP: Framer Motion configuration and animation constants
  - CREATE: lib/animations.ts with standardized animation variants
  - CREATE: styles/typography.css with clamp() responsive scaling
  - ENSURE: prefers-reduced-motion accessibility compliance
  - VALIDATE: Typography scales across all breakpoints and animation performance at 60fps

Task 0: SETUP Next.js i18n infrastructure
  - INSTALL: next-intl or react-i18next package
  - CREATE: messages/en.json, messages/fr.json translation files
  - CREATE: i18n.ts configuration file
  - CREATE: middleware.ts for locale detection and routing
  - SETUP: next.config.js with i18n configuration
  - CREATE: [locale] route group structure in app directory
  - FOLLOW pattern: Next.js i18n best practices
  - NAMING: Standard locale codes (en, fr, de, pt, es, zh)
  - PLACEMENT: Root level i18n setup

Task 1: CREATE lib/validations/[domain].ts
  - IMPLEMENT: Zod schemas for form and API validation
  - FOLLOW pattern: lib/validations/existing.ts
  - NAMING: PascalCase for schemas, camelCase for types
  - DEPENDENCIES: zod package
  - PLACEMENT: Shared validation logic

Task 2: CREATE lib/actions/[domain].ts
  - IMPLEMENT: Server Actions with validation and error handling
  - FOLLOW pattern: lib/actions/existing.ts
  - NAMING: async function names with descriptive actions
  - DEPENDENCIES: Import schemas from Task 1
  - PLACEMENT: Server-side business logic

Task 3: CREATE app/api/[domain]/route.ts
  - IMPLEMENT: API route handlers (GET, POST, PUT, DELETE)
  - FOLLOW pattern: app/api/existing/route.ts
  - NAMING: HTTP method names, RESTful patterns
  - DEPENDENCIES: Import schemas and actions
  - PLACEMENT: API layer for external integrations

Task 4: CREATE src/components/[domain]/[Domain]Form.tsx
  - IMPLEMENT: Form component with react-hook-form and validation
  - FOLLOW pattern: src/components/existing/ExistingForm.tsx
  - NAMING: PascalCase component names, descriptive props
  - DEPENDENCIES: react-hook-form, @hookform/resolvers/zod
  - PLACEMENT: Reusable form components

Task 5: CREATE app/[domain]/page.tsx
  - IMPLEMENT: Main page component using Server Components
  - FOLLOW pattern: app/existing/page.tsx
  - NAMING: page.tsx (required), export default component
  - DEPENDENCIES: Import components and actions
  - PLACEMENT: App Router page component

Task 6: CREATE src/hooks/use[Domain].ts
  - IMPLEMENT: Custom React hook for client-side state management
  - FOLLOW pattern: src/hooks/useExisting.ts
  - NAMING: camelCase hook names starting with 'use'
  - DEPENDENCIES: React hooks, SWR or React Query if needed
  - PLACEMENT: Reusable client-side logic

Task 7: CREATE __tests__/[domain]/[component].test.tsx
  - IMPLEMENT: Component tests with React Testing Library
  - FOLLOW pattern: __tests__/existing/existing.test.tsx
  - NAMING: .test.tsx suffix, describe blocks per component
  - MOCK: Server Actions, API calls, external dependencies
  - COVERAGE: Components, hooks, API routes, Server Actions
  - PLACEMENT: Mirror src structure in __tests__
```

### Implementation Patterns & Key Details

```typescript
// Next.js Server Component pattern
export default async function FeaturePage() {
  // Server-side data fetching
  const data = await fetch(`${process.env.NEXTAUTH_URL}/api/features`, {
    next: { revalidate: 60 } // ISR - revalidate every minute
  }).then(res => res.json());

  return (
    <div className="container mx-auto px-4 py-8">
      <FeatureList data={data} />
    </div>
  );
}

// Client Component with form handling
'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export function FeatureForm({ onSubmit }: { onSubmit: (data: Feature) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Feature>({
    resolver: zodResolver(FeatureSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} />
      {errors.title && <span>{errors.title.message}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}

// Server Action pattern
async function createFeature(formData: FormData) {
  'use server';
  
  const validatedFields = FeatureSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return { error: 'Invalid form data' };
  }

  try {
    // Database operations
    const feature = await db.feature.create({
      data: validatedFields.data,
    });
    
    revalidatePath('/features');
    return { success: true, data: feature };
  } catch (error) {
    return { error: 'Failed to create feature' };
  }
}

// API Route pattern
export async function GET(request: Request) {
  try {
    const features = await db.feature.findMany();
    return NextResponse.json(features);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch features' },
      { status: 500 }
    );
  }
}
```

### Integration Points

```yaml
DEPENDENCIES:
  - add to: package.json
  - pattern: |
      "dependencies": {
        "zod": "^4.3.0",
        "react-hook-form": "^7.71.0",
        "@hookform/resolvers": "^4.0.0",
        "next": "^16.0.0"
      }

ROUTING:
  - add to: app/[feature]/page.tsx
  - pattern: "App Router file-based routing"

MIDDLEWARE:
  - add to: middleware.ts (if needed)
  - pattern: |
      export function middleware(request: NextRequest) {
        // Authentication, redirects, etc.
      }

LAYOUT_INTEGRATION:
  - add to: app/layout.tsx or app/[feature]/layout.tsx
  - pattern: "Shared layout components and metadata"

DATABASE_INTEGRATION:
  - add to: lib/db.ts or prisma/schema.prisma
  - pattern: "Database schema and connection"

STYLING:
  - add to: tailwind.config.js and components
  - pattern: "Tailwind CSS utility classes and custom components"
```

## Validation Loop

### Level 1: Next.js Build & Type Checking (Immediate Feedback)

```bash
# Run after each file creation - fix before proceeding
npm run lint                                   # ESLint validation
npm run type-check                             # TypeScript validation
npm run build                                  # Next.js build test

# Development server validation
npm run dev                                    # Start development server
curl -I http://localhost:3000/[feature]       # Test route accessibility

# Expected: Zero build errors, clean lint output, types validate
```

### Level 2: Testing (Component & Integration Validation)

```bash
# Unit and component tests
npm test                                       # Run all tests
npm test -- --coverage                        # Generate coverage report
npm test -- --watch                           # Watch mode during development

# Specific test suites
npm test src/components/[feature]/            # Component tests
npm test __tests__/api/                       # API route tests
npm test lib/actions/                         # Server Action tests

# E2E testing (if configured)
npm run test:e2e                              # End-to-end tests with Playwright

# Expected: All tests pass, coverage meets requirements
```

### Level 3: Next.js Application Validation (Full App Integration)

```bash
# Production build validation
npm run build                                  # Create production build
npm start                                      # Start production server
curl -f http://localhost:3000/api/health      # Health check

# Feature-specific endpoint testing
curl -X GET http://localhost:3000/api/[feature] \
  -H "Content-Type: application/json"         # Test GET endpoint

curl -X POST http://localhost:3000/api/[feature] \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "description": "Test"}' # Test POST endpoint

# Performance and SEO validation
npm run analyze                                # Bundle analysis (if configured)
lighthouse http://localhost:3000/[feature]    # Lighthouse audit

# Expected: Production build succeeds, all endpoints respond correctly
```

### Level 4: Next.js-Specific & Creative Validation

```bash
# ═══════════════════════════════════════════════════════════
# SKILL-POWERED VALIDATION GATES
# ═══════════════════════════════════════════════════════════

# --- Next.js Core (skills: react-best-practices, nextjs-supabase-auth) ---
next info                                      # Environment information
npm audit                                      # Security audit
npm run build-stats                           # Build statistics (if configured)

# --- Design Quality (skills: ui-ux-pro-max, frontend-design, tailwind-design-system) ---
# Check: No generic SaaS look (purple gradients, over-rounded corners)
# Check: Hero-first design, style flows downward consistently
# Check: Monochrome + accent palette, big typography, clear visual hierarchy
# Check: Background techniques (noise, grain, gradients with purpose)

# --- Typography (skills: typography, font-pairing-suggester, web-typography) ---
# Verify heading/body font pairing, responsive size scale
# Check: line-height, letter-spacing, weight hierarchy

# --- Icons & Assets (skills: icon-design, better-icons, favicon-gen) ---
# Verify consistent icon system, semantic selection
# Check: favicon generated, OG images configured

# --- Performance & SEO (skills: audit-website, seo-audit) ---
next-bundle-analyzer                           # Bundle size analysis
web-vitals                                     # Core Web Vitals testing
axe-core                                       # Accessibility testing (WCAG 2.1 AA)
next-seo                                       # SEO metadata validation

# --- Web Standards (skills: web-design-guidelines) ---
# Verify responsive design across breakpoints
# Check: progressive enhancement, SSR/SSG correctness

# --- Deployment ---
vercel --prod                                  # Deploy to Vercel (if using)
# Or docker build and deployment validation

# Database migration and seeding (if applicable)
npx prisma migrate deploy                      # Apply database migrations
npx prisma db seed                             # Seed database with test data

# Expected: Performance benchmarks met, accessibility compliant, SEO optimized, design quality verified
```

## Final Validation Checklist

### Technical Validation

- [ ] All 4 validation levels completed successfully
- [ ] All tests pass: `npm test`
- [ ] No lint errors: `npm run lint`
- [ ] No type errors: `npm run type-check`
- [ ] Production build succeeds: `npm run build`

### Next.js Feature Validation

- [ ] All success criteria from "What" section met
- [ ] Manual testing in both development and production
- [ ] Server and Client Components work correctly
- [ ] API routes respond with proper status codes and data
- [ ] Form submissions and Server Actions work as expected
- [ ] Error boundaries and loading states implemented

### Web Standards Validation

- [ ] SEO metadata properly configured
- [ ] Core Web Vitals meet performance standards
- [ ] Accessibility compliance (WCAG 2.1 AA)
- [ ] Responsive design works across devices
- [ ] Progressive enhancement implemented where applicable

### Next.js Best Practices

- [ ] Server Components used for initial page loads
- [ ] Client Components used only where necessary
- [ ] Proper error handling and loading states
- [ ] Type safety with TypeScript throughout
- [ ] Security best practices followed (validation, sanitization)

---

## MCP Server Integration for Next.js Development

### Available MCP Servers for Enhanced Next.js Development

**Context7 MCP**: Next.js Documentation and Best Practices
- Use `mcp__context7__resolve-library-id` to find Next.js packages, React libraries, and web development frameworks
- Use `mcp__context7__get-library-docs` to access comprehensive Next.js documentation, API references, and implementation guides
- Essential for accessing latest Next.js features, App Router patterns, and modern React development practices

**Playwright MCP**: Comprehensive Web Testing and Validation
- Use `mcp__playwright__browser_navigate` to test Next.js applications and validate user journeys
- Use `mcp__playwright__browser_take_screenshot` for visual regression testing across devices and browsers
- Use `mcp__playwright__browser_network_requests` to monitor API performance and SSR/SSG behavior
- Essential for end-to-end testing, Core Web Vitals measurement, and cross-browser compatibility

**GSAP Master MCP**: Advanced Web Animation Documentation
- Access modern web animation patterns, performance optimization techniques for React components
- Reference smooth scroll implementations, micro-interactions, and complex animation orchestrations
- Use for creating engaging Next.js applications with optimized animation performance

**Replicate MCP**: AI-Powered Next.js Development
- Generate React component variations, API route patterns, and testing scenarios
- Create realistic test data for development and demonstration purposes
- Use for automated code optimization and Next.js pattern recommendations

**Unsplash MCP**: Professional Web Assets
- Access high-quality images for Next.js applications, landing pages, and marketing sites
- Maintain consistent visual quality with proper Next.js image optimization integration
- Ensure proper licensing and performance optimization for web delivery

### MCP-Enhanced Next.js Implementation Workflow

When implementing Next.js features using this PRP:
1. **Documentation Research**: Query Context7 MCP for latest Next.js App Router documentation, React patterns, and web standards
2. **Comprehensive Testing**: Use Playwright MCP for automated testing, visual regression testing, and performance validation
3. **Animation Enhancement**: Reference GSAP Master MCP for modern web animations and smooth user interactions
4. **AI-Assisted Development**: Leverage Replicate MCP for component generation, API pattern suggestions, and automated testing strategies
5. **Asset Optimization**: Use Unsplash MCP with Next.js Image component for optimized, professional web assets
6. **Performance Validation**: Combine Context7 and Playwright MCP for Core Web Vitals optimization and accessibility compliance

## Anti-Patterns to Avoid

- ❌ Don't use 'use client' everywhere - Server Components are the default
- ❌ Don't fetch data in Client Components if Server Components can do it
- ❌ Don't forget metadata for SEO and social sharing
- ❌ Don't skip input validation on both client and server
- ❌ Don't ignore Web Vitals and performance metrics
- ❌ Don't use pages router patterns in app router
- ❌ Don't hardcode API URLs - use environment variables
- ❌ Don't skip error boundaries and loading states
- ❌ Don't ignore MCP server capabilities - leverage Context7 for documentation, Playwright for testing, and others as appropriate for Next.js development
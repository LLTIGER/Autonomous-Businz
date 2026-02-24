# Execute Next.js Enhanced BASE PRP

## PRP: $ARGUMENTS

## Next.js Execution Mission

Execute the specified Next.js PRP with **web-first implementation excellence** through systematic Next.js development workflow and rigorous web standards validation.

**Critical Understanding**: You are implementing a Next.js web application feature that must:

- Work seamlessly across all modern browsers and devices
- Follow Next.js App Router best practices and modern React patterns
- Achieve excellent Core Web Vitals and performance metrics
- Pass all Next.js-specific validation gates

**Success Metric**: Complete, working Next.js feature that passes all 4 validation levels and meets modern web standards.

## Next.js Execution Workflow

### Phase 1: Next.js PRP Analysis and Planning

1. **Load and Parse Next.js PRP**
   ```bash
   # Read the Next.js PRP file
   cat PRPs/nextjs-{prp-name}.md
   ```

2. **Next.js Environment Validation**
   ```bash
   # Verify Next.js development environment
   node --version
   npm --version
   next info
   ```

3. **NEXTJS ULTRATHINK Planning**
   - Use TodoWrite tool to create comprehensive implementation plan
   - Break down Next.js PRP into specific web development tasks
   - Plan Next.js App Router structure (Server/Client Components)
   - Identify Next.js dependencies and performance requirements
   - Create systematic approach following the Next.js PRP blueprint

### Phase 2: Next.js Implementation Execution

1. **Execute Implementation Tasks**
   - Follow the exact task order from the Next.js PRP
   - Implement each Next.js layer systematically:
     - Validation schemas with Zod
     - Server Actions and API routes
     - Server Components for data fetching
     - Client Components for interactivity
     - Custom hooks for client-side logic
   - Create Next.js tests for each component as specified

2. **Use Next.js-Specialized Subagents**
   - Spawn nextjs-optimizer for complex performance decisions
   - Use codebase-analyst for Next.js pattern discovery
   - Leverage library-researcher for Next.js package integration

### Phase 3: Next.js Validation Loop Execution

**CRITICAL**: Run each validation level in sequence. Do not proceed to next level until current level passes completely.

#### Level 1: Next.js Build & Type Checking
```bash
# Run after each Next.js file creation - fix before proceeding
npm run lint                                   # ESLint validation
npm run type-check                             # TypeScript validation
npm run build                                  # Next.js build test

# Development server validation
npm run dev                                    # Start development server
curl -I http://localhost:3000/{feature}       # Test route accessibility

# EXPECTED: Zero build errors, clean lint output, types validate
```

#### Level 2: Next.js Testing
```bash
# Unit and component tests
npm test                                       # Run all tests
npm test -- --coverage                        # Generate coverage report
npm test -- --watch                           # Watch mode during development

# Specific test suites
npm test src/components/{feature}/            # Component tests
npm test __tests__/api/                       # API route tests
npm test lib/actions/                         # Server Action tests

# E2E testing (if configured)
npm run test:e2e                              # End-to-end tests with Playwright

# EXPECTED: All tests pass, coverage meets requirements
```

#### Level 3: Next.js Application Integration
```bash
# Production build validation
npm run build                                  # Create production build
npm start                                      # Start production server
curl -f http://localhost:3000/api/health      # Health check

# Feature-specific endpoint testing
curl -X GET http://localhost:3000/api/{feature} \
  -H "Content-Type: application/json"         # Test GET endpoint

curl -X POST http://localhost:3000/api/{feature} \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "description": "Test"}' # Test POST endpoint

# Performance and SEO validation
npm run analyze                                # Bundle analysis (if configured)
lighthouse http://localhost:3000/{feature}    # Lighthouse audit

# EXPECTED: Production build succeeds, all endpoints respond correctly
```

#### Level 4: Next.js Production Readiness
```bash
# Next.js specific validations
next info                                      # Environment information
npm audit                                      # Security audit
npm run build-stats                           # Build statistics (if configured)

# Performance validation
next-bundle-analyzer                           # Bundle size analysis
web-vitals                                     # Core Web Vitals testing

# SEO and accessibility validation
axe-core                                       # Accessibility testing
next-seo                                       # SEO metadata validation

# Production deployment validation
vercel --prod                                  # Deploy to Vercel (if using)
# Or docker build and deployment validation

# Database migration and seeding (if applicable)
npx prisma migrate deploy                      # Apply database migrations
npx prisma db seed                             # Seed database with test data

# EXPECTED: Performance benchmarks met, accessibility compliant, SEO optimized
```

### Phase 4: Next.js Final Validation

**Execute Next.js Final Validation Checklist from PRP**

Run through every item in the "Final Validation Checklist" section of the Next.js PRP:

- [ ] Technical Validation (all 4 levels pass)
- [ ] Next.js Feature Validation (user experience requirements)
- [ ] Web Standards Validation (SEO, accessibility, performance)
- [ ] Next.js Best Practices (Server/Client Components, security)

## Next.js Error Handling Protocol

### When Next.js Validation Fails

1. **Read Error Output Carefully**
   - Next.js build errors provide specific file and line information
   - Use `next info` to diagnose environment issues
   - Check browser console for client-side errors

2. **Fix Issues Systematically**
   - Fix TypeScript and lint errors first (Level 1)
   - Then address test failures (Level 2)
   - Finally resolve build and deployment issues (Level 3)

3. **Use Next.js-Specific Debug Tools**
   ```bash
   # Next.js debugging commands
   npm run build -- --debug                    # Detailed build output
   npm run dev -- --turbo                      # Fast refresh debugging
   next telemetry                               # Telemetry information
   ```

4. **Leverage Next.js Subagents**
   - Use nextjs-optimizer for performance fixes
   - Spawn debugger subagent for complex Next.js issues
   - Use library-researcher for Next.js package problems

## Next.js Implementation Standards

### Next.js App Router Organization
- Use app/ directory for file-based routing
- Implement Server Components by default
- Use 'use client' only when necessary
- Follow Next.js naming conventions (page.tsx, layout.tsx, etc.)

### Next.js Performance Requirements
- Achieve good Core Web Vitals scores
- Optimize images with next/image
- Implement code splitting and lazy loading
- Use proper caching strategies

### Next.js SEO and Accessibility
- Implement Metadata API for SEO
- Ensure semantic HTML structure
- Follow WCAG 2.1 AA accessibility guidelines
- Use proper heading hierarchy and alt text

## Output Requirements

**Upon Successful Completion:**

1. **Working Next.js Feature**
   - All implementation tasks completed
   - All 4 validation levels pass
   - Feature works across modern browsers

2. **Complete Test Coverage**
   - Unit tests for utilities and hooks
   - Component tests with React Testing Library
   - API route tests with proper mocking
   - E2E tests for critical user flows

3. **Web Standards Compliance**
   - SEO optimized with proper metadata
   - Accessible to users with disabilities
   - Performance optimized for Core Web Vitals
   - Responsive design across devices

4. **Production Ready**
   - Security best practices implemented
   - Error handling and loading states
   - Environment configuration complete
   - Deployment ready with proper optimizations

**Success Confirmation**: The Next.js feature is production-ready and meets all modern web standards specified in the original Next.js PRP.
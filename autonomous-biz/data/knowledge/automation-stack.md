# Automation Stack

## Recommended Tools by Layer

### AI & Content Generation
- **OpenAI API (GPT-4o):** Text generation, analysis, classification, and chat
- **Replicate / Stable Diffusion:** Image generation for products, thumbnails, and marketing assets
- **ElevenLabs:** Voice synthesis for video narration, podcasts, and voice agents
- **Anthropic Claude API:** Complex reasoning, code generation, and document analysis

### Payments & Commerce
- **Stripe:** Subscriptions, one-time payments, and invoicing
- **Stripe Connect:** Marketplace split payments and seller payouts
- **Lemon Squeezy:** Alternative for digital product sales with built-in tax handling

### Infrastructure & Hosting
- **Vercel:** Next.js hosting with edge functions, analytics, and automatic scaling
- **PostgreSQL (Neon/Supabase):** Primary database for structured data
- **Redis (Upstash):** Caching, rate limiting, and job queues
- **S3 (AWS/Cloudflare R2):** File storage for digital products and generated assets

### Communication & Marketing
- **Resend:** Transactional and marketing emails with React templates
- **Twilio:** SMS notifications, voice calls, and phone verification
- **Buffer / Typefully:** Social media scheduling and automation

### Monitoring & Analytics
- **Vercel Analytics:** Web performance and visitor analytics
- **Sentry:** Error tracking and performance monitoring
- **PostHog:** Product analytics, feature flags, and A/B testing

### Workflow Orchestration
- **n8n (self-hosted):** Visual workflow automation for complex multi-step processes
- **Inngest:** Event-driven background jobs with retries and scheduling
- **Cron (Vercel):** Simple scheduled tasks for periodic operations

## Integration Principle
Every tool must have an API. If a tool does not offer programmatic access, find an alternative that does. The entire stack should be controllable via code — no manual dashboard clicking in production workflows.

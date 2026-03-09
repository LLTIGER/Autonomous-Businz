# Marketplace & Business Discovery APIs Reference

## Purpose
This document provides complete API reference for all business opportunity search sources used by the Autonomous Business Launcher app.

---

## 1. Empire Flippers Marketplace API

**Base URL:** `https://api.empireflippers.com/api/v1`
**Auth:** None required for marketplace API. API key header for valuation tool.
**Rate Limit:** 1 req/sec (marketplace), 120 req/min (valuation)

### Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/listings/list` | GET | All publicly visible marketplace listings |
| `/ef-config` | GET | Configuration (niches, monetization types for filtering) |
| `/listings/recommendations?id={UUID}` | GET | Similar listings to a given listing |

### Query Parameters for `/listings/list`

- `page` (int, default 1) -- pagination
- `limit` (int, default 20, max 100) -- results per page
- `q` (string) -- full-text search
- `sort` / `order` (ASC/DESC) -- sorting
- `listing_number` -- specific listing
- `listing_price_from` / `listing_price_to` -- price range (USD)
- `average_monthly_net_profit_from` / `average_monthly_net_profit_to` -- profit range
- `monetizations` -- filter by type (use `||` delimiter, e.g., `SaaS||Affiliate`)
- `niches` -- filter by niche (use `||` delimiter)
- `countries` -- country filter (e.g., `US||UK||AU`)
- `uses_pbn` (boolean), `sba_financing_approved` (boolean), `has_trademark` (boolean)

### TypeScript Example

```typescript
async function searchEmpireFlippers(params: {
  monetizations?: string;
  niches?: string;
  listing_price_from?: number;
  listing_price_to?: number;
  average_monthly_net_profit_from?: number;
  q?: string;
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) searchParams.set(k, String(v));
  });

  const res = await fetch(
    `https://api.empireflippers.com/api/v1/listings/list?${searchParams}`,
    { headers: { Accept: "application/json" } }
  );
  if (!res.ok) throw new Error(`EF API ${res.status}`);
  return res.json();
}
```

### Valuation Tool API (Requires Referral Partner Key)

**Endpoint:** `GET /api/v1/partner-toolkit/valuation-tool/valuation`
**Auth Header:** `X-Empire-Flippers-API-Key: <your-key>`

**Required param:** `average_monthly_net_profit` (integer, USD)
**Optional:** `monetization`, `business_created_at`, `mrr_now`, `saas_model`, `number_of_paid_subscribers`, `average_monthly_churn_percent`

**Response:**
```json
{
  "data": {
    "absolute_low_multiple": 20.0,
    "typical_low_multiple": 30.0,
    "suggested_listing_multiple": 40.0,
    "typical_high_multiple": 50.0,
    "absolute_low_valuation": 200000,
    "suggested_listing_price": 400000
  }
}
```

---

## 2. Product Hunt API v2

**Endpoint:** `POST https://api.producthunt.com/v2/api/graphql`
**Auth:** `Authorization: Bearer <access_token>`
**Rate Limit:** 6,250 complexity points / 15 min

### Getting a Token

```typescript
async function getProductHuntToken(clientId: string, clientSecret: string) {
  const res = await fetch("https://api.producthunt.com/v2/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
    }),
  });
  const data = await res.json();
  return data.access_token as string;
}
```

### Search Posts Query

```typescript
async function searchProductHunt(token: string, opts: {
  topic?: string;
  postedAfter?: string;
  first?: number;
  order?: "RANKING" | "NEWEST" | "VOTES" | "FEATURED_AT";
}) {
  const query = `
    query($first: Int, $postedAfter: DateTime, $topic: String, $order: PostsOrder) {
      posts(first: $first, postedAfter: $postedAfter, topic: $topic, order: $order, featured: true) {
        totalCount
        edges {
          node {
            id name tagline description url website
            votesCount commentsCount reviewsRating
            createdAt featuredAt
            thumbnail { url }
            topics(first: 5) { edges { node { name slug } } }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.producthunt.com/v2/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables: opts }),
  });
  return res.json();
}
```

---

## 3. Flippa API

**Base URL:** `https://api.flippa.com/v3`
**Auth:** OAuth2 Bearer token (client_credentials grant)
**Note:** Developer docs are gated -- requires approval at developers.flippa.com

### Auth Flow

```typescript
async function authenticateFlippa(clientId: string, clientSecret: string) {
  const res = await fetch("https://api.flippa.com/v3/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });
  const data = await res.json();
  return data.access_token as string;
}
```

### Search Listings

```typescript
async function searchFlippa(token: string, params?: {
  search_template?: string;
  sort_alias?: string;
  page_number?: number;
  page_size?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) searchParams.set(k, String(v));
    });
  }

  const res = await fetch(`https://api.flippa.com/v3/listings?${searchParams}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
  return res.json();
}
```

---

## 4. Harmonic.ai API

**Base URL:** `https://api.harmonic.ai`
**Auth Header:** `apikey: <your-harmonic-api-key>` (NOT Bearer)
**Rate Limit:** 10 req/sec
**Database:** 30M+ companies, 190M+ people

### Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/search/search_agent?query=...&size=...` | GET | Natural language company search |
| `/search/typeahead?query=...&search_type=COMPANY` | GET | Autocomplete search |
| `/search/similar_companies/{id}?size=...` | GET | Find similar companies |
| `/companies?website_domain=...` | POST | Lookup company by domain |
| `/companies/batchGet` | POST | Batch fetch companies by ID |

### Company Data Shape

```typescript
interface HarmonicCompany {
  id: number;
  name: string;
  description?: string;
  website?: { url?: string; domain?: string };
  headcount?: number;
  founding_date?: { date?: string };
  location?: { city?: string; state?: string; country?: string };
  funding?: {
    funding_total?: number;
    num_funding_rounds?: number;
    funding_stage?: string;
  };
  customer_type?: string;
  company_type?: string;
  stage?: string;
}
```

### TypeScript Example

```typescript
async function searchHarmonic(apiKey: string, query: string, size = 25) {
  const params = new URLSearchParams({ query, size: String(size) });
  const res = await fetch(`https://api.harmonic.ai/search/search_agent?${params}`, {
    headers: { apikey: apiKey, Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Harmonic API ${res.status}`);
  return res.json();
}

async function enrichCompany(apiKey: string, domain: string) {
  const params = new URLSearchParams({ website_domain: domain });
  const res = await fetch(`https://api.harmonic.ai/companies?${params}`, {
    method: "POST",
    headers: { apikey: apiKey, "Content-Type": "application/json" },
  });
  return res.json();
}
```

---

## Summary

| Source | Auth | Rate Limit | Best For |
|--------|------|-----------|----------|
| Empire Flippers | None (public) | 1 req/sec | Established businesses $50K-$10M+ |
| Product Hunt | OAuth2 Bearer | 6,250 pts/15min | New product discovery |
| Flippa | OAuth2 Bearer | Unknown | Smaller digital assets |
| Harmonic.ai | apikey header | 10 req/sec | Startup intelligence, enrichment |

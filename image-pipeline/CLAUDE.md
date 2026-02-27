# Image Generation Pipeline

## Core Philosophy

**Right model for the right job.** Every image generation request should route through the model selector to pick the optimal model based on the use case, not personal habit.

## System Overview

This pipeline manages AI image generation across multiple Replicate models, with local storage in the **Image Pool** at `Z:\Ai images pool\`. Every generated image is downloaded, renamed descriptively, and cataloged for reuse.

## API Configuration

- **Primary API**: Replicate (`REPLICATE_API_TOKEN` env var)
- **Never** hardcode API keys in any file
- **Never** commit `.env` files or tokens to git

## Model Selection

Before generating, always consult `image-pipeline/models/model-selector.md` for the recommended model. The selection matrix maps use cases to optimal models.

### User's Preferred Models (Feb 2026)

| Model | ID | Strength |
|---|---|---|
| Nano Banana 2 | `google/nano-banana-2` | Production quality, 4K, versatile |
| Seedream 5 | `bytedance/seedream-5` | Multi-step reasoning, artistic depth |

### Multi-Tool Strategy

- **Replicate API**: Primary for ALL models
- **Nano Banana Pro skill**: Alternative when Replicate is slow/unavailable
- **Seedream skill**: Alternative when Replicate is slow/unavailable

## Image Pool Rules

### Location
`Z:\Ai images pool\`

### Naming Convention
```
YYYY-MM-DD-HH-MM-SS-descriptive-name.png
```
Example: `2026-02-27-14-30-45-luxury-watch-marble-surface.png`

### Categories
Images are organized into subdirectories by category:
- `product-photography/` — Product shots, e-commerce
- `portraits-beauty/` — People, faces, beauty shots
- `landscapes-scenery/` — Nature, environments
- `website-assets/heroes/` — Hero banners
- `website-assets/backgrounds/` — Backgrounds
- `website-assets/icons/` — Icons
- `social-media/` — Social posts, thumbnails
- `book-covers/` — Book cover art
- `logos-icons/` — SVG logos, icons, brand marks
- `illustrations-art/` — Artistic, creative pieces
- `architecture-interior/` — Buildings, rooms, spaces
- `video/` — Generated video files
- `concepts-drafts/` — Quick drafts, iterations
- `uncategorized/` — Catch-all

### Catalog
`catalog.json` at the pool root is the master index. Every image must have an entry with:
- `id`, `filename`, `path`, `category`, `tags`, `description`
- `model_used`, `prompt`, `date`, `project`, `resolution`, `favorite`

### Reuse First
**Always search the existing catalog before generating new images.** Use `/image-search` to find existing matches.

## Quality Standards

1. **Output format**: PNG for quality, WebP for web optimization
2. **Resolution**: Use highest available for the model; downscale for delivery
3. **Aspect ratios**: Match the use case (16:9 for banners, 1:1 for social, 2:3 for portraits)
4. **Prompt quality**: Use model-specific prompt engineering from `prompt-engineering.md`

## Integration Points

### Website Builds
1. Search pool → Generate if needed → Save to pool → Copy to project `public/images/`

### Book Covers
1. Use genre/mood from book config → Route to artistic model → Save to `book-covers/`

### Social Media
1. Use fast/cheap models for drafts → Upgrade to quality model for finals

## Commands

| Command | Purpose |
|---|---|
| `/generate-image` | Generate an image end-to-end |
| `/image-search` | Search existing image pool |
| `/image-catalog` | View, manage, tag images |

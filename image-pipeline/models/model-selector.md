# Model Selection Matrix

## How to Use

Given a use case or image brief, find the matching row below. Use the **Primary Model** first. Fall back to the **Fallback** if the primary is unavailable or produces poor results.

## Selection Matrix

| Use Case | Primary Model | Fallback | Why |
|---|---|---|---|
| **Product Photography** | `google/nano-banana-2` | `black-forest-labs/flux-2-max` | Best overall toolkit, 4K output, exceptional product lighting |
| **Beauty/Portraits** | `google/nano-banana-2` | `bytedance/seedream-5` | Top-tier skin tones, facial features, natural lighting |
| **Landscapes/Scenery** | `bytedance/seedream-5` | `google/imagen-4` | Multi-step reasoning, deep world knowledge, rich environments |
| **Website Hero Banners** | `google/nano-banana-2` | `black-forest-labs/flux-2-pro` | High-res, clean composition, versatile |
| **Social Media Content** | `ideogram-ai/ideogram-v3-turbo` | `black-forest-labs/flux-2-klein-4b` | Fast, cost-effective, excellent text rendering |
| **Logo/Icon/SVG** | `recraft-ai/recraft-v4-svg` | `recraft-ai/recraft-v3-svg` | Only models that output actual SVG |
| **Book Covers** | `google/nano-banana-2` | `bytedance/seedream-5` | Artistic quality, strong composition, 4K output |
| **Artistic/Illustration** | `bytedance/seedream-5` | `leonardoai/lucid-origin` | Advanced reasoning for complex artistic concepts |
| **Anime/Cartoon** | `datacte/proteus-v0.3` | `pixverse/pixverse-v5` | Anime-optimized training |
| **Architecture/Interior** | `bytedance/seedream-5` | `google/nano-banana-2` | Strongest spatial understanding, geometric accuracy |
| **Text-Heavy Images** | `ideogram-ai/ideogram-v3-quality` | `recraft-ai/recraft-v4-pro` | Best text rendering accuracy |
| **Quick Drafts/Concepts** | `black-forest-labs/flux-2-klein-4b` | `black-forest-labs/flux-schnell` | Sub-second, cheapest — perfect for iteration |
| **Image Editing** | `black-forest-labs/flux-kontext-pro` | `google/nano-banana-2` | Best at modifying existing images |
| **Photorealism (general)** | `google/nano-banana-2` | `black-forest-labs/flux-2-max` | Most complete production toolkit |
| **Video (short)** | `kwaivgi/kling-v3-video` | `minimax/hailuo-2.3` | Cinematic quality, audio support |
| **Video (fast/cheap)** | `pixverse/pixverse-v5.6` | `wan-video/wan-2.5-t2v` | Budget-friendly, good physics |
| **Upscaling** | `tencentarc/gfpgan` (faces) | super-resolution collection | Face restoration + general upscaling |

## Model Details

### google/nano-banana-2
- **Type**: Text-to-image
- **Max Resolution**: 4K
- **Best for**: Production photography, portraits, product shots, hero banners
- **Aspect ratios**: All standard ratios supported
- **Speed**: Medium (~10-20s)
- **Cost**: Medium
- **Notes**: The go-to model for production quality. Excellent skin tones, lighting, and composition.

### bytedance/seedream-5
- **Type**: Text-to-image
- **Best for**: Landscapes, artistic work, architecture, complex scenes
- **Aspect ratios**: All standard ratios supported
- **Speed**: Medium (~15-25s)
- **Cost**: Medium
- **Notes**: Multi-step reasoning produces deeper, more coherent scenes. Strong spatial understanding.

### ideogram-ai/ideogram-v3-turbo
- **Type**: Text-to-image
- **Best for**: Social media, text-heavy images, quick content
- **Speed**: Fast (~5-10s)
- **Cost**: Low
- **Notes**: Best text rendering in images. Great for social posts with overlaid text.

### ideogram-ai/ideogram-v3-quality
- **Type**: Text-to-image
- **Best for**: Text-heavy images requiring highest accuracy
- **Speed**: Medium (~15-20s)
- **Cost**: Medium
- **Notes**: When text rendering accuracy is critical.

### recraft-ai/recraft-v4-svg
- **Type**: Text-to-SVG
- **Best for**: Logos, icons, vector graphics
- **Output**: Actual SVG files
- **Speed**: Fast (~5-10s)
- **Cost**: Low
- **Notes**: Only use when vector output is needed.

### black-forest-labs/flux-2-klein-4b
- **Type**: Text-to-image
- **Best for**: Quick drafts, rapid iteration, concepts
- **Speed**: Very fast (sub-second to ~3s)
- **Cost**: Very low
- **Notes**: Perfect for exploring ideas before committing to a quality model.

### black-forest-labs/flux-kontext-pro
- **Type**: Image editing
- **Best for**: Modifying existing images, inpainting, style transfer
- **Speed**: Medium
- **Cost**: Medium
- **Notes**: Feed in an existing image + instructions for edits.

### kwaivgi/kling-v3-video
- **Type**: Text-to-video
- **Best for**: Short cinematic clips
- **Speed**: Slow (~60-120s)
- **Cost**: High
- **Notes**: Cinematic quality with audio support.

## Decision Flow

```
1. What is the use case? → Find row in matrix
2. Is it a draft or final? → Draft: use Quick Drafts model; Final: use primary
3. Does it need text in the image? → Yes: use Ideogram
4. Does it need to be SVG? → Yes: use Recraft
5. Is it a video? → Yes: use Kling or Pixverse
6. Is it editing an existing image? → Yes: use Flux Kontext
7. Default: → Nano Banana 2
```

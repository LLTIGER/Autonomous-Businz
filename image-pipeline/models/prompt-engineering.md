# Model-Specific Prompt Engineering

## Universal Principles

1. **Be specific**: "A golden retriever puppy playing in autumn leaves, soft afternoon light" > "a dog"
2. **Describe the scene**: Subject, action, environment, lighting, mood, style
3. **Front-load important details**: Models weight the beginning of prompts more heavily
4. **Use photography terms**: Aperture, focal length, lighting setups for photorealistic outputs

## Nano Banana 2 (`google/nano-banana-2`)

### Prompt Style
Responds well to natural language descriptions with photography terms.

### Effective Keywords
- **Lighting**: `golden hour`, `studio lighting`, `soft diffused light`, `dramatic rim lighting`, `natural window light`
- **Quality**: `4K`, `ultra-detailed`, `professional photography`, `sharp focus`
- **Composition**: `rule of thirds`, `centered composition`, `close-up`, `wide angle`
- **Style**: `editorial`, `commercial`, `lifestyle`, `minimalist`

### Aspect Ratios
- Portraits: `2:3` or `4:5`
- Landscapes: `16:9`
- Product: `1:1` or `4:5`
- Banners: `21:9`

### Example Prompts
```
Product: "Professional product photography of a luxury perfume bottle on a marble surface, soft studio lighting with subtle reflections, minimalist background, 4K, commercial quality"

Portrait: "Editorial portrait of a woman in natural window light, soft bokeh background, warm color palette, shallow depth of field, 85mm lens, professional photography"

Hero Banner: "Minimalist tech workspace with clean desk, laptop, and coffee cup, soft morning light streaming through window, cool blue-grey color palette, wide angle, 4K"
```

## Seedream 5 (`bytedance/seedream-5`)

### Prompt Style
Excels with detailed, multi-layered descriptions. Benefits from world knowledge and reasoning.

### Effective Keywords
- **Environment**: `atmospheric perspective`, `volumetric lighting`, `environmental storytelling`
- **Artistic**: `painterly`, `cinematic`, `ethereal`, `dreamlike`, `surreal`
- **Technical**: `ray tracing`, `global illumination`, `subsurface scattering`
- **Mood**: `melancholic`, `serene`, `epic`, `intimate`, `mysterious`

### Example Prompts
```
Landscape: "A misty mountain valley at dawn, ancient pine trees emerging from fog, a winding river reflecting the first golden rays of sunlight, volumetric god rays cutting through the mist, atmospheric perspective creating depth, serene and majestic"

Architecture: "Modern Japanese minimalist home interior, floor-to-ceiling windows overlooking a zen garden, warm wood and concrete materials, indirect ambient lighting, clean geometric lines, wabi-sabi aesthetic"

Artistic: "A vast library floating in clouds, endless bookshelves spiraling upward, warm amber light from antique lanterns, tiny figures reading on floating platforms, surreal atmospheric perspective, dreamlike quality"
```

## Ideogram V3 (`ideogram-ai/ideogram-v3-turbo` / `ideogram-ai/ideogram-v3-quality`)

### Prompt Style
Optimized for images containing text. Specify text content in quotes within the prompt.

### Text Rendering Tips
- Enclose desired text in quotation marks: `a sign that reads "OPEN 24/7"`
- Keep text short for best accuracy (1-5 words)
- Specify font style: `bold sans-serif`, `elegant script`, `retro neon`
- Specify text placement: `centered text`, `text at the top`, `banner text`

### Example Prompts
```
Social Post: "Modern social media post design with bold text reading 'SALE 50% OFF' on a gradient purple to pink background, clean sans-serif typography, Instagram story format"

Thumbnail: "YouTube thumbnail with excited expression, bold yellow text 'YOU WON'T BELIEVE THIS', red arrow pointing left, bright saturated colors, engaging layout"

Poster: "Minimalist movie poster with large text 'ECHOES' in elegant thin serif font, silhouette of person standing on cliff edge, dark moody atmosphere, film grain"
```

## Recraft V4 SVG (`recraft-ai/recraft-v4-svg`)

### Prompt Style
Focus on simplicity and vector-friendly descriptions. Avoid photorealistic terms.

### Effective Keywords
- **Style**: `flat design`, `line art`, `geometric`, `minimalist`, `isometric`
- **Color**: `monochrome`, `duotone`, `gradient`, `solid colors`, `limited palette`
- **Type**: `logo`, `icon`, `badge`, `emblem`, `symbol`

### Example Prompts
```
Logo: "Minimalist geometric logo of a mountain peak, clean lines, single color, modern flat design, suitable for tech company"

Icon: "Simple flat icon of a lightning bolt, rounded corners, gradient from yellow to orange, suitable for app icon"
```

## Flux 2 Klein (`black-forest-labs/flux-2-klein-4b`)

### Prompt Style
Keep prompts concise for this fast model. Best for quick exploration.

### Tips
- Short, direct descriptions work best
- Don't over-specify — this model is for speed, not perfection
- Use for concept exploration before switching to quality models

### Example Prompts
```
Draft: "Modern coffee shop interior, warm lighting"
Concept: "Futuristic city skyline, neon lights, rain"
Quick: "Product photo, headphones on white background"
```

## Flux Kontext Pro (`black-forest-labs/flux-kontext-pro`)

### Prompt Style
Provide the source image + editing instructions. Be specific about what to change and what to keep.

### Tips
- Describe changes explicitly: "Change the background to a beach sunset"
- Specify what to preserve: "Keep the subject's pose and expression"
- Works well for style transfer: "Apply watercolor painting style"

## Common Negative Prompt Patterns

Most Replicate models support negative prompts. Use these to avoid common issues:

```
General: "blurry, distorted, low quality, watermark, text overlay, cropped"
Portraits: "deformed hands, extra fingers, distorted face, unnatural skin"
Products: "shadows on product, reflections, busy background, text"
Architecture: "distorted perspective, impossible geometry, floating objects"
```

## Aspect Ratio Quick Reference

| Use Case | Ratio | Pixels (example) |
|---|---|---|
| Instagram Post | 1:1 | 1024x1024 |
| Instagram Story | 9:16 | 1024x1820 |
| YouTube Thumbnail | 16:9 | 1920x1080 |
| Pinterest Pin | 2:3 | 1024x1536 |
| Website Hero | 21:9 | 2520x1080 |
| Portrait | 2:3 | 1024x1536 |
| Landscape | 3:2 | 1536x1024 |
| Book Cover | 2:3 | 1600x2400 |

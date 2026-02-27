Generate an image based on the user's brief and save it to the image pool.

## Input
$ARGUMENTS

## Workflow

### 1. Parse the Brief
Extract from the user's input:
- **Description**: What the image should depict
- **Use case**: Product photo, portrait, landscape, social media, logo, book cover, etc.
- **Aspect ratio**: Infer from use case if not specified (16:9 for banners, 1:1 for social, 2:3 for portraits)
- **Category**: Map to one of the pool categories
- **Project**: If the user mentions a specific project

### 2. Search Before Generating
First, check if a similar image already exists:
```bash
python "Z:/templates/Claude Code/PRPs-agentic-eng-development chicco/image-pipeline/scripts/catalog_manager.py" similar --prompt "<the prompt>"
```
If similar images exist (>60% match), show them to the user and ask if they want to reuse or generate new.

### 3. Select the Model
Consult the model selection matrix at `image-pipeline/models/model-selector.md`:

| Use Case | Primary Model |
|---|---|
| Product Photography | `google/nano-banana-2` |
| Beauty/Portraits | `google/nano-banana-2` |
| Landscapes/Scenery | `bytedance/seedream-5` |
| Website Hero Banners | `google/nano-banana-2` |
| Social Media Content | `ideogram-ai/ideogram-v3-turbo` |
| Logo/Icon/SVG | `recraft-ai/recraft-v4-svg` |
| Book Covers | `google/nano-banana-2` |
| Artistic/Illustration | `bytedance/seedream-5` |
| Text-Heavy Images | `ideogram-ai/ideogram-v3-quality` |
| Quick Drafts | `black-forest-labs/flux-2-klein-4b` |
| Image Editing | `black-forest-labs/flux-kontext-pro` |
| Video (short) | `kwaivgi/kling-v3-video` |

### 4. Engineer the Prompt
Consult `image-pipeline/models/prompt-engineering.md` for model-specific tips. Enhance the user's description with:
- Photography terms (lighting, composition, lens)
- Style keywords appropriate to the model
- Negative prompt guidance if supported

Present the engineered prompt to the user for approval before generating.

### 5. Generate
Run the generation script:
```bash
python "Z:/templates/Claude Code/PRPs-agentic-eng-development chicco/image-pipeline/scripts/replicate_generate.py" \
  --prompt "<engineered prompt>" \
  --model "<selected model>" \
  --category "<category>" \
  --aspect-ratio "<ratio>" \
  --project "<project>" \
  --tags <tag1> <tag2>
```

### 6. Alternative Generation Paths
If Replicate is slow or unavailable, use skills as alternatives:
- **Nano Banana Pro**: Use the `nano-banana-pro` skill via Gemini API
- **Seedream**: Use the `seedream-image` skill via Refly

When using alternative skills, still download and catalog the result manually.

### 7. Report Results
Show the user:
- The generated image path
- Catalog ID for future reference
- The model used and prompt
- Suggestions for tags to add

### 8. Integration (if applicable)
If the image is for a specific project:
- Copy/link to the project's `public/images/` or equivalent directory
- Note the file path for use in code

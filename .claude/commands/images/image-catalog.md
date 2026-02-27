View, manage, and tag images in the image pool.

## Input
$ARGUMENTS

## Available Actions

### List Images
Show images filtered by category, date, or favorites:
```bash
python "Z:/templates/Claude Code/PRPs-agentic-eng-development chicco/image-pipeline/scripts/catalog_manager.py" list \
  --category "<category>" \
  --favorites \
  --limit 20 \
  --verbose
```

### View Image Details
Get full information about a specific image:
```bash
python "Z:/templates/Claude Code/PRPs-agentic-eng-development chicco/image-pipeline/scripts/catalog_manager.py" info --id "<catalog-id>"
```

### Add/Edit Tags
Tag images for better searchability:
```bash
# Add tags
python "Z:/templates/Claude Code/PRPs-agentic-eng-development chicco/image-pipeline/scripts/catalog_manager.py" tag --id "<catalog-id>" --add-tags hero website dark-theme

# Remove tags
python "Z:/templates/Claude Code/PRPs-agentic-eng-development chicco/image-pipeline/scripts/catalog_manager.py" tag --id "<catalog-id>" --remove-tags old-tag
```

### Toggle Favorite
Mark or unmark images as favorites:
```bash
python "Z:/templates/Claude Code/PRPs-agentic-eng-development chicco/image-pipeline/scripts/catalog_manager.py" favorite --id "<catalog-id>"
```

### View Statistics
Overview of the entire image pool:
```bash
python "Z:/templates/Claude Code/PRPs-agentic-eng-development chicco/image-pipeline/scripts/catalog_manager.py" stats
```

### Find Duplicates
Check for similar images before generating:
```bash
python "Z:/templates/Claude Code/PRPs-agentic-eng-development chicco/image-pipeline/scripts/catalog_manager.py" similar --prompt "<description>" --threshold 0.5
```

## Categories Reference
- `product-photography` — Product shots, e-commerce
- `portraits-beauty` — People, faces, beauty shots
- `landscapes-scenery` — Nature, environments
- `website-assets/heroes` — Hero banners
- `website-assets/backgrounds` — Backgrounds
- `website-assets/icons` — Icons
- `social-media` — Social posts, thumbnails
- `book-covers` — Book cover art
- `logos-icons` — SVG logos, icons, brand marks
- `illustrations-art` — Artistic, creative pieces
- `architecture-interior` — Buildings, rooms, spaces
- `video` — Generated video files
- `concepts-drafts` — Quick drafts, iterations
- `uncategorized` — Catch-all

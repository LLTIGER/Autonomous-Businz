Search the existing image pool before generating new images. Reuse first!

## Input
$ARGUMENTS

## Workflow

### 1. Parse Search Criteria
Extract from the user's input:
- **Keywords**: What they're looking for
- **Category**: If they mention a specific type (product, portrait, landscape, etc.)
- **Tags**: Any specific tags mentioned
- **Project**: If searching for a specific project's images
- **Date range**: If they want recent or older images

### 2. Run Search
```bash
python "Z:/templates/Claude Code/PRPs-agentic-eng-development chicco/image-pipeline/scripts/catalog_manager.py" search \
  --query "<keywords>" \
  --category "<category>" \
  --tags <tag1> <tag2> \
  --verbose
```

### 3. Show Results
For each matching image, display:
- **Catalog ID** for reference
- **Filename** and path
- **Description** / original prompt
- **Category** and tags
- **Model used** and date
- **Favorite status**

### 4. Suggest Actions
Based on results:
- If matches found: "You can reuse image [ID]. Want me to copy it to your project?"
- If no matches: "No existing images match. Want me to generate a new one with `/generate-image`?"
- If partial matches: "These are close but not exact. Want to generate a variation?"

### 5. Quick Stats
If the user asks for general info:
```bash
python "Z:/templates/Claude Code/PRPs-agentic-eng-development chicco/image-pipeline/scripts/catalog_manager.py" stats
```

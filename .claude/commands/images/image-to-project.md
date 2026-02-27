Copy an image from the pool into a project and generate ready-to-paste code.

## Input
$ARGUMENTS

## Workflow

### 1. Identify the Image
The user provides either:
- A **catalog ID** (e.g. `af471a67`) — use directly
- A **description** — search the pool first:
```bash
python "Z:/templates/Claude Code/PRPs-agentic-eng-development chicco/image-pipeline/scripts/catalog_manager.py" search --query "<description>" --verbose
```
Show matches and let the user pick.

### 2. Identify the Project
Determine the target project. If not specified, use the **current working directory**.

Detect the framework by checking for:
- `next.config.*` → Next.js → default subdir: `public/images`
- `pubspec.yaml` → Flutter → default subdir: `assets/images`
- `index.html` → Static site → default subdir: `images`
- `astro.config.*` → Astro → default subdir: `public/images`
- Otherwise → default subdir: `public/images`

### 3. Copy the Image
```bash
python "Z:/templates/Claude Code/PRPs-agentic-eng-development chicco/image-pipeline/scripts/catalog_manager.py" copy \
  --id "<catalog-id>" \
  --project-dir "<project-root>" \
  --rename "<clean-name>" \
  --subdir "<detected-subdir>"
```

The `--rename` flag gives the file a clean project-friendly name (e.g. `hero-banner` instead of `2026-02-27-14-41-25-a-minimalist-test-image...`).

### 4. Present Code Snippets
The script outputs ready-to-paste code for:
- **Next.js `<Image>`** component with proper imports
- **Next.js background** div with inline style
- **HTML `<img>`** tag
- **CSS `background-image`** property
- **Markdown** image syntax

Present the snippet that matches the detected framework. If unsure, show all options.

### 5. Offer to Insert
Ask the user: "Want me to insert this into a specific file?"

If yes:
- Read the target file
- Insert the import and component at the specified location
- Ensure the import statement is at the top of the file

### Example Flow
```
User: "Use that test cube image as the hero for my landing page"

1. Search pool → found af471a67 (white cube)
2. Detect project → Next.js (found next.config.ts)
3. Copy:
   catalog_manager.py copy --id af471a67 --project-dir . --rename hero-banner --subdir public/images
4. Output:
   Copied to: ./public/images/hero-banner.png

   Next.js <Image>:
   import Image from "next/image";
   <Image src="/images/hero-banner.png" alt="..." width={1024} height={1024} priority />

5. "Want me to insert this into a component?"
```

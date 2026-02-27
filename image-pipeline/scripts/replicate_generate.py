"""
Replicate Image Generation Script

Wraps Replicate API calls for image generation. Downloads outputs locally,
renames per naming convention, and updates the catalog.

Usage:
    python replicate_generate.py --prompt "A luxury watch on marble" --category product-photography
    python replicate_generate.py --prompt "Mountain sunset" --model bytedance/seedream-5 --aspect-ratio 16:9
    python replicate_generate.py --prompt "Logo for tech company" --model recraft-ai/recraft-v4-svg --category logos-icons
"""

import argparse
import asyncio
import json
import os
import sys
import uuid
from datetime import datetime
from pathlib import Path
from typing import Any

import httpx
import replicate

# ─── Configuration ───────────────────────────────────────────────────────────

IMAGE_POOL_ROOT = Path(r"Z:\Ai images pool")
CATALOG_PATH = IMAGE_POOL_ROOT / "catalog.json"

VALID_CATEGORIES = [
    "product-photography",
    "portraits-beauty",
    "landscapes-scenery",
    "website-assets/heroes",
    "website-assets/backgrounds",
    "website-assets/icons",
    "social-media",
    "book-covers",
    "logos-icons",
    "illustrations-art",
    "architecture-interior",
    "video",
    "concepts-drafts",
    "uncategorized",
]

DEFAULT_MODEL = "google/nano-banana-2"

# Model-specific default parameters
MODEL_DEFAULTS: dict[str, dict[str, Any]] = {
    "google/nano-banana-2": {
        "output_format": "png",
        "num_outputs": 1,
    },
    "bytedance/seedream-5": {
        "output_format": "png",
        "num_outputs": 1,
    },
    "ideogram-ai/ideogram-v3-turbo": {
        "num_outputs": 1,
    },
    "ideogram-ai/ideogram-v3-quality": {
        "num_outputs": 1,
    },
    "recraft-ai/recraft-v4-svg": {
        "num_outputs": 1,
    },
    "black-forest-labs/flux-2-klein-4b": {
        "output_format": "png",
        "num_outputs": 1,
        "num_inference_steps": 4,
    },
    "black-forest-labs/flux-2-max": {
        "output_format": "png",
        "num_outputs": 1,
    },
    "black-forest-labs/flux-2-pro": {
        "output_format": "png",
        "num_outputs": 1,
    },
}


# ─── Catalog Management ─────────────────────────────────────────────────────

def load_catalog() -> list[dict]:
    """Load the image catalog from disk."""
    if CATALOG_PATH.exists():
        return json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
    return []


def save_catalog(catalog: list[dict]) -> None:
    """Save the image catalog to disk."""
    CATALOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    CATALOG_PATH.write_text(
        json.dumps(catalog, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )


def add_catalog_entry(
    filename: str,
    filepath: str,
    category: str,
    description: str,
    model_used: str,
    prompt: str,
    resolution: str = "",
    project: str = "",
    tags: list[str] | None = None,
) -> dict:
    """Create and append a new catalog entry."""
    catalog = load_catalog()
    entry = {
        "id": str(uuid.uuid4())[:8],
        "filename": filename,
        "path": filepath,
        "category": category,
        "tags": tags or [],
        "description": description,
        "model_used": model_used,
        "prompt": prompt,
        "date": datetime.now().isoformat(),
        "project": project,
        "resolution": resolution,
        "favorite": False,
    }
    catalog.append(entry)
    save_catalog(catalog)
    return entry


# ─── Image Download ──────────────────────────────────────────────────────────

def generate_filename(prompt: str, ext: str = "png") -> str:
    """Generate a descriptive filename from a prompt.

    Pattern: YYYY-MM-DD-HH-MM-SS-descriptive-name.ext
    """
    now = datetime.now()
    timestamp = now.strftime("%Y-%m-%d-%H-%M-%S")

    # Create slug from first ~50 chars of prompt
    slug = prompt.lower().strip()
    # Keep only alphanumeric and spaces
    slug = "".join(c if c.isalnum() or c == " " else "" for c in slug)
    # Collapse whitespace to hyphens, truncate
    words = slug.split()[:8]
    slug = "-".join(words)

    return f"{timestamp}-{slug}.{ext}"


async def download_image(url: str, dest: Path) -> Path:
    """Download an image from URL to local path."""
    dest.parent.mkdir(parents=True, exist_ok=True)
    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.get(url, follow_redirects=True)
        response.raise_for_status()
        dest.write_bytes(response.content)
    return dest


# ─── Generation ──────────────────────────────────────────────────────────────

async def generate_image(
    prompt: str,
    model: str = DEFAULT_MODEL,
    category: str = "uncategorized",
    aspect_ratio: str = "1:1",
    project: str = "",
    tags: list[str] | None = None,
    extra_params: dict[str, Any] | None = None,
) -> list[dict]:
    """Generate image(s) via Replicate API and save to the image pool.

    Returns a list of catalog entries for each generated image.
    """
    token = os.getenv("REPLICATE_API_TOKEN")
    if not token:
        print("ERROR: REPLICATE_API_TOKEN environment variable is not set.")
        print("Set it with: setx REPLICATE_API_TOKEN r8_your_token_here")
        sys.exit(1)

    client = replicate.Client(api_token=token)

    # Build input params
    input_params: dict[str, Any] = {"prompt": prompt}

    # Add model defaults
    defaults = MODEL_DEFAULTS.get(model, {})
    input_params.update(defaults)

    # Add aspect ratio (most models support this)
    if aspect_ratio:
        input_params["aspect_ratio"] = aspect_ratio

    # Merge any extra params
    if extra_params:
        input_params.update(extra_params)

    # Validate category
    if category not in VALID_CATEGORIES:
        print(f"WARNING: Unknown category '{category}'. Using 'uncategorized'.")
        category = "uncategorized"

    category_dir = IMAGE_POOL_ROOT / category
    category_dir.mkdir(parents=True, exist_ok=True)

    # Run prediction
    print(f"Generating with {model}...")
    print(f"  Prompt: {prompt[:100]}{'...' if len(prompt) > 100 else ''}")
    print(f"  Aspect ratio: {aspect_ratio}")
    print(f"  Category: {category}")

    try:
        output = client.run(model, input=input_params)
    except replicate.exceptions.ReplicateError as e:
        print(f"ERROR: Replicate API error: {e}")
        sys.exit(1)

    # Handle output — can be a single URL, list of URLs, or FileOutput objects
    urls: list[str] = []
    if isinstance(output, str):
        urls = [output]
    elif isinstance(output, list):
        urls = [str(u) for u in output]
    elif hasattr(output, "url"):
        urls = [str(output.url)]
    else:
        urls = [str(output)]

    # Download and catalog each image
    entries = []
    for i, url in enumerate(urls):
        # Determine file extension
        is_svg = "svg" in model.lower() or url.endswith(".svg")
        ext = "svg" if is_svg else "png"

        filename = generate_filename(prompt, ext)
        if len(urls) > 1:
            # Add index for multi-output
            base, dot_ext = filename.rsplit(".", 1)
            filename = f"{base}-{i + 1}.{dot_ext}"

        dest = category_dir / filename

        print(f"  Downloading {i + 1}/{len(urls)}: {filename}")
        await download_image(url, dest)

        # Get resolution (best effort)
        resolution = ""
        try:
            from PIL import Image
            with Image.open(dest) as img:
                resolution = f"{img.width}x{img.height}"
        except (ImportError, Exception):
            pass

        entry = add_catalog_entry(
            filename=filename,
            filepath=str(dest),
            category=category,
            description=prompt,
            model_used=model,
            prompt=prompt,
            resolution=resolution,
            project=project,
            tags=tags,
        )
        entries.append(entry)
        print(f"  Saved: {dest}")
        print(f"  Catalog ID: {entry['id']}")

    print(f"\nDone! Generated {len(entries)} image(s).")
    return entries


# ─── CLI ─────────────────────────────────────────────────────────────────────

def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate images via Replicate API and save to the image pool."
    )
    parser.add_argument(
        "--prompt", "-p",
        required=True,
        help="Text description of the image to generate",
    )
    parser.add_argument(
        "--model", "-m",
        default=DEFAULT_MODEL,
        help=f"Replicate model ID (default: {DEFAULT_MODEL})",
    )
    parser.add_argument(
        "--category", "-c",
        default="uncategorized",
        choices=VALID_CATEGORIES,
        help="Image pool category (default: uncategorized)",
    )
    parser.add_argument(
        "--aspect-ratio", "-a",
        default="1:1",
        help="Aspect ratio (default: 1:1). Common: 1:1, 16:9, 2:3, 9:16",
    )
    parser.add_argument(
        "--project",
        default="",
        help="Project name to tag the image with",
    )
    parser.add_argument(
        "--tags", "-t",
        nargs="*",
        default=[],
        help="Tags to add to the catalog entry",
    )
    parser.add_argument(
        "--num-outputs", "-n",
        type=int,
        default=1,
        help="Number of images to generate (default: 1)",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    extra_params = {}
    if args.num_outputs > 1:
        extra_params["num_outputs"] = args.num_outputs

    entries = asyncio.run(
        generate_image(
            prompt=args.prompt,
            model=args.model,
            category=args.category,
            aspect_ratio=args.aspect_ratio,
            project=args.project,
            tags=args.tags,
            extra_params=extra_params,
        )
    )

    # Print summary
    print("\n--- Catalog Entries ---")
    for entry in entries:
        print(json.dumps(entry, indent=2, ensure_ascii=True))


if __name__ == "__main__":
    main()

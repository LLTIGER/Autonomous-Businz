"""
Image Catalog Manager

Manages the master catalog at Z:\\Ai images pool\\catalog.json.
Provides search, CRUD, tagging, and deduplication for the image pool.

Usage:
    python catalog_manager.py search --query "mountain sunset"
    python catalog_manager.py search --category landscapes-scenery --tags nature
    python catalog_manager.py list --category product-photography
    python catalog_manager.py info --id abc12345
    python catalog_manager.py tag --id abc12345 --add-tags hero banner
    python catalog_manager.py favorite --id abc12345
    python catalog_manager.py stats
"""

import argparse
import json
import shutil
import sys
from datetime import datetime
from pathlib import Path

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


# ─── Catalog I/O ─────────────────────────────────────────────────────────────

def load_catalog() -> list[dict]:
    if CATALOG_PATH.exists():
        return json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
    return []


def save_catalog(catalog: list[dict]) -> None:
    CATALOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    CATALOG_PATH.write_text(
        json.dumps(catalog, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )


# ─── Search ──────────────────────────────────────────────────────────────────

def search_catalog(
    query: str = "",
    category: str = "",
    tags: list[str] | None = None,
    model: str = "",
    project: str = "",
    date_from: str = "",
    date_to: str = "",
    favorites_only: bool = False,
    limit: int = 20,
) -> list[dict]:
    """Search the catalog by multiple criteria. All filters are ANDed."""
    catalog = load_catalog()
    results = []

    query_lower = query.lower()
    tags_set = set(t.lower() for t in (tags or []))

    for entry in catalog:
        # Keyword search across description, prompt, filename, tags
        if query_lower:
            searchable = " ".join([
                entry.get("description", ""),
                entry.get("prompt", ""),
                entry.get("filename", ""),
                " ".join(entry.get("tags", [])),
            ]).lower()
            if query_lower not in searchable:
                continue

        # Category filter
        if category and entry.get("category") != category:
            continue

        # Tags filter (all specified tags must be present)
        if tags_set:
            entry_tags = set(t.lower() for t in entry.get("tags", []))
            if not tags_set.issubset(entry_tags):
                continue

        # Model filter
        if model and entry.get("model_used") != model:
            continue

        # Project filter
        if project and entry.get("project") != project:
            continue

        # Date range filter
        entry_date = entry.get("date", "")
        if date_from and entry_date < date_from:
            continue
        if date_to and entry_date > date_to:
            continue

        # Favorites filter
        if favorites_only and not entry.get("favorite"):
            continue

        results.append(entry)

    # Sort by date descending (newest first)
    results.sort(key=lambda e: e.get("date", ""), reverse=True)

    return results[:limit]


# ─── CRUD Operations ─────────────────────────────────────────────────────────

def get_entry(entry_id: str) -> dict | None:
    """Get a single catalog entry by ID."""
    catalog = load_catalog()
    for entry in catalog:
        if entry.get("id") == entry_id:
            return entry
    return None


def update_entry(entry_id: str, updates: dict) -> dict | None:
    """Update fields on a catalog entry."""
    catalog = load_catalog()
    for entry in catalog:
        if entry.get("id") == entry_id:
            entry.update(updates)
            save_catalog(catalog)
            return entry
    return None


def delete_entry(entry_id: str, delete_file: bool = False) -> bool:
    """Remove a catalog entry. Optionally delete the file too."""
    catalog = load_catalog()
    for i, entry in enumerate(catalog):
        if entry.get("id") == entry_id:
            if delete_file:
                filepath = Path(entry.get("path", ""))
                if filepath.exists():
                    filepath.unlink()
            catalog.pop(i)
            save_catalog(catalog)
            return True
    return False


def add_tags(entry_id: str, new_tags: list[str]) -> dict | None:
    """Add tags to an existing entry."""
    catalog = load_catalog()
    for entry in catalog:
        if entry.get("id") == entry_id:
            existing = set(entry.get("tags", []))
            existing.update(new_tags)
            entry["tags"] = sorted(existing)
            save_catalog(catalog)
            return entry
    return None


def remove_tags(entry_id: str, tags_to_remove: list[str]) -> dict | None:
    """Remove tags from an existing entry."""
    catalog = load_catalog()
    for entry in catalog:
        if entry.get("id") == entry_id:
            existing = set(entry.get("tags", []))
            existing -= set(tags_to_remove)
            entry["tags"] = sorted(existing)
            save_catalog(catalog)
            return entry
    return None


def toggle_favorite(entry_id: str) -> dict | None:
    """Toggle the favorite flag on an entry."""
    catalog = load_catalog()
    for entry in catalog:
        if entry.get("id") == entry_id:
            entry["favorite"] = not entry.get("favorite", False)
            save_catalog(catalog)
            return entry
    return None


# ─── Deduplication ───────────────────────────────────────────────────────────

def find_similar(prompt: str, threshold: float = 0.6) -> list[dict]:
    """Find catalog entries with similar prompts (simple word overlap)."""
    catalog = load_catalog()
    prompt_words = set(prompt.lower().split())
    results = []

    for entry in catalog:
        entry_words = set(entry.get("prompt", "").lower().split())
        if not prompt_words or not entry_words:
            continue
        overlap = len(prompt_words & entry_words)
        total = len(prompt_words | entry_words)
        similarity = overlap / total if total > 0 else 0
        if similarity >= threshold:
            results.append({**entry, "_similarity": round(similarity, 2)})

    results.sort(key=lambda e: e["_similarity"], reverse=True)
    return results


# ─── Copy to Project ─────────────────────────────────────────────────────────

def copy_to_project(
    entry_id: str,
    project_dir: str,
    rename: str = "",
    subdir: str = "public/images",
) -> dict | None:
    """Copy an image from the pool into a project directory.

    Returns a dict with copy details or None if entry not found.
    """
    entry = get_entry(entry_id)
    if not entry:
        return None

    source = Path(entry["path"])
    if not source.exists():
        return {"error": f"Source file missing: {source}"}

    # Build destination
    dest_dir = Path(project_dir) / subdir
    dest_dir.mkdir(parents=True, exist_ok=True)

    # Use custom name or original filename
    if rename:
        ext = source.suffix
        dest_name = rename if rename.endswith(ext) else f"{rename}{ext}"
    else:
        dest_name = entry["filename"]

    dest = dest_dir / dest_name
    shutil.copy2(source, dest)

    # Generate framework-specific import snippets
    relative_path = f"/{subdir}/{dest_name}".replace("\\", "/")
    snippets = _generate_snippets(dest_name, relative_path, subdir)

    # Tag the catalog entry with the project
    if project_dir:
        project_name = Path(project_dir).name
        catalog = load_catalog()
        for cat_entry in catalog:
            if cat_entry.get("id") == entry_id:
                if cat_entry.get("project"):
                    existing = cat_entry["project"]
                    if project_name not in existing:
                        cat_entry["project"] = f"{existing}, {project_name}"
                else:
                    cat_entry["project"] = project_name
                break
        save_catalog(catalog)

    return {
        "source": str(source),
        "destination": str(dest),
        "relative_path": relative_path,
        "snippets": snippets,
    }


def _generate_snippets(filename: str, relative_path: str, subdir: str) -> dict[str, str]:
    """Generate framework-specific code snippets for using the image."""
    # Clean path for imports
    clean_path = relative_path.lstrip("/")
    is_public = subdir.startswith("public")

    # For Next.js, images in public/ are served from root
    if is_public:
        nextjs_src = "/" + relative_path.split("public/", 1)[-1]
    else:
        nextjs_src = relative_path

    snippets = {}

    snippets["nextjs_image"] = (
        f'import Image from "next/image";\n\n'
        f'<Image\n'
        f'  src="{nextjs_src}"\n'
        f'  alt="TODO: add description"\n'
        f'  width={{1024}}\n'
        f'  height={{1024}}\n'
        f'  priority\n'
        f'/>'
    )

    snippets["nextjs_bg"] = (
        f'<div className="bg-cover bg-center" '
        f'style={{{{ backgroundImage: `url({nextjs_src})` }}}}>\n'
        f'  {{/* content */}}\n'
        f'</div>'
    )

    snippets["html_img"] = (
        f'<img src="{nextjs_src}" alt="TODO: add description" />'
    )

    snippets["css_bg"] = (
        f'background-image: url("{nextjs_src}");'
    )

    snippets["markdown"] = (
        f'![TODO: add description]({nextjs_src})'
    )

    return snippets


# ─── Statistics ──────────────────────────────────────────────────────────────

def get_stats() -> dict:
    """Get catalog statistics."""
    catalog = load_catalog()
    if not catalog:
        return {"total": 0}

    categories: dict[str, int] = {}
    models: dict[str, int] = {}
    favorites = 0

    for entry in catalog:
        cat = entry.get("category", "uncategorized")
        categories[cat] = categories.get(cat, 0) + 1

        model = entry.get("model_used", "unknown")
        models[model] = models.get(model, 0) + 1

        if entry.get("favorite"):
            favorites += 1

    return {
        "total": len(catalog),
        "favorites": favorites,
        "by_category": dict(sorted(categories.items(), key=lambda x: -x[1])),
        "by_model": dict(sorted(models.items(), key=lambda x: -x[1])),
    }


# ─── CLI ─────────────────────────────────────────────────────────────────────

def print_entry(entry: dict, verbose: bool = False) -> None:
    """Pretty-print a catalog entry."""
    fav = " *" if entry.get("favorite") else ""
    print(f"  [{entry['id']}]{fav} {entry.get('filename', 'N/A')}")
    print(f"    Category: {entry.get('category', 'N/A')}")
    print(f"    Model: {entry.get('model_used', 'N/A')}")
    if verbose:
        print(f"    Prompt: {entry.get('prompt', 'N/A')}")
        print(f"    Path: {entry.get('path', 'N/A')}")
        print(f"    Tags: {', '.join(entry.get('tags', []))}")
        print(f"    Date: {entry.get('date', 'N/A')}")
        print(f"    Resolution: {entry.get('resolution', 'N/A')}")
        print(f"    Project: {entry.get('project', 'N/A')}")


def cmd_search(args: argparse.Namespace) -> None:
    results = search_catalog(
        query=args.query or "",
        category=args.category or "",
        tags=args.tags,
        model=args.model or "",
        favorites_only=args.favorites,
        limit=args.limit,
    )
    if not results:
        print("No matching images found.")
        return
    print(f"Found {len(results)} image(s):\n")
    for entry in results:
        print_entry(entry, verbose=args.verbose)
        print()


def cmd_list(args: argparse.Namespace) -> None:
    results = search_catalog(
        category=args.category or "",
        favorites_only=args.favorites,
        limit=args.limit,
    )
    if not results:
        print("No images in catalog.")
        return
    print(f"Showing {len(results)} image(s):\n")
    for entry in results:
        print_entry(entry, verbose=args.verbose)
        print()


def cmd_info(args: argparse.Namespace) -> None:
    entry = get_entry(args.id)
    if not entry:
        print(f"Entry not found: {args.id}")
        sys.exit(1)
    print_entry(entry, verbose=True)


def cmd_tag(args: argparse.Namespace) -> None:
    if args.add_tags:
        entry = add_tags(args.id, args.add_tags)
    elif args.remove_tags:
        entry = remove_tags(args.id, args.remove_tags)
    else:
        print("Specify --add-tags or --remove-tags")
        sys.exit(1)
    if entry:
        print(f"Updated tags: {', '.join(entry.get('tags', []))}")
    else:
        print(f"Entry not found: {args.id}")
        sys.exit(1)


def cmd_favorite(args: argparse.Namespace) -> None:
    entry = toggle_favorite(args.id)
    if entry:
        state = "favorited" if entry["favorite"] else "unfavorited"
        print(f"Image {args.id} {state}.")
    else:
        print(f"Entry not found: {args.id}")
        sys.exit(1)


def cmd_stats(args: argparse.Namespace) -> None:
    stats = get_stats()
    if stats["total"] == 0:
        print("Catalog is empty.")
        return
    print(f"Total images: {stats['total']}")
    print(f"Favorites: {stats['favorites']}")
    print("\nBy category:")
    for cat, count in stats["by_category"].items():
        print(f"  {cat}: {count}")
    print("\nBy model:")
    for model, count in stats["by_model"].items():
        print(f"  {model}: {count}")


def cmd_similar(args: argparse.Namespace) -> None:
    results = find_similar(args.prompt, threshold=args.threshold)
    if not results:
        print("No similar images found. Safe to generate a new one.")
        return
    print(f"Found {len(results)} similar image(s):\n")
    for entry in results:
        sim = entry.pop("_similarity", 0)
        print(f"  Similarity: {sim:.0%}")
        print_entry(entry, verbose=True)
        print()


def cmd_copy(args: argparse.Namespace) -> None:
    result = copy_to_project(
        entry_id=args.id,
        project_dir=args.project_dir,
        rename=args.rename or "",
        subdir=args.subdir,
    )
    if result is None:
        print(f"Entry not found: {args.id}")
        sys.exit(1)
    if "error" in result:
        print(f"ERROR: {result['error']}")
        sys.exit(1)

    print(f"Copied to: {result['destination']}")
    print(f"Relative path: {result['relative_path']}")
    print()
    print("--- Code Snippets ---")
    print()
    print("Next.js <Image>:")
    print(result["snippets"]["nextjs_image"])
    print()
    print("Next.js background:")
    print(result["snippets"]["nextjs_bg"])
    print()
    print("HTML <img>:")
    print(result["snippets"]["html_img"])
    print()
    print("CSS background:")
    print(result["snippets"]["css_bg"])
    print()
    print("Markdown:")
    print(result["snippets"]["markdown"])


def main() -> None:
    parser = argparse.ArgumentParser(description="Image Catalog Manager")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # search
    sp_search = subparsers.add_parser("search", help="Search the catalog")
    sp_search.add_argument("--query", "-q", help="Keyword search")
    sp_search.add_argument("--category", "-c", choices=VALID_CATEGORIES)
    sp_search.add_argument("--tags", "-t", nargs="*")
    sp_search.add_argument("--model", "-m")
    sp_search.add_argument("--favorites", "-f", action="store_true")
    sp_search.add_argument("--limit", "-l", type=int, default=20)
    sp_search.add_argument("--verbose", "-v", action="store_true")

    # list
    sp_list = subparsers.add_parser("list", help="List catalog entries")
    sp_list.add_argument("--category", "-c", choices=VALID_CATEGORIES)
    sp_list.add_argument("--favorites", "-f", action="store_true")
    sp_list.add_argument("--limit", "-l", type=int, default=20)
    sp_list.add_argument("--verbose", "-v", action="store_true")

    # info
    sp_info = subparsers.add_parser("info", help="Show details for an entry")
    sp_info.add_argument("--id", required=True)

    # tag
    sp_tag = subparsers.add_parser("tag", help="Add or remove tags")
    sp_tag.add_argument("--id", required=True)
    sp_tag.add_argument("--add-tags", nargs="*")
    sp_tag.add_argument("--remove-tags", nargs="*")

    # favorite
    sp_fav = subparsers.add_parser("favorite", help="Toggle favorite")
    sp_fav.add_argument("--id", required=True)

    # stats
    subparsers.add_parser("stats", help="Show catalog statistics")

    # similar
    sp_sim = subparsers.add_parser("similar", help="Find similar existing images")
    sp_sim.add_argument("--prompt", "-p", required=True)
    sp_sim.add_argument("--threshold", type=float, default=0.6)

    # copy
    sp_copy = subparsers.add_parser("copy", help="Copy image from pool to a project")
    sp_copy.add_argument("--id", required=True, help="Catalog entry ID")
    sp_copy.add_argument("--project-dir", required=True, help="Project root directory")
    sp_copy.add_argument("--rename", help="Rename the file (e.g. 'hero-banner')")
    sp_copy.add_argument("--subdir", default="public/images", help="Subdirectory within project (default: public/images)")

    args = parser.parse_args()

    handlers = {
        "search": cmd_search,
        "list": cmd_list,
        "info": cmd_info,
        "tag": cmd_tag,
        "favorite": cmd_favorite,
        "stats": cmd_stats,
        "similar": cmd_similar,
        "copy": cmd_copy,
    }
    handlers[args.command](args)


if __name__ == "__main__":
    main()

#!/bin/bash
# =============================================================================
# Claude Code Skills Auto-Installer
# =============================================================================
# Purpose: Automatically install all skills, plugins, and marketplaces
# Usage:   bash install-all-skills.sh [--skills-only|--plugins-only|--all]
# =============================================================================

set -e

echo "=============================================="
echo "  Claude Code Skills Auto-Installer"
echo "=============================================="
echo ""

MODE="${1:-all}"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log_success() { echo -e "${GREEN}[OK]${NC} $1"; }
log_warn()    { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error()   { echo -e "${RED}[FAIL]${NC} $1"; }
log_info()    { echo -e "  -> $1"; }

# =============================================================================
# STEP 1: Add Marketplaces
# =============================================================================
install_marketplaces() {
  echo ""
  echo "--- Step 1: Adding Marketplaces ---"

  # Official Anthropic marketplace is auto-added, but ensure demo one exists
  claude plugin marketplace add anthropics/claude-code 2>/dev/null && \
    log_success "Added anthropics/claude-code marketplace" || \
    log_warn "anthropics/claude-code marketplace already exists"

  # Anthropic Skills repo
  claude plugin marketplace add anthropics/skills 2>/dev/null && \
    log_success "Added anthropics/skills marketplace" || \
    log_warn "anthropics/skills marketplace already exists"
}

# =============================================================================
# STEP 2: Install Official Plugins
# =============================================================================
install_plugins() {
  echo ""
  echo "--- Step 2: Installing Official Plugins ---"

  OFFICIAL_PLUGINS=(
    "context7@claude-plugins-official"
    "github@claude-plugins-official"
    "typescript-lsp@claude-plugins-official"
    "superpowers@claude-plugins-official"
    "playwright@claude-plugins-official"
    "commit-commands@claude-plugins-official"
    "serena@claude-plugins-official"
    "pr-review-toolkit@claude-plugins-official"
    "figma@claude-plugins-official"
    "agent-sdk-dev@claude-plugins-official"
    "vercel@claude-plugins-official"
    "claude-code-setup@claude-plugins-official"
    "stripe@claude-plugins-official"
    "php-lsp@claude-plugins-official"
    "firebase@claude-plugins-official"
    "huggingface-skills@claude-plugins-official"
    "kotlin-lsp@claude-plugins-official"
    "firecrawl@claude-plugins-official"
  )

  DEMO_PLUGINS=(
    "claude-opus-4-5-migration@claude-code-plugins"
    "code-review@claude-code-plugins"
    "commit-commands@claude-code-plugins"
    "frontend-design@claude-code-plugins"
  )

  for plugin in "${OFFICIAL_PLUGINS[@]}"; do
    claude plugin install "$plugin" --scope user 2>/dev/null && \
      log_success "Installed $plugin" || \
      log_warn "$plugin already installed or failed"
  done

  for plugin in "${DEMO_PLUGINS[@]}"; do
    claude plugin install "$plugin" --scope user 2>/dev/null && \
      log_success "Installed $plugin" || \
      log_warn "$plugin already installed or failed"
  done
}

# =============================================================================
# STEP 3: Install Community Skills
# =============================================================================
install_skills() {
  echo ""
  echo "--- Step 3: Installing Community Skills ---"

  SKILLS=(
    # AI Image & Video Generation
    "nano-banana-pro"
    "nano-banana-pro-prompts-recommend-skill"
    "flux-best-practices"
    "midjourney-replicate-flux"
    "seedream-image"
    "seedance"
    "image-upscaling"
    "remotion-best-practices"
    # Logo & Branding
    "logo-creator"
    "logo-design-guide"
    "favicon-gen"
    "svg-icon-generator"
    # Typography & Fonts
    "typography"
    "typography-expert"
    "web-typography"
    "brand-typography-systems"
    "font-pairing-suggester"
    # UI/UX Design
    "ui-ux-pro-max"
    "ui-design-system"
    "frontend-design"
    "web-design-guidelines"
    "icon-design"
    "better-icons"
    "mobile-touch"
    "youtube-thumbnail-design"
    # CSS & Layout
    "tailwind-design-system"
    "tailwindcss-advanced-layouts"
    # React & Next.js
    "react-best-practices"
    "react-components"
    "nextjs-supabase-auth"
    "vercel-react-native-skills"
    # Flutter
    "flutter-expert"
    "flutter-adaptive-ui"
    "flutter-animations"
    "flutter-internationalization"
    "flutter-testing"
    # Backend
    "python-pro"
    "nodejs-backend-patterns"
    "better-auth-best-practices"
    # AI/ML
    "replicate-cli"
    "replicate-integration"
    # Browser & Automation
    "agent-browser"
    "agent-tools"
    "agent-ui"
    "browser-use"
    # Content & Writing
    "human-writing"
    "humanizer-zh"
    "social-content"
    # SEO & Audit
    "seo-audit"
    "audit-website"
    # Document & PDF
    "html-to-pdf"
    "markdown-to-pdf"
    "extracting-pdf-text"
    # Business
    "pricing-strategy"
    "finance-expert"
    # Diagrams
    "eraser-diagrams"
    # MCP & Integration
    "mcp-builder"
    "api-bible-automation"
    # Agent Meta
    "proactive-agent"
    "self-learning"
    "skill-creator"
    "find-skills"
    # Music
    "music-downloader"
    # AI Components
    "ai-elements"
  )

  for skill in "${SKILLS[@]}"; do
    if [ -d "$HOME/.claude/skills/$skill" ]; then
      log_warn "$skill already installed"
    else
      npx @anthropic-ai/claude-code skill add "$skill" 2>/dev/null && \
        log_success "Installed skill: $skill" || \
        log_error "Failed to install: $skill"
    fi
  done
}

# =============================================================================
# STEP 4: Copy Project Commands (if in PRP repo context)
# =============================================================================
copy_commands() {
  echo ""
  echo "--- Step 4: Project Commands ---"

  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  PRP_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"

  if [ -d "$PRP_ROOT/.claude/commands" ]; then
    log_success "Project commands available at: $PRP_ROOT/.claude/commands/"
    log_info "To use in another project, copy .claude/commands/ to your project root"
  else
    log_warn "No project commands directory found"
  fi
}

# =============================================================================
# STEP 5: Verify Installation
# =============================================================================
verify() {
  echo ""
  echo "--- Verification ---"

  SKILL_COUNT=$(ls -d "$HOME/.claude/skills"/*/ 2>/dev/null | wc -l)
  echo "  Skills installed: $SKILL_COUNT"

  if [ -f "$HOME/.claude/plugins/installed_plugins.json" ]; then
    PLUGIN_COUNT=$(grep -c '"scope"' "$HOME/.claude/plugins/installed_plugins.json" 2>/dev/null || echo 0)
    echo "  Plugin entries: $PLUGIN_COUNT"
  fi

  echo ""
  echo "=============================================="
  echo "  Installation Complete!"
  echo "=============================================="
}

# =============================================================================
# Main
# =============================================================================
case "$MODE" in
  --skills-only)
    install_skills
    verify
    ;;
  --plugins-only)
    install_marketplaces
    install_plugins
    verify
    ;;
  --all|*)
    install_marketplaces
    install_plugins
    install_skills
    copy_commands
    verify
    ;;
esac

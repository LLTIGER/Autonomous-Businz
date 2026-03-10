import 'server-only'

const PROVIDER_CONFIGS: Record<string, { defaultModel: string }> = {
  anthropic: { defaultModel: 'claude-sonnet-4-6' },
  openrouter: { defaultModel: 'anthropic/claude-sonnet-4' },
  openai: { defaultModel: 'gpt-4o' },
  google: { defaultModel: 'gemini-2.5-pro-preview-05-06' },
  mistral: { defaultModel: 'mistral-large-latest' },
  groq: { defaultModel: 'llama-3.3-70b-versatile' },
  xai: { defaultModel: 'grok-3' },
  deepseek: { defaultModel: 'deepseek-chat' },
  moonshot: { defaultModel: 'kimi-k2' },
  cohere: { defaultModel: 'command-r-plus' },
}

// Helper to dynamically load optional provider SDKs without webpack bundling them
async function loadOptionalProvider(pkg: string) {
  try {
    return await import(/* webpackIgnore: true */ pkg)
  } catch {
    throw new Error(
      `Provider package "${pkg}" is not installed. Run: npm install ${pkg}`
    )
  }
}

export async function getAIModel() {
  const provider = process.env.AI_PROVIDER || 'anthropic'
  const modelOverride = process.env.AI_MODEL
  const config = PROVIDER_CONFIGS[provider] ?? PROVIDER_CONFIGS.anthropic
  const modelId = modelOverride || config.defaultModel

  switch (provider) {
    case 'openrouter': {
      const mod = await loadOptionalProvider('@openrouter/ai-sdk-provider')
      return mod.createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY })(modelId)
    }
    case 'openai': {
      const mod = await loadOptionalProvider('@ai-sdk/openai')
      return mod.openai(modelId)
    }
    case 'google': {
      const mod = await loadOptionalProvider('@ai-sdk/google')
      return mod.google(modelId)
    }
    case 'mistral': {
      const mod = await loadOptionalProvider('@ai-sdk/mistral')
      return mod.mistral(modelId)
    }
    case 'groq': {
      const mod = await loadOptionalProvider('@ai-sdk/groq')
      return mod.groq(modelId)
    }
    case 'xai': {
      const mod = await loadOptionalProvider('@ai-sdk/xai')
      return mod.xai(modelId)
    }
    case 'deepseek': {
      const mod = await loadOptionalProvider('@ai-sdk/deepseek')
      return mod.createDeepSeek({ apiKey: process.env.DEEPSEEK_API_KEY })(modelId)
    }
    case 'anthropic':
    default: {
      const { anthropic } = await import('@ai-sdk/anthropic')
      return anthropic(modelId)
    }
  }
}

export function getProviderName(): string {
  return process.env.AI_PROVIDER || 'anthropic'
}

import OpenAI from 'openai'

const endpoint = "https://openrouter.ai/api/v1"

// Prefer OpenRouter key but fall back to OPENAI_API_KEY for compatibility.
const apiKey = process.env['OPENROUTER_API_KEY'] ?? process.env['OPENAI_API_KEY']

if (!apiKey) {
  throw new Error(
    "Missing API key. Set OPENROUTER_API_KEY (preferred) or OPENAI_API_KEY in your environment."
  )
}

export const openai = new OpenAI({
  baseURL: endpoint,
  apiKey,
})

import OpenAI from 'openai'

const endpoint = 'https://models.github.ai/inference'

export const openai = new OpenAI({
  baseURL: endpoint,
  apiKey: process.env['OPENAI_API_KEY'],
})

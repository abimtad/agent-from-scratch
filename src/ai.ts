import OpenAI from 'openai'

const endpoint = "https://openrouter.ai/api/v1"
export const openai = new OpenAI({
	baseURL: endpoint,
	apiKey: process.env["OPENAI_API_KEY"]
})

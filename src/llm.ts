import { zodFunction } from 'openai/helpers/zod'
import type { AIMessage } from '../types'
import { openai } from './ai'

export const runLLM = async ({
  model = 'gpt-4o-mini',
  messages,
  tools,
  temperature = 0.1,
}: {
  messages: AIMessage[]
  temperature?: number
  tools: any[]
  model?: string
}) => {
  const formattedTools = tools.map(zodFunction)
  const response = await openai.chat.completions.create({
    model,
    messages,
    temperature,
    tools: formattedTools,
    tool_choice: 'auto',
    parallel_tool_calls: false,
  })

  return response.choices[0].message
}

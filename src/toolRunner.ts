import type OpenAI from 'openai'
import { toFloat32Array } from 'openai/core.mjs'
import { tokenToString } from 'typescript'
import { get_weather } from './util'

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall
) => {
  const input = {
    toolArgs: JSON.parse(toolCall.function.arguments),
  }

  switch (toolCall.function.name) {
    case 'get_weather':
      return get_weather()
    default:
      throw Error(`Unknown tool: ${toolCall.function.name}`)
  }
}

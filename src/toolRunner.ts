import type OpenAI from 'openai'
import { toFloat32Array } from 'openai/core.mjs'
import { tokenToString } from 'typescript'
import { get_weather } from './util'
import type { AIMessage } from '../types'
import { generateImage } from '../tools/generateImage'
import { dadJoke } from '../tools/dadJoke'
import { reddit } from '../tools/reddit'

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments),
  }

  switch (toolCall.function.name) {
    case 'generate_image':
      const image = await generateImage(input)
      return image

    case 'dad_joke':
      return dadJoke(input)

    case 'reddit':
      return reddit(input)

    default:
      throw new Error(`Unknown tool: ${toolCall.function.name}`)
  }
}

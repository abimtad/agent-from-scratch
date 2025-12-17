import type OpenAI from 'openai'
import { tokenToString } from 'typescript'
import { get_weather } from './util.js'
import type { AIMessage } from '../types.js'
import { generateImage } from '../tools/generateImage.js'
import { dadJoke } from '../tools/dadJoke.js'
import { reddit } from '../tools/reddit.js'

import { mcpClient } from './mcp/mcp-client/client.js'

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
): Promise<string> => {
  const toolName = toolCall.function.name
  const toolArgs = toolCall.function.arguments
  const tool = await mcpClient.callMcp(toolName, toolArgs)
  return tool
  }

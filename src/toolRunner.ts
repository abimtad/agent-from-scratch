import type OpenAI from 'openai'

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

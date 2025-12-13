import type { ToolListChangedNotification } from '@modelcontextprotocol/sdk/types.js'
import OpenAI from 'openai'
import type { ZodTypeAny } from 'zod'

export type AIMessage =
  | OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam
  | { role: 'user'; content: string }
  | { role: 'tool'; content: string; tool_call_id: string }

export interface ToolFn<A = any, T = any> {
  (input: { toolArgs: A }): Promise<T>
}
export type RegisteredTool = {
  name: string
  description: string
  schema?: {parameters:ZodTypeAny}
  run: ToolFn
}

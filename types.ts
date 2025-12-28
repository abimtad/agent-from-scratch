import OpenAI from 'openai'

export type AIMessage =
  | OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam
  | { role: 'user'; content: string }
  | { role: 'tool'; content: string; tool_call_id: string }


export type Tool = {
  name: string;
  description?: string;
  parameters?: {[x:string]: unknown}[]
}
export interface ToolFn<A = any, T = any> {
  (input: { userMessage: string; toolArgs: A }): Promise<T>
}

export type Movie = {
  Title: string;
  Year: string;
  Genre: string;
  Description: string;
  Director: string;
  Actors: string;
  Rating: string;
  Votes: string;
  Revenue: string;
  Metascore: string;
};
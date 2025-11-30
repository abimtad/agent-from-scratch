# Agent From Scratch

A tiny command-line AI agent that calls tools using Zod schemas, persists conversation history in a JSON file, and renders a friendly CLI with spinners and colored logs. It uses the OpenAI Node SDK against a GitHub Models-compatible endpoint by default.

## What It Does

- Executes an agent loop that decides between replying or calling one or more tools.
- Defines tools with Zod schemas and executes them via a simple router.
- Persists all messages to `db.json` so the agent has short-term memory.
- Shows progress with a spinner and clearly logs user/assistant turns.

Built-in tools:

- `generate_image`: Generates an image with DALL·E 3 and returns a URL.
- `dad_joke`: Fetches a random dad joke.
- `reddit`: Fetches the latest posts from `r/aww` as JSON.

## Prerequisites

- Node.js 18+ (recommended). The project runs with `tsx` and the OpenAI SDK.
- An API token for the configured endpoint.
  - Default base URL is `https://models.github.ai/inference` (GitHub Models). Use a GitHub token with Models access in `OPENAI_API_KEY`.
  - To use OpenAI’s API instead, change `baseURL` in `src/ai.ts` to `https://api.openai.com/v1` and set `OPENAI_API_KEY` to your OpenAI key.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with your API key:
   ```bash
   echo "OPENAI_API_KEY=your_token_here" > .env
   ```

## Run

You can pass your request as a single quoted argument.

```bash
npm start -- "hi, am abel. what is the weather in my current place"
```

Or directly with `tsx`:

```bash
npx tsx index.ts "tell me a dad joke"
```

Examples that trigger tools:

- Image generation: "generate an image of a corgi surfing at sunset"
- Dad joke: "tell me a dad joke"
- Reddit: "get the latest cute animal posts"

The agent stores all turns in `db.json`. Delete that file to reset context.

## Project Structure

- `index.ts`: CLI entry that forwards the prompt to the agent.
- `src/agent.ts`: Agent loop, spinner handling, message logging, and termination logic.
- `src/llm.ts`: LLM call using OpenAI SDK with Zod tool definitions.
- `src/toolRunner.ts`: Routes tool calls to concrete implementations.
- `src/memory.ts`: Persists and retrieves messages via LowDB (`db.json`).
- `tools/`: Tool definitions (Zod) and implementations.

## Adding a New Tool

1. Create a file in `tools/` exporting a Zod-based definition and a function:
   - `export const myToolDefinition = { name: 'my_tool', parameters: z.object({...}) }`
   - `export const myTool: ToolFn<Args, string | object> = async ({ userMessage, toolArgs }) => { ... }`
2. Add the definition to `tools/index.ts` so it’s exposed to the model.
3. Add a `case` in `src/toolRunner.ts` to invoke your tool.

Types you’ll use are in `types.ts` (`ToolFn` and `AIMessage`).

## Troubleshooting

- Spinner never stops or the agent doesn’t terminate:
  - The loop should execute `tool_calls` first and only exit when the model returns assistant `content` without tool calls. Check `src/agent.ts` termination order.
- Tool not found errors:
  - Ensure the tool definition is added to `tools/index.ts` and the router case exists in `src/toolRunner.ts`.
- Auth errors:
  - Verify `.env` has a valid `OPENAI_API_KEY` for the configured `baseURL`.
- Resetting state:
  - Delete `db.json` and re-run.

## Notes

- The CLI uses `ora` for spinners and colorized logs in `src/ui.ts`.
- Memory uses `lowdb`; all messages (user/assistant/tool) are written to `db.json`.
- Default model is `gpt-4o-mini` (see `src/llm.ts`). You can change the model there.

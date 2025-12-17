import 'dotenv/config'
import { runAgent } from './src/agent.js'
import { mcpClient } from './src/mcp/mcp-client/client.js';
import { z } from 'zod';

async function main() {
  try {
    await mcpClient.connectToServer("src/mcp/mcp-server/server.ts");
    const userMessage = process.argv[2]

    if (!userMessage) {
      console.error('Please provide a message')
      process.exit(1)
    }

    const rawTools = mcpClient.getTools();
    const tools = rawTools.map((tool) => ({
      name: tool.name,
      description: tool.description,
      parameters: z.object({}), // Create an empty Zod schema
    }));
    await runAgent({ userMessage, tools })
  } catch (e) {
    console.error("Error:", e);
    await mcpClient.cleanup();
    process.exit(1);
  } finally {
    await mcpClient.cleanup();
    process.exit(0);
  }
}

main();

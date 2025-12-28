import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import type { Tool } from "../../../types";


class MCPClient {
  private mcp: Client;
  private transport: StdioClientTransport | null = null;
  private tools: Tool[] = [];

  constructor() {
    this.mcp = new Client({ name: "mcp-client-cli", version: "1.0.0" });
  }

  async connectToServer(serverPath: string) {
  try {

    this.transport = new StdioClientTransport({
      command: "npx",
      args: ["tsx", serverPath],
    });
    await this.mcp.connect(this.transport);

    const toolsResult = await this.mcp.listTools();
    this.tools = toolsResult.tools.map((tool) => {
      return {
        name: tool.name,
        description: tool.description,
      };
    });
    console.log(
      "Connected to server with tools:",
      this.tools.map(({ name }) => name)
    );
  } catch (e) {
    console.log("Failed to connect to MCP server: ", e);
    throw e;
  }
}

async callMcp(name: string, input: string): Promise<string> {
	const result = await this.mcp.callTool({name, input});
	return result.content as string
}


async cleanup() {
  await this.mcp.close();
}

getTools() {
    return this.tools;
  }
  // methods will go here
}

export const mcpClient = new MCPClient();


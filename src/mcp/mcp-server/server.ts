import 'dotenv/config'
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {dadJoke} from "../../tools/dadJoke"
import { reddit } from "../../tools/reddit";
import { generateImage } from "../../tools/generateImage";
import { z } from "zod";

// Create server instance
const server = new McpServer({
  name: "weather",
  version: "1.0.0",
});

server.registerTool("dad_joke",  {
  title: "Fetch Dad jokes",
  description: "Fetches random dad jokes" ,
},
  async () => {
    const joke = await dadJoke({ toolArgs: {}, userMessage: "" })
    const result = {
        content: [
          {
            type: "text" as const,
            text: `${joke}`,
          },
        ],
      };
	  console.log(`[SERVER] Tool 'dad_joke' returning:`, JSON.stringify(result, null, 2));
	  return result;
  }
)


server.registerTool("sub_reddit_post",  {
  title: "current subreddit fetcher",
  description: "Fetches current subreddit posts",
},
  async () => {
    const post = await reddit({ toolArgs: {}, userMessage: "" })
    const result = {
        content: [
          {
            type: "text" as const,
            text: `${post}`,
          },
        ],
      };
	  console.log(`[SERVER] Tool 'sub_reddit_post' returning:`, JSON.stringify(result, null, 2));
	  return result;
  }
)

server.registerTool("generate_image",  {
  title: "Generate an image",
  description: "Generates an image URL from a prompt",
  inputSchema: {
      // cast to any to satisfy the SDK's expected schema type
      prompt: z.string().describe("A prompt to generate an image") as unknown as any
  }
},
  async (input: {prompt: string}) => {
    const imageUrl = await generateImage({ toolArgs: {prompt: input.prompt}, userMessage: "" })
    const result = {
        content: [
          {
            type: "text" as const,
            text: `${imageUrl}`,
          },
        ],
      };
	  console.log(`[SERVER] Tool 'generate_image' returning:`, JSON.stringify(result, null, 2));
	  return result;
  }
)

async function main() {
 const transport = new StdioServerTransport();
 await server.connect(transport);
}
main();
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {dadJoke} from "../../../tools/dadJoke"
import { reddit } from "../../../tools/reddit";


// Create server instance
const server = new McpServer({
  name: "weather",
  version: "1.0.0",
});

server.registerTool("dad_joke",  {
  title: "Fetch Dad jokes",
  description: "Fetches random dad jokes" ,
  input: {
	type: "object",
	properties: {}
  }
},
  async (input) => {
    console.log(`[SERVER] Tool 'dad_joke' called with input:`, input);
    const joke = await dadJoke()
    const result = {
        content: [
          {
            type: "text",
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
  input: {
	type: "object",
	properties: {}
  }
},
  async (input) => {
    console.log(`[SERVER] Tool 'sub_reddit_post' called with input:`, input);
    const post = await reddit()
    const result = {
        content: [
          {
            type: "text",
            text: `${post}`,
          },
        ],
      };
	  console.log(`[SERVER] Tool 'sub_reddit_post' returning:`, JSON.stringify(result, null, 2));
	  return result;
  }
)

async function main() {
 const transport = new StdioServerTransport();
 await server.connect(transport);
}
main();
import { cohere } from '@ai-toolkit/cohere';
import { generateText, tool } from 'ai';
import 'dotenv/config';
import { z } from 'zod';

async function main() {
  const result = await generateText({
    model: cohere('command-r-plus'),
    tools: {
      currentTime: tool({
        description: 'Get the current time',
        parameters: z.object({}),
        execute: async () => ({
          currentTime: new Date().toLocaleTimeString(),
        }),
      }),
    },
    prompt: 'What is the current time?',
  });

  // typed tool calls:
  for (const toolCall of result.toolCalls) {
    switch (toolCall.toolName) {
      case 'currentTime': {
        toolCall.args; // {}
        break;
      }
    }
  }

  // typed tool results for tools with execute method:
  for (const toolResult of result.toolResults) {
    switch (toolResult.toolName) {
      case 'currentTime': {
        toolResult.args; // {}
        break;
      }
    }
  }

  console.log(result.text);
  console.log(JSON.stringify(result.toolCalls, null, 2));
  console.log(JSON.stringify(result.toolResults, null, 2));
}

main().catch(console.error);

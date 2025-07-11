import { openai } from '@ai-toolkit/openai';
import { streamText, tool } from 'ai';
import 'dotenv/config';
import { z } from 'zod';

async function main() {
  const result = streamText({
    model: openai('gpt-4o'),
    tools: {
      weather: tool({
        description: 'Get the weather in a location',
        parameters: z.object({ location: z.string() }),
        execute: async () => ({
          temperature: 72 + Math.floor(Math.random() * 21) - 10,
        }),
      }),
    },
    maxSteps: 5,
    onFinish({ response }) {
      console.log(JSON.stringify(response.messages, null, 2));
    },
    prompt: 'What is the current weather in San Francisco?',
  });

  // consume the text stream
  for await (const textPart of result.textStream) {
  }
}

main().catch(console.error);

import { bedrock } from '@ai-toolkit/amazon-bedrock';
import { streamText, ToolCallPart, ToolResultPart } from 'ai';
import 'dotenv/config';
import { z } from 'zod';
import { weatherTool } from '../tools/weather-tool';

async function main() {
  const result = streamText({
    model: bedrock('anthropic.claude-3-haiku-20240307-v1:0'),
    tools: {
      weather: weatherTool,
      cityAttractions: {
        parameters: z.object({ city: z.string() }),
      },
    },
    prompt: 'What is the weather in San Francisco?',
    maxSteps: 5,
  });

  let enteredReasoning = false;
  let enteredText = false;
  const toolCalls: ToolCallPart[] = [];
  const toolResponses: ToolResultPart[] = [];

  for await (const part of result.fullStream) {
    switch (part.type) {
      case 'reasoning': {
        if (!enteredReasoning) {
          enteredReasoning = true;
          console.log('\nREASONING:\n');
        }
        process.stdout.write(part.textDelta);
        break;
      }

      case 'text-delta': {
        if (!enteredText) {
          enteredText = true;
          console.log('\nTEXT:\n');
        }
        process.stdout.write(part.textDelta);
        break;
      }

      case 'tool-call': {
        toolCalls.push(part);

        process.stdout.write(
          `\nTool call: '${part.toolName}' ${JSON.stringify(part.args)}`,
        );
        break;
      }

      case 'tool-result': {
        toolResponses.push(part);

        process.stdout.write(
          `\nTool response: '${part.toolName}' ${JSON.stringify(part.result)}`,
        );
        break;
      }
    }
  }
}

main().catch(console.error);

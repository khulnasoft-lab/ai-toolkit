import { bedrock } from '@ai-toolkit/amazon-bedrock';
import { streamText, ToolCallPart, ToolResultPart } from 'ai';
import 'dotenv/config';
import { weatherTool } from '../tools/weather-tool';

async function main() {
  const result = streamText({
    model: bedrock('us.anthropic.claude-3-7-sonnet-20250219-v1:0'),
    tools: {
      weather: weatherTool,
    },
    prompt: 'What is the weather in San Francisco?',
    providerOptions: {
      bedrock: {
        reasoning_config: { type: 'enabled', budgetTokens: 1024 },
      },
    },
    maxSteps: 5,
    maxRetries: 5,
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

import { anthropic } from '@ai-toolkit/anthropic';
import {
  extractReasoningMiddleware,
  streamText,
  ToolCallPart,
  ToolResultPart,
  wrapLanguageModel,
} from 'ai';
import 'dotenv/config';
import { weatherTool } from '../tools/weather-tool';

async function main() {
  const result = streamText({
    model: wrapLanguageModel({
      model: anthropic('claude-3-opus-20240229', {
        // Anthropic produces 'thinking' tags for this model and example
        // configuration.  These will never include signature content and so
        // will fail the provider-side signature check if included in subsequent
        // request messages, so we disable sending reasoning content.
        sendReasoning: false,
      }),
      middleware: [extractReasoningMiddleware({ tagName: 'thinking' })],
    }),
    tools: {
      weather: weatherTool,
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

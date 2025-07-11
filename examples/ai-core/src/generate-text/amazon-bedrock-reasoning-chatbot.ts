import { bedrock } from '@ai-toolkit/amazon-bedrock';
import { CoreMessage, generateText } from 'ai';
import 'dotenv/config';
import * as readline from 'node:readline/promises';
import { weatherTool } from '../tools/weather-tool';

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages: CoreMessage[] = [];

async function main() {
  while (true) {
    const userInput = await terminal.question('You: ');
    messages.push({ role: 'user', content: userInput });

    const { steps, response } = await generateText({
      model: bedrock('us.anthropic.claude-3-7-sonnet-20250219-v1:0'),
      tools: { weatherTool },
      system: `You are a helpful, respectful and honest assistant.`,
      messages,
      maxSteps: 5,
      providerOptions: {
        bedrock: {
          reasoning_config: { type: 'enabled', budgetTokens: 2048 },
        },
      },
    });

    for (const step of steps) {
      console.log(step);
      if (step.reasoning) {
        console.log(`\x1b[36m${step.reasoning}\x1b[0m`);
      }

      if (step.text) {
        console.log(step.text);
      }

      if (step.toolCalls) {
        for (const toolCall of step.toolCalls) {
          console.log(
            `\x1b[33m${toolCall.toolName}\x1b[0m` +
              JSON.stringify(toolCall.args),
          );
        }
      }
    }

    console.log('\n');

    messages.push(...response.messages);
  }
}

main().catch(console.error);

import { bedrock } from '@ai-toolkit/amazon-bedrock';
import { streamText } from 'ai';
import 'dotenv/config';
import fs from 'node:fs';

const errorMessage = fs.readFileSync('data/error-message.txt', 'utf8');

async function main() {
  const result = streamText({
    model: bedrock('anthropic.claude-3-5-sonnet-20241022-v2:0'),
    messages: [
      {
        role: 'assistant',
        content: [
          {
            type: 'text',
            text: 'You are a JavaScript expert.',
          },
          {
            type: 'text',
            text: `Error message: ${errorMessage}`,
          },
        ],
        providerOptions: { bedrock: { cachePoint: { type: 'default' } } },
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Explain the error message.',
          },
        ],
      },
    ],
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }

  console.log();
  console.log('Token usage:', await result.usage);
  console.log(
    'Cache token usage:',
    (await result.providerMetadata)?.bedrock?.usage,
  );
  console.log('Finish reason:', await result.finishReason);
  console.log('Response headers:', (await result.response).headers);
}

main().catch(console.error);

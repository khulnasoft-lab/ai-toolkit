import { fireworks } from '@ai-toolkit/fireworks';
import { streamText } from 'ai';
import 'dotenv/config';

async function main() {
  const result = streamText({
    model: fireworks('accounts/fireworks/models/firefunction-v1'),
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }

  console.log();
  console.log('Token usage:', await result.usage);
  console.log('Finish reason:', await result.finishReason);
}

main().catch(console.error);

import { openai } from '@ai-toolkit/openai';
import { streamText, wrapLanguageModel } from 'ai';
import 'dotenv/config';
import { yourLogMiddleware } from './your-log-middleware';

async function main() {
  const result = streamText({
    model: wrapLanguageModel({
      model: openai('gpt-4o'),
      middleware: yourLogMiddleware,
    }),
    prompt: 'What cities are in the United States?',
  });

  for await (const textPart of result.textStream) {
    // consume the stream
  }
}

main().catch(console.error);

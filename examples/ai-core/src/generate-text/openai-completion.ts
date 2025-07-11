import { openai } from '@ai-toolkit/openai';
import { generateText } from 'ai';
import 'dotenv/config';

async function main() {
  const result = await generateText({
    model: openai('gpt-3.5-turbo-instruct'),
    maxTokens: 1024,
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  console.log(result.text);
}

main().catch(console.error);

import { openai } from '@ai-toolkit/openai';
import { generateText } from 'ai';
import 'dotenv/config';

async function main() {
  const result = await generateText({
    model: openai('gpt-4o', {
      // AI TOOLKIT will download the images and add them as data:
      downloadImages: true,
    }),
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Describe the image in detail.' },
          {
            type: 'image',
            image:
              'https://github.com/khulnasoft/ai/blob/main/examples/ai-core/data/comic-cat.png?raw=true',

            // OpenAI specific option - image detail:
            providerOptions: {
              openai: { imageDetail: 'low' },
            },
          },
        ],
      },
    ],
  });

  console.log(result.text);
}

main().catch(console.error);

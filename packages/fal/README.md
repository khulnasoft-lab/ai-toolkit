# AI TOOLKIT - fal Provider

The **[fal provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/fal)** for the [AI TOOLKIT](https://sdk.khulnasoft.com/docs) contains image model support for the [fal.ai API](https://fal.ai/).

## Setup

The fal provider is available in the `@ai-toolkit/fal` module. You can install it with

```bash
npm i @ai-toolkit/fal
```

## Provider Instance

You can import the default provider instance `fal` from `@ai-toolkit/fal`:

```ts
import { fal } from '@ai-toolkit/fal';
```

## Image Generation Example

```ts
import { fal } from '@ai-toolkit/fal';
import { experimental_generateImage as generateImage } from 'ai';
import fs from 'fs';
const { image } = await generateImage({
  model: fal.image('fal-ai/flux/schnell'),
  prompt: 'A cat wearing a intricate robe',
});

const filename = `image-${Date.now()}.png`;
fs.writeFileSync(filename, image.uint8Array);
console.log(`Image saved to ${filename}`);
```

## Additional Options

If you want to pass additional inputs to the model besides the prompt, use the `providerOptions.fal` property:

```ts
const { image } = await generateImage({
  model: fal.image('fal-ai/recraft-v3'),
  prompt: 'A cat wearing a intricate robe',
  size: '1920x1080',
  providerOptions: {
    fal: {
      style: 'digital_illustration',
    },
  },
});
```

## Documentation

Please check out the **[fal provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/fal)** for more information.

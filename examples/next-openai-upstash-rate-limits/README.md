# AI TOOLKIT, Next.js, and OpenAI Chat Example with Rate Limits (via Khulnasoft KV)

This example shows how to use the [AI TOOLKIT](https://sdk.khulnasoft.com/docs) with [Next.js](https://nextjs.org/) and [OpenAI](https://openai.com) to create a ChatGPT-like AI-powered streaming chat bot with rate limits using [Khulnasoft KV](https://vercel.com/docs/storage/vercel-kv).

![CleanShot 2023-08-09 at 16 11 13](https://github.com/khulnasoft/ai/assets/28986134/a10d96dc-dbd3-4d05-85a3-217b5cb18060)

## Deploy your own

Deploy the example using [Khulnasoft](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=ai-toolkit-example):

[![Deploy with Khulnasoft](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fai%2Ftree%2Fmain%2Fexamples%2Fnext-openai-rate-limits&env=OPENAI_API_KEY&envDescription=OpenAI%20API%20Key&envLink=https%3A%2F%2Fplatform.openai.com%2Faccount%2Fapi-keys&project-name=khulnasoft-ai-chat-openai&repository-name=khulnasoft-ai-chat-openai)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example https://github.com/khulnasoft/ai/tree/main/examples/next-openai-rate-limits next-openai-rate-limits-app
```

```bash
yarn create next-app --example https://github.com/khulnasoft/ai/tree/main/examples/next-openai-rate-limits next-openai-rate-limits-app
```

```bash
pnpm create next-app --example https://github.com/khulnasoft/ai/tree/main/examples/next-openai-rate-limits next-openai-rate-limits-app
```

To run the example locally you need to:

1. Sign up at [OpenAI's Developer Platform](https://platform.openai.com/signup).
2. Go to [OpenAI's dashboard](https://platform.openai.com/account/api-keys) and create an API KEY.
3. Set the required OpenAI environment variable as the token value as shown [the example env file](./.env.local.example) but in a new file called `.env.local`
4. `pnpm install` to install the required dependencies.
5. `pnpm dev` to launch the development server.

## Learn More

To learn more about OpenAI, Next.js, and the AI TOOLKIT take a look at the following resources:

- [AI TOOLKIT docs](https://sdk.khulnasoft.com/docs)
- [Khulnasoft AI Playground](https://play.khulnasoft.com)
- [OpenAI Documentation](https://platform.openai.com/docs) - learn about OpenAI features and API.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Khulnasoft KV Documentation](https://vercel.com/docs/storage/vercel-kv) - learn about Khulnasoft KV features and API.

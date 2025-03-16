# NanoGPT Client

An unofficial implementation of the [NanoGPT API](https://nano-gpt.com/api). This library aims to provide
a Typescript client for both browser and node environments. It's built on the inferred [OpenAPI spec](./openapi.yaml).

**Note**: The API might change at any time which can render this client unusable, use at your own risk.

## Install

```bash
npm install nanogpt-client
```

## How to use

```javascript
import { NanoGPTClient } from 'nanogpt-client'

const prompt = async () => {
  const client = new NanoGPTClient({
    apiKey: '<NanoGPT API Key>',
    defaultChatModel: 'chatgpt-4o-latest'
  })

  const {
    data: {
      choices: [
        {
          message: { content }
        }
      ]
    }
  } = await client.chat('Hello world')

  console.log(content)
}

prompt()
```

## Contributing

Please consult [CONTRIBUTING](./.github/CONTRIBUTING.md) for guidelines on contributing to this project.

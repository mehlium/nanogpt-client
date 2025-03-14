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

const client = new NanoGPTClient(NANOGPT_API_KEY)

const { data, error } = await client.chat({
  body: {
    model: 'chatgpt-4o-latest',
    messages: [
      { role: 'system', content: 'initial system prompt' },
      { role: 'user', content: 'input from user' }
    ]
  }
})
```

## Contributing

Please consult [CONTRIBUTING](./.github/CONTRIBUTING.md) for guidelines on contributing to this project.


# NanoGPT Client

An unofficial implementation of the [NanoGPT API](https://nano-gpt.com/api). This library aims to provide
a Typescript client for both browser and node environments. It's built on the inferred [OpenAPI spec](./openapi.yaml).

**Note**: The API might change at any time which can render this client unusable, use at your own risk.

## Install

```bash
npm install nanogpt-client
```

## How to use

### Simple chat

```javascript
import { NanoGPTClient } from 'nanogpt-client'
;(async () => {
  const nano = new NanoGPTClient({
    apiKey: '<NanoGPT API Key>'
  })
  const textResponse = await nano.chat().simple('test', 'chatgpt-4o-latest')
  console.log(textResponse)
})()
```

### Streaming chat

```javascript
import { NanoGPTClient } from 'nanogpt-client'
;(async () => {
  const nano = new NanoGPTClient({
    apiKey: '<NanoGPT API Key>'
  })
  const stream = await nano.chat().stream().simple('test', 'chatgpt-4o-latest')
  for await (const part of stream) {
    console.log(part) // Prints each response
  }
})()
```

## Contributing

Please consult [CONTRIBUTING](./.github/CONTRIBUTING.md) for guidelines on contributing to this project.

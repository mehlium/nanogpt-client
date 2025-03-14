# NanoGPT Client

A custom implementation of the [NanoGPT API](https://nano-gpt.com/api). This aims to provide a typescript client wrapper for the API for both the Browser and Node environments.

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

## Author

**nanogpt-client** © [Kjetil Mehl](https://github.com/aspic), Released under the [Apache-2.0](./LICENSE) License.


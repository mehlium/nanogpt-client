# NanoGPT Client

![NPM Version](https://img.shields.io/npm/v/nanogpt-client)
![GitHub branch check runs](https://img.shields.io/github/check-runs/aspic/nanogpt-client/main)

An unofficial implementation of the [NanoGPT API](https://nano-gpt.com/api). This library aims to provide
a Typescript client for both browser and node environments. It's built on the inferred [OpenAPI spec](./openapi.yaml).

**Note**: The API might change at any time which can render this client unusable, use at your own risk.

## Install

```bash
npm install nanogpt-client
```

## How to use

### Chat

#### Simple chat

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

#### Streaming chat

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

#### Send an image to the model

```javascript
import { NanoGPTClient } from 'nanogpt-client'
import fs from 'node:fs'

const imagePath = './image-to-describe.png'
const base64Image = fs.readFileSync(imagePath, 'base64')

;(async () => {
  const nano = new NanoGPTClient({
    apiKey: '<NanoGPT API Key>'
  })
  const {
    data: {
      choices: [
        {
          message: { content }
        }
      ]
    }
  } = await nano.chat().advanced({
    body: {
      model: 'meta-llama/llama-3.2-90b-vision-instruct',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: "What's in this image?" },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ]
    }
  })
  console.log(JSON.stringify(content))
})()
```

### Images

#### Simple image

```javascript
import { NanoGPTClient } from 'nanogpt-client'
;(async () => {
  const nano = new NanoGPTClient({
    apiKey: '<NanoGPT API Key>'
  })
  const base64EncodedData = await nano.image().simple('Cat with glasses', 'fast-sdxl')
})()
```

### Video

#### Generate and read status

```javascript
import { NanoGPTClient } from 'nanogpt-client'
;(async () => {
  const nano = new NanoGPTClient({
    apiKey: '<NanoGPT API Key>'
  })

  /** Generate video */
  const { data: generateData } = await nano.video().advanced({
    body: {
      prompt: 'Cat with glasses',
      framework: 'default',
      targetLengthInWords: 10,
      imageConfig: {
        model: 'recraft',
        style: 'any',
        loraConfig: undefined
      },
      voice: '9BWtsMINqrJLrRacOk9x',
      captionsShow: false,
      captionsStyle: 'default',
      effects: {
        transition: undefined,
        floating: undefined
      },
      quality: 'high',
      motion: {
        enabled: undefined,
        strength: undefined
      },
      music: 'video-creation/music/adventure/temple_of_treasures.mp3'
    }
  })

  /** Check status */
  const { data: statusData } = await nano.video().status({
    query: {
      runId: generateData.runId,
      projectId: generateData.projectId
    }
  })
  console.log(statusData)
})()
```

## Contributing

Please consult [CONTRIBUTING](./.github/CONTRIBUTING.md) for guidelines on contributing to this project.

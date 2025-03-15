import { Client, createClient } from '@hey-api/client-fetch'
import { createChatCompletion, generateImage, Options } from './openapi-client/sdk.gen.js'
import {
  ChatModel,
  CreateChatCompletionData,
  GenerateImageData
} from './openapi-client/types.gen.js'
import { client } from './openapi-client/client.gen.ts'

type APIKey = string
interface NanoGPTClientConfig {
  apiKey: APIKey
  defaultChatModel?: ChatModel
  client?: Client
}

export class NanoGPTClient {
  defaultModel?: ChatModel
  client: Client

  constructor(config: NanoGPTClientConfig) {
    this.defaultModel = config.defaultChatModel

    this.client = createClient({
      ...(config.client || client).getConfig(),
      auth: () => `${config.apiKey}`
    })
  }

  chat<ThrowOnError extends boolean = false>(
    options: Options<CreateChatCompletionData, ThrowOnError> | string
  ) {
    if (typeof options === 'string') {
      return createChatCompletion({
        body: {
          model: this.defaultModel,
          messages: [{ role: 'user', content: options }]
        },
        client: this.client
      })
    }
    return createChatCompletion({
      ...options,
      client: options.client || this.client
    })
  }

  image<ThrowOnError extends boolean = false>(options: Options<GenerateImageData, ThrowOnError>) {
    return generateImage({
      ...options,
      client: options.client || this.client
    })
  }
}

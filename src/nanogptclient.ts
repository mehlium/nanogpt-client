import { Client, createClient } from '@hey-api/client-fetch'
import { createChatCompletion, generateImage, models, Options } from './openapi-client/sdk.gen.js'
import {
  ChatModel,
  CreateChatCompletionData,
  CreateChatCompletionResponse,
  GenerateImageData,
  ModelsData
} from './openapi-client/types.gen.js'
import { client } from './openapi-client/client.gen.ts'
import { bodyToAsyncGenerator } from './utils.ts'

type APIKey = string
interface NanoGPTClientConfig {
  apiKey: APIKey
  defaultChatModel?: ChatModel
  client?: Client
}

export class NanoGPTClient {
  defaultChatModel?: ChatModel
  client: Client

  constructor(config: NanoGPTClientConfig) {
    this.defaultChatModel = config.defaultChatModel

    this.client = createClient({
      ...(config.client || client).getConfig(),
      auth: () => `${config.apiKey}`
    })
  }

  chat<ThrowOnError extends boolean = false>(
    optionsOrChat: Options<CreateChatCompletionData, ThrowOnError> | string
  ) {
    if (typeof optionsOrChat === 'string') {
      if (this.defaultChatModel === undefined) {
        throw new Error('defaultChatModel missing, configure in constructor')
      }
      return createChatCompletion({
        body: {
          model: this.defaultChatModel,
          messages: [{ role: 'user', content: optionsOrChat }]
        },
        client: this.client
      })
    }
    return createChatCompletion({
      ...optionsOrChat,
      client: optionsOrChat.client || this.client
    })
  }

  async stream<ThrowOnError extends boolean = false>(
    options: Options<CreateChatCompletionData, ThrowOnError>
  ): Promise<AsyncGenerator<CreateChatCompletionResponse | undefined, any, any>> {
    const headers = {
      'Content-Type': 'text/event-stream',
      Accept: 'text/event-stream',
      ...options.headers
    }
    return this.chat({
      ...options,
      body: { ...options.body, stream: true },
      headers: headers,
      client: createClient({
        ...(options.client || this.client).getConfig(),
        parseAs: 'stream'
      })
    }).then((response) => bodyToAsyncGenerator(response.response))
  }

  image<ThrowOnError extends boolean = false>(options: Options<GenerateImageData, ThrowOnError>) {
    return generateImage({
      ...options,
      client: options.client || this.client
    })
  }

  models<ThrowOnError extends boolean = false>(options: Options<ModelsData, ThrowOnError>) {
    return models({
      ...options,
      client: options.client || this.client
    })
  }
}

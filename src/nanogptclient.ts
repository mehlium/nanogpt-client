import { Client, createClient, RequestResult } from '@hey-api/client-fetch'
import { createChatCompletion, generateImage, models, Options } from './openapi-client/sdk.gen.js'
import {
  ChatModel,
  CreateChatCompletionData,
  CreateChatCompletionError,
  CreateChatCompletionResponse,
  GenerateImageData,
  ModelsData
} from './openapi-client/types.gen.js'
import { client } from './openapi-client/client.gen.ts'
import { bodyToAsyncGenerator } from './utils.ts'

type APIKey = string
interface NanoGPTClientConfig {
  apiKey: APIKey
  client?: Client
}

interface Chat {
  simple: (message: string, model: ChatModel) => Promise<string | undefined>
  advanced: <ThrowOnError extends boolean = false>(
    options: Options<CreateChatCompletionData, ThrowOnError>
  ) => RequestResult<CreateChatCompletionResponse, CreateChatCompletionError, ThrowOnError>
}

export class NanoGPTClient {
  client: Client

  private streamClient: Client

  constructor(config: NanoGPTClientConfig) {
    this.client = createClient({
      ...(config.client || client).getConfig(),
      auth: () => `${config.apiKey}`
    })
    this.streamClient = createClient({
      ...this.client.getConfig(),
      parseAs: 'stream'
    })
  }
  chat(): Chat {
    return {
      simple: (message: string, model: ChatModel) =>
        createChatCompletion({
          body: {
            model,
            messages: [{ role: 'user', content: message }]
          },
          client: this.client
        }).then((response) => response.data?.choices?.[0]?.message?.content),
      advanced: <ThrowOnError extends boolean = false>(
        options: Options<CreateChatCompletionData, ThrowOnError>
      ) =>
        createChatCompletion({
          ...options,
          client: options.client || this.client
        })
    }
  }

  async stream<ThrowOnError extends boolean = false>(
    options: Options<CreateChatCompletionData, ThrowOnError>
  ): Promise<AsyncGenerator<CreateChatCompletionResponse | undefined, any, any>> {
    const headers = {
      'Content-Type': 'text/event-stream',
      Accept: 'text/event-stream',
      ...options.headers
    }
    return this.chat()
      .advanced({
        ...options,
        body: { ...options.body, stream: true },
        headers: headers,
        client: options.client || this.streamClient
      })
      .then((response) => bodyToAsyncGenerator(response.response))
  }

  image<ThrowOnError extends boolean = false>(options: Options<GenerateImageData, ThrowOnError>) {
    return generateImage({
      ...options,
      body: {
        ...options.body,
        resolution: options.body.resolution || `${options.body.width}x${options.body.height}`
      },
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

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
import {
  bodyToAsyncChatCompletionGenerator,
  bodyToAsyncGenerator,
  bodyToAsyncStringGenerator
} from './utils.ts'

type APIKey = string
interface NanoGPTClientConfig {
  apiKey: APIKey
  client?: Client
}

type StreamType = <ThrowOnError extends boolean = false>(
  options: Options<CreateChatCompletionData, ThrowOnError>
) => Promise<AsyncGenerator<CreateChatCompletionResponse | undefined, any, any>>

interface Stream {
  simple: (
    message: string,
    model: ChatModel
  ) => Promise<AsyncGenerator<string | undefined, any, any>>
  advanced: StreamType
}

interface Chat {
  simple: (message: string, model: ChatModel) => Promise<string | undefined>
  advanced: <ThrowOnError extends boolean = false>(
    options: Options<CreateChatCompletionData, ThrowOnError>
  ) => RequestResult<CreateChatCompletionResponse, CreateChatCompletionError, ThrowOnError>
  stream: () => Stream
}

export class NanoGPTClient {
  client: Client

  private streamClient: Client
  private streamHeaders: Record<string, string> = {
    'Content-Type': 'text/event-stream',
    Accept: 'text/event-stream'
  }

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
        }),
      stream: () => {
        return {
          simple: async (
            message: string,
            model: ChatModel
          ): Promise<AsyncGenerator<string | undefined, any, any>> => {
            const response = await createChatCompletion({
              body: {
                model,
                messages: [{ role: 'user', content: message }],
                stream: true
              },
              headers: this.streamHeaders,
              client: this.streamClient
            })
            return bodyToAsyncStringGenerator(response.response)
          },
          advanced: async <ThrowOnError extends boolean = false>(
            options: Options<CreateChatCompletionData, ThrowOnError>
          ): Promise<AsyncGenerator<CreateChatCompletionResponse | undefined, any, any>> => {
            const response = await createChatCompletion({
              ...options,
              body: { ...options.body, stream: true },
              headers: this.streamHeaders,
              client: options.client || this.streamClient
            })
            return bodyToAsyncChatCompletionGenerator(response.response)
          }
        }
      }
    }
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

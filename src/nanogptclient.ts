import { Client, createClient } from '@hey-api/client-fetch'
import {
  balance,
  checkVideoStatus,
  createChatCompletion,
  generateImage,
  generateVideo,
  models,
  Options
} from './openapi-client/sdk.gen.js'
import {
  ChatModel,
  CheckVideoStatusData,
  CreateChatCompletionData,
  CreateChatCompletionResponse,
  GenerateImageData,
  GenerateVideoData,
  ImageModel
} from './openapi-client/types.gen.js'
import { client } from './openapi-client/client.gen.ts'
import { bodyToAsyncChatCompletionGenerator, bodyToAsyncStringGenerator } from './utils.ts'
import { APIClient, Chat, Image, NanoGPTClientConfig, Video } from './types.ts'

export class NanoGPTClient implements APIClient {
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
              client: this.streamClient
            })
            return bodyToAsyncChatCompletionGenerator(response.response)
          }
        }
      }
    }
  }

  image(): Image {
    return {
      simple: async (prompt: string, model: ImageModel) => {
        const defaultDimension = 1024
        const response = await generateImage({
          body: {
            prompt,
            model,
            width: defaultDimension,
            height: defaultDimension,
            resolution: `${defaultDimension}x${defaultDimension}`
          },
          client: this.client
        })
        return response.data?.data?.[0].b64_json
      },
      advanced: <ThrowOnError extends boolean = false>(
        options: Options<GenerateImageData, ThrowOnError>
      ) =>
        generateImage({
          ...options,
          body: {
            ...options.body,
            resolution: options.body.resolution || `${options.body.width}x${options.body.height}`
          },
          client: this.client
        })
    }
  }
  video(): Video {
    return {
      advanced: <ThrowOnError extends boolean = false>(
        options: Options<GenerateVideoData, ThrowOnError>
      ) =>
        generateVideo({
          ...options,
          client: options.client || this.client
        }),
      status: <ThrowOnError extends boolean = false>(
        options: Options<CheckVideoStatusData, ThrowOnError>
      ) =>
        checkVideoStatus({
          ...options,
          client: options.client || this.client
        })
    }
  }
  models() {
    return models({
      client: this.client
    })
  }
  balance() {
    return balance({
      client: this.client
    })
  }
}

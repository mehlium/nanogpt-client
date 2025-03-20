import { Client, Options, RequestResult } from '@hey-api/client-fetch'
import {
  ChatModel,
  CreateChatCompletionData,
  CreateChatCompletionError,
  CreateChatCompletionResponse,
  GenerateImageData,
  GenerateImageError,
  GenerateImageResponse,
  ImageModel
} from './index.ts'

export type APIKey = string
export interface NanoGPTClientConfig {
  apiKey: APIKey
  client?: Client
}

export type StreamType = <ThrowOnError extends boolean = false>(
  options: Options<CreateChatCompletionData, ThrowOnError>
) => Promise<AsyncGenerator<CreateChatCompletionResponse | undefined, any, any>>

export interface Stream {
  simple: (
    message: string,
    model: ChatModel
  ) => Promise<AsyncGenerator<string | undefined, any, any>>
  advanced: StreamType
}

export interface Chat {
  simple: (message: string, model: ChatModel) => Promise<string | undefined>
  advanced: <ThrowOnError extends boolean = false>(
    options: Options<CreateChatCompletionData, ThrowOnError>
  ) => RequestResult<CreateChatCompletionResponse, CreateChatCompletionError, ThrowOnError>
  stream: () => Stream
}

export interface Image {
  simple: (prompt: string, model: ImageModel) => Promise<string | undefined>
  advanced: <ThrowOnError extends boolean = false>(
    options: Options<GenerateImageData, ThrowOnError>
  ) => RequestResult<GenerateImageResponse, GenerateImageError, ThrowOnError>
}

export interface APIClient {
  chat: () => Chat
  image: () => Image
}

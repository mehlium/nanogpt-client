import { Client, Options, RequestResult } from '@hey-api/client-fetch'
import {
  ChatModel,
  CheckVideoStatusData,
  CheckVideoStatusError,
  CheckVideoStatusResponse,
  CreateChatCompletionData,
  CreateChatCompletionError,
  CreateChatCompletionResponse,
  GenerateImageData,
  GenerateImageError,
  GenerateImageResponse,
  GenerateVideoData,
  GenerateVideoError,
  GenerateVideoResponse,
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
export interface Video {
  status: <ThrowOnError extends boolean = false>(
    options: Options<CheckVideoStatusData, ThrowOnError>
  ) => RequestResult<CheckVideoStatusResponse, CheckVideoStatusError, ThrowOnError>
  advanced: <ThrowOnError extends boolean = false>(
    options: Options<GenerateVideoData, ThrowOnError>
  ) => RequestResult<GenerateVideoResponse, GenerateVideoError, ThrowOnError>
}

export interface APIClient {
  chat: () => Chat
  image: () => Image
  video: () => Video
}

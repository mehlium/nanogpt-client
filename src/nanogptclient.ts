import { createChatCompletion, Options } from './sdk.gen.js'
import { CreateChatCompletionData } from './types.gen.js'

type APIKey = string

export class NanoGPTClient {
  apiKey: string

  constructor(apiKey: APIKey) {
    this.apiKey = apiKey
  }

  chat<ThrowOnError extends boolean = false>(
    options: Options<CreateChatCompletionData, ThrowOnError>
  ) {
    return createChatCompletion({
      ...options,
      headers: { Authorization: `Bearer: ${this.apiKey}` }
    })
  }
}

import { createChatCompletion, Options } from './sdk.gen.js'
import { ChatModel, CreateChatCompletionData } from './types.gen.js'

type APIKey = string

export class NanoGPTClient {
  headers: Record<string, string>
  defaultModel?: ChatModel

  constructor(apiKey: APIKey, defaultModel?: ChatModel) {
    this.headers = { Authorization: `Bearer: ${apiKey}` }
    this.defaultModel = defaultModel
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
        headers: this.headers
      })
    }
    return createChatCompletion({
      ...options,
      headers: this.headers
    })
  }
}

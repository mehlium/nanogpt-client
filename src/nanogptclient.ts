import { Client, createClient } from '@hey-api/client-fetch'
import { createChatCompletion, Options } from './openapi-client/sdk.gen.js'
import { ChatModel, CreateChatCompletionData } from './openapi-client/types.gen.js'
import { client } from './openapi-client/client.gen.ts'

type APIKey = string

export class NanoGPTClient {
  defaultModel?: ChatModel
  client: Client

  constructor(apiKey: APIKey, defaultModel?: ChatModel) {
    this.defaultModel = defaultModel

    this.client = createClient({
      ...client.getConfig(),
      auth: () => `${apiKey}`
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
}

// This file is auto-generated by @hey-api/openapi-ts

export type ChatModel =
  | 'chatgpt-4o-latest'
  | 'claude-3-5-sonnet-20241022'
  | 'yi-lightning'
  | 'deepseek-chat'
  | 'gemini'

export const ChatModel = {
  CHATGPT_4O_LATEST: 'chatgpt-4o-latest',
  CLAUDE_3_5_SONNET_20241022: 'claude-3-5-sonnet-20241022',
  YI_LIGHTNING: 'yi-lightning',
  DEEPSEEK_CHAT: 'deepseek-chat',
  GEMINI: 'gemini'
} as const

export type ImageModel = 'dall-e' | 'stable-diffusion' | 'dreamshaper_8_93211.safetensors'

export const ImageModel = {
  DALL_E: 'dall-e',
  STABLE_DIFFUSION: 'stable-diffusion',
  DREAMSHAPER_8_93211_SAFETENSORS: 'dreamshaper_8_93211.safetensors'
} as const

export type Message = {
  /**
   * The role of the message sender (e.g., 'user', 'assistant').
   */
  role?: string
  /**
   * The content of the message.
   */
  content?: string
}

/**
 * Controls randomness (0 to 2).
 */
export type TemperatureParam = number

/**
 * Maximum number of tokens to generate.
 */
export type MaxTokensParam = number

/**
 * Whether to stream the response.
 */
export type StreamParam = boolean

/**
 * Up to 4 sequences where the API will stop generating.
 */
export type StopParam = Array<string>

/**
 * Nucleus sampling probability.
 */
export type TopPParam = number

/**
 * Limits the next token selection to the K most likely tokens.
 */
export type TopKParam = number

/**
 * Reduces token repetition (-2.0 to 2.0).
 */
export type FrequencyPenaltyParam = number

/**
 * Increases likelihood of new topics (-2.0 to 2.0).
 */
export type PresencePenaltyParam = number

/**
 * Modify the probability of specified tokens.
 */
export type LogitBiasParam = {
  [key: string]: unknown
}

/**
 * Unique identifier for the end-user.
 */
export type UserParam = string

/**
 * Number of choices to generate.
 */
export type NParam = number

/**
 * Seed for deterministic sampling.
 */
export type SeedParam = number

/**
 * Format for the generated output.
 */
export type ResponseFormatParam = string

/**
 * List of tools the model may call.
 */
export type ToolsParam = Array<string>

/**
 * Controls how functions are called by the model.
 */
export type ToolChoiceParam = string

export type CreateChatCompletionData = {
  body: {
    model?: ChatModel
    messages?: Array<Message>
    temperature?: TemperatureParam
    max_tokens?: MaxTokensParam
    stream?: StreamParam
    stop?: StopParam
    top_p?: TopPParam
    top_k?: TopKParam
    frequency_penalty?: FrequencyPenaltyParam
    presence_penalty?: PresencePenaltyParam
    logit_bias?: LogitBiasParam
    user?: UserParam
    n?: NParam
    seed?: SeedParam
    response_format?: ResponseFormatParam
    tools?: ToolsParam
    tool_choice?: ToolChoiceParam
  }
  path?: never
  query?: never
  url: '/chat/completions'
}

export type CreateChatCompletionErrors = {
  /**
   * Invalid request.
   */
  400: {
    /**
     * Details about the invalid request.
     */
    error?: string
  }
  /**
   * Unauthorized.
   */
  401: {
    /**
     * Authentication error.
     */
    error?: string
  }
  /**
   * Server error.
   */
  500: {
    /**
     * Server-side error details.
     */
    error?: string
  }
}

export type CreateChatCompletionError = CreateChatCompletionErrors[keyof CreateChatCompletionErrors]

export type CreateChatCompletionResponses = {
  /**
   * Successful chat completion response.
   */
  200: {
    /**
     * Unique identifier for the completion.
     */
    id?: string
    /**
     * Typically 'chat.completion'.
     */
    object?: string
    /**
     * Timestamp when the completion was created.
     */
    created?: number
    model?: ChatModel
    choices?: Array<{
      /**
       * Index of the generated choice.
       */
      index?: number
      message?: Message
      /**
       * Reason the generation was stopped.
       */
      finish_reason?: string
    }>
    usage?: {
      /**
       * Number of tokens in the prompt.
       */
      prompt_tokens?: number
      /**
       * Number of tokens in the completion.
       */
      completion_tokens?: number
      /**
       * Total tokens used.
       */
      total_tokens?: number
    }
  }
}

export type CreateChatCompletionResponse =
  CreateChatCompletionResponses[keyof CreateChatCompletionResponses]

export type GenerateImageData = {
  body: {
    model?: ImageModel
    /**
     * Text prompt for image generation.
     */
    prompt?: string
    n?: NParam
    /**
     * Dimensions for the generated image (e.g., "256x256").
     */
    size?: string
    response_format?: ResponseFormatParam
    user?: UserParam
  }
  path?: never
  query?: never
  url: '/image/generations'
}

export type GenerateImageErrors = {
  /**
   * Invalid request.
   */
  400: {
    /**
     * Details about the invalid request.
     */
    error?: string
  }
  /**
   * Unauthorized.
   */
  401: {
    /**
     * Authentication error.
     */
    error?: string
  }
  /**
   * Server error.
   */
  500: {
    /**
     * Server-side error details.
     */
    error?: string
  }
}

export type GenerateImageError = GenerateImageErrors[keyof GenerateImageErrors]

export type GenerateImageResponses = {
  /**
   * Successful image generation response.
   */
  200: {
    /**
     * Timestamp of image creation.
     */
    created?: number
    data?: Array<{
      /**
       * URL of the generated image.
       */
      url?: string
      /**
       * Base64-encoded JSON of the image.
       */
      b64_json?: string
    }>
  }
}

export type GenerateImageResponse = GenerateImageResponses[keyof GenerateImageResponses]

export type ClientOptions = {
  baseUrl: 'https://nano-gpt.com/api/v1' | (string & {})
}

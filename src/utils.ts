import { TextDecoder } from 'util'
import { CreateChatCompletionResponse } from './openapi-client/types.gen.ts'

export function mapToCreateChatCompletionResponse(
  data: string
): (CreateChatCompletionResponse | undefined)[] {
  return data
    .replaceAll('\n', '')
    .replaceAll('data: ', '\n')
    .trim()
    .split('\n')
    .filter((value) => value.length > 0)
    .map((value) => {
      try {
        return JSON.parse(value) as CreateChatCompletionResponse
      } catch (err) {
        console.error(err)
      }
    })
}

type Parser<T> = (value: CreateChatCompletionResponse) => T | undefined

export async function* bodyToAsyncGenerator<T>(
  response: Response,
  parser: Parser<T>
): AsyncGenerator<T | undefined> {
  const decoder: TextDecoder = new TextDecoder()
  if (response.body === null) {
    return undefined
  }
  const reader = response.body.getReader()
  let finalValue: T | undefined = undefined
  try {
    while (true) {
      const { done, value } = await reader.read()
      let mapped = decoder.decode(value)
      const values = mapToCreateChatCompletionResponse(mapped)
        .filter((value) => value !== undefined)
        .map(parser)
      if (done) {
        finalValue = values[values.length - 1]
        break
      }
      yield* values
    }
  } finally {
    reader.releaseLock()
  }
  return finalValue
}

export async function* bodyToAsyncStringGenerator(
  response: Response
): AsyncGenerator<string | undefined> {
  yield* bodyToAsyncGenerator<string>(
    response,
    (value: CreateChatCompletionResponse) => value?.choices?.[0]?.delta?.content
  )
}
export async function* bodyToAsyncChatCompletionGenerator(
  response: Response
): AsyncGenerator<CreateChatCompletionResponse | undefined> {
  yield* bodyToAsyncGenerator<CreateChatCompletionResponse>(
    response,
    (value: CreateChatCompletionResponse) => value
  )
}

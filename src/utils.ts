import { TextDecoder } from 'util'
import { CreateChatCompletionResponse } from './openapi-client/types.gen.ts'

export function mapMultiple(data: string): (CreateChatCompletionResponse | undefined)[] {
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

export async function* bodyToAsyncGenerator(
  response: Response
): AsyncGenerator<CreateChatCompletionResponse | undefined> {
  const decoder: TextDecoder = new TextDecoder()
  if (response.body === null) {
    return undefined
  }
  const reader = response.body.getReader()
  let finalValue: CreateChatCompletionResponse | undefined = undefined
  try {
    while (true) {
      const { done, value } = await reader.read()
      let mapped = decoder.decode(value)
      const values = mapMultiple(mapped)
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

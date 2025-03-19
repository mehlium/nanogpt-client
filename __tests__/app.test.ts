import { test, describe, beforeEach, mock } from 'node:test'
import assert from 'node:assert'
import { CreateChatCompletionResponse, NanoGPTClient } from '../src/index.ts'
import { client } from '../src/openapi-client/client.gen.ts'
import { createClient } from '@hey-api/client-fetch'
import { mockResponse, mockStreamResponse } from './test-utils.ts'
import { chatSuccesful, imageSuccesful, modelsSuccesful, streamSuccessful } from './fixtures.ts'

const mockedClient = (json: any) => {
  return createClient({
    ...client.getConfig(),
    fetch: (request: Request) => mockResponse(json)
  })
}

describe('NanoGPTClient', () => {
  beforeEach(() => {
    mock.reset()
  })

  test('chat().simple successful', async (t) => {
    const nano = new NanoGPTClient({
      apiKey: 'test-key',
      client: mockedClient(chatSuccesful)
    })
    const textResponsetResponse = await nano.chat().simple('test', 'chatgpt-4o-latest')
    assert.equal(textResponsetResponse, 'this is a test')
  })
  test('chat.advanced() successful', async (t) => {
    const nano = new NanoGPTClient({ apiKey: 'test-key', client: mockedClient(chatSuccesful) })
    const { data, error } = await nano.chat().advanced({
      body: {
        model: 'chatgpt-4o-latest',
        messages: [{ role: 'system', content: 'test' }]
      }
    })

    assert.equal(data?.choices?.[0]?.message?.content, 'this is a test')
    assert.equal(data?.nanoGPT?.paymentSource, 'XNO')
    assert.equal(error, undefined)
  })

  test('image successful', async (t) => {
    const nano = new NanoGPTClient({
      apiKey: 'test-key',
      client: mockedClient(imageSuccesful)
    })
    const { data, error } = await nano.image({
      body: {
        model: 'fast-sdxl',
        prompt: 'cat with glasses',
        resolution: '32x32',
        width: 32,
        height: 32
      }
    })
    assert.equal(data?.created, 1742029987521)
    assert.equal(data?.cost, 0.004300130468354767)
    assert.equal(data?.paymentSource, 'XNO')
    assert.equal(data?.remainingBalance, 0.8217866695316453)
    assert.equal(error, undefined)
  })
  test('models successful', async (t) => {
    const nano = new NanoGPTClient({
      apiKey: 'test-key',
      client: mockedClient(modelsSuccesful)
    })
    const { data, error } = await nano.models({})
    assert.equal(data?.object, 'list')
    assert.equal(data?.data?.length, 2)
    assert.equal(error, undefined)
  })
  test('chat().stream().simple() successful', async () => {
    const nano = new NanoGPTClient({
      apiKey: 'test-key',
      client: createClient({
        ...client.getConfig(),
        fetch: (request: Request) => mockStreamResponse(streamSuccessful)
      })
    })
    const iterator = await nano.chat().stream().simple('This is a test', 'chatgpt-4o-latest')

    let response = ''

    for await (const part of iterator) {
      response += part
    }
    assert.equal(response, 'Hello! It seems')
  })
  test('chat().stream().advanced() successful', async () => {
    const nano = new NanoGPTClient({
      apiKey: 'test-key',
      client: createClient({
        ...client.getConfig(),
        fetch: (request: Request) => mockStreamResponse(streamSuccessful)
      })
    })
    const iterator = await nano
      .chat()
      .stream()
      .advanced({
        body: { model: 'chatgpt-4o-latest', messages: [{ role: 'user', content: 'bar' }] }
      })

    const yielded: (CreateChatCompletionResponse | undefined)[] = []
    let result = await iterator.next()
    while (!result.done) {
      yielded.push(result.value)
      result = await iterator.next()
    }
    assert.equal(yielded.length, 4)
  })
})

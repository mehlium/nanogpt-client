import { test, describe, beforeEach, mock } from 'node:test'
import assert from 'node:assert'
import { CreateChatCompletionResponse, NanoGPTClient } from '../src/index.ts'
import { client } from '../src/openapi-client/client.gen.ts'
import { createClient } from '@hey-api/client-fetch'
import { mockResponse, mockStreamResponse } from './test-utils.ts'
import {
  balanceSuccessful,
  chatSuccesful,
  imageSuccesful,
  modelsSuccesful,
  streamSuccessful
} from './fixtures.ts'

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

  test('image().simple() successful', async (t) => {
    const nano = new NanoGPTClient({
      apiKey: 'test-key',
      client: mockedClient(imageSuccesful)
    })
    const response = await nano.image().simple('cat with glasses', 'fast-sdxl')
    assert.equal(response, imageSuccesful.data[0].b64_json)
  })
  test('image().advanced() successful', async (t) => {
    const nano = new NanoGPTClient({
      apiKey: 'test-key',
      client: mockedClient(imageSuccesful)
    })
    const { data, error } = await nano.image().advanced({
      body: {
        model: 'fast-sdxl',
        prompt: 'cat with glasses',
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
    assert.equal(response, `It looks like you're testing. Let me know how I can assist you! 😊`)
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
    assert.equal(yielded.length, 17)
  })

  test('balance() successful', async () => {
    const nano = new NanoGPTClient({
      apiKey: 'test-key',
      client: mockedClient(balanceSuccessful)
    })
    const {
      data: { balance, nanoDepositAddress }
    } = await nano.balance()

    assert.equal(balance, '0.50778860')
    assert.equal(
      nanoDepositAddress,
      'nano_3ipmci1h6y3cghmh563w6odamx7awwh7rzkuhndtzy1ipn8onryns57h6g6e'
    )
  })
})

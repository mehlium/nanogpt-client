import { test, describe, beforeEach, mock } from 'node:test'
import assert from 'node:assert'
import { NanoGPTClient } from '../src/index.ts'
import { client } from '../src/openapi-client/client.gen.ts'
import { createClient } from '@hey-api/client-fetch'
import { mockResponse } from './test-utils.ts'
import { chatSuccesful, imageSuccesful } from './fixtures.ts'

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

  test('chat successful', async (t) => {
    const nano = new NanoGPTClient({ apiKey: 'test-key', client: mockedClient(chatSuccesful) })
    const { data, error } = await nano.chat({
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
})

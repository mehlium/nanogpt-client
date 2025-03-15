import { test, describe, beforeEach, mock } from 'node:test'
import assert from 'node:assert'
import { NanoGPTClient } from '../src/index.ts'
import { client } from '../src/openapi-client/client.gen.ts'
import { createClient } from '@hey-api/client-fetch'
import { mockResponse } from './test-utils.ts'
import { chatSuccesful } from './fixtures.ts'

describe('NanoGPTClient', () => {
  beforeEach(() => {
    mock.reset()
  })

  test('successful response', async (t) => {
    const fetch = createClient({
      ...client.getConfig(),
      fetch: (request: Request) => mockResponse(chatSuccesful)
    })
    const nano = new NanoGPTClient('test-key')
    const { data, error } = await nano.chat({
      body: {
        model: 'chatgpt-4o-latest',
        messages: [{ role: 'system', content: 'test' }]
      },
      client: fetch
    })

    assert.equal(data?.choices?.[0]?.message?.content, 'this is a test')
    assert.equal(error, undefined)
  })
})


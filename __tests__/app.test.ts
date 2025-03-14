import { test, describe, beforeEach, mock } from 'node:test'
import assert from 'node:assert'
import { NanoGPTClient } from '../src/index.ts'
import { client } from '../src/openapi-client/client.gen.ts'
import { createClient } from '@hey-api/client-fetch'
import { mockResponse } from './test-utils.ts'

const fixture = {
  id: 'chatcmpl-1741987982317',
  object: 'chat.completion',
  created: 1741987982,
  model: 'ChatGPT 4o',
  choices: [
    {
      index: 0,
      message: { role: 'assistant', content: 'this is a test' },
      logprobs: null,
      finish_reason: 'stop'
    }
  ],
  usage: {
    prompt_tokens: 304,
    completion_tokens: 512,
    total_tokens: 816,
    prompt_tokens_details: {
      cached_tokens: 0,
      audio_tokens: 0
    },
    completion_tokens_details: {
      reasoning_tokens: 0,
      audio_tokens: 0,
      accepted_prediction_tokens: 0,
      rejected_prediction_tokens: 0
    },
    reasoning_tokens: 0,
    citation_tokens: 0,
    num_search_queries: 0
  },
  service_tier: 'default',
  system_fingerprint: 'fp_bezn5iwhg',
  nanoGPT: {
    cost: 0.013181514514108306,
    inputTokens: 304,
    outputTokens: 512,
    paymentSource: 'XNO'
  }
}

describe('NanoGPTClient', () => {
  beforeEach(() => {
    mock.reset()
  })

  test('successful response', async (t) => {
    const fetch = createClient({
      ...client.getConfig(),
      fetch: (request: Request) => mockResponse(fixture)
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


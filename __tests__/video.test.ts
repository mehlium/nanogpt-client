import { test, describe } from 'node:test'
import { createClient } from '@hey-api/client-fetch'
import { mockResponse } from './test-utils.ts'
import { client } from '../src/openapi-client/client.gen.ts'
import { NanoGPTClient } from '../src/index.ts'
import { generateVideoSuccessful } from './test-fixtures/video-fixtures.ts'
import assert from 'assert'

const mockedClient = (json: any) => {
  return createClient({
    ...client.getConfig(),
    fetch: (request: Request) => mockResponse(json)
  })
}

describe('video', () => {
  test('video().advanced successful', async (t) => {
    const nano = new NanoGPTClient({
      apiKey: 'test-key',
      client: mockedClient(generateVideoSuccessful)
    })
    const { data } = await nano.video().advanced({
      body: {
        framework: 'default',
        targetLengthInWords: 10,
        imageConfig: {
          model: 'recraft',
          style: 'any',
          loraConfig: undefined
        },
        voice: '9BWtsMINqrJLrRacOk9x',
        captionsShow: false,
        captionsStyle: 'default',
        effects: {
          transition: undefined,
          floating: undefined
        },
        quality: 'high',
        motion: {
          enabled: undefined,
          strength: undefined
        },
        music: 'video-creation/music/adventure/temple_of_treasures.mp3'
      }
    })
    assert.equal(data?.status, 'EXECUTING')
  })
})

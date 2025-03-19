import test, { describe } from 'node:test'
import { mapToCreateChatCompletionResponse } from '../src/utils.ts'
import assert from 'node:assert'
import { streamSuccessful } from './fixtures.ts'

describe('utils test', () => {
  test('mapMultiple', async (t) => {
    const mapped = mapToCreateChatCompletionResponse(streamSuccessful)
    assert.equal(mapped.length, 4)
  })
})

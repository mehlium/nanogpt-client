import test, { describe } from 'node:test'
import { mapMultiple } from '../src/utils.ts'
import assert from 'node:assert'
import { streamSuccessful } from './fixtures.ts'

describe('utils test', () => {
  test('parse data', async (t) => {
    const mapped = mapMultiple(streamSuccessful)
    assert.equal(mapped.length, 4)
  })
})

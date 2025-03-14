import { test, describe, beforeEach, mock } from 'node:test'
import assert from 'node:assert'
import { NanoGPTClient } from '../src/index.ts'

// TODO: Real tests
describe('NanoGPTClient', () => {
  beforeEach(() => {
    // Reset the mocks before each test
    mock.reset()
  })

  test('new NanoGPTClient', async (t) => {
    const nano = new NanoGPTClient('test-key')

    assert.notEqual(nano, undefined)
  })
})


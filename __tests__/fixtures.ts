export const chatSuccesful = {
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

export const imageSuccesful = {
  created: 1742029987521,
  data: [
    {
      b64_json: `/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCAAgACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9CfD/APwRf0zx/qMes/tGeOIrzvNaaUrZlbHOXY8fhmuk8dfsP/Bn9h39m74oaz8HbecXXifRPssYnVT9mjigmIRSOTnc5JPU4r6Q1T4/aNpPgXwr46vNBuo4vFms2dhZWrMvmR/aWIV3wSOFG4gE18vft2fta3t/8YPHn7LSWtqukaD8I7vW7q5IJle8k/dovoAqFvrur4zOc8yPIsjq1Kckk42VrvWUXKO+quk2foXCWDz3O+JqFOacowkpTWiXLCUb6LzaXnc/k/8AiDoF6PFWorIWJW7cfqa51NAufOClWxmvTPiNfW7+KtRkRRzdvj865Ga8VZwRjrU4HFVpYaOnRfkfq3EuQZdRzeq+e/vy/wDSmf1FQftDeI4/2WP2adJ8JeVDq9r41sNI1bQ9RGDmNGjySckADBDc/eHpivA/2u/Gd/f/ALcv7S2p3lyM6Z8OLbT41XoqssZxn35rynxBP8TdL8NfDzxH8DvGl/45udN8SRCwj1XUYGWK5CkrHGYm3lRt+Z5FXBwozya868c/Gf4m6l8Wvjv4g+LehCx13xFpUEV2ltloS6fe2NzuUYHIr+N1nWd5/hpUa1WMklBWTs17OcKKbhL3r+zcrvRXb3P2Xgzw9w2C4jdbBuMoyVRNfaTniKc7W/ljGDV2ux+V3juBxrt65XrOx/WuMv5GWQYJzmvR/H2mzHVbpjGRulYjj3rhL7SpRNucYGepr+wstqwdCN+yPzDjbL69PM6qin8UvzZ//9k=`
    }
  ],
  cost: 0.004300130468354767,
  paymentSource: 'XNO',
  remainingBalance: 0.8217866695316453
}

export const modelsSuccesful = {
  object: 'list',
  data: [
    {
      id: 'recommended-model',
      object: 'model',
      created: 1742048051,
      owned_by: 'organization-owner'
    },
    { id: 'gpt-4.5-preview', object: 'model', created: 1742048051, owned_by: 'openai' }
  ]
}

export const streamSuccessful = `data: {"id":"chatcmpl-1742375111359","object":"chat.completion.chunk","created":1742375111,"model":"chatgpt-4o-latest","choices":[{"index":0,"delta":{"content":"It"},"finish_reason":null}]}

data: {"id":"chatcmpl-1742375111360","object":"chat.completion.chunk","created":1742375111,"model":"chatgpt-4o-latest","choices":[{"index":0,"delta":{"content":" looks"},"finish_reason":null}]}

data: {"id":"chatcmpl-1742375111377","object":"chat.completion.chunk","created":1742375111,"model":"chatgpt-4o-latest","choices":[{"index":0,"delta":{"content":" like"},"finish_reason":null}
]}

data: {"id":"chatcmpl-1742375111378","object":"chat.completion.chunk","created":1742375111,"model":"chatgpt-4o-latest","choices":[{"index":0,"delta":{"content":" you're"},"finish_reason":null}]}

data: {"id":"chatcmpl-1742375111390","object":"chat.completion.chunk","created":1742375111,"model":"chatgpt-4o-latest","choices":[{"index":0,"delta":{"content":" testing"},"finish_reason":null}]}


data: {"id":"chatcmpl-1742375111550","object":"chat.completion.chunk","created":1742375111,"model":"chatgpt-4o-latest","choices":[{"index":0,"delta":{"content":"."},"finish_reason":null}]}


data: {"id":"chatcmpl-1742375111550","object":"chat.completion.chunk","created":1742375111,"model":"chatgpt-4o-latest","choices":[{"index":0,"delta":{"content":" Let"},"finish_reason":null}]}

data: {"id":"chatcmpl-1742375111555","object":"chat.completion.chunk","created":1742375111,"model":"chatgpt-4o-latest","choices":[{"index":0,"delta":{"content":" me"},"finish_reason":null}]}

data: {"id":"chatcmpl-1742375111556","object":"chat.completion.chunk","created":1742375111,"model":"chatgpt-4o-latest","choices":[{"index":0,"delta":{"content":" know"},"finish_reason":null}]}

data: {"id":"chatcmpl-1742375111556","object":"chat.completion.chunk","created":1742375111,"model":"chatgpt-4o-latest","choices":[{"index":0,"delta":{"content":" how"},"finish_reason":null}]}


data: {"id":"chatcmpl-1742375111576","object":"chat.completion.chunk","created":1742375111,"model":"chatgpt-4o-latest","choices":[{"index":0,"delta":{"content":" I"},"finish_reason":null}]}


data: {"id":"chatcmpl-1742375111576","object":"chat.completion.chunk","created":1742375111,"model":"chatgpt-4o-latest","choices":[{"index":0,"delta":{"content":" can"},"finish_reason":null}]}

data: {"id":"chatcmpl-1742375111577","object":"chat.completion.chunk","created":1742375111,"model":"chatgpt-4o-latest","choices":[{"index":0,"delta":{"content":" assist"},"finish_reason":null}]}

data: {"id":"chatcmpl-1742375111577","object":"chat.completion.chunk","created":1742375111,"model":"chatgpt-4o-latest","choices":[{"index":0,"delta":{"content":" you"},"finish_reason":null}]}

data: {"id":"chatcmpl-1742375111577","object":"chat.completion.chunk","created":1742375111,"model":"chatgpt-4o-latest","choices":[{"index":0,"delta":{"content":"!"},"finish_reason":null}]}

data: {"id":"chatcmpl-1742375111578","object":"chat.completion.chunk","created":1742375111,"model":"chatgpt-4o-latest","choices":[{"index":0,"delta":{"content":" 😊"},"finish_reason":null}]}


data: {"id":"chatcmpl-1742375111656","object":"chat.completion.chunk","created":1742375111,"model":"chatgpt-4o-latest","choices":[{"index":0,"delta":{},"finish_reason":"stop"}],"nanoGPT":{"cost":0.0007212155963302753,"inputTokens":8,"outputTokens":29,"paymentSource":"XNO"}}


`

export const balanceSuccessful = {
  nanoDepositAddress: 'nano_3ipmci1h6y3cghmh563w6odamx7awwh7rzkuhndtzy1ipn8onryns57h6g6e',
  nanoReturnAddress: 'nano_3nqzrhkxhgtcsstowjkoi6a3u5sdgc6w1q75kx8qb4sebgnz9cnfojxg47cx',
  balance: '0.50778860',
  earned: '0.00000000'
}

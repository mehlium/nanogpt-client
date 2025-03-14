import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: './openapi.yaml',
  output: {
    format: 'prettier',
    lint: 'eslint',
    path: './src',
    clean: false
  },
  plugins: [
    '@hey-api/client-fetch',
    '@hey-api/schemas',
    {
      dates: true,
      name: '@hey-api/transformers'
    },
    {
      enums: 'javascript',
      name: '@hey-api/typescript'
    },
    {
      name: '@hey-api/sdk',
      transformer: true
    }
  ]
})

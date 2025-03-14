export const mockResponse = (json: any) =>
  Promise.resolve(
    new Response(JSON.stringify(json), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  )

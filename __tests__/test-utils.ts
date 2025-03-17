export const mockResponse = (json: any) =>
  Promise.resolve(
    new Response(JSON.stringify(json), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  )
export const mockStreamResponse = (data: string) =>
  Promise.resolve(
    new Response(data, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream'
      }
    })
  )

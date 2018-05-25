export async function fetchData(filter, page) {
  // Build the URL to request
  let params = filter !== 'comments' ? `filter=${filter}&` : ''
  if (page) params += `page=${page}`
  const url = `/api/${filter === 'comments' ? 'comments' : 'stories'}?${params}`

  // Perform the request
  const response = await fetch(url)

  // For the fetch API a non 2xx respone is NOT an error. So make sure we handle it
  if (!response.ok) {
    const error = new Error(`Requesting ${url} failed with HTTP status code ${response.status}.`)

    error.code = 'HTTP_ERROR'
    error.response = response

    throw error
  }

  return response.json()
}

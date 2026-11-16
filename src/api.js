const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

export async function fetchJson(url, options) {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}). Please try again.`)
  }

  return response.json()
}

export { API_BASE_URL }

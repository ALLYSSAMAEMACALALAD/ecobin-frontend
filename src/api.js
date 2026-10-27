// All requests go to /api/... The Vite dev server forwards them to the LavaLust backend.

export class ApiError extends Error {
  constructor(messages, status) {
    super(messages[0] || 'Something went wrong.')
    this.messages = messages
    this.status = status
  }
}

export async function api(path, { method = 'GET', body, formData } = {}) {
  const headers = { Accept: 'application/json', 'X-Requested-With': 'fetch' }
  const init = { method, headers, credentials: 'same-origin' }

  if (formData) {
    init.body = formData // the browser sets the multipart boundary itself
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(body)
  }

  let res
  try {
    res = await fetch(`/api${path}`, init)
  } catch {
    throw new ApiError(['Cannot reach the server. Is the backend running?'], 0)
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new ApiError(data.errors || [data.error || `Request failed (${res.status}).`], res.status)
  }
  return data
}

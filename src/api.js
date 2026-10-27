// The frontend only talks to the Eco-Bin API (backend/), never to the database.
// The API is a separate service, so its address comes from VITE_API_URL
// (see .env.example). Login uses a Bearer token kept in localStorage.
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '')

const KEY = 'eb_auth'

export const auth = {
  get() {
    try { return JSON.parse(localStorage.getItem(KEY)) } catch { return null }
  },
  set(value) {
    try { localStorage.setItem(KEY, JSON.stringify(value)) } catch { /* storage unavailable */ }
  },
  clear() {
    try { localStorage.removeItem(KEY) } catch { /* storage unavailable */ }
  },
}

export class ApiError extends Error {
  constructor(messages, status) {
    super(messages[0] || 'Something went wrong.')
    this.messages = messages
    this.status = status
  }
}

const JSON_HEADERS = { Accept: 'application/json', 'X-Requested-With': 'fetch' }

// One refresh at a time, even when several requests get a 401 together.
let refreshing = null

function refreshTokens(refreshToken) {
  refreshing ??= fetch(`${API_URL}/api/refresh`, {
    method: 'POST',
    headers: { ...JSON_HEADERS, 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })
    .then(async (res) => {
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.tokens) throw new Error('Session expired')
      return data.tokens
    })
    .finally(() => { refreshing = null })
  return refreshing
}

export async function api(path, { method = 'GET', body, formData, retried = false } = {}) {
  const saved = auth.get()
  const headers = { ...JSON_HEADERS }
  if (saved?.tokens?.access_token) {
    headers.Authorization = `Bearer ${saved.tokens.access_token}`
  }
  const init = { method, headers }

  if (formData) {
    init.body = formData // the browser sets the multipart boundary itself
  } else if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(body)
  }

  let res
  try {
    res = await fetch(`${API_URL}/api${path}`, init)
  } catch {
    throw new ApiError(['Cannot reach the server. Check VITE_API_URL and that the API is running.'], 0)
  }

  // Access token expired: trade the refresh token for a new pair, then retry once.
  const isAuthCall = ['/login', '/register', '/refresh'].includes(path)
  if (res.status === 401 && !retried && !isAuthCall && saved?.tokens?.refresh_token) {
    try {
      const tokens = await refreshTokens(saved.tokens.refresh_token)
      auth.set({ ...saved, tokens })
      return api(path, { method, body, formData, retried: true })
    } catch {
      auth.clear()
      window.dispatchEvent(new Event('eb:logout'))
    }
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new ApiError(data.errors || [data.error || `Request failed (${res.status}).`], res.status)
  }
  return data
}


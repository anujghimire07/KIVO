const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

export const API_URL = `${BASE_URL}/api/auth`

//! fetch wrapper — always sends credentials (cookies) so the httpOnly JWT cookie works
export async function api(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  })

  const text = await res.text()
  let data
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }

  return { ok: res.ok, status: res.status, data }
}

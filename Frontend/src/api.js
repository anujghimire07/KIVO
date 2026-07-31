const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000"

export const API_URL = `${BASE_URL}/api/auth`

function getToken() {
  try {
    return localStorage.getItem("kivo_token")
  } catch {
    return null
  }
}

//! fetch wrapper — sends the JWT as an Authorization header (reliable cross-site in production)
//! plus credentials (cookies) as a fallback for local/same-site setups
export async function api(endpoint, options = {}) {
  const token = getToken()

  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
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

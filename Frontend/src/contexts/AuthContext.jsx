/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react"
import { api } from "../api.js"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // On mount, verify the JWT cookie against the protected route
  useEffect(() => {
    api("/home", { method: "GET" })
      .then((res) => {
        if (res.ok) {
          const email = localStorage.getItem("kivo_email")
          setUser(email ? { email } : {})
        } else {
          localStorage.removeItem("kivo_email")
          setUser(null)
        }
      })
      .catch(() => {
        localStorage.removeItem("kivo_email")
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const res = await api("/login", { method: "POST", body: JSON.stringify({ email, password }) })
    if (res.ok) {
      try {
        localStorage.setItem("kivo_email", email)
      } catch {
        /* ignore */
      }
      setUser({ email })
    }
    return res
  }

  const signup = async (email, password) => {
    return api("/signup", { method: "POST", body: JSON.stringify({ email, password }) })
  }

  const logout = async () => {
    await api("/logout", { method: "POST" })
    try {
      localStorage.removeItem("kivo_email")
    } catch {
      /* ignore */
    }
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

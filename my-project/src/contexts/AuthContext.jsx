import { createContext, useContext, useState, useEffect } from "react"
import api from "../services/api"

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  )

  useEffect(() => {
    const initAuth = async () => {
      if (accessToken) {
        try {
          const res = await api.get("/auth/me") 
          setUser(res.data)
        } catch (err) {
          console.error("Auth init failed:", err)
          localStorage.removeItem("access_token")
          setAccessToken(null)
          setUser(null)
        }
      }
      setLoading(false)
    }
    initAuth()
  }, [accessToken])

  const login = (accessToken, userData) => {
    localStorage.setItem("access_token", accessToken)
    setAccessToken(accessToken)
    setUser(userData)
  }

  const value = {
    user,
    loading,
    accessToken,
    login,
    isAuthenticated: !!accessToken,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

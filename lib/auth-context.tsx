"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Role = "teacher" | "student" | "manager" | "employee"
type Mode = "education" | "company"

interface User {
  id: string
  email: string
  name: string
  role: Role
  mode: Mode
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: Role, mode: Mode) => Promise<void>
  signup: (email: string, password: string, name: string, role: Role, mode: Mode) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("attendance_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: Role, mode: Mode) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split("@")[0],
      role,
      mode,
    }

    setUser(newUser)
    localStorage.setItem("attendance_user", JSON.stringify(newUser))
  }

  const signup = async (email: string, password: string, name: string, role: Role, mode: Mode) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role,
      mode,
    }

    setUser(newUser)
    localStorage.setItem("attendance_user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("attendance_user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

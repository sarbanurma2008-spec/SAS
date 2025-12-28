"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { GraduationCap, Building2, Sparkles, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

type Role = "teacher" | "student" | "manager" | "employee"
type Mode = "education" | "company"

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMode || !selectedRole) return

    setIsLoading(true)
    setError("")

    try {
      await signup(email, password, name, selectedRole, selectedMode)
      if (selectedMode === "education") {
        router.push(selectedRole === "teacher" ? "/education/teacher" : "/education/student")
      } else {
        router.push(selectedRole === "manager" ? "/company/manager" : "/company/employee")
      }
    } catch (err) {
      setError("Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!selectedMode) {
    return (
      <div className="relative min-h-screen bg-background">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 top-0 size-96 rounded-full bg-primary/20 blur-[128px]" />
          <div className="absolute -right-1/4 top-1/3 size-96 rounded-full bg-chart-2/20 blur-[128px]" />
        </div>

        <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
          <Link
            href="/"
            className="absolute left-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-6" />
          </Link>

          <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Sparkles className="size-8 text-primary" />
            </div>
            <h1 className="mb-2 text-4xl font-bold text-foreground">Sign Up</h1>
            <p className="text-muted-foreground">Choose your mode to get started</p>
          </div>

          <div className="grid w-full max-w-3xl gap-6 md:grid-cols-2">
            <Card
              onClick={() => setSelectedMode("education")}
              className="cursor-pointer border-border bg-card/50 p-8 backdrop-blur-xl transition-all hover:scale-[1.02] hover:border-primary/50 hover:bg-card/70"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-4">
                <GraduationCap className="size-10 text-primary" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Education Mode</h2>
              <p className="text-sm text-muted-foreground">For teachers and students</p>
            </Card>

            <Card
              onClick={() => setSelectedMode("company")}
              className="cursor-pointer border-border bg-card/50 p-8 backdrop-blur-xl transition-all hover:scale-[1.02] hover:border-chart-2/50 hover:bg-card/70"
            >
              <div className="mb-4 inline-flex rounded-xl bg-chart-2/10 p-4">
                <Building2 className="size-10 text-chart-2" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Company Mode</h2>
              <p className="text-sm text-muted-foreground">For managers and employees</p>
            </Card>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            {"Already have an account? "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    )
  }

  if (!selectedRole) {
    return (
      <div className="relative min-h-screen bg-background">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-1/4 top-0 size-96 rounded-full bg-primary/20 blur-[128px]" />
          <div className="absolute -right-1/4 top-1/3 size-96 rounded-full bg-chart-2/20 blur-[128px]" />
        </div>

        <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
          <button
            onClick={() => setSelectedMode(null)}
            className="absolute left-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-6" />
          </button>

          <div className="mb-12 text-center">
            <h1 className="mb-2 text-4xl font-bold text-foreground">Select Your Role</h1>
            <p className="text-muted-foreground">
              {selectedMode === "education" ? "Are you a teacher or student?" : "Are you a manager or employee?"}
            </p>
          </div>

          <div className="grid w-full max-w-3xl gap-6 md:grid-cols-2">
            {selectedMode === "education" ? (
              <>
                <Card
                  onClick={() => setSelectedRole("teacher")}
                  className="cursor-pointer border-border bg-card/50 p-8 backdrop-blur-xl transition-all hover:scale-[1.02] hover:border-primary/50 hover:bg-card/70"
                >
                  <h2 className="mb-2 text-2xl font-bold text-foreground">Teacher</h2>
                  <p className="text-sm text-muted-foreground">Create classes and track attendance</p>
                </Card>
                <Card
                  onClick={() => setSelectedRole("student")}
                  className="cursor-pointer border-border bg-card/50 p-8 backdrop-blur-xl transition-all hover:scale-[1.02] hover:border-primary/50 hover:bg-card/70"
                >
                  <h2 className="mb-2 text-2xl font-bold text-foreground">Student</h2>
                  <p className="text-sm text-muted-foreground">Join classes and view attendance</p>
                </Card>
              </>
            ) : (
              <>
                <Card
                  onClick={() => setSelectedRole("manager")}
                  className="cursor-pointer border-border bg-card/50 p-8 backdrop-blur-xl transition-all hover:scale-[1.02] hover:border-chart-2/50 hover:bg-card/70"
                >
                  <h2 className="mb-2 text-2xl font-bold text-foreground">Manager</h2>
                  <p className="text-sm text-muted-foreground">Manage teams and monitor attendance</p>
                </Card>
                <Card
                  onClick={() => setSelectedRole("employee")}
                  className="cursor-pointer border-border bg-card/50 p-8 backdrop-blur-xl transition-all hover:scale-[1.02] hover:border-chart-2/50 hover:bg-card/70"
                >
                  <h2 className="mb-2 text-2xl font-bold text-foreground">Employee</h2>
                  <p className="text-sm text-muted-foreground">Mark your own attendance</p>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 size-96 rounded-full bg-primary/20 blur-[128px]" />
        <div className="absolute -right-1/4 top-1/3 size-96 rounded-full bg-chart-2/20 blur-[128px]" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <button
          onClick={() => setSelectedRole(null)}
          className="absolute left-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-6" />
        </button>

        <Card className="w-full max-w-md border-border bg-card/50 p-8 backdrop-blur-xl">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-foreground">Create Account</h1>
            <p className="text-sm text-muted-foreground">
              Sign up as {selectedRole} in {selectedMode} mode
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background/50"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {"Already have an account? "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}

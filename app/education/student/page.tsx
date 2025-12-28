"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Calendar, LogOut, Loader2, Plus } from "lucide-react"
import Link from "next/link"

interface EnrolledClass {
  id: string
  name: string
  teacherName: string
  attendancePercentage: number
}

export default function StudentDashboard() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [classes, setClasses] = useState<EnrolledClass[]>([])
  const [showJoinForm, setShowJoinForm] = useState(false)
  const [classCode, setClassCode] = useState("")
  const [joining, setJoining] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "student")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const storedClasses = localStorage.getItem("student_classes")
    if (storedClasses) {
      setClasses(JSON.parse(storedClasses))
    }
  }, [])

  const handleJoinClass = async (e: React.FormEvent) => {
    e.preventDefault()
    setJoining(true)
    setError("")

    await new Promise((resolve) => setTimeout(resolve, 500))

    const mockClass: EnrolledClass = {
      id: Math.random().toString(36).substr(2, 9),
      name: "Mathematics 101",
      teacherName: "Dr. Smith",
      attendancePercentage: 85,
    }

    const updatedClasses = [...classes, mockClass]
    setClasses(updatedClasses)
    localStorage.setItem("student_classes", JSON.stringify(updatedClasses))

    setClassCode("")
    setShowJoinForm(false)
    setJoining(false)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 size-96 rounded-full bg-primary/10 blur-[128px]" />
        <div className="absolute -right-1/4 top-1/3 size-96 rounded-full bg-chart-2/10 blur-[128px]" />
      </div>

      <div className="relative">
        <header className="border-b border-border bg-card/30 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Student Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {user?.name}</p>
            </div>
            <Button variant="ghost" onClick={handleLogout} className="gap-2">
              <LogOut className="size-4" />
              Logout
            </Button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">My Classes</h2>
              <p className="text-muted-foreground">View your enrolled classes and attendance</p>
            </div>
            <Button onClick={() => setShowJoinForm(true)} className="gap-2">
              <Plus className="size-4" />
              Join Class
            </Button>
          </div>

          {showJoinForm && (
            <Card className="mb-8 border-border bg-card/50 p-6 backdrop-blur-xl">
              <h3 className="mb-4 text-xl font-semibold text-foreground">Join a Class</h3>
              <form onSubmit={handleJoinClass} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="classCode">Class Code</Label>
                  <Input
                    id="classCode"
                    placeholder="Enter 6-digit class code"
                    value={classCode}
                    onChange={(e) => setClassCode(e.target.value.toUpperCase())}
                    required
                    maxLength={6}
                    className="bg-background/50 font-mono"
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <div className="flex gap-2">
                  <Button type="submit" disabled={joining}>
                    {joining ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      "Join Class"
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowJoinForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {classes.length === 0 ? (
            <Card className="border-border bg-card/50 p-12 text-center backdrop-blur-xl">
              <div className="mx-auto mb-4 inline-flex rounded-full bg-primary/10 p-4">
                <BookOpen className="size-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">No Classes Yet</h3>
              <p className="mb-4 text-muted-foreground">Join your first class using a class code from your teacher</p>
              <Button onClick={() => setShowJoinForm(true)} className="gap-2">
                <Plus className="size-4" />
                Join Your First Class
              </Button>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {classes.map((classItem) => (
                <Card
                  key={classItem.id}
                  className="group relative overflow-hidden border-border bg-card/50 p-6 backdrop-blur-xl transition-all hover:border-primary/50 hover:bg-card/70"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                    <BookOpen className="size-6 text-primary" />
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-foreground">{classItem.name}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">Teacher: {classItem.teacherName}</p>

                  <div className="mb-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Attendance</span>
                      <span className="font-semibold text-foreground">{classItem.attendancePercentage}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${classItem.attendancePercentage}%` }}
                      />
                    </div>
                  </div>

                  <Link href={`/education/student/class/${classItem.id}`}>
                    <Button variant="outline" className="w-full gap-2 bg-transparent">
                      <Calendar className="size-4" />
                      View Details
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

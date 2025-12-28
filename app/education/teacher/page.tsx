"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, Calendar, BarChart3, LogOut, Loader2, Trash2 } from "lucide-react"
import Link from "next/link"

interface Class {
  id: string
  name: string
  code: string
  studentCount: number
  createdAt: string
}

export default function TeacherDashboard() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [classes, setClasses] = useState<Class[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [className, setClassName] = useState("")
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "teacher")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const storedClasses = localStorage.getItem("teacher_classes")
    if (storedClasses) {
      setClasses(JSON.parse(storedClasses))
    }
  }, [])

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    const newClass: Class = {
      id: Math.random().toString(36).substr(2, 9),
      name: className,
      code: Math.random().toString(36).substr(2, 6).toUpperCase(),
      studentCount: 0,
      createdAt: new Date().toISOString(),
    }

    const updatedClasses = [...classes, newClass]
    setClasses(updatedClasses)
    localStorage.setItem("teacher_classes", JSON.stringify(updatedClasses))

    setClassName("")
    setShowCreateForm(false)
    setCreating(false)
  }

  const handleDeleteClass = (classId: string) => {
    const updatedClasses = classes.filter((c) => c.id !== classId)
    setClasses(updatedClasses)
    localStorage.setItem("teacher_classes", JSON.stringify(updatedClasses))
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
              <h1 className="text-2xl font-bold text-foreground">Teacher Dashboard</h1>
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
              <p className="text-muted-foreground">Create and manage your classes</p>
            </div>
            <Button onClick={() => setShowCreateForm(true)} className="gap-2">
              <Plus className="size-4" />
              Create Class
            </Button>
          </div>

          {showCreateForm && (
            <Card className="mb-8 border-border bg-card/50 p-6 backdrop-blur-xl">
              <h3 className="mb-4 text-xl font-semibold text-foreground">Create New Class</h3>
              <form onSubmit={handleCreateClass} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="className">Class Name</Label>
                  <Input
                    id="className"
                    placeholder="e.g., Mathematics 101"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={creating}>
                    {creating ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Class"
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {classes.length === 0 ? (
            <Card className="border-border bg-card/50 p-12 text-center backdrop-blur-xl">
              <div className="mx-auto mb-4 inline-flex rounded-full bg-primary/10 p-4">
                <Users className="size-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">No Classes Yet</h3>
              <p className="mb-4 text-muted-foreground">Create your first class to get started</p>
              <Button onClick={() => setShowCreateForm(true)} className="gap-2">
                <Plus className="size-4" />
                Create Your First Class
              </Button>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {classes.map((classItem) => (
                <Card
                  key={classItem.id}
                  className="group relative overflow-hidden border-border bg-card/50 p-6 backdrop-blur-xl transition-all hover:border-primary/50 hover:bg-card/70"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="inline-flex rounded-xl bg-primary/10 p-3">
                      <Users className="size-6 text-primary" />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => handleDeleteClass(classItem.id)}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </div>

                  <h3 className="mb-2 text-xl font-bold text-foreground">{classItem.name}</h3>

                  <div className="mb-4 flex items-center gap-2">
                    <Badge variant="secondary" className="font-mono">
                      {classItem.code}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{classItem.studentCount} students</span>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/education/teacher/class/${classItem.id}`} className="flex-1">
                      <Button variant="outline" className="w-full gap-2 bg-transparent">
                        <Calendar className="size-4" />
                        Attendance
                      </Button>
                    </Link>
                    <Link href={`/education/teacher/analytics/${classItem.id}`}>
                      <Button variant="outline" size="icon">
                        <BarChart3 className="size-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

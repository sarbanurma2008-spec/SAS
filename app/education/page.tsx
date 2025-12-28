"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Users, Copy, Check, ArrowLeft, BookOpen } from "lucide-react"
import Link from "next/link"

interface Class {
  id: string
  name: string
  joinCode: string
  studentCount: number
}

interface Student {
  id: string
  name: string
  email: string
  status: "pending" | "approved"
}

interface JoinRequest {
  id: string
  studentName: string
  studentEmail: string
  classId: string
  className: string
}

export default function EducationDashboard() {
  const [classes, setClasses] = useState<Class[]>([
    { id: "1", name: "Mathematics 101", joinCode: "MATH101", studentCount: 24 },
    { id: "2", name: "Physics Advanced", joinCode: "PHYS202", studentCount: 18 },
  ])

  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([
    { id: "1", studentName: "Alex Chen", studentEmail: "alex@example.com", classId: "1", className: "Mathematics 101" },
    {
      id: "2",
      studentName: "Jordan Smith",
      studentEmail: "jordan@example.com",
      classId: "1",
      className: "Mathematics 101",
    },
  ])

  const [showCreateClass, setShowCreateClass] = useState(false)
  const [newClassName, setNewClassName] = useState("")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleCreateClass = () => {
    if (!newClassName.trim()) return

    const joinCode = newClassName.toUpperCase().replace(/\s+/g, "").substring(0, 6).padEnd(6, "X")

    const newClass: Class = {
      id: Date.now().toString(),
      name: newClassName,
      joinCode: joinCode + Math.floor(Math.random() * 100),
      studentCount: 0,
    }

    setClasses([...classes, newClass])
    setNewClassName("")
    setShowCreateClass(false)
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleApproveRequest = (requestId: string) => {
    setJoinRequests(joinRequests.filter((req) => req.id !== requestId))
    // In a real app, this would update the class student count
  }

  const handleRejectRequest = (requestId: string) => {
    setJoinRequests(joinRequests.filter((req) => req.id !== requestId))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="size-10">
                  <ArrowLeft className="size-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">{"Education Dashboard"}</h1>
                <p className="text-sm text-muted-foreground">{"Teacher View"}</p>
              </div>
            </div>
            <Button onClick={() => setShowCreateClass(true)} className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="size-4" />
              {"Create Class"}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Create Class Modal */}
        {showCreateClass && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Card className="w-full max-w-md border-border bg-card">
              <CardHeader>
                <CardTitle>{"Create New Class"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">{"Class Name"}</label>
                  <Input
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    placeholder="e.g., Mathematics 101"
                    className="bg-background"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCreateClass} className="flex-1 bg-primary hover:bg-primary/90">
                    {"Create"}
                  </Button>
                  <Button onClick={() => setShowCreateClass(false)} variant="outline" className="flex-1">
                    {"Cancel"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Join Requests */}
        {joinRequests.length > 0 && (
          <Card className="mb-6 border-border bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="size-5" />
                {"Pending Join Requests"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {joinRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                  >
                    <div>
                      <p className="font-medium text-foreground">{request.studentName}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.studentEmail} • {request.className}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleApproveRequest(request.id)}
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                      >
                        {"Approve"}
                      </Button>
                      <Button
                        onClick={() => handleRejectRequest(request.id)}
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:bg-destructive/10"
                      >
                        {"Reject"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Classes Grid */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-foreground">{"My Classes"}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((classItem) => (
              <Link key={classItem.id} href={`/education/class/${classItem.id}`}>
                <Card className="group border-border bg-card/50 backdrop-blur transition-all hover:scale-[1.02] hover:border-primary/50 hover:bg-card/70 hover:shadow-lg hover:shadow-primary/10">
                  <CardHeader>
                    <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                      <BookOpen className="size-6 text-primary" />
                    </div>
                    <CardTitle className="text-foreground">{classItem.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{"Join Code"}</span>
                      <div className="flex items-center gap-2">
                        <code className="rounded bg-muted px-2 py-1 font-mono text-sm text-foreground">
                          {classItem.joinCode}
                        </code>
                        <Button
                          onClick={(e) => {
                            e.preventDefault()
                            handleCopyCode(classItem.joinCode)
                          }}
                          size="icon"
                          variant="ghost"
                          className="size-8"
                        >
                          {copiedCode === classItem.joinCode ? (
                            <Check className="size-4 text-primary" />
                          ) : (
                            <Copy className="size-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="size-4" />
                      <span className="text-sm">
                        {classItem.studentCount} {classItem.studentCount === 1 ? "student" : "students"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

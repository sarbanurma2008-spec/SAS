"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter, useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Users, Calendar, Save, Loader2 } from "lucide-react"
import Link from "next/link"

interface Student {
  id: string
  name: string
  email: string
  attendance: { [date: string]: boolean }
  attendancePercentage: number
}

interface Class {
  id: string
  name: string
  code: string
  studentCount: number
  createdAt: string
}

export default function ClassAttendancePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const classId = params.id as string

  const [classData, setClassData] = useState<Class | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "teacher")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const storedClasses = localStorage.getItem("teacher_classes")
    if (storedClasses) {
      const classes = JSON.parse(storedClasses)
      const foundClass = classes.find((c: Class) => c.id === classId)
      if (foundClass) {
        setClassData(foundClass)
      }
    }

    const storedStudents = localStorage.getItem(`class_${classId}_students`)
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents))
    } else {
      const mockStudents: Student[] = [
        {
          id: "1",
          name: "Alice Johnson",
          email: "alice@example.com",
          attendance: {},
          attendancePercentage: 0,
        },
        {
          id: "2",
          name: "Bob Smith",
          email: "bob@example.com",
          attendance: {},
          attendancePercentage: 0,
        },
        {
          id: "3",
          name: "Charlie Brown",
          email: "charlie@example.com",
          attendance: {},
          attendancePercentage: 0,
        },
        {
          id: "4",
          name: "Diana Prince",
          email: "diana@example.com",
          attendance: {},
          attendancePercentage: 0,
        },
      ]
      setStudents(mockStudents)
      localStorage.setItem(`class_${classId}_students`, JSON.stringify(mockStudents))
    }
  }, [classId])

  const handleAttendanceToggle = (studentId: string) => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.id === studentId) {
          const updatedAttendance = {
            ...student.attendance,
            [currentDate]: !student.attendance[currentDate],
          }
          const totalDays = Object.keys(updatedAttendance).length
          const presentDays = Object.values(updatedAttendance).filter(Boolean).length
          const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0

          return {
            ...student,
            attendance: updatedAttendance,
            attendancePercentage,
          }
        }
        return student
      }),
    )
  }

  const handleSave = async () => {
    setSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    localStorage.setItem(`class_${classId}_students`, JSON.stringify(students))
    setSaving(false)
  }

  if (isLoading || !classData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    )
  }

  const presentCount = students.filter((s) => s.attendance[currentDate]).length
  const absentCount = students.length - presentCount

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 size-96 rounded-full bg-primary/10 blur-[128px]" />
        <div className="absolute -right-1/4 top-1/3 size-96 rounded-full bg-chart-2/10 blur-[128px]" />
      </div>

      <div className="relative">
        <header className="border-b border-border bg-card/30 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href="/education/teacher">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="size-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{classData.name}</h1>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-mono">
                    {classData.code}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{students.length} students</span>
                </div>
              </div>
            </div>
            <Button onClick={handleSave} disabled={saving} className="gap-2">
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save Attendance
                </>
              )}
            </Button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <Card className="border-border bg-card/50 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3">
                  <Users className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold text-foreground">{students.length}</p>
                </div>
              </div>
            </Card>

            <Card className="border-border bg-card/50 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-chart-3/10 p-3">
                  <Calendar className="size-6 text-chart-3" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Present Today</p>
                  <p className="text-2xl font-bold text-foreground">{presentCount}</p>
                </div>
              </div>
            </Card>

            <Card className="border-border bg-card/50 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-destructive/10 p-3">
                  <Calendar className="size-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Absent Today</p>
                  <p className="text-2xl font-bold text-foreground">{absentCount}</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="border-border bg-card/50 backdrop-blur-xl">
            <div className="border-b border-border p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Mark Attendance</h2>
                <input
                  type="date"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Student Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Attendance %</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Present</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {students.map((student) => (
                    <tr key={student.id} className="transition-colors hover:bg-muted/20">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{student.name}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{student.email}</td>
                      <td className="px-6 py-4 text-center">
                        <Badge
                          variant={student.attendancePercentage >= 75 ? "default" : "destructive"}
                          className="font-semibold"
                        >
                          {student.attendancePercentage}%
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <Switch
                            checked={student.attendance[currentDate] || false}
                            onCheckedChange={() => handleAttendanceToggle(student.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BarChart3, Download, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Student {
  id: number
  name: string
  email: string
  present: boolean
  attendancePercentage: number
}

export default function ClassAttendance() {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Alex Chen", email: "alex@example.com", present: true, attendancePercentage: 95 },
    { id: 2, name: "Jordan Smith", email: "jordan@example.com", present: true, attendancePercentage: 88 },
    { id: 3, name: "Riley Johnson", email: "riley@example.com", present: false, attendancePercentage: 72 },
    { id: 4, name: "Morgan Davis", email: "morgan@example.com", present: true, attendancePercentage: 92 },
    { id: 5, name: "Casey Brown", email: "casey@example.com", present: true, attendancePercentage: 85 },
    { id: 6, name: "Taylor Wilson", email: "taylor@example.com", present: false, attendancePercentage: 68 },
  ])

  const toggleAttendance = (id: number) => {
    setStudents(students.map((student) => (student.id === id ? { ...student, present: !student.present } : student)))
  }

  const presentCount = students.filter((s) => s.present).length
  const averageAttendance = Math.round(students.reduce((acc, s) => acc + s.attendancePercentage, 0) / students.length)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/education">
                <Button variant="ghost" size="icon" className="size-10">
                  <ArrowLeft className="size-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">{"Mathematics 101"}</h1>
                <p className="text-sm text-muted-foreground">{"Mark Today's Attendance"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {presentCount}/{students.length} Present
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{averageAttendance}% Avg</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Card className="border-border bg-card/50 backdrop-blur">
          <CardContent className="p-0">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 border-b border-border px-6 py-4">
              <div className="col-span-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {"Student Name"}
              </div>
              <div className="col-span-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {"Status"}
              </div>
              <div className="col-span-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {"Attendance"}
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-border">
              {students.map((student) => (
                <div key={student.id} className="grid grid-cols-12 gap-4 px-6 py-4 transition-colors hover:bg-muted/30">
                  {/* Student Info */}
                  <div className="col-span-5 flex items-center">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Toggle Switch */}
                  <div className="col-span-4 flex items-center">
                    <button
                      onClick={() => toggleAttendance(student.id)}
                      className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                        student.present ? "bg-primary" : "bg-muted"
                      }`}
                      role="switch"
                      aria-checked={student.present}
                    >
                      <span
                        className={`inline-block size-4 transform rounded-full bg-background shadow-lg transition-transform ${
                          student.present ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span
                      className={`ml-3 text-sm font-medium ${
                        student.present ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {student.present ? "Present" : "Absent"}
                    </span>
                  </div>

                  {/* Attendance Percentage */}
                  <div className="col-span-3 flex items-center">
                    <div className="flex w-full items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${student.attendancePercentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium tabular-nums text-foreground">
                        {student.attendancePercentage}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between border-t border-border px-6 py-4">
              <p className="text-sm text-muted-foreground">{students.length} students total</p>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Download className="size-4" />
                  {"Export"}
                </Button>
                <Link href={`/education/analytics/1`}>
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <BarChart3 className="size-4" />
                    {"View Analytics"}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

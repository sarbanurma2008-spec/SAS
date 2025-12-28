"use client"

import { useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, Users, Clock, Sparkles, Download, Loader2 } from "lucide-react"
import Link from "next/link"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const weeklyData = [
  { day: "Mon", onTime: 20, late: 2, absent: 2 },
  { day: "Tue", onTime: 19, late: 3, absent: 2 },
  { day: "Wed", onTime: 21, late: 1, absent: 2 },
  { day: "Thu", onTime: 18, late: 4, absent: 2 },
  { day: "Fri", onTime: 22, late: 1, absent: 1 },
]

const monthlyTrend = [
  { week: "Week 1", attendance: 88 },
  { week: "Week 2", attendance: 90 },
  { week: "Week 3", attendance: 87 },
  { week: "Week 4", attendance: 92 },
]

const attendanceStatus = [
  { name: "On Time", value: 82, color: "hsl(var(--chart-3))" },
  { name: "Late", value: 12, color: "hsl(var(--destructive))" },
  { name: "Absent", value: 6, color: "hsl(var(--muted))" },
]

const teamMembers = [
  { name: "Sarah Chen", role: "Senior Developer", attendance: 98, lateCount: 1 },
  { name: "Mike Johnson", role: "Developer", attendance: 95, lateCount: 2 },
  { name: "Emily Davis", role: "Designer", attendance: 92, lateCount: 3 },
  { name: "Alex Smith", role: "Developer", attendance: 88, lateCount: 5 },
  { name: "Chris Brown", role: "QA Engineer", attendance: 85, lateCount: 6 },
]

export default function TeamAnalytics() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "manager")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const aiInsights = [
    {
      type: "positive",
      title: "Strong Team Performance",
      description:
        "Engineering team shows 92% average attendance this month, exceeding company benchmark by 7%. Keep up the great work!",
    },
    {
      type: "alert",
      title: "Thursday Late Arrivals",
      description:
        "Thursday has 4 late arrivals this week. Consider investigating if there are recurring scheduling conflicts or transportation issues.",
    },
    {
      type: "recommendation",
      title: "Recognize Top Performers",
      description:
        "Sarah Chen maintains 98% attendance with minimal late arrivals. Consider recognizing her reliability in the next team meeting.",
    },
    {
      type: "action",
      title: "Follow Up Required",
      description:
        "Chris Brown has 6 late arrivals this month. Schedule a one-on-one to discuss any challenges and offer support.",
    },
  ]

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
        <div className="absolute -left-1/4 top-0 size-96 rounded-full bg-chart-2/10 blur-[128px]" />
        <div className="absolute -right-1/4 top-1/3 size-96 rounded-full bg-primary/10 blur-[128px]" />
      </div>

      <div className="relative">
        <header className="border-b border-border bg-card/30 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/company/manager">
                  <Button variant="ghost" size="icon" className="size-10">
                    <ArrowLeft className="size-5" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-foreground">Team Analytics</h1>
                  <p className="text-sm text-muted-foreground">Engineering Team</p>
                </div>
              </div>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="size-4" />
                Export Report
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 md:grid-cols-4">
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Team Size</p>
                    <p className="mt-2 text-3xl font-bold text-foreground">24</p>
                  </div>
                  <div className="rounded-lg bg-primary/10 p-3">
                    <Users className="size-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Attendance</p>
                    <p className="mt-2 text-3xl font-bold text-foreground">92%</p>
                    <p className="mt-1 text-xs text-chart-3">↑ 3% vs last month</p>
                  </div>
                  <div className="rounded-lg bg-chart-3/10 p-3">
                    <TrendingUp className="size-6 text-chart-3" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Late Today</p>
                    <p className="mt-2 text-3xl font-bold text-foreground">3</p>
                  </div>
                  <div className="rounded-lg bg-destructive/10 p-3">
                    <Clock className="size-6 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Present Today</p>
                    <p className="mt-2 text-3xl font-bold text-foreground">22</p>
                  </div>
                  <div className="rounded-lg bg-chart-2/10 p-3">
                    <Users className="size-6 text-chart-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="mb-8 grid gap-6 lg:grid-cols-3">
            {/* Weekly Pattern */}
            <Card className="border-border bg-card/50 backdrop-blur lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Attendance Pattern</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="onTime" fill="hsl(var(--chart-3))" name="On Time" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="late" fill="hsl(var(--destructive))" name="Late" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="absent" fill="hsl(var(--muted))" name="Absent" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Attendance Distribution */}
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={attendanceStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {attendanceStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {attendanceStatus.map((status, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full" style={{ backgroundColor: status.color }} />
                        <span className="text-muted-foreground">{status.name}</span>
                      </div>
                      <span className="font-medium text-foreground">{status.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trend */}
          <Card className="mb-8 border-border bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Monthly Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="attendance"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", r: 6 }}
                    name="Attendance %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Team Members Performance */}
          <Card className="mb-8 border-border bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Team Member Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-lg bg-chart-2/10 text-chart-2">
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">{member.attendance}%</p>
                          <p className="text-xs text-muted-foreground">{member.lateCount} late arrivals</p>
                        </div>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full ${
                            member.attendance >= 95
                              ? "bg-chart-3"
                              : member.attendance >= 90
                                ? "bg-primary"
                                : "bg-destructive"
                          }`}
                          style={{ width: `${member.attendance}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="border-border bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="size-5 text-primary" />
                AI-Generated Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className={`rounded-lg border p-4 ${
                    insight.type === "positive"
                      ? "border-chart-3/50 bg-chart-3/5"
                      : insight.type === "alert"
                        ? "border-destructive/50 bg-destructive/5"
                        : insight.type === "recommendation"
                          ? "border-primary/50 bg-primary/5"
                          : "border-chart-2/50 bg-chart-2/5"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 rounded-lg p-2 ${
                        insight.type === "positive"
                          ? "bg-chart-3/10"
                          : insight.type === "alert"
                            ? "bg-destructive/10"
                            : insight.type === "recommendation"
                              ? "bg-primary/10"
                              : "bg-chart-2/10"
                      }`}
                    >
                      <Sparkles
                        className={`size-4 ${
                          insight.type === "positive"
                            ? "text-chart-3"
                            : insight.type === "alert"
                              ? "text-destructive"
                              : insight.type === "recommendation"
                                ? "text-primary"
                                : "text-chart-2"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{insight.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

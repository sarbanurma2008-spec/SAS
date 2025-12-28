"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp, Users, AlertCircle, Sparkles } from "lucide-react"
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
} from "recharts"

const weeklyData = [
  { day: "Mon", present: 22, absent: 2 },
  { day: "Tue", present: 20, absent: 4 },
  { day: "Wed", present: 23, absent: 1 },
  { day: "Thu", present: 21, absent: 3 },
  { day: "Fri", present: 24, absent: 0 },
]

const monthlyTrend = [
  { month: "Sep", percentage: 87 },
  { month: "Oct", percentage: 89 },
  { month: "Nov", percentage: 92 },
  { month: "Dec", percentage: 90 },
  { month: "Jan", percentage: 95 },
]

const studentPerformance = [
  { name: "Alex Chen", attendance: 95 },
  { name: "Jordan Smith", attendance: 88 },
  { name: "Morgan Davis", attendance: 92 },
  { name: "Casey Brown", attendance: 85 },
  { name: "Riley Johnson", attendance: 72 },
  { name: "Taylor Wilson", attendance: 68 },
]

export default function EducationAnalytics() {
  const aiInsights = [
    {
      type: "positive",
      title: "Excellent Weekly Trend",
      description: "Class attendance has improved by 8% over the past month, with Friday showing perfect attendance.",
    },
    {
      type: "warning",
      title: "Students Need Attention",
      description:
        "Riley Johnson and Taylor Wilson have attendance below 75%. Consider reaching out to discuss challenges.",
    },
    {
      type: "recommendation",
      title: "Optimize Schedule",
      description:
        "Tuesday shows the lowest attendance. Consider moving important topics to high-attendance days like Monday or Friday.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/education/class/1">
              <Button variant="ghost" size="icon" className="size-10">
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">{"Analytics Dashboard"}</h1>
              <p className="text-sm text-muted-foreground">{"Mathematics 101"}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card className="border-border bg-card/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{"Average Attendance"}</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{"90.5%"}</p>
                  <p className="mt-1 text-xs text-chart-3">{"↑ 5% from last month"}</p>
                </div>
                <div className="rounded-lg bg-primary/10 p-3">
                  <TrendingUp className="size-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{"Total Students"}</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{"24"}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{"6 classes this week"}</p>
                </div>
                <div className="rounded-lg bg-chart-2/10 p-3">
                  <Users className="size-6 text-chart-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card/50 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{"At Risk Students"}</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{"2"}</p>
                  <p className="mt-1 text-xs text-destructive">{"Below 75% attendance"}</p>
                </div>
                <div className="rounded-lg bg-destructive/10 p-3">
                  <AlertCircle className="size-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Weekly Attendance Chart */}
          <Card className="border-border bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>{"Weekly Attendance"}</CardTitle>
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
                  <Bar dataKey="present" fill="hsl(var(--primary))" name="Present" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="absent" fill="hsl(var(--destructive))" name="Absent" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Trend Chart */}
          <Card className="border-border bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>{"Attendance Trend"}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
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
                    dataKey="percentage"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--chart-3))", r: 6 }}
                    name="Attendance %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Student Performance Table */}
        <Card className="mb-8 border-border bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>{"Student Performance"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentPerformance.map((student, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {student.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{student.name}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className={`h-full rounded-full transition-all ${
                            student.attendance >= 90
                              ? "bg-chart-3"
                              : student.attendance >= 75
                                ? "bg-primary"
                                : "bg-destructive"
                          }`}
                          style={{ width: `${student.attendance}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium tabular-nums text-foreground">{student.attendance}%</span>
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
              {"AI-Generated Insights"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div
                key={index}
                className={`rounded-lg border p-4 ${
                  insight.type === "positive"
                    ? "border-chart-3/50 bg-chart-3/5"
                    : insight.type === "warning"
                      ? "border-destructive/50 bg-destructive/5"
                      : "border-primary/50 bg-primary/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 rounded-lg p-2 ${
                      insight.type === "positive"
                        ? "bg-chart-3/10"
                        : insight.type === "warning"
                          ? "bg-destructive/10"
                          : "bg-primary/10"
                    }`}
                  >
                    {insight.type === "positive" ? (
                      <TrendingUp
                        className={`size-4 ${
                          insight.type === "positive"
                            ? "text-chart-3"
                            : insight.type === "warning"
                              ? "text-destructive"
                              : "text-primary"
                        }`}
                      />
                    ) : insight.type === "warning" ? (
                      <AlertCircle className="size-4 text-destructive" />
                    ) : (
                      <Sparkles className="size-4 text-primary" />
                    )}
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
  )
}

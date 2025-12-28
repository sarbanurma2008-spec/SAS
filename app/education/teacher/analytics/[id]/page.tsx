"use client"

import { useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, TrendingUp, AlertCircle, Sparkles, Loader2 } from "lucide-react"
import Link from "next/link"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, XAxis, YAxis, CartesianGrid, Legend, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function ClassAnalyticsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const classId = params.id as string

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "teacher")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const weeklyData = [
    { day: "Mon", present: 18, absent: 2 },
    { day: "Tue", present: 19, absent: 1 },
    { day: "Wed", present: 17, absent: 3 },
    { day: "Thu", present: 20, absent: 0 },
    { day: "Fri", present: 18, absent: 2 },
  ]

  const monthlyTrend = [
    { week: "Week 1", attendance: 85 },
    { week: "Week 2", attendance: 92 },
    { week: "Week 3", attendance: 88 },
    { week: "Week 4", attendance: 95 },
  ]

  const performanceData = [
    { range: "90-100%", count: 12, fill: "hsl(var(--chart-3))" },
    { range: "75-89%", count: 5, fill: "hsl(var(--chart-1))" },
    { range: "60-74%", count: 2, fill: "hsl(var(--chart-2))" },
    { range: "Below 60%", count: 1, fill: "hsl(var(--destructive))" },
  ]

  const aiInsights = [
    {
      type: "positive",
      title: "Excellent Week Performance",
      description: "Class attendance increased by 8% this week with Thursday showing perfect attendance.",
    },
    {
      type: "warning",
      title: "At-Risk Student Alert",
      description: "1 student has attendance below 60%. Consider reaching out for additional support.",
    },
    {
      type: "suggestion",
      title: "Pattern Detected",
      description: "Wednesday attendance tends to be lower. Consider scheduling engaging activities on this day.",
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
        <div className="absolute -left-1/4 top-0 size-96 rounded-full bg-primary/10 blur-[128px]" />
        <div className="absolute -right-1/4 top-1/3 size-96 rounded-full bg-chart-2/10 blur-[128px]" />
      </div>

      <div className="relative">
        <header className="border-b border-border bg-card/30 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
            <Link href="/education/teacher">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Class Analytics</h1>
              <p className="text-sm text-muted-foreground">Detailed attendance insights and trends</p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-8 grid gap-6 md:grid-cols-4">
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <Users className="size-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <p className="text-2xl font-bold text-foreground">20</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-chart-3/10 p-3">
                    <TrendingUp className="size-6 text-chart-3" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Attendance</p>
                    <p className="text-2xl font-bold text-chart-3">92%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-chart-1/10 p-3">
                    <TrendingUp className="size-6 text-chart-1" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">This Week</p>
                    <p className="text-2xl font-bold text-chart-1">95%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-destructive/10 p-3">
                    <AlertCircle className="size-6 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">At Risk</p>
                    <p className="text-2xl font-bold text-destructive">1</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Weekly Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    present: {
                      label: "Present",
                      color: "hsl(var(--chart-3))",
                    },
                    absent: {
                      label: "Absent",
                      color: "hsl(var(--destructive))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="present" fill="hsl(var(--chart-3))" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="absent" fill="hsl(var(--destructive))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Monthly Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    attendance: {
                      label: "Attendance %",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <LineChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="attendance" stroke="hsl(var(--chart-1))" strokeWidth={3} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: "Students",
                    },
                  }}
                  className="h-[300px]"
                >
                  <PieChart>
                    <Pie data={performanceData} dataKey="count" nameKey="range" cx="50%" cy="50%" outerRadius={100}>
                      {performanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="size-5 text-primary" />
                  AI Insights
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
                          : "border-chart-1/50 bg-chart-1/5"
                    }`}
                  >
                    <h4 className="mb-1 font-semibold text-foreground">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

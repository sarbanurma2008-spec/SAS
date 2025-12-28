"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Building2, Sparkles } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="absolute right-4 top-4 z-10 flex gap-2">
        <Link href="/login">
          <Button variant="ghost" className="text-foreground hover:bg-card/50">
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Sign Up</Button>
        </Link>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 size-96 rounded-full bg-primary/20 blur-[128px]" />
        <div className="absolute -right-1/4 top-1/3 size-96 rounded-full bg-chart-2/20 blur-[128px]" />
        <div className="absolute bottom-0 left-1/3 size-96 rounded-full bg-chart-4/20 blur-[128px]" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Sparkles className="size-8 text-primary" />
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground md:text-6xl">
            {"Smart Attendance System"}
          </h1>
          <p className="text-balance text-lg text-muted-foreground md:text-xl">
            {"Modern attendance tracking for education and corporate environments"}
          </p>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid w-full max-w-5xl gap-6 md:grid-cols-2">
          {/* Education Mode Card */}
          <Link href="/education" className="group">
            <Card className="relative overflow-hidden border-border bg-card/50 p-8 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:bg-card/70 hover:shadow-lg hover:shadow-primary/10">
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />

              <div className="relative">
                <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-4">
                  <GraduationCap className="size-12 text-primary" />
                </div>

                <h2 className="mb-3 text-3xl font-bold text-foreground">{"Education Mode"}</h2>

                <p className="mb-6 text-muted-foreground">
                  {
                    "Perfect for teachers and educational institutions. Create classes, manage students, and track attendance with ease."
                  }
                </p>

                <ul className="mb-8 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-primary" />
                    {"Create and manage classes"}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-primary" />
                    {"Student join codes"}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-primary" />
                    {"Manual attendance marking"}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-primary" />
                    {"AI-powered insights"}
                  </li>
                </ul>

                <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  {"Get Started"}
                  <GraduationCap className="size-4" />
                </Button>
              </div>
            </Card>
          </Link>

          {/* Company Mode Card */}
          <Link href="/company" className="group">
            <Card className="relative overflow-hidden border-border bg-card/50 p-8 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-chart-2/50 hover:bg-card/70 hover:shadow-lg hover:shadow-chart-2/10">
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-chart-2/10 blur-2xl transition-all group-hover:bg-chart-2/20" />

              <div className="relative">
                <div className="mb-6 inline-flex rounded-xl bg-chart-2/10 p-4">
                  <Building2 className="size-12 text-chart-2" />
                </div>

                <h2 className="mb-3 text-3xl font-bold text-foreground">{"Company Mode"}</h2>

                <p className="mb-6 text-muted-foreground">
                  {"Built for modern workplaces. Employees mark their own attendance with GPS and face verification."}
                </p>

                <ul className="mb-8 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-chart-2" />
                    {"Create and manage teams"}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-chart-2" />
                    {"GPS location verification"}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-chart-2" />
                    {"Face AI authentication"}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-chart-2" />
                    {"Real-time attendance alerts"}
                  </li>
                </ul>

                <Button className="w-full gap-2 bg-chart-2 text-background hover:bg-chart-2/90">
                  {"Get Started"}
                  <Building2 className="size-4" />
                </Button>
              </div>
            </Card>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">{"Powered by AI"}</p>
        </div>
      </div>
    </div>
  )
}

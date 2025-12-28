"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, Building2 } from "lucide-react"
import Link from "next/link"

export default function CompanyModeLanding() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="size-10">
                <ArrowLeft className="size-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground">{"Company Mode"}</h1>
              <p className="text-sm text-muted-foreground">{"Select Your Role"}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-120px)] max-w-5xl items-center justify-center px-4 py-12">
        <div className="grid w-full gap-6 md:grid-cols-2">
          {/* Manager Card */}
          <Link href="/company/manager">
            <Card className="group relative overflow-hidden border-border bg-card/50 p-8 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-chart-2/50 hover:bg-card/70 hover:shadow-lg hover:shadow-chart-2/10">
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-chart-2/10 blur-2xl transition-all group-hover:bg-chart-2/20" />

              <div className="relative">
                <div className="mb-6 inline-flex rounded-xl bg-chart-2/10 p-4">
                  <Building2 className="size-12 text-chart-2" />
                </div>

                <h2 className="mb-3 text-3xl font-bold text-foreground">{"Manager"}</h2>

                <p className="mb-6 text-muted-foreground">
                  {"Create and manage teams, view attendance reports, and monitor employee check-ins."}
                </p>

                <ul className="mb-8 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-chart-2" />
                    {"Create and manage teams"}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-chart-2" />
                    {"View attendance dashboard"}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-chart-2" />
                    {"Monitor late arrivals"}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-chart-2" />
                    {"Access AI insights"}
                  </li>
                </ul>

                <Button className="w-full gap-2 bg-chart-2 text-background hover:bg-chart-2/90">
                  {"Continue as Manager"}
                  <Building2 className="size-4" />
                </Button>
              </div>
            </Card>
          </Link>

          {/* Employee Card */}
          <Link href="/company/employee">
            <Card className="group relative overflow-hidden border-border bg-card/50 p-8 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:bg-card/70 hover:shadow-lg hover:shadow-primary/10">
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-primary/10 blur-2xl transition-all group-hover:bg-primary/20" />

              <div className="relative">
                <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-4">
                  <Users className="size-12 text-primary" />
                </div>

                <h2 className="mb-3 text-3xl font-bold text-foreground">{"Employee"}</h2>

                <p className="mb-6 text-muted-foreground">
                  {"Mark your daily attendance with GPS and face verification for secure check-ins."}
                </p>

                <ul className="mb-8 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-primary" />
                    {"Quick self check-in"}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-primary" />
                    {"GPS location verification"}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-primary" />
                    {"Face AI authentication"}
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="size-1.5 rounded-full bg-primary" />
                    {"View attendance history"}
                  </li>
                </ul>

                <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  {"Continue as Employee"}
                  <Users className="size-4" />
                </Button>
              </div>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}

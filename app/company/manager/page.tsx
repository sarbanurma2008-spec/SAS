"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Users, Building2, AlertCircle, LogOut, Loader2 } from "lucide-react"
import Link from "next/link"

interface Team {
  id: string
  name: string
  memberCount: number
  presentToday: number
  lateToday: number
}

export default function ManagerDashboard() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "manager")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const [teams, setTeams] = useState<Team[]>([])
  const [showCreateTeam, setShowCreateTeam] = useState(false)
  const [newTeamName, setNewTeamName] = useState("")

  useEffect(() => {
    const storedTeams = localStorage.getItem("manager_teams")
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams))
    } else {
      const defaultTeams: Team[] = [
        { id: "1", name: "Engineering", memberCount: 24, presentToday: 22, lateToday: 3 },
        { id: "2", name: "Sales", memberCount: 18, presentToday: 17, lateToday: 1 },
        { id: "3", name: "Marketing", memberCount: 12, presentToday: 11, lateToday: 0 },
      ]
      setTeams(defaultTeams)
      localStorage.setItem("manager_teams", JSON.stringify(defaultTeams))
    }
  }, [])

  const handleCreateTeam = () => {
    if (!newTeamName.trim()) return

    const newTeam: Team = {
      id: Date.now().toString(),
      name: newTeamName,
      memberCount: 0,
      presentToday: 0,
      lateToday: 0,
    }

    const updatedTeams = [...teams, newTeam]
    setTeams(updatedTeams)
    localStorage.setItem("manager_teams", JSON.stringify(updatedTeams))
    setNewTeamName("")
    setShowCreateTeam(false)
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

  const totalMembers = teams.reduce((acc, team) => acc + team.memberCount, 0)
  const totalPresent = teams.reduce((acc, team) => acc + team.presentToday, 0)
  const totalLate = teams.reduce((acc, team) => acc + team.lateToday, 0)

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
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">Manager Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user?.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setShowCreateTeam(true)}
                  className="gap-2 bg-chart-2 text-background hover:bg-chart-2/90"
                >
                  <Plus className="size-4" />
                  Create Team
                </Button>
                <Button variant="ghost" onClick={handleLogout} className="gap-2">
                  <LogOut className="size-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Create Team Modal */}
          {showCreateTeam && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <Card className="w-full max-w-md border-border bg-card">
                <CardHeader>
                  <CardTitle>Create New Team</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Team Name</label>
                    <Input
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      placeholder="e.g., Engineering"
                      className="bg-background"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCreateTeam}
                      className="flex-1 bg-chart-2 text-background hover:bg-chart-2/90"
                    >
                      Create
                    </Button>
                    <Button onClick={() => setShowCreateTeam(false)} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Stats Cards */}
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <Card className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                    <p className="mt-2 text-3xl font-bold text-foreground">{totalMembers}</p>
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
                    <p className="text-sm font-medium text-muted-foreground">Present Today</p>
                    <p className="mt-2 text-3xl font-bold text-chart-3">{totalPresent}</p>
                  </div>
                  <div className="rounded-lg bg-chart-3/10 p-3">
                    <Users className="size-6 text-chart-3" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Late Arrivals</p>
                    <p className="mt-2 text-3xl font-bold text-destructive">{totalLate}</p>
                  </div>
                  <div className="rounded-lg bg-destructive/10 p-3">
                    <AlertCircle className="size-6 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Teams Grid */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-foreground">Teams</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {teams.map((team) => (
                <Link key={team.id} href={`/company/manager/team/${team.id}`}>
                  <Card className="group border-border bg-card/50 backdrop-blur transition-all hover:scale-[1.02] hover:border-chart-2/50 hover:bg-card/70 hover:shadow-lg hover:shadow-chart-2/10">
                    <CardHeader>
                      <div className="mb-4 inline-flex rounded-lg bg-chart-2/10 p-3">
                        <Building2 className="size-6 text-chart-2" />
                      </div>
                      <CardTitle className="text-foreground">{team.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Members</span>
                        <span className="font-medium text-foreground">{team.memberCount}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Present Today</span>
                        <span className="font-medium text-chart-3">{team.presentToday}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Late Today</span>
                        <span className="font-medium text-destructive">{team.lateToday}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

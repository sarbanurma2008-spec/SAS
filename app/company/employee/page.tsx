"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Camera, CheckCircle2, Clock, AlertCircle, Calendar, LogOut, Loader2 } from "lucide-react"

interface AttendanceRecord {
  date: string
  checkIn: string
  checkOut: string | null
  status: "present" | "late" | "absent"
}

export default function EmployeeDashboard() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "employee")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [verificationStep, setVerificationStep] = useState<"idle" | "gps" | "face" | "complete">("idle")
  const [gpsVerified, setGpsVerified] = useState(false)
  const [faceVerified, setFaceVerified] = useState(false)

  const [attendanceHistory] = useState<AttendanceRecord[]>([
    { date: "2025-01-27", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "present" },
    { date: "2025-01-26", checkIn: "09:15 AM", checkOut: "06:10 PM", status: "late" },
    { date: "2025-01-25", checkIn: "08:55 AM", checkOut: "06:05 PM", status: "present" },
    { date: "2025-01-24", checkIn: "09:30 AM", checkOut: "06:15 PM", status: "late" },
  ])

  const handleStartCheckIn = () => {
    setVerificationStep("gps")
    setTimeout(() => {
      setGpsVerified(true)
      setVerificationStep("face")
    }, 2000)
  }

  const handleFaceVerification = () => {
    setTimeout(() => {
      setFaceVerified(true)
      setVerificationStep("complete")
      setTimeout(() => {
        setIsCheckedIn(true)
        setVerificationStep("idle")
      }, 1500)
    }, 2000)
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
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">Employee Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user?.name}</p>
              </div>
              <Button variant="ghost" onClick={handleLogout} className="gap-2">
                <LogOut className="size-4" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Check-in Card */}
          <Card className="mb-8 border-border bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Today's Attendance</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isCheckedIn && verificationStep === "idle" && (
                <div className="text-center">
                  <div className="mb-6 inline-flex rounded-full bg-primary/10 p-6">
                    <Clock className="size-12 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">Ready to Check In?</h3>
                  <p className="mb-6 text-muted-foreground">
                    We'll verify your location and identity to mark your attendance.
                  </p>
                  <Button onClick={handleStartCheckIn} size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                    <CheckCircle2 className="size-5" />
                    Start Check-In Process
                  </Button>
                </div>
              )}

              {verificationStep === "gps" && (
                <div className="text-center">
                  <div className="mb-6 inline-flex animate-pulse rounded-full bg-chart-2/10 p-6">
                    <MapPin className="size-12 text-chart-2" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">Verifying Location...</h3>
                  <p className="text-muted-foreground">Checking if you're within the office area</p>
                  <div className="mx-auto mt-4 h-2 w-64 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-1/2 animate-pulse rounded-full bg-chart-2" />
                  </div>
                </div>
              )}

              {verificationStep === "face" && (
                <div className="text-center">
                  <div className="mb-6 inline-flex rounded-full bg-primary/10 p-6">
                    <Camera className="size-12 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">Face Verification</h3>
                  <p className="mb-6 text-muted-foreground">Please look at the camera to verify your identity</p>
                  {!faceVerified && (
                    <Button onClick={handleFaceVerification} size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                      <Camera className="size-5" />
                      Verify Face
                    </Button>
                  )}
                  {faceVerified && (
                    <div className="mx-auto mt-4 h-2 w-64 overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-full animate-pulse rounded-full bg-primary" />
                    </div>
                  )}
                </div>
              )}

              {verificationStep === "complete" && (
                <div className="text-center">
                  <div className="mb-6 inline-flex rounded-full bg-chart-3/10 p-6">
                    <CheckCircle2 className="size-12 text-chart-3" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-chart-3">Verification Complete!</h3>
                  <p className="text-muted-foreground">Recording your attendance...</p>
                </div>
              )}

              {isCheckedIn && (
                <div className="text-center">
                  <div className="mb-6 inline-flex rounded-full bg-chart-3/10 p-6">
                    <CheckCircle2 className="size-12 text-chart-3" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-chart-3">Checked In Successfully!</h3>
                  <p className="text-muted-foreground">You've been marked present for today</p>
                  <div className="mt-6 flex items-center justify-center gap-8 text-sm">
                    <div>
                      <p className="text-muted-foreground">Check-in Time</p>
                      <p className="mt-1 text-lg font-semibold text-foreground">{new Date().toLocaleTimeString()}</p>
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="mt-1 text-lg font-semibold text-chart-3">On Time</p>
                    </div>
                  </div>
                </div>
              )}

              {(gpsVerified || faceVerified) && verificationStep !== "idle" && (
                <div className="grid gap-3 border-t border-border pt-6 md:grid-cols-2">
                  <div
                    className={`flex items-center gap-3 rounded-lg border p-4 ${
                      gpsVerified ? "border-chart-3/50 bg-chart-3/5" : "border-border bg-muted/30"
                    }`}
                  >
                    <MapPin className={`size-5 ${gpsVerified ? "text-chart-3" : "text-muted-foreground"}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">GPS Location</p>
                      <p className={`text-xs ${gpsVerified ? "text-chart-3" : "text-muted-foreground"}`}>
                        {gpsVerified ? "Verified" : "Pending"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-3 rounded-lg border p-4 ${
                      faceVerified ? "border-chart-3/50 bg-chart-3/5" : "border-border bg-muted/30"
                    }`}
                  >
                    <Camera className={`size-5 ${faceVerified ? "text-chart-3" : "text-muted-foreground"}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">Face Recognition</p>
                      <p className={`text-xs ${faceVerified ? "text-chart-3" : "text-muted-foreground"}`}>
                        {faceVerified ? "Verified" : "Pending"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Attendance History */}
          <Card className="border-border bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="size-5" />
                Attendance History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendanceHistory.map((record, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border bg-background p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex size-10 items-center justify-center rounded-lg ${
                          record.status === "present"
                            ? "bg-chart-3/10 text-chart-3"
                            : record.status === "late"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {record.status === "present" ? (
                          <CheckCircle2 className="size-5" />
                        ) : record.status === "late" ? (
                          <Clock className="size-5" />
                        ) : (
                          <AlertCircle className="size-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{record.date}</p>
                        <p className="text-sm text-muted-foreground">
                          {record.checkIn} - {record.checkOut || "Not checked out"}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        record.status === "present"
                          ? "bg-chart-3/10 text-chart-3"
                          : record.status === "late"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

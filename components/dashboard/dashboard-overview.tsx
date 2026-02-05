"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import {
  Trophy,
  Target,
  TrendingUp,
  Clock,
  Star,
  Play,
  BookOpen,
  Award,
  Activity,
  Users,
  CheckCircle2,
  Calendar,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"

export function DashboardOverview() {
  const { user, isLoaded } = useUser()

  // Helper function to get display name
  const getDisplayName = () => {
    if (!isLoaded || !user) return "Doctor"

    if (user.firstName || user.lastName) {
      return `${user.firstName || ""} ${user.lastName || ""}`.trim()
    }

    // Extract name from email for Gmail signups
    if (user.primaryEmailAddress?.emailAddress) {
      const email = user.primaryEmailAddress.emailAddress
      const username = email.split("@")[0]
      // Convert email username to a more readable format
      return username
        .split(/[._-]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(" ")
    }

    return "Doctor"
  }
  // Mock data - in a real app, this would come from your API/database
  const userStats = {
    casesSolved: 47,
    totalXP: 2840,
    currentLevel: 12,
    ranking: 23,
    totalUsers: 1247,
    streakDays: 7,
    weeklyGoal: 20,
    weeklyProgress: 15
  }

  const recentCases = [
    {
      id: 1,
      title: "Acute Chest Pain - 45M",
      difficulty: "Intermediate",
      score: 92,
      completedAt: "2 hours ago",
      xpEarned: 150
    },
    {
      id: 2,
      title: "Pediatric Fever - 6F",
      difficulty: "Beginner",
      score: 88,
      completedAt: "1 day ago",
      xpEarned: 120
    },
    {
      id: 3,
      title: "Chronic Fatigue - 32F",
      difficulty: "Advanced",
      score: 95,
      completedAt: "2 days ago",
      xpEarned: 200
    }
  ]

  const achievements = [
    { id: 1, title: "First Case", description: "Complete your first patient case", earned: true },
    { id: 2, title: "Speed Demon", description: "Complete 5 cases in one day", earned: true },
    { id: 3, title: "Perfectionist", description: "Score 100% on a case", earned: false },
    { id: 4, title: "Streak Master", description: "Maintain a 7-day streak", earned: true }
  ]

  const nextLevelXP = (userStats.currentLevel * 250) // XP needed for next level
  const currentLevelXP = ((userStats.currentLevel - 1) * 250)
  const progressToNextLevel = ((userStats.totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6 md:space-y-8 bg-gradient-to-br from-slate-50/50 via-white to-brand-50/30 min-h-full">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-center md:text-left">
          <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">Welcome back, {getDisplayName()}!</h1>
          <p className="text-slate-600 mt-1 sm:mt-2 text-sm sm:text-base leading-relaxed">Ready to continue your medical education journey?</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto h-10 sm:h-11">
          <Link href="/dashboard/cases">
            <Play className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Start New Case</span>
            <span className="sm:hidden">Start Case</span>
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 touch-manipulation">
          <CardContent className="p-4 sm:p-5 md:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-center sm:text-left flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">Cases Solved</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 truncate">{userStats.casesSolved}</p>
              </div>
              <div className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-brand-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 touch-manipulation">
          <CardContent className="p-4 sm:p-5 md:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-center sm:text-left flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">Total XP</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 truncate">{userStats.totalXP.toLocaleString()}</p>
              </div>
              <div className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 touch-manipulation">
          <CardContent className="p-4 sm:p-5 md:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-center sm:text-left flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">Global Rank</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 truncate">#{userStats.ranking}</p>
                <p className="text-xs text-slate-500 hidden md:block mt-1">of {userStats.totalUsers.toLocaleString()} users</p>
              </div>
              <div className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 touch-manipulation">
          <CardContent className="p-4 sm:p-5 md:p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-center sm:text-left flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">Current Streak</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 truncate">{userStats.streakDays} days</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">Active</span>
                </div>
              </div>
              <div className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2">
        {/* Level Progress */}
        <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200 touch-manipulation">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-slate-900 text-base sm:text-lg font-semibold">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-brand-600" />
              </div>
              Level Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">Level {userStats.currentLevel}</span>
              <Badge variant="secondary" className="bg-brand-100 text-brand-700 text-xs sm:text-sm font-medium">
                {Math.round(progressToNextLevel)}% to Level {userStats.currentLevel + 1}
              </Badge>
            </div>
            <Progress value={progressToNextLevel} className="h-2 sm:h-3 bg-slate-200" />
            <p className="text-xs sm:text-sm text-slate-500">
              {userStats.totalXP - currentLevelXP} / {nextLevelXP - currentLevelXP} XP to next level
            </p>
          </CardContent>
        </Card>

        {/* Weekly Goal */}
        <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200 touch-manipulation">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-slate-900 text-base sm:text-lg font-semibold">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-accent-100 to-accent-200 flex items-center justify-center">
                <Target className="h-3 w-3 sm:h-4 sm:w-4 text-accent-600" />
              </div>
              Weekly Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">This Week</span>
              <Badge variant="outline" className="text-xs sm:text-sm font-medium">
                {userStats.weeklyProgress} / {userStats.weeklyGoal} cases
              </Badge>
            </div>
            <Progress value={(userStats.weeklyProgress / userStats.weeklyGoal) * 100} className="h-2 sm:h-3 bg-slate-200" />
            <p className="text-xs sm:text-sm text-slate-500">
              {userStats.weeklyGoal - userStats.weeklyProgress} more cases to reach your goal
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Achievements */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {/* Recent Cases */}
        <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200 touch-manipulation">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-slate-900 text-base sm:text-lg font-semibold">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-slate-600" />
              </div>
              Recent Cases
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {recentCases.map((case_) => (
              <div key={case_.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 rounded-xl bg-slate-50/80 hover:bg-slate-100/50 transition-all duration-200 cursor-pointer touch-manipulation">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-slate-900 text-sm sm:text-base leading-tight mb-1">{case_.title}</h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="text-xs font-medium">
                      {case_.difficulty}
                    </Badge>
                    <span className="text-xs sm:text-sm text-slate-500">Score: {case_.score}%</span>
                  </div>
                </div>
                <div className="text-center sm:text-right flex-shrink-0">
                  <div className="text-sm sm:text-base font-semibold text-green-600">+{case_.xpEarned} XP</div>
                  <div className="text-xs text-slate-500">{case_.completedAt}</div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-3 sm:mt-4 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 h-9 sm:h-10 text-sm sm:text-base touch-manipulation">
              View All Cases
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200 touch-manipulation">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 sm:gap-3 text-slate-900 text-base sm:text-lg font-semibold">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
                <Award className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600" />
              </div>
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-slate-50/80 hover:bg-slate-100/50 transition-all duration-200 touch-manipulation">
                <div className={cn(
                  "h-8 w-8 sm:h-10 sm:w-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm",
                  achievement.earned
                    ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                    : "bg-slate-200 text-slate-400"
                )}>
                  <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-slate-900 text-sm sm:text-base leading-tight">{achievement.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5 sm:mt-1 leading-relaxed">{achievement.description}</p>
                </div>
                {achievement.earned && (
                  <Badge className="bg-green-100 text-green-700 text-xs font-medium flex-shrink-0">Earned</Badge>
                )}
              </div>
            ))}
            <Button variant="outline" className="w-full mt-3 sm:mt-4 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 h-9 sm:h-10 text-sm sm:text-base touch-manipulation">
              View All Achievements
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-brand-600 to-accent-600 text-white border-0 shadow-lg overflow-hidden touch-manipulation">
        <CardContent className="p-4 sm:p-5 md:p-6 lg:p-8">
          <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 tracking-tight">Ready for your next challenge?</h3>
              <p className="text-brand-100 text-sm sm:text-base leading-relaxed opacity-90">Continue building your clinical expertise with new AI-powered cases.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto">
              <Button
                variant="secondary"
                className="bg-white/15 text-white hover:bg-white/25 border-white/30 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base touch-manipulation"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Browse Cases</span>
                <span className="sm:hidden">Browse</span>
              </Button>
              <Button className="bg-white text-brand-600 hover:bg-brand-50 shadow-sm hover:shadow-md transition-all duration-200 w-full sm:w-auto h-10 sm:h-11 text-sm sm:text-base touch-manipulation">
                <Play className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Start Random Case</span>
                <span className="sm:hidden">Start Case</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Target,
  Calendar,
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  BarChart3,
  PieChart,
  Activity,
  Star,
  Zap,
  Sparkles,
  PartyPopper,
  Gift,
  Trophy,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Heart,
  Brain,
  Stethoscope,
  Shield
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"

export function LearningProgress() {
  const { user, isLoaded } = useUser()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [celebrating, setCelebrating] = useState(false)

  // Sample data - in a real app, this would come from your backend
  const weeklyProgress = [
    { day: "Mon", cases: 3, xp: 450, target: 5 },
    { day: "Tue", cases: 2, xp: 320, target: 5 },
    { day: "Wed", cases: 4, xp: 680, target: 5 },
    { day: "Thu", cases: 1, xp: 150, target: 5 },
    { day: "Fri", cases: 3, xp: 520, target: 5 },
    { day: "Sat", cases: 2, xp: 380, target: 3 },
    { day: "Sun", cases: 0, xp: 0, target: 3 }
  ]

  const categoryProgress = [
    { category: "Cardiology", completed: 12, total: 15, percentage: 80, color: "bg-red-500", icon: Heart },
    { category: "Neurology", completed: 8, total: 12, percentage: 67, color: "bg-blue-500", icon: Brain },
    { category: "Emergency Medicine", completed: 15, total: 20, percentage: 75, color: "bg-green-500", icon: Stethoscope },
    { category: "Pediatrics", completed: 9, total: 14, percentage: 64, color: "bg-purple-500", icon: Shield },
    { category: "General Medicine", completed: 18, total: 25, percentage: 72, color: "bg-amber-500", icon: Award }
  ]

  const skillAreas = [
    { skill: "Clinical Reasoning", level: 85, change: "+5%", icon: Brain },
    { skill: "Diagnostic Accuracy", level: 78, change: "+3%", icon: Target },
    { skill: "Patient Communication", level: 92, change: "+8%", icon: Heart },
    { skill: "Test Interpretation", level: 71, change: "+2%", icon: BookOpen },
    { skill: "Treatment Planning", level: 83, change: "+6%", icon: Stethoscope }
  ]

  // Get user display name
  const getDisplayName = () => {
    if (!isLoaded) return "Loading..."

    if (!user) return "User"

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

    return "User"
  }

  // Calculate total progress and level
  const totalProgress = categoryProgress.reduce((sum, cat) => sum + cat.percentage, 0) / categoryProgress.length
  const currentLevel = Math.floor(totalProgress / 20) + 1
  const nextLevelProgress = (totalProgress % 20) * 5
  const totalXP = weeklyProgress.reduce((sum, day) => sum + day.xp, 0)

  // Personalized insights based on performance
  const getPersonalizedInsight = () => {
    const displayName = getDisplayName()
    const weakestCategory = categoryProgress.reduce((min, cat) => cat.percentage < min.percentage ? cat : min)
    const strongestSkill = skillAreas.reduce((max, skill) => skill.level > max.level ? skill : max)

    if (totalProgress >= 80) {
      return {
        title: "Expert Level Achieved! 🏆",
        message: `Amazing work, ${displayName}! You're excelling in ${strongestSkill.skill}. Consider sharing your expertise by helping others in ${weakestCategory.category}.`,
        type: "celebration",
        color: "from-yellow-400 to-orange-500"
      }
    } else if (totalProgress >= 60) {
      return {
        title: "Great Progress! 🌟",
        message: `Great progress, ${displayName}! You're doing well in most areas. Focus on ${weakestCategory.category} to reach the next level.`,
        type: "encouragement",
        color: "from-blue-400 to-teal-500"
      }
    } else {
      return {
        title: "Keep Going! 💪",
        message: `Keep going, ${displayName}! Every expert was once a beginner. Start with ${weakestCategory.category} and build your foundation.`,
        type: "motivation",
        color: "from-purple-400 to-pink-500"
      }
    }
  }

  // Celebration effect
  useEffect(() => {
    if (celebrating) {
      const timer = setTimeout(() => setCelebrating(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [celebrating])

  const insight = getPersonalizedInsight()

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
          <p className="text-sm text-slate-600">Loading your progress...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Celebration Overlay */}
      {celebrating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 text-center animate-bounce">
            <PartyPopper className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">🎉 Congratulations! 🎉</h2>
            <p className="text-slate-600">You've reached a new milestone!</p>
          </div>
        </div>
      )}

      {/* Personalized Header */}
      <div className="text-center space-y-4 relative">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-blue-200 to-teal-200 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="relative">
          <div className="flex items-center justify-center gap-3 mb-2">
            <PartyPopper className="h-8 w-8 text-yellow-500 animate-pulse" />
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Level {currentLevel} Medical Professional
            </span>
            <Sparkles className="h-8 w-8 text-purple-500 animate-pulse" />
          </div>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Welcome back, {getDisplayName()}! 👋
          </h1>

          <p className="text-slate-600 max-w-2xl mx-auto text-lg mt-2">
            Ready to continue your medical journey? Here's your personalized progress overview.
          </p>

          {/* Level Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Level Progress</span>
              <span className="text-sm font-bold text-slate-900">{Math.round(nextLevelProgress)}%</span>
            </div>
            <div className="relative">
              <Progress
                value={nextLevelProgress}
                className="h-3 bg-slate-200"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full opacity-20 animate-pulse"></div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>Level {currentLevel}</span>
              <span>Level {currentLevel + 1}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stats with Enhanced Animations */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
        <Card className="group bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Study Streak</p>
                <p className="text-3xl font-bold text-slate-900 group-hover:text-green-600 transition-colors">12</p>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +3 from last week
                </p>
              </div>
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="h-7 w-7 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Score</p>
                <p className="text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">87%</p>
                <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  +5% improvement
                </p>
              </div>
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="h-7 w-7 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Study Time</p>
                <p className="text-3xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">24h</p>
                <p className="text-xs text-purple-600 mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  This month
                </p>
              </div>
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="h-7 w-7 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total XP</p>
                <p className="text-3xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{totalXP.toLocaleString()}</p>
                <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  {Math.floor(totalXP / 100)} achievements
                </p>
              </div>
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="h-7 w-7 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Weekly Activity Chart */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Weekly Activity
            <Badge className="ml-auto bg-blue-100 text-blue-700">This Week</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyProgress.map((day, index) => (
              <div
                key={day.day}
                className="group flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="w-12 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                  {day.day}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                      {day.cases} cases completed
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-900">{day.xp} XP</span>
                      {day.cases >= day.target && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </div>
                  <div className="relative">
                    <Progress
                      value={Math.min((day.cases / day.target) * 100, 100)}
                      className="h-3 bg-slate-200"
                    />
                    {day.cases >= day.target && (
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Category Progress */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-green-600" />
              Category Progress
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryProgress.map((category) => (
              <div
                key={category.category}
                className="group space-y-3 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
                onClick={() => setSelectedCategory(selectedCategory === category.category ? null : category.category)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", category.color.replace('bg-', 'bg-').replace('-500', '-100'))}>
                      <category.icon className={cn("h-5 w-5", category.color.replace('bg-', 'text-').replace('-500', '-600'))} />
                    </div>
                    <span className="font-medium text-slate-900 group-hover:text-slate-700 transition-colors">
                      {category.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {category.completed}/{category.total}
                    </Badge>
                    {selectedCategory === category.category && (
                      <ChevronUp className="h-4 w-4 text-slate-400" />
                    )}
                    {selectedCategory !== category.category && (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Progress
                      value={Math.min(category.percentage, 100)}
                      className="h-3 bg-slate-200"
                    />
                    <div
                      className={cn("absolute top-0 left-0 h-full rounded-full transition-all duration-1000", category.color)}
                      style={{ width: `${Math.min(category.percentage, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-600 w-12">
                    {category.percentage}%
                  </span>
                </div>

                {selectedCategory === category.category && showDetails && (
                  <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Completed:</span>
                        <span className="font-medium ml-2">{category.completed}</span>
                      </div>
                      <div>
                        <span className="text-slate-500">Remaining:</span>
                        <span className="font-medium ml-2">{category.total - category.completed}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              Skill Development
              <Badge className="ml-auto bg-purple-100 text-purple-700">Live Updates</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillAreas.map((skill, index) => (
              <div
                key={skill.skill}
                className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100/50 hover:from-slate-100 hover:to-slate-50 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow">
                    <skill.icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900 text-sm group-hover:text-slate-700 transition-colors">
                      {skill.skill}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 relative">
                        <Progress
                          value={Math.min(skill.level, 100)}
                          className="h-2 bg-slate-200"
                        />
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min(skill.level, 100)}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-600 w-8">
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className={cn(
                  "text-xs transition-all group-hover:scale-105",
                  skill.change.startsWith('+') ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                )}>
                  {skill.change}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Personalized Learning Insights */}
      <Card className={cn(
        "border-0 shadow-lg transition-all duration-500",
        insight.type === 'celebration' && "bg-gradient-to-r from-yellow-50 to-orange-50",
        insight.type === 'encouragement' && "bg-gradient-to-r from-blue-50 to-teal-50",
        insight.type === 'motivation' && "bg-gradient-to-r from-purple-50 to-pink-50"
      )}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className={cn(
              "h-14 w-14 rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-lg",
              insight.color
            )}>
              {insight.type === 'celebration' && <Trophy className="h-7 w-7 text-white" />}
              {insight.type === 'encouragement' && <Sparkles className="h-7 w-7 text-white" />}
              {insight.type === 'motivation' && <Target className="h-7 w-7 text-white" />}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-xl text-slate-900 mb-3">{insight.title}</h3>
              <p className="text-slate-700 mb-4 leading-relaxed">
                {insight.message}
              </p>
              <div className="flex gap-3">
                <Button
                  className="bg-white/80 hover:bg-white border-0 shadow-sm"
                  onClick={() => setCelebrating(true)}
                >
                  <Gift className="h-4 w-4 mr-2" />
                  View Achievements
                </Button>
                <Button variant="outline" className="bg-white/50 hover:bg-white">
                  Get Study Plan
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

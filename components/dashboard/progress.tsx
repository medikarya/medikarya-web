"use client"

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
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

export function LearningProgress() {
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
    { category: "Cardiology", completed: 12, total: 15, percentage: 80, color: "bg-red-500" },
    { category: "Neurology", completed: 8, total: 12, percentage: 67, color: "bg-blue-500" },
    { category: "Emergency Medicine", completed: 15, total: 20, percentage: 75, color: "bg-green-500" },
    { category: "Pediatrics", completed: 9, total: 14, percentage: 64, color: "bg-purple-500" },
    { category: "General Medicine", completed: 18, total: 25, percentage: 72, color: "bg-amber-500" }
  ]

  const skillAreas = [
    { skill: "Clinical Reasoning", level: 85, change: "+5%" },
    { skill: "Diagnostic Accuracy", level: 78, change: "+3%" },
    { skill: "Patient Communication", level: 92, change: "+8%" },
    { skill: "Test Interpretation", level: 71, change: "+2%" },
    { skill: "Treatment Planning", level: 83, change: "+6%" }
  ]

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Learning Progress</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Track your improvement across different medical specialties and skill areas.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Study Streak</p>
                <p className="text-2xl font-bold text-slate-900">12 days</p>
                <p className="text-xs text-green-600 mt-1">+3 from last week</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Score</p>
                <p className="text-2xl font-bold text-slate-900">87%</p>
                <p className="text-xs text-blue-600 mt-1">+5% improvement</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Study Time</p>
                <p className="text-2xl font-bold text-slate-900">24h 15m</p>
                <p className="text-xs text-purple-600 mt-1">This month</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Cases Mastered</p>
                <p className="text-2xl font-bold text-slate-900">23</p>
                <p className="text-xs text-amber-600 mt-1">5 new this week</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
                <Award className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity Chart */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Weekly Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyProgress.map((day, index) => (
              <div key={day.day} className="flex items-center gap-4">
                <div className="w-12 text-sm font-medium text-slate-600">{day.day}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-600">{day.cases} cases</span>
                    <span className="text-sm font-medium text-slate-900">{day.xp} XP</span>
                  </div>
                  <Progress
                    value={Math.min((day.cases / day.target) * 100, 100)}
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Progress */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-green-600" />
              Category Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryProgress.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-900">{category.category}</span>
                  <Badge variant="outline">
                    {category.completed}/{category.total}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={Math.min(category.percentage, 100)} className="flex-1 h-3" />
                  <span className="text-sm font-medium text-slate-600 w-12">
                    {category.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-600" />
              Skill Development
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skillAreas.map((skill) => (
              <div key={skill.skill} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80">
                <div className="flex-1">
                  <div className="font-medium text-slate-900 text-sm">{skill.skill}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={Math.min(skill.level, 100)} className="flex-1 h-2" />
                    <span className="text-xs font-medium text-slate-600 w-8">
                      {skill.level}%
                    </span>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700 text-xs ml-3">
                  {skill.change}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Learning Insights */}
      <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg text-slate-900 mb-2">Learning Insights</h3>
              <p className="text-slate-700 mb-3">
                You're performing exceptionally well in patient communication skills! Consider focusing more on test interpretation to achieve well-rounded expertise.
              </p>
              <Button variant="outline" className="bg-white/50">
                View Detailed Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

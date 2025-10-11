"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Award,
  Star,
  Trophy,
  Target,
  Zap,
  Crown,
  Medal,
  Gem,
  Shield,
  Heart,
  Brain,
  Stethoscope,
  Clock,
  Calendar,
  Users,
  BookOpen,
  TrendingUp
} from "lucide-react"
import { cn } from "@/lib/utils"

export function Achievements() {
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first patient case",
      icon: Star,
      earned: true,
      earnedDate: "2024-01-15",
      rarity: "common",
      points: 50
    },
    {
      id: 2,
      title: "Speed Demon",
      description: "Complete 5 cases in a single day",
      icon: Zap,
      earned: true,
      earnedDate: "2024-01-20",
      rarity: "uncommon",
      points: 100
    },
    {
      id: 3,
      title: "Perfectionist",
      description: "Score 100% on a complex case",
      icon: Target,
      earned: false,
      rarity: "rare",
      points: 200
    },
    {
      id: 4,
      title: "Streak Master",
      description: "Maintain a 7-day learning streak",
      icon: Calendar,
      earned: true,
      earnedDate: "2024-02-01",
      rarity: "uncommon",
      points: 150
    },
    {
      id: 5,
      title: "Cardiology Expert",
      description: "Complete all cardiology cases",
      icon: Heart,
      earned: false,
      rarity: "epic",
      points: 500
    },
    {
      id: 6,
      title: "Knowledge Seeker",
      description: "Study for 50 hours total",
      icon: BookOpen,
      earned: true,
      earnedDate: "2024-02-10",
      rarity: "common",
      points: 75
    },
    {
      id: 7,
      title: "Social Learner",
      description: "Share 10 cases with peers",
      icon: Users,
      earned: false,
      rarity: "uncommon",
      points: 125
    },
    {
      id: 8,
      title: "Rising Star",
      description: "Reach top 10% of all users",
      icon: Crown,
      earned: false,
      rarity: "legendary",
      points: 1000
    }
  ]

  const recentAchievements = achievements.filter(a => a.earned).slice(0, 3)
  const upcomingAchievements = achievements.filter(a => !a.earned).slice(0, 4)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-slate-100 text-slate-700 border-slate-200"
      case "uncommon": return "bg-green-100 text-green-700 border-green-200"
      case "rare": return "bg-blue-100 text-blue-700 border-blue-200"
      case "epic": return "bg-purple-100 text-purple-700 border-purple-200"
      case "legendary": return "bg-amber-100 text-amber-700 border-amber-200"
      default: return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "common": return <Medal className="h-4 w-4" />
      case "uncommon": return <Award className="h-4 w-4" />
      case "rare": return <Star className="h-4 w-4" />
      case "epic": return <Gem className="h-4 w-4" />
      case "legendary": return <Crown className="h-4 w-4" />
      default: return <Medal className="h-4 w-4" />
    }
  }

  const totalEarned = achievements.filter(a => a.earned).length
  const totalPoints = achievements.filter(a => a.earned).reduce((acc, a) => acc + a.points, 0)

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Achievements</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Track your learning milestones and unlock exclusive badges as you progress through your medical education journey.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900 mb-1">{totalEarned}</div>
            <div className="text-sm text-slate-600">Achievements</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900 mb-1">{totalPoints.toLocaleString()}</div>
            <div className="text-sm text-slate-600">Achievement Points</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center">
            <Crown className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {Math.round((totalEarned / achievements.length) * 100)}%
            </div>
            <div className="text-sm text-slate-600">Completion Rate</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900 mb-1">3</div>
            <div className="text-sm text-slate-600">This Month</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-600" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <achievement.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{achievement.title}</h3>
                  <p className="text-sm text-slate-600">{achievement.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={cn("text-xs", getRarityColor(achievement.rarity))}>
                      {getRarityIcon(achievement.rarity)}
                      <span className="ml-1 capitalize">{achievement.rarity}</span>
                    </Badge>
                    <span className="text-xs text-amber-600 font-medium">+{achievement.points} pts</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* All Achievements Grid */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Medal className="h-5 w-5 text-slate-600" />
            All Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={cn(
                  "relative p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg",
                  achievement.earned
                    ? "bg-white border-amber-200 shadow-md"
                    : "bg-slate-50 border-slate-200 opacity-60"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300",
                    achievement.earned
                      ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                      : "bg-slate-200 text-slate-400"
                  )}>
                    <achievement.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-medium transition-colors duration-300",
                      achievement.earned ? "text-slate-900" : "text-slate-500"
                    )}>
                      {achievement.title}
                    </h3>
                    <p className={cn(
                      "text-sm transition-colors duration-300",
                      achievement.earned ? "text-slate-600" : "text-slate-400"
                    )}>
                      {achievement.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={cn("text-xs", getRarityColor(achievement.rarity))}>
                        {getRarityIcon(achievement.rarity)}
                        <span className="ml-1 capitalize">{achievement.rarity}</span>
                      </Badge>
                      {achievement.earned && (
                        <span className="text-xs text-amber-600 font-medium">
                          +{achievement.points} pts
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {achievement.earned && (
                  <div className="absolute top-2 right-2">
                    <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Challenges */}
      <Card className="bg-gradient-to-r from-blue-50 to-teal-50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Target className="h-5 w-5 text-blue-600" />
            Next Challenges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {upcomingAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/50">
                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                  <achievement.icon className="h-4 w-4 text-slate-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 text-sm">{achievement.title}</h4>
                  <p className="text-xs text-slate-600">{achievement.description}</p>
                </div>
                <Badge className={cn("text-xs", getRarityColor(achievement.rarity))}>
                  {achievement.points} pts
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

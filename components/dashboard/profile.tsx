"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Award,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Edit,
  Save,
  Camera,
  Star,
  Trophy,
  TrendingUp,
  Clock,
  Target,
  BookOpen,
  Activity
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs" // Import useUser

export function Profile() {
  const { user, isLoaded, isSignedIn } = useUser();

  const userProfile = {
    name: user?.fullName || "",
    title: "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    phone: user?.primaryPhoneNumber?.phoneNumber || "",
    location: "",
    institution: "",
    graduationYear: "",
    joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "",
    bio: "",
    stats: {
      casesCompleted: 47,
      totalXP: 2840,
      currentLevel: 12,
      achievements: 8,
      studyStreak: 12,
      avgScore: 87
    }
  }

  const recentActivity = [
    { id: 1, action: "Completed case", details: "Acute Chest Pain - 45M", time: "2 hours ago", xp: 150 },
    { id: 2, action: "Earned achievement", details: "Speed Demon", time: "1 day ago", xp: 100 },
    { id: 3, action: "Completed case", details: "Pediatric Fever - 6F", time: "2 days ago", xp: 120 },
    { id: 4, action: "Started new streak", details: "7-day streak milestone", time: "5 days ago", xp: 50 }
  ]

  if (!isLoaded) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Profile</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Manage your personal information and view your learning journey.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Overview */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6 text-center space-y-4">
              <div className="relative mx-auto">
                <Avatar className="h-24 w-24 mx-auto ring-4 ring-brand-200">
                  <AvatarImage src={user?.imageUrl || "/placeholder-user.jpg"} alt={userProfile.name} />
                  <AvatarFallback className="bg-gradient-to-br from-brand-100 to-accent-100 text-slate-600 text-2xl font-semibold">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-brand-600 hover:bg-brand-700 p-0"
                >
                  <Camera className="h-4 w-4 text-white" />
                </Button>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">{userProfile.name}</h2>
                <p className="text-slate-600">{userProfile.title}</p>
                <Badge className="mt-2 bg-brand-100 text-brand-700">Level {userProfile.stats.currentLevel}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900">{userProfile.stats.totalXP.toLocaleString()}</div>
                  <div className="text-xs text-slate-600">Total XP</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900">{userProfile.stats.achievements}</div>
                  <div className="text-xs text-slate-600">Achievements</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <Activity className="h-5 w-5 text-brand-600" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Cases Completed</span>
                <span className="font-semibold text-slate-900">{userProfile.stats.casesCompleted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Study Streak</span>
                <span className="font-semibold text-slate-900">{userProfile.stats.studyStreak} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Average Score</span>
                <span className="font-semibold text-slate-900">{userProfile.stats.avgScore}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Member Since</span>
                <span className="font-semibold text-slate-900">{userProfile.joinDate}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900">
                    <User className="h-5 w-5 text-brand-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={userProfile.name}
                        className="bg-white/50 border-slate-200"
                        readOnly
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        value={userProfile.email}
                        className="bg-white/50 border-slate-200"
                        readOnly
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={userProfile.phone}
                        className="bg-white/50 border-slate-200"
                        readOnly
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={userProfile.location}
                        className="bg-white/50 border-slate-200"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={userProfile.bio}
                      className="bg-white/50 border-slate-200 min-h-[100px]"
                      readOnly
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academic" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900">
                    <GraduationCap className="h-5 w-5 text-brand-600" />
                    Academic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="institution">Medical Institution</Label>
                    <Input
                      id="institution"
                      value={userProfile.institution}
                      className="bg-white/50 border-slate-200"
                      readOnly
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="graduation">Expected Graduation</Label>
                    <Input
                      id="graduation"
                      value={userProfile.graduationYear}
                      className="bg-white/50 border-slate-200"
                      readOnly
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900">{userProfile.stats.casesCompleted}</div>
                      <div className="text-xs text-slate-600">Cases Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900">{userProfile.stats.avgScore}%</div>
                      <div className="text-xs text-slate-600">Average Score</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900">
                    <Clock className="h-5 w-5 text-brand-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50/80">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center flex-shrink-0">
                        {activity.action.includes("case") ? (
                          <BookOpen className="h-4 w-4 text-green-600" />
                        ) : (
                          <Trophy className="h-4 w-4 text-amber-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900 text-sm">{activity.action}</div>
                        <div className="text-xs text-slate-600">{activity.details}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-medium text-green-600">+{activity.xp} XP</div>
                        <div className="text-xs text-slate-500">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

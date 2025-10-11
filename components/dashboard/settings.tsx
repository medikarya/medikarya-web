"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Bell,
  Shield,
  Palette,
  Volume2,
  Moon,
  Sun,
  Camera,
  Save,
  Trash2,
  Download,
  Upload,
  Eye,
  EyeOff,
  Key,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Award,
  Calendar
} from "lucide-react"
import { cn } from "@/lib/utils"

export function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    achievements: true,
    reminders: false
  })

  const [preferences, setPreferences] = useState({
    theme: "light",
    sound: true,
    animations: true,
    autoSave: true
  })

  const [profile, setProfile] = useState({
    name: "Dr. Jane Doe",
    email: "jane.doe@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    institution: "Stanford University School of Medicine",
    graduation: "2025",
    bio: "Passionate medical student focused on improving clinical reasoning through AI-powered education."
  })

  const handleSave = () => {
    // In a real app, this would save to your backend
    console.log("Saving settings...")
  }

  return (
    <div className="p-4 lg:p-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Settings</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Customize your MediKarya experience and manage your account preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-20 w-20 ring-4 ring-blue-200">
                    <AvatarImage src="/placeholder-user.jpg" alt={profile.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-teal-100 text-slate-600 text-xl font-semibold">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700 p-0"
                  >
                    <Camera className="h-4 w-4 text-white" />
                  </Button>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{profile.name}</h3>
                  <p className="text-sm text-slate-600">Medical Student</p>
                  <div className="flex gap-2 mt-2">
                    <Badge className="bg-green-100 text-green-700">Level 12</Badge>
                    <Badge className="bg-blue-100 text-blue-700">2,840 XP</Badge>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="bg-white/50 border-slate-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="bg-white/50 border-slate-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="bg-white/50 border-slate-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    className="bg-white/50 border-slate-200"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="institution">Medical Institution</Label>
                  <Input
                    id="institution"
                    value={profile.institution}
                    onChange={(e) => setProfile({...profile, institution: e.target.value})}
                    className="bg-white/50 border-slate-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="graduation">Expected Graduation</Label>
                  <Input
                    id="graduation"
                    value={profile.graduation}
                    onChange={(e) => setProfile({...profile, graduation: e.target.value})}
                    className="bg-white/50 border-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  className="bg-white/50 border-slate-200 min-h-[100px]"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-slate-600">Receive case recommendations and updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-slate-600">Get notified about new achievements and milestones</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Progress Report</Label>
                    <p className="text-sm text-slate-600">Receive a summary of your weekly learning progress</p>
                  </div>
                  <Switch
                    checked={notifications.weekly}
                    onCheckedChange={(checked) => setNotifications({...notifications, weekly: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Achievement Alerts</Label>
                    <p className="text-sm text-slate-600">Get notified when you earn new badges or achievements</p>
                  </div>
                  <Switch
                    checked={notifications.achievements}
                    onCheckedChange={(checked) => setNotifications({...notifications, achievements: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Study Reminders</Label>
                    <p className="text-sm text-slate-600">Daily reminders to maintain your learning streak</p>
                  </div>
                  <Switch
                    checked={notifications.reminders}
                    onCheckedChange={(checked) => setNotifications({...notifications, reminders: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-blue-600" />
                App Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Theme</Label>
                    <p className="text-sm text-slate-600">Choose your preferred color scheme</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={preferences.theme === "light" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreferences({...preferences, theme: "light"})}
                    >
                      <Sun className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={preferences.theme === "dark" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreferences({...preferences, theme: "dark"})}
                    >
                      <Moon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sound Effects</Label>
                    <p className="text-sm text-slate-600">Play sounds for interactions and achievements</p>
                  </div>
                  <Switch
                    checked={preferences.sound}
                    onCheckedChange={(checked) => setPreferences({...preferences, sound: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Animations</Label>
                    <p className="text-sm text-slate-600">Enable smooth transitions and animations</p>
                  </div>
                  <Switch
                    checked={preferences.animations}
                    onCheckedChange={(checked) => setPreferences({...preferences, animations: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-save Progress</Label>
                    <p className="text-sm text-slate-600">Automatically save your progress during cases</p>
                  </div>
                  <Switch
                    checked={preferences.autoSave}
                    onCheckedChange={(checked) => setPreferences({...preferences, autoSave: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type="password"
                      className="bg-white/50 border-slate-200 pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    >
                      <Eye className="h-4 w-4 text-slate-400" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    className="bg-white/50 border-slate-200"
                    placeholder="Enter new password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="bg-white/50 border-slate-200"
                    placeholder="Confirm new password"
                  />
                </div>

                <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white">
                  <Key className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h4 className="font-medium text-slate-900 mb-4">Account Actions</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button variant="outline" className="justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Clock,
  Users,
  Star,
  Play,
  BookOpen,
  Heart,
  Brain,
  Stethoscope,
  Activity,
  TrendingUp,
  Award
} from "lucide-react"
import { cn } from "@/lib/utils"

export function PracticeCases() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const categories = [
    { id: "cardiology", name: "Cardiology", icon: Heart, count: 12 },
    { id: "neurology", name: "Neurology", icon: Brain, count: 8 },
    { id: "pulmonology", name: "Pulmonology", icon: Activity, count: 10 },
    { id: "emergency", name: "Emergency Medicine", icon: Stethoscope, count: 15 },
    { id: "pediatrics", name: "Pediatrics", icon: Users, count: 9 },
    { id: "general", name: "General Medicine", icon: BookOpen, count: 18 }
  ]

  const cases = [
    {
      id: 1,
      title: "Acute Chest Pain - 45 Year Old Male",
      category: "cardiology",
      difficulty: "intermediate",
      duration: "25-30 min",
      xpReward: 150,
      completionRate: 87,
      tags: ["ECG", "Cardiac biomarkers", "Risk stratification"],
      description: "A 45-year-old male presents with acute chest pain radiating to the left arm. Evaluate symptoms, order appropriate tests, and determine the diagnosis."
    },
    {
      id: 2,
      title: "Pediatric Fever - 6 Year Old Female",
      category: "pediatrics",
      difficulty: "beginner",
      duration: "15-20 min",
      xpReward: 120,
      completionRate: 92,
      tags: ["Fever", "Pediatric assessment", "Infectious disease"],
      description: "A 6-year-old girl presents with high fever and rash. Take a focused history and perform appropriate physical examination."
    },
    {
      id: 3,
      title: "Chronic Fatigue - 32 Year Old Female",
      category: "general",
      difficulty: "advanced",
      duration: "35-40 min",
      xpReward: 200,
      completionRate: 73,
      tags: ["Chronic fatigue", "Differential diagnosis", "Lab interpretation"],
      description: "A 32-year-old female with progressive fatigue over 6 months. Comprehensive evaluation including history, examination, and diagnostic workup."
    },
    {
      id: 4,
      title: "Acute Stroke - 68 Year Old Male",
      category: "neurology",
      difficulty: "advanced",
      duration: "40-45 min",
      xpReward: 220,
      completionRate: 68,
      tags: ["Stroke", "Neurological exam", "Emergency management"],
      description: "68-year-old male with sudden onset weakness and speech difficulty. Rapid assessment and management decisions required."
    },
    {
      id: 5,
      title: "COPD Exacerbation - 72 Year Old Male",
      category: "pulmonology",
      difficulty: "intermediate",
      duration: "30-35 min",
      xpReward: 180,
      completionRate: 81,
      tags: ["COPD", "Respiratory distress", "Oxygen therapy"],
      description: "72-year-old male with known COPD presents with increased shortness of breath and cough. Evaluate and manage acute exacerbation."
    },
    {
      id: 6,
      title: "Trauma Assessment - 28 Year Old Male",
      category: "emergency",
      difficulty: "advanced",
      duration: "45-50 min",
      xpReward: 250,
      completionRate: 65,
      tags: ["Trauma", "ATLS", "Primary survey"],
      description: "28-year-old male involved in motor vehicle accident. Systematic trauma evaluation and critical decision making."
    }
  ]

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         case_.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || case_.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "all" || case_.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-700 border-green-200"
      case "intermediate": return "bg-blue-100 text-blue-700 border-blue-200"
      case "advanced": return "bg-purple-100 text-purple-700 border-purple-200"
      default: return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.icon : BookOpen
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-6 sm:space-y-8 min-h-full">
      {/* Header */}
      <div className="text-center space-y-3 sm:space-y-4">
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">Practice Cases</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-4">
          Choose from our extensive library of AI-powered medical cases to enhance your clinical reasoning and diagnostic skills.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search cases by title, symptoms, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/70 border-slate-200 h-10 sm:h-11"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white/70 text-sm h-10 sm:h-11 min-w-[160px]"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white/70 text-sm h-10 sm:h-11 min-w-[140px]"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex h-auto p-1 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl min-w-max">
            <TabsTrigger value="all" className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow-sm">
              All Cases
            </TabsTrigger>
            {categories.map(category => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-1 sm:gap-2 px-3 py-2 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                <category.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">{category.name.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={selectedCategory} className="mt-6">
          {/* Cases Grid */}
          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
            {filteredCases.map((case_) => {
              const CategoryIcon = getCategoryIcon(case_.category)
              return (
                <Card key={case_.id} className="group bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 touch-manipulation">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center flex-shrink-0">
                          <CategoryIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        </div>
                        <Badge className={cn("text-xs font-medium", getDifficultyColor(case_.difficulty))}>
                          {case_.difficulty}
                        </Badge>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-semibold text-green-600">+{case_.xpReward} XP</div>
                        <div className="text-xs text-slate-500">{case_.duration}</div>
                      </div>
                    </div>
                    <CardTitle className="text-base sm:text-lg text-slate-900 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
                      {case_.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-3 sm:space-y-4">
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {case_.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {case_.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs bg-slate-50">
                          {tag}
                        </Badge>
                      ))}
                      {case_.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs bg-slate-50">
                          +{case_.tags.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3 sm:gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{case_.completionRate}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span>4.8</span>
                        </div>
                      </div>

                      <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white shadow-sm hover:shadow-md transition-all duration-200 h-9 sm:h-10 px-2 sm:px-3 text-xs sm:text-sm min-w-0">
                        <Play className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        <span className="hidden sm:inline truncate">Start Case</span>
                        <span className="sm:hidden truncate">Start</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredCases.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-slate-400 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-slate-900 mb-2">No cases found</h3>
              <p className="text-sm sm:text-base text-slate-600">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">{cases.length}</div>
            <div className="text-xs sm:text-sm text-blue-700 font-medium">Total Cases</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">
              {Math.round(cases.reduce((acc, c) => acc + c.completionRate, 0) / cases.length)}%
            </div>
            <div className="text-xs sm:text-sm text-green-700 font-medium">Avg Completion</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">
              {Math.round(cases.reduce((acc, c) => acc + c.xpReward, 0) / cases.length)}
            </div>
            <div className="text-xs sm:text-sm text-purple-700 font-medium">Avg XP Reward</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-amber-600 mb-1">{categories.length}</div>
            <div className="text-xs sm:text-sm text-amber-700 font-medium">Categories</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

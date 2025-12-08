"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  BookOpen,
  FileText,
  Video,
  Download,
  ExternalLink,
  Clock,
  Users,
  Star,
  Play,
  Heart,
  Brain,
  Stethoscope,
  Activity,
  TrendingUp,
  Award,
  Filter
} from "lucide-react"
import { cn } from "@/lib/utils"

export function StudyMaterials() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "clinical-guides", name: "Clinical Guidelines", icon: FileText, count: 24 },
    { id: "video-lectures", name: "Video Lectures", icon: Video, count: 18 },
    { id: "case-studies", name: "Case Studies", icon: BookOpen, count: 32 },
    { id: "research-papers", name: "Research Papers", icon: FileText, count: 15 },
    { id: "podcasts", name: "Medical Podcasts", icon: Play, count: 12 },
    { id: "webinars", name: "Live Webinars", icon: Users, count: 8 }
  ]

  const materials = [
    {
      id: 1,
      title: "ACLS Guidelines 2023 Update",
      category: "clinical-guides",
      type: "PDF",
      duration: "45 min read",
      rating: 4.8,
      difficulty: "Intermediate",
      description: "Latest American Heart Association guidelines for advanced cardiac life support with practical implementation strategies.",
      tags: ["Emergency", "Cardiology", "Critical Care"],
      featured: true
    },
    {
      id: 2,
      title: "Neurological Examination Masterclass",
      category: "video-lectures",
      type: "Video",
      duration: "1h 30min",
      rating: 4.9,
      difficulty: "Advanced",
      description: "Comprehensive guide to performing thorough neurological examinations with real patient demonstrations.",
      tags: ["Neurology", "Physical Exam", "Clinical Skills"],
      featured: true
    },
    {
      id: 3,
      title: "Complex Case: Multi-system Trauma",
      category: "case-studies",
      type: "Interactive",
      duration: "2h 15min",
      rating: 4.7,
      difficulty: "Advanced",
      description: "Interactive case study following a complex trauma patient from ER presentation through discharge.",
      tags: ["Trauma", "Emergency", "Multi-disciplinary"],
      featured: false
    },
    {
      id: 4,
      title: "Pediatric Fever Management Protocol",
      category: "clinical-guides",
      type: "PDF",
      duration: "30 min read",
      rating: 4.6,
      difficulty: "Beginner",
      description: "Evidence-based approach to evaluating and managing fever in pediatric patients across different age groups.",
      tags: ["Pediatrics", "Infectious Disease", "Fever"],
      featured: false
    },
    {
      id: 5,
      title: "ECG Interpretation Workshop",
      category: "webinars",
      type: "Live Session",
      duration: "Live - Tomorrow 2PM",
      rating: 4.9,
      difficulty: "Intermediate",
      description: "Interactive webinar on systematic ECG interpretation with case-based learning and Q&A session.",
      tags: ["Cardiology", "ECG", "Diagnostics"],
      featured: true
    },
    {
      id: 6,
      title: "Medical Ethics in Modern Practice",
      category: "podcasts",
      type: "Audio",
      duration: "45 min",
      rating: 4.5,
      difficulty: "Intermediate",
      description: "Discussion on contemporary ethical challenges in medicine including AI integration and patient autonomy.",
      tags: ["Ethics", "Professional Development", "AI"],
      featured: false
    }
  ]

  const filteredMaterials = materials.filter(material =>
    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-700 border-green-200"
      case "Intermediate": return "bg-brand-100 text-brand-700 border-brand-200"
      case "Advanced": return "bg-purple-100 text-purple-700 border-purple-200"
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
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">Study Materials</h1>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-4">
          Access comprehensive educational resources, clinical guidelines, and expert-led content to enhance your medical knowledge.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search materials, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/70 border-slate-200 h-10 sm:h-11"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <select className="px-3 py-2 rounded-lg border border-slate-200 bg-white/70 text-sm h-10 sm:h-11 min-w-[140px]">
                <option>All Types</option>
                <option>PDF Guides</option>
                <option>Video Lectures</option>
                <option>Case Studies</option>
                <option>Webinars</option>
                <option>Podcasts</option>
              </select>
              <select className="px-3 py-2 rounded-lg border border-slate-200 bg-white/70 text-sm h-10 sm:h-11 min-w-[140px]">
                <option>All Difficulties</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Materials */}
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl md:text-2xl">Featured This Week</h2>
        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
          {materials.filter(m => m.featured).map((material) => {
            const CategoryIcon = getCategoryIcon(material.category)
            return (
              <Card key={material.id} className="group bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-brand-100 to-accent-100 flex items-center justify-center flex-shrink-0">
                        <CategoryIcon className="h-4 w-4 sm:h-5 sm:w-5 text-brand-600" />
                      </div>
                      <Badge className={cn("text-xs font-medium", getDifficultyColor(material.difficulty))}>
                        {material.difficulty}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-xs flex-shrink-0">
                      Featured
                    </Badge>
                  </div>
                  <CardTitle className="text-base sm:text-lg text-slate-900 group-hover:text-brand-600 transition-colors leading-tight line-clamp-2">
                    {material.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 sm:space-y-4">
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {material.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {material.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs bg-slate-50">
                        {tag}
                      </Badge>
                    ))}
                    {material.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs bg-slate-50">
                        +{material.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3 sm:gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span className="truncate">{material.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span>{material.rating}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8 px-2 sm:px-3 min-w-0">
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white shadow-sm h-8 px-2 sm:px-3 min-w-0">
                        <Play className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="hidden sm:inline truncate">Start</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* All Materials by Category */}
      <Tabs defaultValue="clinical-guides" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="inline-flex h-auto p-1 bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl min-w-max">
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

        {categories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
              {filteredMaterials
                .filter(material => material.category === category.id)
                .map((material) => {
                  const CategoryIcon = getCategoryIcon(material.category)
                  return (
                    <Card key={material.id} className="group bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
                      <CardContent className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-br from-brand-100 to-accent-100 flex items-center justify-center flex-shrink-0">
                            <CategoryIcon className="h-5 w-5 sm:h-6 sm:w-6 text-brand-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors text-sm sm:text-base leading-tight line-clamp-2">
                              {material.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">
                              {material.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge className={cn("text-xs font-medium", getDifficultyColor(material.difficulty))}>
                              {material.difficulty}
                            </Badge>
                            <span className="text-xs text-slate-500 truncate">{material.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs text-slate-600">{material.rating}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {material.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs bg-slate-50">
                              {tag}
                            </Badge>
                          ))}
                          {material.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs bg-slate-50">
                              +{material.tags.length - 2}
                            </Badge>
                          )}
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1 min-w-0 h-9 sm:h-10 text-xs sm:text-sm px-2">
                            <Download className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="hidden sm:inline truncate">Download</span>
                            <span className="sm:hidden truncate">DL</span>
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white shadow-sm flex-1 min-w-0 h-9 sm:h-10 text-xs sm:text-sm px-2">
                            <Play className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="hidden sm:inline truncate">Start</span>
                            <span className="sm:hidden truncate">Go</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>

            {filteredMaterials.filter(material => material.category === category.id).length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <BookOpen className="h-10 w-10 sm:h-12 sm:w-12 text-slate-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-slate-900 mb-2">No materials found</h3>
                <p className="text-sm sm:text-base text-slate-600">Try adjusting your search criteria.</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Quick Stats */}
      <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-3 sm:p-4 text-center">
            <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-brand-600 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-brand-700 mb-1">{materials.length}</div>
            <div className="text-xs sm:text-sm text-brand-600 font-medium">Total Materials</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-3 sm:p-4 text-center">
            <Video className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-green-700 mb-1">
              {materials.filter(m => m.category === "video-lectures").length}
            </div>
            <div className="text-xs sm:text-sm text-green-600 font-medium">Video Lectures</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-3 sm:p-4 text-center">
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-purple-700 mb-1">
              {materials.filter(m => m.featured).length}
            </div>
            <div className="text-xs sm:text-sm text-purple-600 font-medium">Featured</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200/50 shadow-sm hover:shadow-md transition-all duration-200">
          <CardContent className="p-3 sm:p-4 text-center">
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 mx-auto mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-amber-700 mb-1">{categories.length}</div>
            <div className="text-xs sm:text-sm text-amber-600 font-medium">Categories</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

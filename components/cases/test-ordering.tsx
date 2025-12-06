"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TestResultModal } from "./test-result-modal"
import {
  FlaskConical,
  Scan,
  Search,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  FileText,
  Heart,
  Brain,
  Droplets,
  Activity,
  Eye,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TestOrderingProps {
  orderedTests: any[]
  testResults: any[]
  onOrderTest: (test: any) => void
}

export function TestOrdering({ orderedTests, testResults, onOrderTest }: TestOrderingProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTest, setSelectedTest] = useState<any>(null)
  const [selectedResult, setSelectedResult] = useState<any>(null)
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)

  const handleViewResult = (test: any, result: any) => {
    setSelectedTest(test)
    setSelectedResult(result)
    setIsResultModalOpen(true)
  }

  const availableTests = [
    // Laboratory Tests
    {
      id: "cbc",
      name: "Complete Blood Count (CBC)",
      category: "laboratory",
      icon: Droplets,
      cost: 50,
      duration: "2-4 hours",
      description: "Measures red blood cells, white blood cells, and platelets"
    },
    {
      id: "bmp",
      name: "Basic Metabolic Panel",
      category: "laboratory",
      icon: FlaskConical,
      cost: 60,
      duration: "2-4 hours",
      description: "Tests kidney function, blood sugar, and electrolyte balance"
    },
    {
      id: "troponin",
      name: "Troponin I/T",
      category: "laboratory",
      icon: Heart,
      cost: 80,
      duration: "1-2 hours",
      description: "Cardiac biomarker for detecting heart muscle damage"
    },
    {
      id: "bnp",
      name: "BNP/NT-proBNP",
      category: "laboratory",
      icon: Heart,
      cost: 90,
      duration: "2-3 hours",
      description: "Tests for heart failure"
    },
    {
      id: "lipid",
      name: "Lipid Panel",
      category: "laboratory",
      icon: Droplets,
      cost: 55,
      duration: "3-5 hours",
      description: "Measures cholesterol and triglycerides"
    },
    {
      id: "d-dimer",
      name: "D-Dimer",
      category: "laboratory",
      icon: Activity,
      cost: 70,
      duration: "1-2 hours",
      description: "Tests for blood clots"
    },

    // Imaging Tests
    {
      id: "chest-xray",
      name: "Chest X-Ray",
      category: "imaging",
      icon: Scan,
      cost: 150,
      duration: "30 min",
      description: "Images of chest, lungs, heart, and bones"
    },
    {
      id: "ecg",
      name: "12-Lead ECG",
      category: "imaging",
      icon: Activity,
      cost: 100,
      duration: "15 min",
      description: "Records electrical activity of the heart"
    },
    {
      id: "echo",
      name: "Echocardiogram",
      category: "imaging",
      icon: Heart,
      cost: 300,
      duration: "45-60 min",
      description: "Ultrasound of the heart"
    },
    {
      id: "ct-chest",
      name: "CT Chest",
      category: "imaging",
      icon: Scan,
      cost: 500,
      duration: "30-45 min",
      description: "Detailed cross-sectional images of chest"
    },
    {
      id: "stress-test",
      name: "Cardiac Stress Test",
      category: "imaging",
      icon: Activity,
      cost: 400,
      duration: "60-90 min",
      description: "Tests heart function during physical stress"
    },
    {
      id: "ct-head",
      name: "CT Head",
      category: "imaging",
      icon: Brain,
      cost: 600,
      duration: "30 min",
      description: "Detailed images of the brain"
    }
  ]

  const filteredTests = availableTests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || test.category === selectedCategory
    const notOrdered = !orderedTests.some(ordered => ordered.id === test.id)

    return matchesSearch && matchesCategory && notOrdered
  })

  const getTestStatus = (testId: string) => {
    const ordered = orderedTests.find(t => t.id === testId)
    if (!ordered) return null
    return ordered.status
  }

  const getTestResult = (testId: string) => {
    return testResults.find(r => r.testId === testId)
  }

  return (
    <div className="h-[500px] sm:h-[550px] md:h-[600px] flex flex-col">
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1 flex flex-col">
        <div className="border-b border-slate-200 bg-slate-50/50 px-2 sm:px-3 md:px-4 py-2 sm:py-3">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400" />
              <Input
                placeholder="Search tests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 sm:pl-10 h-8 sm:h-9 text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto scrollbar-hide">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent inline-flex">
              <TabsTrigger value="all" className="text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap">All Tests</TabsTrigger>
              <TabsTrigger value="laboratory" className="text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap">Laboratory</TabsTrigger>
              <TabsTrigger value="imaging" className="text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap">Imaging</TabsTrigger>
              <TabsTrigger value="ordered" className="text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 sm:py-2 whitespace-nowrap">
                Ordered ({orderedTests.length})
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="all" className="flex-1 m-0 min-h-0">
          <ScrollArea className="h-full min-h-0">
            <div className="p-2 sm:p-3 md:p-4 space-y-2">
              {filteredTests.map((test) => {
                const TestIcon = test.icon
                return (
                  <Card
                    key={test.id}
                    className="hover:shadow-md transition-all cursor-pointer border border-slate-200"
                    onClick={() => setSelectedTest(test)}
                  >
                    <CardContent className="p-2 sm:p-3">
                      <div className="flex items-start justify-between gap-2 sm:gap-3">
                        <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                          <div className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <TestIcon className="h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-xs sm:text-sm text-slate-900 mb-0.5 sm:mb-1 line-clamp-1">{test.name}</h4>
                            <p className="text-[10px] sm:text-xs text-slate-600 line-clamp-1 sm:line-clamp-2">{test.description}</p>
                            <div className="flex items-center gap-2 sm:gap-3 mt-1 sm:mt-2">
                              <Badge variant="outline" className="text-[9px] sm:text-xs px-1 sm:px-2 py-0.5">
                                <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                                {test.duration}
                              </Badge>
                              <span className="text-[10px] sm:text-xs text-slate-600">${test.cost}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            onOrderTest(test)
                          }}
                          className="bg-blue-600 hover:bg-blue-700 h-7 sm:h-8 px-2 sm:px-3 text-xs flex-shrink-0"
                        >
                          <Plus className="h-3 w-3 sm:mr-1" />
                          <span className="hidden sm:inline">Order</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              {filteredTests.length === 0 && (
                <div className="text-center py-12">
                  <FlaskConical className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm text-slate-600">No tests found</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="laboratory" className="flex-1 m-0 min-h-0">
          <ScrollArea className="h-full min-h-0">
            <div className="p-4 space-y-2">
              {filteredTests.filter(t => t.category === "laboratory").map((test) => {
                const TestIcon = test.icon
                return (
                  <Card
                    key={test.id}
                    className="hover:shadow-md transition-all cursor-pointer border border-slate-200"
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <TestIcon className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-slate-900 mb-1">{test.name}</h4>
                            <p className="text-xs text-slate-600">{test.description}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <Badge variant="outline" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {test.duration}
                              </Badge>
                              <span className="text-xs text-slate-600">${test.cost}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => onOrderTest(test)}
                          className="bg-blue-600 hover:bg-blue-700 h-8"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="imaging" className="flex-1 m-0 min-h-0">
          <ScrollArea className="h-full min-h-0">
            <div className="p-4 space-y-2">
              {filteredTests.filter(t => t.category === "imaging").map((test) => {
                const TestIcon = test.icon
                return (
                  <Card
                    key={test.id}
                    className="hover:shadow-md transition-all cursor-pointer border border-slate-200"
                  >
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                            <TestIcon className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-slate-900 mb-1">{test.name}</h4>
                            <p className="text-xs text-slate-600">{test.description}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <Badge variant="outline" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                {test.duration}
                              </Badge>
                              <span className="text-xs text-slate-600">${test.cost}</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => onOrderTest(test)}
                          className="bg-purple-600 hover:bg-purple-700 h-8"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Order
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="ordered" className="flex-1 m-0 min-h-0">
          <ScrollArea className="h-full min-h-0">
            <div className="p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3">
              {orderedTests.length === 0 ? (
                <div className="text-center py-12">
                  <FlaskConical className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm text-slate-600">No tests ordered yet</p>
                  <p className="text-xs text-slate-500 mt-1">Order tests to begin investigation</p>
                </div>
              ) : (
                orderedTests.map((test) => {
                  const result = getTestResult(test.id)
                  const TestIcon = test.icon || FlaskConical

                  return (
                    <Card key={test.id} className="border border-slate-200">
                      <CardContent className="p-2 sm:p-3">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className={cn(
                            "h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-lg flex items-center justify-center flex-shrink-0",
                            test.status === "completed" ? "bg-green-50" : "bg-slate-50"
                          )}>
                            <TestIcon className={cn(
                              "h-4 w-4 sm:h-4.5 sm:w-4.5 md:h-5 md:w-5",
                              test.status === "completed" ? "text-green-600" : "text-slate-600"
                            )} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1 sm:mb-2">
                              <h4 className="font-medium text-xs sm:text-sm text-slate-900 line-clamp-1">{test.name}</h4>
                              {test.status === "processing" && (
                                <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-[9px] sm:text-xs px-1 sm:px-2 py-0.5 flex-shrink-0">
                                  <Loader2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1 animate-spin" />
                                  <span className="hidden xs:inline">Processing</span>
                                </Badge>
                              )}
                              {test.status === "completed" && (
                                <Badge className="bg-green-100 text-green-700 border-green-200 text-[9px] sm:text-xs px-1 sm:px-2 py-0.5 flex-shrink-0">
                                  <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                                  <span className="hidden xs:inline">Completed</span>
                                </Badge>
                              )}
                              {test.status === "failed" && (
                                <Badge variant="destructive" className="text-[9px] sm:text-xs px-1 sm:px-2 py-0.5 flex-shrink-0">
                                  <XCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                                  <span className="hidden xs:inline">Failed</span>
                                </Badge>
                              )}
                            </div>

                            {result && (
                              <div className="bg-slate-50 rounded-lg p-2 sm:p-3 mt-1.5 sm:mt-2 border border-slate-200">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                                  <div className="flex items-center gap-1.5 sm:gap-2">
                                    <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-slate-600 flex-shrink-0" />
                                    <span className="text-[10px] sm:text-xs font-medium text-slate-900">Results Available</span>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleViewResult(test, result)}
                                    className="h-6 sm:h-7 text-[10px] sm:text-xs px-2 w-full sm:w-auto"
                                  >
                                    <Eye className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                                    View Report
                                  </Button>
                                </div>
                                <p className="text-[10px] sm:text-xs text-slate-700 mb-1 sm:mb-2 line-clamp-2">{result.results.summary}</p>
                                <p className="text-[10px] sm:text-xs text-slate-600 line-clamp-1">{result.results.interpretation}</p>
                                {result.results.criticalFindings && result.results.criticalFindings.length > 0 && (
                                  <div className="mt-1.5 sm:mt-2 bg-red-50 border border-red-200 rounded px-2 py-1.5 animate-pulse">
                                    <p className="text-[10px] sm:text-xs font-medium text-red-900 flex items-center gap-1">
                                      <AlertCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 flex-shrink-0" />
                                      <span className="line-clamp-1">Critical Findings - Click to view</span>
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Test Result Modal */}
      <TestResultModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        test={selectedTest}
        result={selectedResult}
      />
    </div>
  )
}

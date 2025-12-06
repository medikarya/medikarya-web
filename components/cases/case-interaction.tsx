"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIPatientChat } from "./ai-patient-chat"
import { TestOrdering } from "./test-ordering"
import { DiagnosisSubmission } from "./diagnosis-submission"
import { CaseFeedback } from "./case-feedback"
import { PatientPresentation } from "./patient-presentation"
import {
  MessageSquare,
  FlaskConical,
  Stethoscope,
  X,
  User,
  AlertCircle,
  Info
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface CaseInteractionProps {
  caseData: {
    patient: {
      name: string
      age: number
      gender: string
      chiefComplaint: string
    }
    xpReward?: number
    // Add any other required fields
  }
  onExit: () => void
}

export function CaseInteraction({ caseData, onExit }: CaseInteractionProps) {
  const [activeTab, setActiveTab] = useState("chat")
  const [orderedTests, setOrderedTests] = useState<any[]>([])
  const [testResults, setTestResults] = useState<any[]>([])
  const [chatHistory, setChatHistory] = useState<any[]>([])
  const [diagnosisSubmitted, setDiagnosisSubmitted] = useState(false)
  const [feedback, setFeedback] = useState<any>(null)
  const [isPatientInfoOpen, setIsPatientInfoOpen] = useState(false)

  const handleTestOrder = async (test: any) => {
    // Add test to ordered tests
    const newTest = {
      ...test,
      id: Date.now(),
      orderedAt: new Date().toISOString(),
      status: "processing"
    }
    setOrderedTests(prev => [...prev, newTest])

    // Simulate test processing and get results
    setTimeout(async () => {
      try {
        // TODO: Replace with actual API call to get AI-generated results
        const result = await generateTestResult(test, caseData)
        setTestResults(prev => [...prev, result])
        
        // Update test status
        setOrderedTests(prev => 
          prev.map(t => t.id === newTest.id ? { ...t, status: "completed" } : t)
        )
      } catch (error) {
        console.error("Error getting test results:", error)
        setOrderedTests(prev => 
          prev.map(t => t.id === newTest.id ? { ...t, status: "failed" } : t)
        )
      }
    }, 2000) // Simulate processing time
  }

  const handleDiagnosisSubmit = async (diagnosis: any) => {
    setDiagnosisSubmitted(true)
    
    // TODO: Replace with actual API call to get AI feedback
    const aiFeedback = await generateFeedback(diagnosis, orderedTests, chatHistory, caseData)
    setFeedback(aiFeedback)
  }

  const handleChatMessage = (message: any) => {
    setChatHistory(prev => [...prev, message])
  }

  if (diagnosisSubmitted && feedback) {
    return (
      <CaseFeedback
        feedback={feedback}
        caseData={caseData}
        orderedTests={orderedTests}
        onExit={onExit}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              {/* Mobile Patient Info Button */}
              <Sheet open={isPatientInfoOpen} onOpenChange={setIsPatientInfoOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden h-8 w-8 p-0 flex-shrink-0"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
                  <SheetHeader className="px-4 py-3 border-b">
                    <SheetTitle>Patient Information</SheetTitle>
                  </SheetHeader>
                  <div className="overflow-y-auto h-[calc(100vh-60px)] p-4">
                    <PatientPresentation patient={caseData.patient} />
                  </div>
                </SheetContent>
              </Sheet>

              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-slate-900 text-xs sm:text-sm md:text-base truncate">{caseData.patient.name}</h2>
                <p className="text-[10px] sm:text-xs text-slate-600 truncate">
                  {caseData.patient.age}y • {caseData.patient.gender}
                  <span className="hidden md:inline"> • {caseData.patient.chiefComplaint}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 hidden xs:flex">
                +{caseData.xpReward} XP
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onExit}
                className="hover:bg-red-50 hover:text-red-600 h-7 sm:h-8 px-1.5 sm:px-3"
              >
                <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-1.5" />
                <span className="hidden sm:inline text-xs sm:text-sm">Exit</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-2 sm:px-3 md:px-4 py-2 sm:py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {/* Left Sidebar - Patient Info - Hidden on mobile, shown in sheet */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-20">
              <PatientPresentation patient={caseData.patient} />
            </div>
          </div>

          {/* Main Interaction Area */}
          <div className="lg:col-span-2 min-w-0">
            <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b border-slate-200 bg-slate-50/50">
                  <div className="overflow-x-auto scrollbar-hide">
                    <TabsList className="w-full justify-start h-auto p-0 bg-transparent rounded-none inline-flex min-w-full">
                      <TabsTrigger
                        value="chat"
                        className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none text-[11px] sm:text-xs md:text-sm whitespace-nowrap flex-1 sm:flex-none"
                      >
                        <MessageSquare className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                        <span className="hidden xs:inline">Interview</span>
                        <span className="xs:hidden">Chat</span>
                      </TabsTrigger>
                      <TabsTrigger
                        value="tests"
                        className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none text-[11px] sm:text-xs md:text-sm whitespace-nowrap flex-1 sm:flex-none relative"
                      >
                        <FlaskConical className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                        <span className="hidden xs:inline">Tests</span>
                        <span className="xs:hidden">Tests</span>
                        {orderedTests.length > 0 && (
                          <Badge className="ml-0.5 sm:ml-1 h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center text-[9px] sm:text-[10px] md:text-xs">
                            {orderedTests.length}
                          </Badge>
                        )}
                      </TabsTrigger>
                      <TabsTrigger
                        value="diagnosis"
                        className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none text-[11px] sm:text-xs md:text-sm whitespace-nowrap flex-1 sm:flex-none"
                      >
                        <Stethoscope className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                        <span className="hidden xs:inline">Diagnosis</span>
                        <span className="xs:hidden">Dx</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>

                <TabsContent value="chat" className="p-0 m-0">
                  <AIPatientChat
                    caseData={caseData}
                    onMessageSent={handleChatMessage}
                  />
                </TabsContent>

                <TabsContent value="tests" className="p-0 m-0">
                  <TestOrdering
                    orderedTests={orderedTests}
                    testResults={testResults}
                    onOrderTest={handleTestOrder}
                  />
                </TabsContent>

                <TabsContent value="diagnosis" className="p-0 m-0">
                  <DiagnosisSubmission
                    orderedTests={orderedTests}
                    testResults={testResults}
                    chatHistory={chatHistory}
                    onSubmit={handleDiagnosisSubmit}
                  />
                </TabsContent>
              </Tabs>
            </Card>

            {/* Quick Tips */}
            <Card className="mt-3 sm:mt-4 bg-blue-50/50 border-blue-200">
              <div className="p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-blue-900 min-w-0">
                  <p className="font-medium mb-1">Clinical Tip</p>
                  <p className="text-blue-800 leading-relaxed">
                    Start by taking a thorough history. Ask about the onset, duration, and characteristics of symptoms. 
                    Order tests strategically based on your clinical suspicion.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to generate test results (will be replaced with API call)
async function generateTestResult(test: any, caseData: any) {
  // TODO: Call AI API to generate realistic test results based on patient condition
  return {
    id: Date.now(),
    testId: test.id,
    testName: test.name,
    category: test.category,
    completedAt: new Date().toISOString(),
    results: {
      // Mock results - will be replaced with AI-generated results
      summary: `${test.name} completed`,
      values: [],
      interpretation: "Results within normal limits",
      criticalFindings: []
    }
  }
}

// Helper function to generate feedback (will be replaced with API call)
async function generateFeedback(diagnosis: any, tests: any[], chatHistory: any[], caseData: any) {
  // TODO: Call AI API to generate comprehensive feedback
  return {
    correctDiagnosis: "Acute Myocardial Infarction",
    studentDiagnosis: diagnosis.primaryDiagnosis,
    isCorrect: true,
    score: 85,
    feedback: {
      strengths: [
        "Excellent history taking",
        "Appropriate test ordering",
        "Good clinical reasoning"
      ],
      improvements: [
        "Consider ordering troponin levels earlier",
        "Could have asked more about family history"
      ],
      testingEfficiency: {
        appropriateTests: tests.filter(t => t.status === "completed").length,
        unnecessaryTests: 0,
        missedTests: ["Troponin I"]
      }
    }
  }
}

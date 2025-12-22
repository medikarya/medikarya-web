"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Activity,
  Award,
  ClipboardCheck,
  FlaskConical,
  ArrowRight,
  Home,
  RotateCcw,
  FileText,
  History,
  Info
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CaseFeedbackProps {
  feedback: any
  caseData: any
  orderedTests: any[]
  onExit: () => void
  onReset?: () => void
}

export function CaseFeedback({ feedback, caseData, orderedTests, onExit, onReset }: CaseFeedbackProps) {
  const isCorrect = feedback.isCorrect
  const score = feedback.score

  return (
    <div className="min-h-screen bg-slate-50">
      <div
        className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hover:scrollbar-thumb-slate-400"
        data-lenis-prevent
      >
        <div className="container mx-auto px-4 md:px-6 py-8 max-w-5xl pb-20">

          {/* Top Navigation / Breadcrumb Look */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Activity className="h-4 w-4" />
              <span>Case Evaluation</span>
              <span className="text-slate-300">/</span>
              <span className="font-medium text-slate-900">{caseData.patient.name}</span>
            </div>
            <Badge variant="outline" className="bg-white text-slate-600 border-slate-200">
              {new Date().toLocaleDateString()}
            </Badge>
          </div>

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Performance Report</h1>
              <p className="text-slate-600 max-w-2xl">
                Evaluation of clinical reasoning, history taking, and test ordering efficiency for the presented case.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
              <div className="text-right">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Score</div>
                <div className="text-3xl font-bold text-brand-600">{score}/100</div>
              </div>
              <div className="h-12 w-12 rounded-full bg-brand-50 flex items-center justify-center border-2 border-brand-100">
                <Award className="h-6 w-6 text-brand-600" />
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", isCorrect ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700")}>
                  <ClipboardCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500">Diagnosis Status</div>
                  <div className={cn("text-lg font-bold", isCorrect ? "text-green-700" : "text-amber-700")}>
                    {isCorrect ? "Correct" : "Incorrect"}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <FlaskConical className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500">Tests Ordered</div>
                  <div className="text-lg font-bold text-slate-900">
                    {orderedTests.length} <span className="text-xs font-normal text-slate-500">tests</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500">XP Gained</div>
                  <div className="text-lg font-bold text-slate-900">+{caseData.xpReward} XP</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Detailed Clinical Feedback */}
            <div className="lg:col-span-2 space-y-8">

              {/* Diagnosis Analysis */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-slate-500" />
                  <h3 className="text-lg font-semibold text-slate-900">Diagnostic Accuracy</h3>
                </div>
                <Card className="border-slate-200 shadow-sm overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    <div className="p-5 bg-slate-50/50">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Submitted Diagnosis</div>
                      <div className="font-medium text-slate-900 text-lg">{feedback.studentDiagnosis || "No diagnosis provided"}</div>
                    </div>
                    <div className="p-5 bg-green-50/30">
                      <div className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-2">Final Diagnosis</div>
                      <div className="font-medium text-slate-900 text-lg flex items-center gap-2">
                        {feedback.correctDiagnosis}
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  </div>
                </Card>
              </section>

              {/* Clinical Evaluation */}
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <History className="h-5 w-5 text-slate-500" />
                  <h3 className="text-lg font-semibold text-slate-900">Clinical Evaluation</h3>
                </div>

                <Card className="border-slate-200 shadow-sm">
                  <CardHeader className="pb-2 border-b border-slate-100">
                    <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Strengths & Observations</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    {feedback.feedback.strengths.length > 0 ? (
                      <div className="space-y-3">
                        {feedback.feedback.strengths.map((str: string, i: number) => (
                          <div key={i} className="flex gap-3 text-sm text-slate-700">
                            <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                            <span className="leading-relaxed">{str.replace(/✅/g, '').trim()}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 italic">No specific strengths noted.</p>
                    )}

                    {feedback.feedback.improvements.length > 0 && (
                      <>
                        <Separator className="my-2" />
                        <div className="space-y-3">
                          {feedback.feedback.improvements.map((imp: string, i: number) => (
                            <div key={i} className="flex gap-3 text-sm text-slate-700">
                              <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
                              <span className="leading-relaxed">{imp.replace(/❌/g, '').trim()}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </section>

              {/* Learning Points */}
              <section>
                <Card className="bg-slate-50 border-slate-200 border-l-4 border-l-brand-500 shadow-sm">
                  <CardContent className="p-5">
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                      <Info className="h-4 w-4 text-brand-600" />
                      Clinical Takeaway
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      This case demonstrates the importance of systematic evaluation in {caseData.patient.age}-year-old patients presenting with {caseData.patient.chiefComplaint}.
                      Accurate diagnosis relies on distinguishing between similar presentations through detailed history taking and targeted investigations.
                    </p>
                  </CardContent>
                </Card>
              </section>

            </div>

            {/* Right Column: Testing Stats */}
            <div className="space-y-6">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <FlaskConical className="h-5 w-5 text-slate-500" />
                  <h3 className="text-lg font-semibold text-slate-900">Testing Efficiency</h3>
                </div>

                <Card className="border-slate-200 shadow-sm">
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-slate-100">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-700">Ordered Appropriate</span>
                        <span className="text-sm font-bold text-green-600">{feedback.feedback.testingEfficiency.appropriateTests}</span>
                      </div>
                      <Progress value={Math.min(100, (feedback.feedback.testingEfficiency.appropriateTests * 20))} className="h-1.5 bg-slate-100" indicatorClassName="bg-green-500" />
                    </div>
                    <div className="p-4 border-b border-slate-100">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-700">Unnecessary</span>
                        <span className="text-sm font-bold text-amber-600">{feedback.feedback.testingEfficiency.unnecessaryTests}</span>
                      </div>
                      <Progress value={Math.min(100, (feedback.feedback.testingEfficiency.unnecessaryTests * 20))} className="h-1.5 bg-slate-100" indicatorClassName="bg-amber-500" />
                    </div>
                    <div className="p-4 bg-slate-50">
                      <div className="text-sm font-medium text-slate-700 mb-3">Missed Opportunities</div>
                      {feedback.feedback.testingEfficiency.missedTests && feedback.feedback.testingEfficiency.missedTests.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {feedback.feedback.testingEfficiency.missedTests.map((test: string, i: number) => (
                            <Badge key={i} variant="secondary" className="bg-white border-slate-200 text-slate-600 font-normal hover:bg-white text-xs">
                              {test}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 italic">None</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-12 pt-6 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row gap-3 justify-end items-center">
              <Button
                variant="ghost"
                onClick={onExit}
                className="w-full sm:w-auto text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                <Home className="mr-2 h-4 w-4" />
                Return to Dashboard
              </Button>
              <Button
                size="lg"
                onClick={onReset || (() => window.location.reload())}
                className="w-full sm:w-auto min-w-[200px] h-11 text-base font-medium bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Retry Case
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

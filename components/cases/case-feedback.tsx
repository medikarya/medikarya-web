"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingUp,
  Award,
  Target,
  FlaskConical,
  MessageSquare,
  ArrowRight,
  Home,
  RotateCcw,
  Star,
  ThumbsUp,
  ThumbsDown,
  Lightbulb
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CaseFeedbackProps {
  feedback: any
  caseData: any
  orderedTests: any[]
  onExit: () => void
}

export function CaseFeedback({ feedback, caseData, orderedTests, onExit }: CaseFeedbackProps) {
  const isCorrect = feedback.isCorrect
  const score = feedback.score

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30">
      <ScrollArea className="h-screen">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 max-w-5xl">
          {/* Header */}
          <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <div className={cn(
              "inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto",
              isCorrect ? "bg-green-100" : "bg-amber-100"
            )}>
              {isCorrect ? (
                <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              ) : (
                <AlertCircle className="h-8 w-8 sm:h-10 sm:w-10 text-amber-600" />
              )}
            </div>
            
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1.5 sm:mb-2">
                {isCorrect ? "Excellent Work!" : "Good Effort!"}
              </h1>
              <p className="text-slate-600 text-sm sm:text-base md:text-lg px-2">
                {isCorrect 
                  ? "You've successfully diagnosed the patient" 
                  : "Let's review your diagnosis and learn from this case"
                }
              </p>
            </div>

            {/* Score */}
            <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-2 border-blue-200 max-w-md mx-auto">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center space-y-2 sm:space-y-3">
                  <div className="text-4xl sm:text-5xl font-bold text-blue-600">{score}%</div>
                  <div className="text-xs sm:text-sm text-slate-700">Overall Performance Score</div>
                  <Progress value={score} className="h-2 sm:h-3" />
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                    <span className="text-base sm:text-lg font-semibold text-slate-900">+{caseData.xpReward} XP Earned</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Diagnosis Comparison */}
          <Card className="mb-4 sm:mb-6 border-2 border-slate-200">
            <CardHeader className="px-3 sm:px-6 py-3 sm:py-6">
              <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                Diagnosis Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                    <span className="text-xs sm:text-sm font-semibold text-green-900">Correct Diagnosis</span>
                  </div>
                  <p className="text-sm sm:text-base md:text-lg font-medium text-green-900">{feedback.correctDiagnosis}</p>
                </div>

                <div className={cn(
                  "border rounded-lg p-3 sm:p-4",
                  isCorrect 
                    ? "bg-green-50 border-green-200" 
                    : "bg-amber-50 border-amber-200"
                )}>
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    {isCorrect ? (
                      <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" />
                    )}
                    <span className={cn(
                      "text-xs sm:text-sm font-semibold",
                      isCorrect ? "text-green-900" : "text-amber-900"
                    )}>
                      Your Diagnosis
                    </span>
                  </div>
                  <p className={cn(
                    "text-sm sm:text-base md:text-lg font-medium",
                    isCorrect ? "text-green-900" : "text-amber-900"
                  )}>
                    {feedback.studentDiagnosis}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card className="mb-4 sm:mb-6 border-2 border-green-200 bg-green-50/30">
            <CardHeader className="px-3 sm:px-6 py-3 sm:py-6">
              <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-green-900 text-base sm:text-lg">
                <ThumbsUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                What You Did Well
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <ul className="space-y-1.5 sm:space-y-2">
                {feedback.feedback.strengths.map((strength: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm md:text-base text-slate-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          {feedback.feedback.improvements.length > 0 && (
            <Card className="mb-4 sm:mb-6 border-2 border-amber-200 bg-amber-50/30">
              <CardHeader className="px-3 sm:px-6 py-3 sm:py-6">
                <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-amber-900 text-base sm:text-lg">
                  <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
                <ul className="space-y-1.5 sm:space-y-2">
                  {feedback.feedback.improvements.map((improvement: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm md:text-base text-slate-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Test Ordering Efficiency */}
          <Card className="mb-4 sm:mb-6 border-2 border-blue-200">
            <CardHeader className="px-3 sm:px-6 py-3 sm:py-6">
              <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg">
                <FlaskConical className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                Testing Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                <div className="text-center p-2 sm:p-3 md:p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-0.5 sm:mb-1">
                    {feedback.feedback.testingEfficiency.appropriateTests}
                  </div>
                  <div className="text-[10px] sm:text-xs text-green-700 font-medium">Appropriate</div>
                </div>

                <div className="text-center p-2 sm:p-3 md:p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-0.5 sm:mb-1">
                    {feedback.feedback.testingEfficiency.unnecessaryTests}
                  </div>
                  <div className="text-[10px] sm:text-xs text-amber-700 font-medium">Unnecessary</div>
                </div>

                <div className="text-center p-2 sm:p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-0.5 sm:mb-1">
                    {feedback.feedback.testingEfficiency.missedTests?.length || 0}
                  </div>
                  <div className="text-[10px] sm:text-xs text-blue-700 font-medium">Missed</div>
                </div>
              </div>

              {feedback.feedback.testingEfficiency.missedTests && 
               feedback.feedback.testingEfficiency.missedTests.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm font-medium text-blue-900 mb-1.5 sm:mb-2">
                    Consider ordering these tests:
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {feedback.feedback.testingEfficiency.missedTests.map((test: string, index: number) => (
                      <Badge key={index} variant="outline" className="bg-white text-blue-700 border-blue-300 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                        {test}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Learning Points */}
          <Card className="mb-4 sm:mb-6 border-2 border-purple-200 bg-purple-50/30">
            <CardHeader className="px-3 sm:px-6 py-3 sm:py-6">
              <CardTitle className="flex items-center gap-1.5 sm:gap-2 text-purple-900 text-base sm:text-lg">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                Key Learning Points
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base text-slate-700">
                <p>
                  <strong>Clinical Presentation:</strong> {caseData.patient.chiefComplaint}
                </p>
                <Separator />
                <p>
                  <strong>Diagnosis:</strong> {feedback.correctDiagnosis}
                </p>
                <Separator />
                <p>
                  <strong>Key Features:</strong> This case demonstrates systematic evaluation, appropriate testing, and evidence-based diagnosis.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={onExit}
              className="w-full sm:min-w-[180px] md:min-w-[200px] h-10 sm:h-11 text-sm sm:text-base"
            >
              <Home className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Back to Cases
            </Button>
            <Button
              size="lg"
              onClick={() => window.location.reload()}
              className="w-full sm:min-w-[180px] md:min-w-[200px] h-10 sm:h-11 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
            >
              <RotateCcw className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Try Another Case
            </Button>
          </div>

          {/* Footer Note */}
          <Card className="mt-6 sm:mt-8 bg-slate-50 border-slate-200">
            <CardContent className="p-3 sm:p-4 text-center">
              <p className="text-xs sm:text-sm text-slate-600">
                <MessageSquare className="inline h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                Review this feedback to improve your clinical reasoning.
              </p>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}

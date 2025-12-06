"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Stethoscope,
  Plus,
  X,
  AlertCircle,
  CheckCircle2,
  Send,
  FileText,
  Pill
} from "lucide-react"

interface DiagnosisSubmissionProps {
  orderedTests: any[]
  testResults: any[]
  chatHistory: any[]
  onSubmit: (diagnosis: any) => void
}

export function DiagnosisSubmission({
  orderedTests,
  testResults,
  chatHistory,
  onSubmit
}: DiagnosisSubmissionProps) {
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState("")
  const [differentialDiagnoses, setDifferentialDiagnoses] = useState<string[]>([])
  const [newDifferential, setNewDifferential] = useState("")
  const [clinicalReasoning, setClinicalReasoning] = useState("")
  const [treatmentPlan, setTreatmentPlan] = useState("")
  const [medications, setMedications] = useState<string[]>([])
  const [newMedication, setNewMedication] = useState("")

  const handleAddDifferential = () => {
    if (newDifferential.trim() && differentialDiagnoses.length < 5) {
      setDifferentialDiagnoses([...differentialDiagnoses, newDifferential.trim()])
      setNewDifferential("")
    }
  }

  const handleRemoveDifferential = (index: number) => {
    setDifferentialDiagnoses(differentialDiagnoses.filter((_, i) => i !== index))
  }

  const handleAddMedication = () => {
    if (newMedication.trim() && medications.length < 10) {
      setMedications([...medications, newMedication.trim()])
      setNewMedication("")
    }
  }

  const handleRemoveMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (!primaryDiagnosis.trim()) {
      alert("Please enter a primary diagnosis")
      return
    }

    const diagnosis = {
      primaryDiagnosis: primaryDiagnosis.trim(),
      differentialDiagnoses,
      clinicalReasoning: clinicalReasoning.trim(),
      treatmentPlan: treatmentPlan.trim(),
      medications,
      submittedAt: new Date().toISOString()
    }

    onSubmit(diagnosis)
  }

  const completedTests = orderedTests.filter(t => t.status === "completed")
  const hasResults = testResults.length > 0

  return (
    <ScrollArea className="h-[500px] sm:h-[550px] md:h-[600px]">
      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5 md:space-y-6">
        {/* Summary Section */}
        <Card className="bg-blue-50/50 border-blue-200">
          <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
            <CardTitle className="text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
              <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
              Case Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 px-3 sm:px-6 pb-3 sm:pb-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 text-center">
              <div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">{chatHistory.length}</div>
                <div className="text-[10px] sm:text-xs text-blue-700">Questions</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-purple-600">{completedTests.length}</div>
                <div className="text-[10px] sm:text-xs text-purple-700">Tests</div>
              </div>
              <div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">{testResults.length}</div>
                <div className="text-[10px] sm:text-xs text-green-700">Results</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Primary Diagnosis */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="primary-diagnosis" className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2">
            <Stethoscope className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
            Primary Diagnosis *
          </Label>
          <Input
            id="primary-diagnosis"
            placeholder="Enter primary diagnosis..."
            value={primaryDiagnosis}
            onChange={(e) => setPrimaryDiagnosis(e.target.value)}
            className="h-9 sm:h-10 md:h-11 text-xs sm:text-sm"
          />
          <p className="text-[10px] sm:text-xs text-slate-600">
            What is your main diagnosis based on the patient's presentation?
          </p>
        </div>

        <Separator />

        {/* Differential Diagnoses */}
        <div className="space-y-2 sm:space-y-3">
          <Label className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2">
            <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600" />
            Differential Diagnoses
          </Label>
          
          <div className="flex gap-1.5 sm:gap-2">
            <Input
              placeholder="Add differential diagnosis"
              value={newDifferential}
              onChange={(e) => setNewDifferential(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddDifferential()}
              className="flex-1 h-9 sm:h-10 text-xs sm:text-sm"
            />
            <Button
              onClick={handleAddDifferential}
              disabled={!newDifferential.trim() || differentialDiagnoses.length >= 5}
              variant="outline"
              className="h-9 sm:h-10 w-9 sm:w-10 p-0 flex-shrink-0"
            >
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>

          {differentialDiagnoses.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {differentialDiagnoses.map((diagnosis, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="pl-2 sm:pl-3 pr-1 py-1 sm:py-1.5 text-xs sm:text-sm"
                >
                  {diagnosis}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveDifferential(index)}
                    className="h-4 w-4 sm:h-5 sm:w-5 p-0 ml-1 sm:ml-2 hover:bg-slate-300"
                  >
                    <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
          
          <p className="text-[10px] sm:text-xs text-slate-600">
            List other possible diagnoses ({differentialDiagnoses.length}/5)
          </p>
        </div>

        <Separator />

        {/* Clinical Reasoning */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="reasoning" className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
            Clinical Reasoning
          </Label>
          <Textarea
            id="reasoning"
            placeholder="Explain your diagnostic reasoning..."
            value={clinicalReasoning}
            onChange={(e) => setClinicalReasoning(e.target.value)}
            className="min-h-[100px] sm:min-h-[120px] resize-none text-xs sm:text-sm"
          />
          <p className="text-[10px] sm:text-xs text-slate-600">
            Explain your thought process and key findings
          </p>
        </div>

        <Separator />

        {/* Treatment Plan */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="treatment" className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2">
            <Pill className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-600" />
            Treatment Plan
          </Label>
          <Textarea
            id="treatment"
            placeholder="Describe your treatment plan..."
            value={treatmentPlan}
            onChange={(e) => setTreatmentPlan(e.target.value)}
            className="min-h-[80px] sm:min-h-[100px] resize-none text-xs sm:text-sm"
          />
        </div>

        {/* Medications */}
        <div className="space-y-2 sm:space-y-3">
          <Label className="text-xs sm:text-sm font-semibold">Medications to Prescribe</Label>
          
          <div className="flex gap-1.5 sm:gap-2">
            <Input
              placeholder="Add medication..."
              value={newMedication}
              onChange={(e) => setNewMedication(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddMedication()}
              className="flex-1 h-9 sm:h-10 text-xs sm:text-sm"
            />
            <Button
              onClick={handleAddMedication}
              disabled={!newMedication.trim() || medications.length >= 10}
              variant="outline"
              className="h-9 sm:h-10 w-9 sm:w-10 p-0 flex-shrink-0"
            >
              <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>

          {medications.length > 0 && (
            <div className="space-y-1.5 sm:space-y-2">
              {medications.map((medication, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-purple-50 border border-purple-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2"
                >
                  <span className="text-xs sm:text-sm text-purple-900 break-words pr-2">{medication}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveMedication(index)}
                    className="h-5 w-5 sm:h-6 sm:w-6 p-0 hover:bg-purple-200 flex-shrink-0"
                  >
                    <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Warning if no tests */}
        {!hasResults && (
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-amber-900">
                <p className="font-medium mb-1">No test results available</p>
                <p className="text-amber-800">
                  Consider ordering diagnostic tests before submitting.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-3 sm:pt-4">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto text-xs sm:text-sm h-9 sm:h-10"
          >
            Save Draft
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!primaryDiagnosis.trim()}
            className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 w-full sm:min-w-[150px] text-xs sm:text-sm h-9 sm:h-10"
          >
            <Send className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Submit Diagnosis
          </Button>
        </div>
      </div>
    </ScrollArea>
  )
}

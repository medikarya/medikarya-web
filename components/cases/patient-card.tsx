"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Calendar,
  Activity,
  Heart,
  Thermometer,
  Wind,
  Droplets,
  AlertCircle,
  Pill,
  Play,
  FileText
} from "lucide-react"

interface PatientCardProps {
  patient: {
    name: string
    age: number
    gender: string
    mrn: string
    admissionDate: string
    chiefComplaint: string
    vitalSigns: {
      bloodPressure: string
      heartRate: string
      temperature: string
      respiratoryRate: string
      oxygenSaturation: string
    }
    allergies: string[]
    currentMedications: string[]
  }
  caseTitle: string
  onStartCase: () => void
}

export function PatientCard({ patient, caseTitle, onStartCase }: PatientCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge className="bg-brand-100 text-brand-700 border-brand-200 px-4 py-1">
          Case Study
        </Badge>
        <h1 className="text-3xl font-bold text-slate-900">{caseTitle}</h1>
        <p className="text-slate-600">
          Review the patient information below and start the case when ready
        </p>
      </div>

      {/* Patient Information Card */}
      <Card className="bg-white/90 backdrop-blur-sm border-2 border-slate-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-brand-50 to-accent-50 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-slate-900">{patient.name}</CardTitle>
                <div className="flex items-center gap-3 mt-1 text-sm text-slate-600">
                  <span>{patient.age} years old</span>
                  <span>•</span>
                  <span>{patient.gender}</span>
                  <span>•</span>
                  <span className="font-mono text-xs">{patient.mrn}</span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="bg-white">
              <Calendar className="mr-2 h-3 w-3" />
              {formatDate(patient.admissionDate)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Chief Complaint */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-1">Chief Complaint</h3>
                <p className="text-amber-800">{patient.chiefComplaint}</p>
              </div>
            </div>
          </div>

          {/* Vital Signs */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Activity className="h-5 w-5 text-brand-600" />
              Vital Signs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-xs text-slate-600 font-medium">Blood Pressure</span>
                </div>
                <p className="text-sm font-semibold text-slate-900">{patient.vitalSigns.bloodPressure}</p>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Activity className="h-4 w-4 text-pink-500" />
                  <span className="text-xs text-slate-600 font-medium">Heart Rate</span>
                </div>
                <p className="text-sm font-semibold text-slate-900">{patient.vitalSigns.heartRate}</p>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <span className="text-xs text-slate-600 font-medium">Temperature</span>
                </div>
                <p className="text-sm font-semibold text-slate-900">{patient.vitalSigns.temperature}</p>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Wind className="h-4 w-4 text-brand-500" />
                  <span className="text-xs text-slate-600 font-medium">Respiratory Rate</span>
                </div>
                <p className="text-sm font-semibold text-slate-900">{patient.vitalSigns.respiratoryRate}</p>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                  <Droplets className="h-4 w-4 text-accent-500" />
                  <span className="text-xs text-slate-600 font-medium">O₂ Saturation</span>
                </div>
                <p className="text-sm font-semibold text-slate-900">{patient.vitalSigns.oxygenSaturation}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Allergies */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              Allergies
            </h3>
            <div className="flex flex-wrap gap-2">
              {patient.allergies.length > 0 ? (
                patient.allergies.map((allergy, index) => (
                  <Badge key={index} variant="destructive" className="bg-red-100 text-red-700 border-red-200">
                    {allergy}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-slate-600">No known allergies</span>
              )}
            </div>
          </div>

          {/* Current Medications */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <Pill className="h-5 w-5 text-green-600" />
              Current Medications
            </h3>
            <div className="space-y-2">
              {patient.currentMedications.length > 0 ? (
                patient.currentMedications.map((medication, index) => (
                  <div key={index} className="bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    <p className="text-sm text-green-900">{medication}</p>
                  </div>
                ))
              ) : (
                <span className="text-sm text-slate-600">No current medications</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          size="lg"
          className="min-w-[150px]"
        >
          <FileText className="mr-2 h-4 w-4" />
          View Guidelines
        </Button>
        <Button
          size="lg"
          onClick={onStartCase}
          className="min-w-[200px] bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-700 hover:to-accent-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Play className="mr-2 h-5 w-5" />
          Start Case
        </Button>
      </div>
    </div>
  )
}

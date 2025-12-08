"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Activity,
  Heart,
  Thermometer,
  Wind,
  Droplets,
  AlertCircle,
  Pill,
  Calendar
} from "lucide-react"

interface PatientPresentationProps {
  patient: {
    name: string
    age: number
    gender: string
    mrn: string
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
}

export function PatientPresentation({ patient }: PatientPresentationProps) {
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Patient Info Card */}
      <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm">
        <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-base sm:text-lg truncate">{patient.name}</CardTitle>
              <p className="text-xs sm:text-sm text-slate-600">
                {patient.age}y • {patient.gender}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3 px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="text-[10px] sm:text-xs text-slate-600">
            <span className="font-medium">MRN:</span> {patient.mrn}
          </div>
          
          <Separator />
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 sm:p-3">
            <div className="flex items-start gap-1.5 sm:gap-2">
              <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-xs font-medium text-amber-900 mb-0.5 sm:mb-1">Chief Complaint</p>
                <p className="text-[10px] sm:text-xs text-amber-800 leading-relaxed">{patient.chiefComplaint}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vital Signs */}
      <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm">
        <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
            <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-600" />
            Vital Signs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1.5 sm:space-y-2 px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between text-[10px] sm:text-xs">
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-600">
                <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-red-500 flex-shrink-0" />
                <span>BP</span>
              </div>
              <span className="font-medium text-slate-900">{patient.vitalSigns.bloodPressure}</span>
            </div>
            
            <div className="flex items-center justify-between text-[10px] sm:text-xs">
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-600">
                <Activity className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-pink-500 flex-shrink-0" />
                <span>HR</span>
              </div>
              <span className="font-medium text-slate-900">{patient.vitalSigns.heartRate}</span>
            </div>
            
            <div className="flex items-center justify-between text-[10px] sm:text-xs">
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-600">
                <Thermometer className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-orange-500 flex-shrink-0" />
                <span>Temp</span>
              </div>
              <span className="font-medium text-slate-900">{patient.vitalSigns.temperature}</span>
            </div>
            
            <div className="flex items-center justify-between text-[10px] sm:text-xs">
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-600">
                <Wind className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-brand-500 flex-shrink-0" />
                <span>RR</span>
              </div>
              <span className="font-medium text-slate-900">{patient.vitalSigns.respiratoryRate}</span>
            </div>
            
            <div className="flex items-center justify-between text-[10px] sm:text-xs">
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-600">
                <Droplets className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-accent-500 flex-shrink-0" />
                <span>SpO₂</span>
              </div>
              <span className="font-medium text-slate-900">{patient.vitalSigns.oxygenSaturation}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Allergies */}
      <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm">
        <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
            <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-600" />
            Allergies
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {patient.allergies.length > 0 ? (
              patient.allergies.map((allergy, index) => (
                <Badge key={index} variant="destructive" className="text-[10px] sm:text-xs bg-red-100 text-red-700 border-red-200 px-1.5 sm:px-2 py-0.5">
                  {allergy}
                </Badge>
              ))
            ) : (
              <span className="text-[10px] sm:text-xs text-slate-600">No known allergies</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Current Medications */}
      <Card className="bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm">
        <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
          <CardTitle className="text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
            <Pill className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
            Medications
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
          <div className="space-y-1 sm:space-y-1.5">
            {patient.currentMedications.length > 0 ? (
              patient.currentMedications.map((medication, index) => (
                <div key={index} className="bg-green-50 border border-green-200 rounded px-2 py-1 sm:py-1.5">
                  <p className="text-[10px] sm:text-xs text-green-900 leading-relaxed">{medication}</p>
                </div>
              ))
            ) : (
              <span className="text-[10px] sm:text-xs text-slate-600">No current medications</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

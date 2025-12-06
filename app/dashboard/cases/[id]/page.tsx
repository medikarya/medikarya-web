"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { PatientCard } from "@/components/cases/patient-card"
import { CaseInteraction } from "@/components/cases/case-interaction"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function CasePage() {
  const params = useParams()
  const router = useRouter()
  const [caseStarted, setCaseStarted] = useState(false)
  const [caseData, setCaseData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const handleStartCase = async () => {
    // If case is already in progress, just resume it
    if (caseData?.status === 'in-progress') {
      setCaseStarted(true);
      return;
    }

    try {
      // Update case status to 'in-progress' in the database
      const response = await fetch(`/api/cases/${params.id}/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to start case');
      }

      const updatedCase = await response.json();
      setCaseData(updatedCase);
      setCaseStarted(true);
    } catch (error) {
      console.error('Error starting case:', error);
      // Handle error (e.g., show toast notification)
    }
  }

  useEffect(() => {
    const loadCaseData = async () => {
      try {
        // First try to load from API
        const response = await fetch(`/api/cases/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setCaseData(data);

          // Check if case is already in progress
          // if (data.status === 'in-progress') {
          //   setCaseStarted(true);
          // }
        } else {
          // Fallback to mock data if API fails
          console.warn('Using mock data as fallback');
          const mockCase = {
            id: params.id,
            title: "Acute Chest Pain - 45 Year Old Male",
            status: 'not-started',
            patient: {
              name: "John Smith",
              age: 45,
              gender: "Male",
              mrn: "MRN-2024-001234",
              admissionDate: new Date().toISOString(),
              chiefComplaint: "Acute chest pain radiating to left arm",
              vitalSigns: {
                bloodPressure: "145/92 mmHg",
                heartRate: "98 bpm",
                temperature: "37.2°C (98.9°F)",
                respiratoryRate: "18 breaths/min",
                oxygenSaturation: "97% on room air"
              },
              allergies: ["Penicillin"],
              currentMedications: ["Aspirin 81mg daily", "Atorvastatin 20mg daily"]
            },
            difficulty: "intermediate",
            category: "cardiology",
            xpReward: 150,
            aiPersonality: {
              traits: ["anxious", "cooperative", "detailed"],
              background: "The patient is a 45-year-old male with a history of hypertension and hyperlipidemia. He works as an accountant and has been under significant work-related stress recently.",
              communicationStyle: "The patient provides detailed information but tends to be somewhat anxious about his symptoms. He asks many questions and seeks reassurance."
            },
            learningObjectives: [
              "Assess and manage acute chest pain in an adult patient",
              "Develop a differential diagnosis for chest pain",
              "Order and interpret appropriate diagnostic tests",
              "Initiate appropriate management for acute coronary syndrome"
            ]
          };
          setCaseData(mockCase);
        }
      } catch (error) {
        console.error('Error loading case data:', error);
        // Handle error (e.g., show error message)
      } finally {
        setLoading(false);
      }
    };

    loadCaseData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!caseData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <p className="text-slate-600">Case not found</p>
          <Button onClick={() => router.push("/dashboard/cases")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cases
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30">
      {!caseStarted ? (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard/cases")}
            className="mb-6 hover:bg-white/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cases
          </Button>

          <PatientCard
            patient={caseData.patient}
            caseTitle={caseData.title}
            onStartCase={handleStartCase}
          />
        </div>
      ) : (
        <CaseInteraction
          caseData={caseData}
          onExit={() => router.push("/dashboard/cases")}
        />
      )}
    </div>
  )
}

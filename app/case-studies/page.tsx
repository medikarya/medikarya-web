import { Footer } from "@/components/flowai/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Baby, Brain, Activity, Stethoscope } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Clinical Case Studies — MediKarya Case Library",
    description: "Explore AI-simulated clinical case studies in paediatrics, obstetrics, and neurology. Real chief complaints, differentials, and learning objectives — interactive simulation behind login.",
    openGraph: {
        title: "MediKarya Case Library — Clinical Simulation Cases",
        description: "Explore real clinical cases in paediatrics, obstetrics, and neurology. Interactive AI simulation behind login.",
        images: [{ url: "https://www.medikarya.in/og-image.png", width: 1200, height: 630, alt: "MediKarya Clinical Cases" }],
    },
    twitter: {
        card: "summary_large_image",
        images: ["https://www.medikarya.in/og-image.png"],
    },
}

const cases = [
    {
        id: "neonatal-jaundice-breastmilk",
        title: "Prolonged Neonatal Jaundice due to Breastmilk Jaundice",
        specialty: "Paediatrics",
        specialtyColor: "bg-amber-50 text-amber-700 border-amber-200",
        Icon: Baby,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        difficulty: "Beginner",
        difficultyColor: "bg-green-50 text-green-700 border-green-200",
        chiefComplaint: "4-week-old male infant with yellow eyes and face since day 5–7 of life. Exclusively breastfed, gaining weight well, no pale stools or dark urine.",
        differentials: ["Breastmilk jaundice", "Breastfeeding jaundice", "ABO incompatibility", "G6PD deficiency", "Biliary atresia (excluded)"],
        learningObjectives: ["Distinguishing breastmilk from breastfeeding jaundice", "Recognising red flags: pale stools, dark urine, lethargy", "Appropriate investigation in prolonged neonatal jaundice"],
    },
    {
        id: "iron-deficiency-anemia-in-pregnancy",
        title: "Moderate Iron Deficiency Anemia in Pregnancy",
        specialty: "Obstetrics",
        specialtyColor: "bg-pink-50 text-pink-700 border-pink-200",
        Icon: Activity,
        iconBg: "bg-pink-50",
        iconColor: "text-pink-500",
        difficulty: "Intermediate",
        difficultyColor: "bg-yellow-50 text-yellow-700 border-yellow-200",
        chiefComplaint: "24-year-old female, G2P1, at 28 weeks gestation with 5-day history of breathlessness on exertion, fatigue, and lightheadedness. Vegetarian diet, inadequate iron supplementation.",
        differentials: ["Iron deficiency anemia", "Thalassemia trait", "Anemia of chronic illness", "Pulmonary embolism (excluded)"],
        learningObjectives: ["Microcytic hypochromic anemia workup in pregnancy", "Ganzoni formula for IV iron dosing", "Differentiating IDA from thalassemia trait on investigations"],
    },
    {
        id: "viral-gastroenteritis",
        title: "Viral Gastroenteritis in a Toddler",
        specialty: "Paediatrics",
        specialtyColor: "bg-amber-50 text-amber-700 border-amber-200",
        Icon: Baby,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        difficulty: "Beginner",
        difficultyColor: "bg-green-50 text-green-700 border-green-200",
        chiefComplaint: "2-year-old male with 3-day history of vomiting and 2-day history of profuse watery diarrhoea (5–10 times/day), fever 38.5°C, moderate dehydration. Incomplete immunisation history.",
        differentials: ["Viral gastroenteritis (Rotavirus)", "Viral gastroenteritis (Norovirus)", "Cholera", "Traveller's diarrhoea (ETEC)"],
        learningObjectives: ["Dehydration assessment and ORS use in paediatrics", "Recognising red flags: blood in stool, bilious vomiting", "Role of Rotavirus vaccination in prevention"],
    },
    {
        id: "severe-migraine-with-aura",
        title: "Severe Migraine with Aura",
        specialty: "Neurology",
        specialtyColor: "bg-purple-50 text-purple-700 border-purple-200",
        Icon: Brain,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-500",
        difficulty: "Intermediate",
        difficultyColor: "bg-yellow-50 text-yellow-700 border-yellow-200",
        chiefComplaint: "21-year-old female student with 48-hour left-sided pulsatile headache, preceded by visual aura (light flashes), photophobia, vomiting. Recurrent for 3 months, 3–4 episodes/month. Paracetamol not helping.",
        differentials: ["Migraine with aura", "Space-occupying lesion", "Idiopathic intracranial hypertension", "Subarachnoid haemorrhage (excluded)"],
        learningObjectives: ["ICHD-3 diagnostic criteria for migraine with aura", "Acute vs prophylactic migraine management", "Red flag headache features warranting neuroimaging"],
    },
]

export default function CaseStudiesPage() {
    return (
        <main className="min-h-screen flex flex-col bg-white">
            <div className="flex-1 relative">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />

                {/* Simple header */}
                <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-xl">
                    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 font-bold text-slate-800 text-lg">
                            <div className="flex h-8 w-8 items-center justify-center">
                                <img src="https://www.medikarya.in/medikarya.svg" alt="MediKarya Logo" className="h-full w-full object-contain" />
                            </div>
                            MediKarya
                        </Link>
                        <Button asChild variant="ghost" size="sm" className="text-slate-500 hover:text-brand-600">
                            <Link href="/" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" /> Back to Home
                            </Link>
                        </Button>
                    </div>
                </header>

                <div className="mx-auto max-w-6xl px-4">

                    {/* Hero */}
                    <div className="py-16 md:py-20 text-center space-y-5 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-800">
                            <Stethoscope className="w-4 h-4" />
                            <span>Clinical Case Library</span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                            Learn from{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                                Real Clinical Scenarios
                            </span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Every case is built around a real chief complaint, evidence-based differentials, and clear learning objectives. Browse the previews below — then run the full interactive simulation inside the platform.
                        </p>
                    </div>

                    {/* Case cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
                        {cases.map((c) => (
                            <div key={c.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
                                {/* Header */}
                                <div className="p-6 pb-4 flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center flex-shrink-0`}>
                                        <c.Icon className={`w-5 h-5 ${c.iconColor}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${c.specialtyColor}`}>{c.specialty}</span>
                                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${c.difficultyColor}`}>{c.difficulty}</span>
                                        </div>
                                        <h2 className="font-bold text-slate-900 leading-snug">{c.title}</h2>
                                    </div>
                                </div>

                                <div className="px-6 pb-6 space-y-4">
                                    {/* Chief complaint */}
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Chief Complaint</p>
                                        <p className="text-sm text-slate-700 leading-relaxed">{c.chiefComplaint}</p>
                                    </div>

                                    {/* Differentials */}
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Possible Differentials</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {c.differentials.map((d) => (
                                                <span key={d} className="text-xs px-2.5 py-0.5 bg-slate-50 text-slate-600 rounded-full border border-slate-200">{d}</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Learning objectives */}
                                    <div>
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Learning Objectives</p>
                                        <ul className="space-y-1">
                                            {c.learningObjectives.map((o) => (
                                                <li key={o} className="flex items-start gap-2 text-sm text-slate-600">
                                                    <span className="text-indigo-500 mt-0.5 flex-shrink-0">›</span>
                                                    {o}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Button asChild className="w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800 group">
                                        <Link href="/login">
                                            Simulate this Case
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center py-16">
                        <p className="text-slate-500 mb-2 text-sm">More cases are being added regularly. Sign up to be the first to know.</p>
                        <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90">
                            <Link href="/login">Start Simulating →</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

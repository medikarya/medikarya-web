import { Footer } from "@/components/flowai/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Clock, User, Bell } from "lucide-react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

const articles: Record<string, {
    title: string
    category: string
    categoryColor: string
    date: string
    author: string
    readTime: string
    intro: string
    body: string[]
}> = {
    "ai-revolutionizing-medical-education": {
        title: "How AI is Revolutionizing Medical Education",
        category: "AI in Medicine",
        categoryColor: "bg-blue-50 text-blue-700 border-blue-100",
        date: "February 2025",
        author: "MediKarya Team",
        readTime: "6 min read",
        intro: "Artificial intelligence is no longer a futuristic concept in medicine — it is actively changing how medical students learn clinical reasoning, pattern recognition, and diagnostic accuracy right now.",
        body: [
            "For decades, medical education followed a fixed structure: lectures, textbooks, ward rounds, and the occasional OSCE. Students learned by watching, and then by doing — often on real patients for the first time. The margin for error was managed by supervision, not by design.",
            "AI changes the design itself. Adaptive learning systems can now present a student with a patient scenario, observe their reasoning choices in real time, identify where the logic breaks down, and redirect the learning before any harm occurs. This is fundamentally different from a textbook that gives you the answer at the back.",
            "In diagnostic reasoning specifically, AI simulation environments let students practice pattern recognition across hundreds of patient presentations — far more than any clinical rotation provides. They encounter rare presentations. They make errors. They learn from them — all before stepping into a ward.",
            "The evidence is still accumulating, but early data from simulation-based education programs is encouraging: students who practice in AI-driven environments show stronger clinical decision-making confidence and fewer diagnostic errors in supervised settings.",
        ],
    },
    "feynman-technique-clinical-reasoning": {
        title: "The Feynman Technique for Clinical Reasoning",
        category: "Study Tips",
        categoryColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
        date: "January 2025",
        author: "MediKarya Team",
        readTime: "5 min read",
        intro: "Nobel physicist Richard Feynman had a deceptively simple rule for understanding anything deeply: if you can't explain it to a child, you don't understand it yet. This principle translates remarkably well into clinical medicine.",
        body: [
            "The Feynman Technique has four steps: choose a concept, explain it in plain language, identify the gaps where your explanation breaks down, and go back to the source to fill them. Repeat until no gaps remain.",
            "Applied to clinical reasoning, this becomes powerful. Take sepsis. Can you explain to a non-medical person exactly why a patient with an infection develops low blood pressure? Most students can recite the definition. Far fewer can explain the mechanism — cytokine release, vasodilation, maldistribution of blood flow — in plain language without stumbling.",
            "The stumble is the learning. Every gap you find in your explanation is a gap in your clinical understanding. A patient's physiology does not change based on how clearly you understand it. Your ability to manage it does.",
            "Try this before your next ward round: pick one diagnosis from the overnight list and explain it simply enough that your non-medical friend could follow. Note where you pause. Those pauses are exactly where your studying should focus next.",
        ],
    },
    "sepsis-case-based-approach": {
        title: "Understanding Sepsis: A Case-Based Approach",
        category: "Clinical Reasoning",
        categoryColor: "bg-red-50 text-red-700 border-red-100",
        date: "January 2025",
        author: "MediKarya Team",
        readTime: "8 min read",
        intro: "Sepsis kills approximately 11 million people annually and remains one of medicine's most time-critical diagnoses. The challenge is that it often presents subtly — and by the time it looks obvious, the window for intervention can be closing.",
        body: [
            "Consider a 68-year-old female presenting to A&E with confusion, mild fever (38.2°C), a heart rate of 104, and a respiratory rate of 22. Her blood pressure is borderline — 102/68. Her family says she has had a cough for three days. There is nothing dramatic here. No crashing haemodynamics, no rigors, no obvious focus of infection screaming at you.",
            "This is the clinical problem with sepsis. The textbook presentation is dramatic. The real-world presentation is subtle, especially in the elderly, immunocompromised, or those on beta-blockers who cannot generate the expected tachycardia response.",
            "Case-based learning forces you to sit with this ambiguity. You cannot skip to the answer. You must gather history, examine the patient, consider your differentials — pneumonia? UTI? Meningitis? — and make decisions in sequence, the way medicine actually happens.",
            "The learning objective here isn't just knowing the qSOFA criteria. It is developing the clinical instinct to recognise that this patient, right now, warrants investigation and early empirical antibiotics before you have all the answers — because waiting for all the answers is how patients deteriorate.",
        ],
    },
    "why-medical-students-need-simulation": {
        title: "Why Medical Students Need Simulation Training",
        category: "Medical Education",
        categoryColor: "bg-purple-50 text-purple-700 border-purple-100",
        date: "December 2024",
        author: "MediKarya Team",
        readTime: "7 min read",
        intro: "The transition from classroom to clinic is one of the steepest learning curves in any profession. Simulation doesn't eliminate that curve — but it gives you essential practice before the stakes are real.",
        body: [
            "Every medical student knows the anxiety of their first clinical encounter. You have studied pharmacology, pathophysiology, and clinical examination for years. Then you walk into a patient's room and realise that real patients don't present like textbook cases, don't stay still, and don't wait for you to remember the right question.",
            "Simulation changes your relationship with that anxiety. When you have navigated a deteriorating sepsis patient in a controlled environment — made the wrong early call, watched the patient deteriorate clinically, and then worked backwards to understand why — you carry that experience with you. It becomes a reference point.",
            "Aviation, nuclear energy, and the military have used simulation training for decades precisely because the cost of errors in those fields is unacceptable. Medicine has been slower to adopt it at scale, partly because clinical placements were assumed to provide sufficient experience. But supervised bedside teaching hours are declining globally. Simulation fills that gap.",
            "Importantly, simulation is not a replacement for clinical experience. It is a rehearsal space. You still need real patients, real teams, real chaos. But you show up to that chaos having already practised. That makes you safer, faster, and more confident.",
        ],
    },
    "breaking-down-diagnostic-process": {
        title: "Breaking Down the Diagnostic Process",
        category: "Clinical Reasoning",
        categoryColor: "bg-red-50 text-red-700 border-red-100",
        date: "December 2024",
        author: "MediKarya Team",
        readTime: "9 min read",
        intro: "How do experienced clinicians arrive at a diagnosis so quickly? The answer usually isn't encyclopaedic knowledge — it's a combination of pattern recognition, systematic frameworks, and calibrated uncertainty that takes years to develop. Here's how it works.",
        body: [
            "Cognitive scientists describe two modes of clinical thinking: System 1 (fast, intuitive, pattern-matching) and System 2 (slow, analytical, systematic). Expert clinicians switch between them fluidly. A GP who has seen ten thousand patients with lower back pain operates mostly in System 1 — they recognise the presentation rapidly. But when a red flag appears, they shift immediately to System 2 and think carefully.",
            "The danger for students is leaning too heavily on one system. Over-reliance on System 1 leads to anchoring bias — you fixate on the first diagnosis that fits and stop considering alternatives. Over-reliance on System 2 leads to decision paralysis — you keep gathering information without acting.",
            "The practical framework most experienced clinicians use involves three layers: generating a problem representation (what is this patient's core clinical problem?), building a differential diagnosis (what conditions could cause this?), and then systematically narrowing that differential using targeted history, examination, and investigations.",
            "What simulation training does is accelerate the development of this calibration. You practice the same clinical decision points hundreds of times, with the feedback loop compressed to minutes rather than the weeks it might take on a clinical attachment to see an outcome.",
        ],
    },
    "future-ai-assisted-diagnosis": {
        title: "The Future of Healthcare: AI-Assisted Diagnosis",
        category: "AI in Medicine",
        categoryColor: "bg-blue-50 text-blue-700 border-blue-100",
        date: "November 2024",
        author: "MediKarya Team",
        readTime: "6 min read",
        intro: "There is a phrase circulating in medical education conferences right now: AI won't replace doctors, but doctors who use AI will replace those who don't. The conversation has shifted from whether AI will change medicine to how fast and how deeply.",
        body: [
            "Current AI diagnostic tools are already performing at or above specialist level in narrow domains. AI systems read diabetic retinopathy screening images with greater accuracy than human graders. Dermatology AI can classify skin lesions from photographs. Radiology AI flags pulmonary emboli on CT scans. These tools are not replacing radiologists or dermatologists — they are augmenting them, handling the high-volume, pattern-recognition tasks so human expertise can be directed toward complexity and communication.",
            "For medical students, the important implication is this: the baseline competency expected of a doctor is rising. Knowing the diagnosis is increasingly assumed. What differentiates clinicians will be clinical judgement under uncertainty, communication, and the ability to work effectively with AI decision-support tools without becoming dependent on them.",
            "The critical skill for the next generation of doctors is calibrated scepticism of AI output. An AI that is 95% accurate will be wrong 1 in 20 times. Knowing when you are in that 5% — recognising when the algorithm's confidence is misplaced — requires the same clinical reasoning skills that have always defined good medicine.",
            "The doctors best positioned for this future are not those who fear AI, nor those who trust it uncritically. They are those who understand how it works well enough to use it intelligently. And developing that understanding starts during training.",
        ],
    },
}

type Props = { params: Promise<{ slug: string }> }

const BASE_URL = "https://www.medikarya.in"
const OG_IMAGE = `${BASE_URL}/og-image.png`

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const article = articles[slug]
    if (!article) return { title: "Article Not Found" }
    return {
        title: article.title,
        description: article.intro,
        openGraph: {
            title: article.title,
            description: article.intro,
            type: "article",
            publishedTime: article.date,
            authors: [article.author],
            url: `${BASE_URL}/blog/${slug}`,
            images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: article.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.intro,
            images: [OG_IMAGE],
        },
    }
}

export function generateStaticParams() {
    return Object.keys(articles).map((slug) => ({ slug }))
}

export default async function BlogArticlePage({ params }: Props) {
    const { slug } = await params
    const article = articles[slug]
    if (!article) notFound()

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.intro,
        "author": { "@type": "Organization", "name": article.author },
        "publisher": {
            "@type": "Organization",
            "name": "MediKarya",
            "url": BASE_URL,
            "logo": { "@type": "ImageObject", "url": `${BASE_URL}/medikarya.svg` }
        },
        "image": OG_IMAGE,
        "url": `${BASE_URL}/blog/${slug}`,
        "datePublished": article.date,
        "mainEntityOfPage": { "@type": "WebPage", "@id": `${BASE_URL}/blog/${slug}` }
    }

    return (
        <main className="min-h-screen flex flex-col bg-white">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="flex-1 relative">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/60 via-white to-white" />

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
                            <Link href="/blog" className="flex items-center gap-2">
                                <ArrowLeft className="h-4 w-4" /> Back to Blog
                            </Link>
                        </Button>
                    </div>
                </header>

                <div className="mx-auto max-w-3xl px-4 pt-10 pb-24">

                    {/* Header */}
                    <header className="space-y-4 mb-10">
                        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${article.categoryColor}`}>
                            {article.category}
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                            {article.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span className="flex items-center gap-1.5"><User className="w-4 h-4" />{article.author}</span>
                            <span>{article.date}</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readTime}</span>
                        </div>
                    </header>

                    {/* Article body */}
                    <article className="prose prose-slate prose-lg max-w-none">
                        <p className="lead font-medium text-slate-700">{article.intro}</p>
                        {article.body.map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </article>

                    {/* Coming soon notice */}
                    <div className="mt-12 rounded-2xl bg-blue-50 border border-blue-100 p-6 flex gap-4 items-start">
                        <Bell className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-blue-900 mb-1">More articles coming soon</h3>
                            <p className="text-sm text-blue-700">
                                We're regularly publishing deep dives into clinical reasoning, simulation-based learning, and AI in medicine. Follow us on social or check back here.
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-10 flex gap-4 flex-wrap">
                        <Button asChild variant="outline" className="rounded-full">
                            <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> All Articles</Link>
                        </Button>
                        <Button asChild className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                            <Link href="/dashboard">Try a Patient Case →</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

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
    fullArticle?: boolean
}> = {
    "ai-revolutionizing-medical-education": {
        title: "How AI is Revolutionizing Medical Education",
        category: "AI in Medicine",
        categoryColor: "bg-blue-50 text-blue-700 border-blue-100",
        date: "February 2025",
        author: "MediKarya Team",
        readTime: "8 min read",
        fullArticle: true,
        intro: "Artificial intelligence is no longer a futuristic concept in medicine — it is actively changing how medical students learn clinical reasoning, pattern recognition, and diagnostic accuracy right now.",
        body: [
            "For most of the twentieth century, medical education operated on an apprenticeship model. Students watched senior clinicians, then they assisted, and eventually they did — all on real patients, all in real time. The system worked because it had to. There was no alternative. The margin for error was managed through supervision hierarchies and the sheer volume of clinical exposure. You saw enough patients, made enough mistakes under watchful eyes, and eventually your clinical instincts became reliable.",

            "The problem is that this model has been quietly eroding for decades. Patient stays are shorter. Ward rounds move faster. Supervised bedside teaching hours have fallen in medical schools across India and globally. Students are graduating with fewer hours of hands-on clinical decision-making than the generation before them — not because the system doesn't care, but because the clinical environment has genuinely changed. Hospitals are busier. Consultants have less time.",

            "This is the gap that artificial intelligence is beginning to fill — not by replacing clinical experience, but by creating a structured practice environment that didn't previously exist.",

            "The fundamental contribution of AI to medical education is the ability to create high-fidelity patient scenarios that can be practised repeatedly, independently, and without consequence. A student can sit down with a simulated 68-year-old woman presenting with breathlessness, take a history, order investigations, interpret results in sequence, and make a diagnosis and management plan — all without a supervising clinician in the room, all without the cognitive pressure of a real clinical setting, and critically, all with immediate structured feedback on where their reasoning went wrong.",

            "This addresses something textbooks fundamentally cannot. A textbook presents information linearly: here is sepsis, here are the criteria, here is the management. But clinical reasoning doesn't work linearly. It works probabilistically, under uncertainty, in real time. The student who has memorised the qSOFA criteria can still fail to recognise sepsis when it walks through the door slowly — because the textbook presentation and the real presentation rarely look the same. Simulation forces the student to encounter the ambiguity, not just the answer.",

            "In diagnostic reasoning specifically, repetition is the mechanism of skill development. Pattern recognition — the ability to look at a constellation of symptoms and quickly generate an appropriate differential — is not a talent that some students have and others don't. It is a skill built through repeated exposure to presentations. Radiologists develop it over thousands of scans. Cardiologists develop it over years of auscultation. AI simulation allows a medical student to compress that exposure timeline significantly. Where a clinical rotation might expose a student to three or four cases of a particular presentation, a simulation environment can expose them to thirty.",

            "There is an important distinction to draw here between AI as a teaching tool and AI as a diagnostic tool. The public conversation about AI in medicine tends to focus on the latter — AI reading retinal scans, AI detecting malignancies in histopathology, AI predicting sepsis from vital sign trends. These are real and significant. But they are not primarily relevant to medical education. What matters educationally is AI that can model a patient, respond to clinical questions, interpret and generate realistic investigation results, and evaluate the quality of a student's clinical reasoning. These are harder problems than diagnostic AI, and they are only beginning to be solved well.",

            "The Indian context adds another dimension to this. India produces approximately 80,000 medical graduates per year from over 650 medical colleges. The variation in clinical exposure between a well-resourced urban teaching hospital and a district-level medical college is enormous. A student at a premier institution in Delhi will encounter a different volume and variety of cases than a student at a college in a Tier-3 city. AI-based simulation platforms have the potential to partially bridge this gap — to provide a consistent baseline of clinical practice experience that is not dependent on the geography of your medical school.",

            "The evidence base is still maturing. Studies on simulation-based medical education consistently show improvements in clinical confidence and procedural skill. The data specifically on AI-driven diagnostic reasoning platforms is more limited, largely because the platforms themselves are relatively new. But the foundational research on deliberate practice — the idea that skill development requires effortful, focused practice with feedback, not just passive experience — strongly supports the simulation model. The mechanism is sound even where the specific evidence for AI platforms is still accumulating.",

            "There are legitimate concerns worth acknowledging. Simulation cannot replicate the emotional dimension of clinical medicine — the patient who is frightened, the family who is asking questions the clinician doesn't know how to answer, the ethical complexity of real decisions. These are not things that can be trained in a simulation environment, and nobody serious argues otherwise. The goal is not to produce doctors who have only simulated. The goal is to produce doctors who have practised the reasoning component of clinical decisions enough times that when they step into those real and emotionally complex situations, the cognitive load of the diagnostic process is reduced.",

            "For medical students in India right now, the practical implication is this: the clinical exposure you get in your rotations is valuable and irreplaceable. But it is also variable, unpredictable, and insufficient on its own. The students who will perform best in clinical settings are likely to be those who supplement their rotations with deliberate diagnostic practice — who treat simulation not as a substitute for the ward, but as the preparation that makes their ward time more effective. AI is making that preparation possible in ways it simply wasn't a decade ago.",
        ],
    },
    "feynman-technique-clinical-reasoning": {
        title: "The Feynman Technique for Clinical Reasoning",
        category: "Study Tips",
        categoryColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
        date: "January 2025",
        author: "MediKarya Team",
        readTime: "7 min read",
        fullArticle: true,
        intro: "Nobel physicist Richard Feynman had a deceptively simple rule for understanding anything deeply: if you can't explain it to a child, you don't understand it yet. This principle translates remarkably well into clinical medicine.",
        body: [
            "Feynman was famous not just for his physics but for his ability to explain it. He believed, and demonstrated repeatedly, that the ability to explain something simply was not a dumbed-down version of understanding — it was the truest test of it. Complexity is easy to hide behind jargon. Genuine understanding has nowhere to hide when you try to explain it plainly.",

            "The technique itself has four steps. First, choose a concept you want to understand. Second, explain it in simple language as if you were teaching it to someone with no background in the subject — a child, a patient, a non-medical friend. Third, identify the gaps: the places where your explanation becomes vague, where you reach for a term you can't define, where you say something like 'and then the mechanism sort of...' and trail off. Fourth, go back to the source, fill those gaps, and repeat the explanation. The cycle continues until the explanation is complete, clear, and gap-free.",

            "Applied to clinical medicine, this becomes a genuinely powerful tool — and also reveals how much medical education encourages the appearance of understanding over the real thing.",

            "Take a concept that most third-year medical students can confidently name: the renin-angiotensin-aldosterone system. Ask a student to explain it and you will typically get a fluent recitation of the pathway: renin cleaves angiotensinogen to angiotensin I, ACE converts it to angiotensin II, which causes vasoconstriction and stimulates aldosterone release, which causes sodium and water retention. Accurate. But now ask them to explain, simply, why this matters clinically. Why does blocking ACE help a patient with heart failure? Why does a patient on an ACE inhibitor develop a dry cough? Why does aldosterone matter in a patient who is already fluid-overloaded?",

            "This is where the gaps appear. The pathway is memorised; the clinical logic is not. And the Feynman technique is precisely designed to expose this. When you try to explain to a non-medical friend why a heart failure patient's leg is swelling, you cannot resort to 'due to sodium and water retention secondary to RAAS activation.' You have to say something like: 'The heart isn't pumping well, so the kidney thinks the body is low on blood and tries to hold on to more fluid, but because the heart still can't handle it, the fluid leaks out into the legs instead.' That explanation — imprecise by medical standards — demonstrates something the jargon version doesn't: you understand the cause-and-effect chain.",

            "Now try sepsis. Sepsis is one of its highest-stakes diagnoses. Can you explain simply why a patient with an infection develops low blood pressure? Most students can say 'due to vasodilation from cytokine release.' But can they explain what that actually means physically — why the blood vessels widen, what happens to blood distribution when they do, why the heart then has to work harder, and why at some point it can't compensate? The gap between being able to name the mechanism and being able to explain it is where clinical misunderstanding lives.",

            "There is a practical way to use this technique during your clinical rotations. At the end of each ward day, pick one diagnosis from the patient list — ideally a case you weren't fully sure about, or a condition you had to look up. Write down, in plain language, what is wrong with that patient, why it is wrong, and what the treatment is trying to achieve. Don't use medical terms unless you can also explain what they mean. The writing discipline is important here: it is much harder to hide a gap in a written explanation than in a mental one. We skip over gaps in our heads constantly. On paper they become visible.",

            "Medical students often underuse writing as a learning tool. Note-taking during lectures is passive. What the Feynman technique requires is active construction — generating your own explanation rather than receiving someone else's. The cognitive science research on this is consistent: generating information is significantly more effective for retention than receiving it. Every time you explain something in your own words, you are doing more learning than reading the same passage twice.",

            "The technique also reveals something useful about the medical curriculum: some concepts are explained deeply in medical education, and some are essentially given to students as black boxes. The citric acid cycle is taught in detail but rarely connected to why a patient in septic shock becomes lactic acidotic. Drug mechanisms are given without the underlying receptor pharmacology that explains why. The Feynman technique consistently exposes these black boxes — the places where medical education handed you a label rather than an explanation.",

            "There is a humility component to this worth naming. Feynman was comfortable saying 'I don't know.' It's harder for medical students and doctors to do this, partly because of the culture of medicine and partly because uncertainty feels uncomfortable when someone's health is involved. But the student who recognises a gap in their understanding is in a better position than the student who doesn't know there is one. The Feynman technique is, at its core, a systematic method for finding the things you don't know you don't know — and in clinical reasoning, those are precisely the things that cause diagnostic errors.",

            "Use this technique before your exams, but more importantly use it before your ward rounds. The doctor who has genuinely understood why their patient's potassium is low — not just that it is a known complication of their diuretic — is the doctor who will catch it when it happens and know what to do. Understanding, not recall, is what medicine eventually runs on.",
        ],
    },
    "sepsis-case-based-approach": {
        title: "Understanding Sepsis: A Case-Based Approach",
        category: "Clinical Reasoning",
        categoryColor: "bg-red-50 text-red-700 border-red-100",
        date: "January 2025",
        author: "MediKarya Team",
        readTime: "10 min read",
        fullArticle: true,
        intro: "Sepsis kills approximately 11 million people annually and remains one of medicine's most time-critical diagnoses. The challenge is that it often presents subtly — and by the time it looks obvious, the window for intervention can be closing.",
        body: [
            "Let's begin with a case. A 68-year-old woman is brought to the emergency department by her daughter. The presenting complaint, as written in the triage notes, is 'confusion and not feeling well for two days.' Her daughter says she has been more forgetful than usual, has not eaten much, and had a mild fever the previous night that seemed to settle. On examination, she is alert but slightly disoriented to time. Her temperature is 38.1°C. Heart rate is 102. Blood pressure is 108/70. Respiratory rate is 22. She has been incontinent of urine twice today, which is not her baseline.",

            "This is sepsis until proven otherwise. But it doesn't look like the textbook picture. There is no rigors, no crashing blood pressure, no obvious source of infection screaming at you. She is not pale and sweating. She could easily be triaged as a confused elderly patient for further assessment, with the urgency dialled down by the absence of dramatic clinical signs.",

            "This is the core clinical problem with sepsis. The textbook presentation — high fever, rigors, obvious source, florid haemodynamic instability — is the late presentation. By the time the BP is 80/40, you have already lost time that could have been used more effectively. The early presentation is often exactly this: a slightly confused elderly patient, a subtle tachycardia, a borderline temperature, a respiratory rate that is just a bit too fast.",

            "The Sepsis-3 definition, which replaced SIRS criteria in 2016, defines sepsis as life-threatening organ dysfunction caused by a dysregulated host response to infection. This is conceptually important: sepsis is not just infection plus fever. It is infection producing a systemic response that is causing organs to malfunction. In our case, the confusion is not just 'she's 68 and a bit confused' — it is brain that is not functioning normally, and the question is why.",

            "The qSOFA criteria give a bedside clinical prompt: respiratory rate ≥22, altered mentation, systolic BP ≤100. Our patient meets two of three. That is not a diagnosis, but it is a signal to take seriously. The full SOFA score is more comprehensive and requires investigations — a full blood count, renal function, liver function, coagulation, and critically, a lactate level.",

            "Lactate is where the physiology becomes important. In sepsis, inadequate tissue perfusion — even when the blood pressure is still technically maintained — leads to anaerobic metabolism and lactate production. A lactate above 2 mmol/L suggests tissue hypoperfusion even when haemodynamics appear stable. A lactate above 4 mmol/L defines septic shock in conjunction with vasopressor requirement. This is why blood pressure alone is a misleading guide. A patient can be compensating — maintaining BP through tachycardia and peripheral vasoconstriction — while their tissues are already hypoperfused. You can miss septic shock in a patient with a BP of 110 if you are not measuring lactate.",

            "Back to the case. Blood cultures are drawn before antibiotics — this is important, but should not delay antibiotics significantly. Urine is sent for microscopy and culture; the history of incontinence and the age and sex of the patient make a UTI the most likely source. A chest X-ray is ordered to exclude pneumonia. Basic bloods are taken, including a venous gas for lactate.",

            "The lactate comes back at 2.8 mmol/L. Creatinine is 142 (her baseline from an old result in the notes is 88). White cell count is 18.4 with a neutrophilia. CRP is 187. Urine dipstick is strongly positive for nitrites and leucocytes.",

            "This is sepsis from a urinary source with early acute kidney injury. The management follows the Sepsis-6: high-flow oxygen if needed, blood cultures, IV antibiotics within one hour of recognition, IV fluid bolus (250–500 mL crystalloid), urine output monitoring with a catheter, and serial lactate measurements. The choice of antibiotic depends on local resistance patterns and her history, but empirical coverage for a gram-negative urinary source — typically a broad-spectrum cephalosporin or co-amoxiclav depending on allergy status — is appropriate while cultures are pending.",

            "What case-based learning teaches you that the textbook cannot is the texture of the decision-making. The textbook gives you sepsis criteria. A case forces you to apply them to a patient who doesn't announce her diagnosis. You have to generate the question 'could this be sepsis?' from a presentation that doesn't obviously look like sepsis. You have to know that confusion in an elderly patient is an early sign of septic encephalopathy. You have to recognise that a heart rate of 102 and a RR of 22 are not normal, even if they don't look dramatic.",

            "The learning objective here is not just knowing the qSOFA criteria — it is developing the clinical vigilance to flag the patient who meets them without realising they do. That vigilance is only built through repeated exposure to cases like this one. Not the textbook version where the diagnosis is named at the top of the page. Cases where you encounter the patient first and have to work out what is happening — which is, of course, exactly what medicine is.",

            "For every hour that appropriate antibiotics are delayed in sepsis, mortality increases. Studies consistently show a 7–10% increase in mortality for each hour of delay after diagnosis. This is why the urgency matters and why the ability to recognise early sepsis — not just obvious sepsis — is one of the highest-value clinical skills a junior doctor can develop. Simulate it. Practice the recognition. Build the instinct before it counts.",
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

const BASE_URL = "https://www.medikarya.in"
const OG_IMAGE = `${BASE_URL}/og-image.png`

type Props = { params: Promise<{ slug: string }> }

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

                    {/* Coming soon notice — only for stub articles */}
                    {!article.fullArticle && (
                        <div className="mt-12 rounded-2xl bg-blue-50 border border-blue-100 p-6 flex gap-4 items-start">
                            <Bell className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-blue-900 mb-1">Full article coming soon</h3>
                                <p className="text-sm text-blue-700">
                                    We're working on the complete version of this article. Check back soon, or follow us on social media for updates.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Divider */}
                    <div className="mt-12 pt-8 border-t border-slate-100" />

                    {/* CTA */}
                    <div className="mt-8 flex gap-4 flex-wrap">
                        <Button asChild variant="outline" className="rounded-full">
                            <Link href="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> All Articles</Link>
                        </Button>
                        <Button asChild className="rounded-full bg-slate-900 text-white hover:bg-slate-800">
                            <Link href="/login">Try a Patient Case →</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    )
}

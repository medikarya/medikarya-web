import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQSection() {
  const faqs = [
    {
      question: "How realistic are the AI patient simulations?",
      answer: "Our AI patient simulations are developed by medical professionals and use advanced natural language processing to create highly realistic patient interactions. Each scenario is based on real clinical cases and provides authentic responses to student inquiries and examinations."
    },
    {
      question: "What medical conditions can students practice with?",
      answer: "MediKarya covers a comprehensive range of medical conditions including cardiovascular diseases, respiratory disorders, endocrine conditions, neurological cases, infectious diseases, and emergency scenarios. We regularly add new cases based on current medical education needs."
    },
    {
      question: "How does the feedback system work?",
      answer: "After each simulation, students receive detailed, personalized feedback on their clinical reasoning, diagnostic accuracy, test ordering appropriateness, and patient communication skills. The AI analyzes their decisions against evidence-based medical guidelines and provides specific improvement suggestions."
    },
    {
      question: "Can MediKarya be integrated into medical school curriculum?",
      answer: "Yes! MediKarya offers institutional plans that allow seamless integration with existing medical school curricula. We provide progress tracking, performance analytics, and customizable case libraries to support institutional learning objectives."
    },
    {
      question: "Is MediKarya suitable for all levels of medical training?",
      answer: "Absolutely. Our platform offers cases ranging from basic clinical scenarios for first-year students to complex, multi-system cases for advanced trainees and residents. Difficulty levels are clearly marked and can be adjusted based on learner needs."
    },
    {
      question: "How often are new patient cases added?",
      answer: "We add new patient cases and update existing ones monthly, ensuring students have access to current medical scenarios that reflect the latest clinical guidelines and emerging health challenges."
    },
    {
      question: "Is my patient data and progress information secure?",
      answer: "Yes, we take data security seriously. All patient simulations are anonymized, and we comply with HIPAA regulations. Student progress data is encrypted and stored securely with strict access controls."
    },
    {
      question: "Can I practice on mobile devices?",
      answer: "MediKarya is fully responsive and works seamlessly on desktop computers, tablets, and smartphones. You can continue your medical training anywhere, whether you're at home, in the library, or on clinical rotations."
    }
  ]

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight">Frequently Asked Questions</h2>
        <p className="mt-2 text-muted-foreground">
          Everything you need to know about MediKarya's AI-powered medical education platform.
        </p>
      </div>

      <div className="mt-8">
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="rounded-2xl border px-6">
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

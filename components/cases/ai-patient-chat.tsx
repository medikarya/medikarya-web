"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { VoiceChat, useVoiceResponse } from "./voice-chat"
import { Send, Loader2, User, Bot, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AIPatientChatProps {
  caseData: any
  onMessageSent: (message: Message) => void
}

export function AIPatientChat({ caseData, onMessageSent }: AIPatientChatProps) {
  const isGuardian = caseData.ai_personality?.role?.toLowerCase().includes("mother") ||
    caseData.ai_personality?.role?.toLowerCase().includes("father") ||
    caseData.ai_personality?.role?.toLowerCase().includes("guardian");

  const welcomeMessage = isGuardian
    ? `Hello Doctor. I'm ${caseData.patient.name}'s mother. He has been ${caseData.patient.chiefComplaint.toLowerCase()}. I'm really worried about him.`
    : `Hello Doctor. I'm ${caseData.patient.name}. ${caseData.patient.chiefComplaint}. I'm feeling quite worried about this.`

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: welcomeMessage,
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { speak, stop, isSpeaking } = useVoiceResponse()

  // Speak welcome message on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      speak(welcomeMessage)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    onMessageSent(userMessage)
    setInput("")
    setIsLoading(true)

    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/chat/patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          caseData: caseData,
          chatHistory: messages
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Failed to get response" }))
        throw new Error(errorData.error || "Failed to get response")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      onMessageSent(assistantMessage)

      // Speak the AI response
      speak(data.response)
    } catch (error) {
      console.error("Error sending message:", error)

      // Fallback mock response
      const mockResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(input, caseData),
        timestamp: new Date()
      }

      setMessages(prev => [...prev, mockResponse])
      onMessageSent(mockResponse)

      // Speak the mock response
      speak(mockResponse.content)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVoiceTranscript = (transcript: string) => {
    setInput(transcript)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestedQuestions = [
    "When did the symptoms start?",
    "Do you have any allergies?",
    "Any history of smoking or alcohol use?",
    "Have you had any surgeries in the past?",
    "Is there any family history of heart disease?",
    "Are you taking any medications?"
  ]

  return (
    <div className="flex flex-col h-[500px] sm:h-[550px] md:h-[600px]">
      {/* Chat Messages */}
      <ScrollArea className="flex-1 min-h-0" ref={scrollAreaRef}>
        <div className="space-y-2 sm:space-y-3 md:space-y-4 p-2 sm:p-3 md:p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-1.5 sm:gap-2 md:gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <Avatar className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 border-2 border-brand-200 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-brand-500 to-accent-500 text-white text-xs">
                    <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn(
                  "max-w-[85%] sm:max-w-[80%] rounded-lg px-2.5 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2.5",
                  message.role === "user"
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 text-slate-900 border border-slate-200"
                )}
              >
                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                <span className="text-[10px] sm:text-xs opacity-70 mt-0.5 sm:mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              {message.role === "user" && (
                <Avatar className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 border-2 border-slate-200 flex-shrink-0">
                  <AvatarFallback className="bg-slate-200 text-slate-700 text-xs">
                    Dr
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-1.5 sm:gap-2 md:gap-3 justify-start animate-in fade-in">
              <Avatar className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 border-2 border-brand-200 flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-brand-500 to-accent-500 text-white text-xs">
                  <User className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Loader2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 animate-spin text-slate-600" />
                  <span className="text-xs sm:text-sm text-slate-600">Patient is typing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <div className="px-2 sm:px-3 md:px-4 py-2 border-t border-slate-200 bg-slate-50/50">
          <p className="text-[10px] sm:text-xs text-slate-600 mb-1.5 sm:mb-2 font-medium">Suggested questions:</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {suggestedQuestions.slice(0, 3).map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInput(question)}
                className="text-[10px] sm:text-xs h-6 sm:h-7 px-2 sm:px-3 bg-white hover:bg-brand-50 hover:text-brand-700 hover:border-brand-300 whitespace-normal text-left leading-tight"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-2 sm:p-3 md:p-4 border-t border-slate-200 bg-white space-y-2 sm:space-y-3">
        {/* Voice Chat Controls */}
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <VoiceChat
            onTranscript={handleVoiceTranscript}
            isEnabled={!isLoading}
          />
          {isSpeaking && (
            <Button
              variant="outline"
              size="sm"
              onClick={stop}
              className="h-7 sm:h-8 text-xs"
            >
              <Volume2 className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Stop Speaking</span>
              <span className="sm:hidden">Stop</span>
            </Button>
          )}
        </div>

        {/* Text Input */}
        <div className="flex gap-1.5 sm:gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type or use voice..."
            className="flex-1 h-9 sm:h-10 text-xs sm:text-sm"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-brand-600 hover:bg-brand-700 flex-shrink-0 h-9 sm:h-10 w-9 sm:w-10 p-0"
          >
            {isLoading ? (
              <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            )}
          </Button>
        </div>
        <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">
          Press Enter to send • Use voice input for hands-free interaction
        </p>
      </div>
    </div>
  )
}

// Mock response generator (will be replaced with AI API)
function generateMockResponse(question: string, caseData: any): string {
  const lowerQuestion = question.toLowerCase()

  if (lowerQuestion.includes("when") && lowerQuestion.includes("start")) {
    return "The chest pain started about 2 hours ago. I was climbing the stairs at work when it suddenly hit me. It felt like a heavy pressure on my chest."
  }

  if (lowerQuestion.includes("allerg")) {
    return `Yes, I'm allergic to ${caseData.patient.allergies.join(" and ")}. I get a rash if I take it.`
  }

  if (lowerQuestion.includes("smok") || lowerQuestion.includes("alcohol")) {
    return "I used to smoke a pack a day for about 20 years, but I quit 2 years ago. I have an occasional beer on weekends, maybe 2-3 drinks per week."
  }

  if (lowerQuestion.includes("surgery") || lowerQuestion.includes("surgeries")) {
    return "No major surgeries. I had my appendix removed when I was 15, but nothing since then."
  }

  if (lowerQuestion.includes("family") && lowerQuestion.includes("heart")) {
    return "Yes, my father died of a heart attack when he was 52. My mother has high blood pressure but is doing okay now."
  }

  if (lowerQuestion.includes("medication")) {
    return `I'm currently taking ${caseData.patient.currentMedications.join(" and ")}. My doctor prescribed them for my blood pressure and cholesterol.`
  }

  if (lowerQuestion.includes("pain") && (lowerQuestion.includes("where") || lowerQuestion.includes("location"))) {
    return "The pain is right in the center of my chest, and it's radiating down my left arm. It's a squeezing, pressure-like sensation. I'd say it's about 7 out of 10 in intensity."
  }

  if (lowerQuestion.includes("short") && lowerQuestion.includes("breath")) {
    return "Yes, I'm feeling a bit short of breath. It's harder to take deep breaths, and I feel like I can't get enough air."
  }

  if (lowerQuestion.includes("nausea") || lowerQuestion.includes("vomit")) {
    return "I do feel a bit nauseous, yes. I haven't vomited, but my stomach feels unsettled."
  }

  if (lowerQuestion.includes("sweat")) {
    return "Yes, I've been sweating quite a bit. My shirt is damp, and I feel clammy."
  }

  return "I'm not sure about that, Doctor. Is that important for my condition? I'm really worried about this chest pain."
}

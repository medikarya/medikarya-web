"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Loader2, User, Mic, MicOff } from "lucide-react"
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
  chatHistory?: Message[]
}

export function AIPatientChat({ caseData, onMessageSent, chatHistory }: AIPatientChatProps) {
  const isGuardian =
    caseData.ai_role?.speaker?.toLowerCase().includes("mother") ||
    caseData.ai_role?.speaker?.toLowerCase().includes("father") ||
    caseData.ai_role?.speaker?.toLowerCase().includes("guardian")

  const welcomeMessage = isGuardian
    ? `Hello Doctor. I'm ${caseData.patient.name}'s mother.`
    : `Hello Doctor. I'm ${caseData.patient.name}.`

  const SUGGESTED_QUESTIONS = [
    "Can you tell me more about your symptoms?",
    "How long have you been feeling this way?",
    "Do you have any known allergies?",
    "Are you currently taking any medications?",
    "Does anything make the pain better or worse?",
    "Do you have a family history of this condition?"
  ]

  const [messages, setMessages] = useState<Message[]>(() => {
    if (chatHistory && chatHistory.length > 0) {
      // Rehydrate dates if they were serialized
      return chatHistory.map(m => ({
        ...m,
        timestamp: new Date(m.timestamp)
      }))
    }
    return [{
      id: "welcome",
      role: "assistant",
      content: welcomeMessage,
      timestamp: new Date()
    }]
  })

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end"
    })
  }, [messages])

  // Persist welcome message if it's a new chat
  useEffect(() => {
    if ((!chatHistory || chatHistory.length === 0) && messages.length === 1 && messages[0].id === "welcome") {
      onMessageSent(messages[0])
    }
  }, [])

  /* ---------------- SPEECH TO TEXT ---------------- */

  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition. Please try Chrome or Edge.")
      return
    }

    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "en-US"

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)

    recognition.onresult = (event) => {
      let finalTranscript = ""
      let interimTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript
        } else {
          interimTranscript += event.results[i][0].transcript
        }
      }

      if (finalTranscript) {
        setInput(prev => {
          const needsSpace = prev.length > 0 && !prev.endsWith(" ")
          return prev + (needsSpace ? " " : "") + finalTranscript
        })
      }
    }

    recognition.start()
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    // Stop listening if sending
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    }

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
      const response = await fetch("/api/chat/patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          caseData,
          chatHistory: messages
        })
      })

      if (!response.ok) throw new Error("Failed")

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      onMessageSent(assistantMessage)
    } catch {
      const fallback: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(input, caseData),
        timestamp: new Date()
      }

      setMessages(prev => [...prev, fallback])
      onMessageSent(fallback)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[500px] sm:h-[550px] md:h-[600px] min-h-0">
      {/* CHAT AREA */}
      <div
        className="flex-1 min-h-0 w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400"
        ref={scrollAreaRef}
        style={{ scrollbarWidth: 'thin' }}
        data-lenis-prevent
      >
        <div className="p-3 space-y-3">
          {messages.map(message => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-brand-500 text-white">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                  message.role === "user"
                    ? "bg-brand-600 text-white"
                    : "bg-slate-100 border"
                )}
              >
                <p className="whitespace-pre-wrap break-words">
                  {message.content}
                </p>
                <span className="block text-[10px] opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm text-slate-600">
                Patient is typing…
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* INPUT */}
      <div className="border-t p-3 space-y-2 bg-white">

        {/* Suggested Questions */}
        <div className="flex gap-2 overflow-x-auto pb-2 native-scrollbar">
          {SUGGESTED_QUESTIONS.map((question, index) => (
            <button
              key={index}
              onClick={() => setInput(question)}
              className="whitespace-nowrap rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 hover:bg-brand-50 hover:text-brand-600 transition-colors border border-slate-200"
            >
              {question}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={toggleListening}
            className={cn(
              "shrink-0",
              isListening && "bg-red-100 text-red-600 border-red-200 hover:bg-red-200 hover:text-red-700"
            )}
            title={isListening ? "Stop listening" : "Start listening"}
          >
            {isListening ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
          </Button>
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ---------------- MOCK ---------------- */

function generateMockResponse(question: string, caseData: any): string {
  return "I'm not sure about that, Doctor. Is that important for my condition?"
}

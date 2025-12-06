"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Loader2,
  Radio
} from "lucide-react"
import { cn } from "@/lib/utils"

interface VoiceChatProps {
  onTranscript: (text: string) => void
  isEnabled?: boolean
}

export function VoiceChat({ onTranscript, isEnabled = true }: VoiceChatProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    // Check if browser supports Web Speech API
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const speechSynthesis = window.speechSynthesis
      
      if (SpeechRecognition && speechSynthesis) {
        setIsSupported(true)
        synthRef.current = speechSynthesis
        
        // Initialize speech recognition
        const recognition = new SpeechRecognition()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = "en-US"
        
        recognition.onresult = (event: any) => {
          let interimTranscript = ""
          let finalTranscript = ""
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscript += transcript + " "
            } else {
              interimTranscript += transcript
            }
          }
          
          if (finalTranscript) {
            setTranscript(finalTranscript.trim())
            onTranscript(finalTranscript.trim())
          } else {
            setTranscript(interimTranscript)
          }
        }
        
        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error)
          setError(`Recognition error: ${event.error}`)
          setIsListening(false)
        }
        
        recognition.onend = () => {
          setIsListening(false)
        }
        
        recognitionRef.current = recognition
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [onTranscript])

  const startListening = () => {
    if (!recognitionRef.current || !isEnabled) return
    
    try {
      setError(null)
      setTranscript("")
      recognitionRef.current.start()
      setIsListening(true)
    } catch (error) {
      console.error("Error starting recognition:", error)
      setError("Failed to start voice recognition")
    }
  }

  const stopListening = () => {
    if (!recognitionRef.current) return
    
    try {
      recognitionRef.current.stop()
      setIsListening(false)
    } catch (error) {
      console.error("Error stopping recognition:", error)
    }
  }

  const speak = (text: string) => {
    if (!synthRef.current || !isEnabled) return
    
    // Cancel any ongoing speech
    synthRef.current.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.rate = 0.9
    utterance.pitch = 1.0
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    
    synthRef.current.speak(utterance)
  }

  const stopSpeaking = () => {
    if (!synthRef.current) return
    synthRef.current.cancel()
    setIsSpeaking(false)
  }

  if (!isSupported) {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <MicOff className="h-4 w-4" />
        <span>Voice features not supported in this browser</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Voice Input Button */}
      <Button
        variant={isListening ? "default" : "outline"}
        size="sm"
        onClick={isListening ? stopListening : startListening}
        disabled={!isEnabled}
        className={cn(
          "h-9 transition-all",
          isListening && "bg-red-600 hover:bg-red-700 animate-pulse"
        )}
      >
        {isListening ? (
          <>
            <Radio className="h-4 w-4 mr-2 animate-pulse" />
            <span className="hidden sm:inline">Stop Recording</span>
            <span className="sm:hidden">Stop</span>
          </>
        ) : (
          <>
            <Mic className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Voice Input</span>
            <span className="sm:hidden">Voice</span>
          </>
        )}
      </Button>

      {/* Speaking Indicator */}
      {isSpeaking && (
        <Badge variant="secondary" className="animate-pulse">
          <Volume2 className="h-3 w-3 mr-1" />
          <span className="hidden sm:inline">Patient Speaking</span>
          <span className="sm:hidden">Speaking</span>
        </Badge>
      )}

      {/* Listening Indicator */}
      {isListening && transcript && (
        <Badge variant="secondary" className="max-w-[200px] sm:max-w-xs truncate">
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          {transcript}
        </Badge>
      )}

      {/* Error Message */}
      {error && (
        <span className="text-xs text-red-600">{error}</span>
      )}
    </div>
  )
}

// Hook to use voice chat in parent component
export function useVoiceResponse() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis
    }
    
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel()
      }
    }
  }, [])

  const speak = (text: string) => {
    if (!synthRef.current) return
    
    // Cancel any ongoing speech
    synthRef.current.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = "en-US"
    utterance.rate = 0.9
    utterance.pitch = 1.0
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)
    
    synthRef.current.speak(utterance)
  }

  const stop = () => {
    if (!synthRef.current) return
    synthRef.current.cancel()
    setIsSpeaking(false)
  }

  return { speak, stop, isSpeaking }
}

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SelectGame from "@/components/submit/select-game"
import SelectPlay from "@/components/submit/select-play"
import { AnalyzePlay } from "@/components/submit/analyze-play"

export default function SubmitPage() {
  const [step, setStep] = useState(1)
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [selectedPlay, setSelectedPlay] = useState<string | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [officialCall, setOfficialCall] = useState<string>("")
  const [aiContext, setAiContext] = useState<string>("")
  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId)
    setStep(2)
  }

  const handlePlaySelect = (playId: string, video: File, call: string, context: string) => {
    setSelectedPlay(playId)
    setAiContext(context)
    setVideoFile(video)
    setOfficialCall(call)
    setStep(3)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SelectGame onSelect={handleGameSelect} />
          </motion.div>
        )}

        {step === 2 && selectedGame && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SelectPlay gameId={selectedGame} onSelect={handlePlaySelect} />
          </motion.div>
        )}

        {step === 3 && selectedPlay && videoFile && officialCall && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <AnalyzePlay
              playId={selectedPlay}
              videoFile={videoFile}
              officialCall={officialCall}
              aiContext={aiContext}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


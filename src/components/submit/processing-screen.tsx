"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Scale } from "lucide-react"

const analysisSteps = [
  "Reviewing play footage...",
  "Analyzing player positions...",
  "Checking restricted area...",
  "Analyzing contact...",
  "Reviewing official call...",
  "Comparing to NBA rulebook...",
  "Generating verdict...",
]

export default function ProcessingScreen() {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < analysisSteps.length - 1 ? prev + 1 : prev))
    }, 700)

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : prev))
    }, 50)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="mb-8"
      >
        <Scale className="h-16 w-16 text-nba-blue" />
      </motion.div>

      <h2 className="text-2xl font-bold mb-4">Analyzing Play...</h2>

      <div className="w-full max-w-md mb-8">
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-nba-blue"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="text-gray-400"
      >
        {analysisSteps[currentStep]}
      </motion.div>
    </div>
  )
}


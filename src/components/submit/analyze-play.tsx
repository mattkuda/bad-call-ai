"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface AnalyzePlayProps {
    playId: string
    videoFile: File
    officialCall: string
}

interface AnalysisResult {
    verdict: 'CORRECT_CALL' | 'INCORRECT_CALL' | 'UNCLEAR'
    confidenceScore: number
    explanation: string
    ruleReference?: string
    keyFrameIndex: number
    frames: Array<{
        base64: string
        index: number
        isKeyFrame: boolean
    }>
    audioNarration: string
}

export function AnalyzePlay({ playId, videoFile, officialCall }: AnalyzePlayProps) {
    const [analysisState, setAnalysisState] = useState<'uploading' | 'analyzing' | 'complete' | 'error'>('uploading')
    const [result, setResult] = useState<AnalysisResult | null>(null)
    const router = useRouter()

    useEffect(() => {
        const analyzePlay = async () => {
            try {
                setAnalysisState('uploading')

                // Create form data to send to API
                const formData = new FormData()
                formData.append('video', videoFile)
                formData.append('playId', playId)
                formData.append('officialCall', officialCall)

                // Call the API endpoint
                const response = await fetch('/api/analyze-video', {
                    method: 'POST',
                    body: formData,
                })

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`)
                }

                setAnalysisState('analyzing')

                const data = await response.json()
                setResult(data)
                setAnalysisState('complete')

                // Store the result in localStorage for the play page to access
                localStorage.setItem(`analysis-${playId}`, JSON.stringify(data))

                // Redirect to the play page after analysis is complete
                setTimeout(() => {
                    router.push(`/play/${playId}`)
                }, 2000)
            } catch (error) {
                console.error('Analysis error:', error)
                setAnalysisState('error')
            }
        }

        if (videoFile && playId && officialCall) {
            analyzePlay()
        }
    }, [playId, videoFile, officialCall, router])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {analysisState !== 'complete' && (
                <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-nba-blue" />
                    <p className="text-lg font-semibold">
                        {analysisState === 'uploading' ? 'Uploading video...' : 'AI is analyzing the play...'}
                    </p>
                </div>
            )}

            {analysisState === 'complete' && result && (
                <div className="space-y-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">AI Verdict</h2>
                        <div className={`text-xl font-bold mb-2 ${result.verdict === 'CORRECT_CALL' ? 'text-green-500' :
                            result.verdict === 'INCORRECT_CALL' ? 'text-red-500' : 'text-yellow-500'
                            }`}>
                            {result.verdict.replace('_', ' ')}
                        </div>
                        <div className="text-sm text-gray-400 mb-4">
                            Confidence: {result.confidenceScore}%
                        </div>
                        <p className="text-gray-200">{result.explanation}</p>
                        {result.ruleReference && (
                            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                                <h3 className="text-sm font-semibold mb-1">Rule Reference:</h3>
                                <p className="text-sm text-gray-300">{result.ruleReference}</p>
                            </div>
                        )}
                        <div className="mt-4 text-sm text-gray-400">
                            Redirecting to play page...
                        </div>
                    </div>
                </div>
            )}

            {analysisState === 'error' && (
                <div className="text-center text-red-500">
                    An error occurred while analyzing the play. Please try again.
                </div>
            )}
        </motion.div>
    )
} 
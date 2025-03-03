"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import ProcessingScreen from "./processing-screen"

interface AnalyzePlayProps {
    playId: string
    videoFile: File
    officialCall: string
    aiContext: string
}

// interface AnalysisResult {
//     verdict: 'CORRECT_CALL' | 'INCORRECT_CALL' | 'UNCLEAR'
//     confidenceScore: number
//     explanation: string
//     ruleReference?: string
//     keyFrameIndex: number
//     frames: Array<{
//         base64: string
//         index: number
//         isKeyFrame: boolean
//     }>
//     audioNarration: string
// }

// Add Play interface to match the one in data.ts
interface PlayComment {
    id: string
    user: string
    avatar: string
    text: string
    likes: number
    timestamp: string
}

interface Play {
    id: string
    thumbnail: string
    homeTeam: string
    awayTeam: string
    quarter: string
    timeLeft: string
    officialCall: string
    aiVerdict: "correct" | "incorrect" | "unclear"
    confidenceScore: number
    yesVotes: number
    noVotes: number
    commentCount: number
    description: string
    videoUrl: string
    aiExplanation: string
    ruleReference: string
    comments: PlayComment[]
    refereeId?: string
    timestamp?: Date | string
    // Add the analysis-specific fields
    frames?: Array<{
        base64: string
        index: number
        isKeyFrame: boolean
    }>
    keyFrameIndex?: number
    audioNarration?: string
}

export function AnalyzePlay({ playId, videoFile, officialCall, aiContext }: AnalyzePlayProps) {
    const [analysisState, setAnalysisState] = useState<'uploading' | 'analyzing' | 'complete' | 'error'>('uploading')
    const router = useRouter()

    useEffect(() => {
        const analyzePlay = async () => {
            try {
                setAnalysisState('uploading')

                // Create form data to send to API
                const formData = new FormData()
                formData.append('video', videoFile)
                formData.append('playId', playId)
                formData.append('aiContext', aiContext)
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

                const data = await response.json();
                console.log("!!!!!!!!!!!!!!!!!")
                console.log("In analyze play: data from the API")
                console.log(data)
                console.log("!!!!!!!!!!!!!!!!!")
                setAnalysisState('complete')

                // Create a complete Play object with all required fields
                const completePlayData: Play = {
                    id: "recent",
                    confidenceScore: data.confidenceScore,
                    aiExplanation: data.explanation,
                    ruleReference: data.ruleReference || "",
                    timestamp: new Date().toISOString(),
                    frames: data.frames,
                    keyFrameIndex: data.keyFrameIndex,
                    audioNarration: data.audioNarration,
                    thumbnail: "/placeholder.png?height=400&width=600",
                    homeTeam: "Warriors",
                    awayTeam: "Rockets",
                    quarter: "Q4",
                    refereeId: "1",
                    timeLeft: "0:12",
                    officialCall: "Kevin Durant was NOT out of bounds while saving the ball.",
                    aiVerdict: data.verdict === 'CORRECT_CALL'
                        ? 'correct'
                        : data.verdict === 'INCORRECT_CALL'
                            ? 'incorrect'
                            : 'unclear',
                    yesVotes: 1245,
                    noVotes: 5678,
                    commentCount: 342,
                    description:
                        "Kevin Durant saves the ball from going out of bounds on the baseline, resulting in a clutch 3 pointer for the Warriors.",
                    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                    comments: [],
                    //     {
                    //         id: "c1",
                    //         user: "BasketballFan23",
                    //         avatar: "/placeholder.png?height=40&width=40",
                    //         text: "Terrible call! Tatum was clearly set outside the restricted area.",
                    //         likes: 89,
                    //         timestamp: "2h ago",
                    //     },
                    //     {
                    //         id: "c2",
                    //         user: "LakersNation",
                    //         avatar: "/placeholder.png?height=40&width=40",
                    //         text: "Nah, Tatum was still moving. Good call by the ref!",
                    //         likes: 45,
                    //         timestamp: "1h ago",
                    //     },
                    //     {
                    //         id: "c3",
                    //         user: "RefExpert",
                    //         avatar: "/placeholder.png?height=40&width=40",
                    //         text: "Looking at the replay, his right foot was still sliding when contact was made. It's a close call but I think the ref got it right.",
                    //         likes: 67,
                    //         timestamp: "45m ago",
                    //     },
                    // ],
                };

                // Store the complete Play object in localStorage
                localStorage.setItem(`analysis-recent`, JSON.stringify(completePlayData))

                // Redirect to the play page after analysis is complete
                setTimeout(() => {
                    router.push(`/play/recent`)
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
            {analysisState !== 'complete' && analysisState !== 'error' && (
                <ProcessingScreen />
            )}
            {analysisState === 'error' && (
                <div className="text-center text-red-500">
                    An error occurred while analyzing the play. Please try again.
                </div>
            )}
        </motion.div>
    )
} 
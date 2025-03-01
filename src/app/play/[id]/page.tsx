"use client"

import { plays, referees } from "@/lib/data"
import { Button } from "@/components/ui/button"
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  ChevronLeft,
  Play,
  Volume2,
  Maximize,
  SkipBack,
  SkipForward,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatTimeAgo } from "@/lib/utils"
import { useEffect, useState } from "react"

interface AnalysisResult {
  verdict: 'CORRECT_CALL' | 'INCORRECT_CALL' | 'UNCLEAR'
  confidenceScore: number
  explanation: string
  ruleReference?: string
  keyFrameIndex: number
  frames?: Array<{
    base64: string
    index: number
    isKeyFrame: boolean
  }>
  audioNarration?: string
}

interface PlayPageProps {
  params: {
    id: string
  }
}

export default function PlayPage({ params }: PlayPageProps) {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isClient, setIsClient] = useState(false)

  const play = plays.find((p) => p.id === params.id)

  useEffect(() => {
    setIsClient(true)
    // Try to get analysis from localStorage
    const storedAnalysis = localStorage.getItem(`analysis-${params.id}`)
    if (storedAnalysis) {
      try {
        setAnalysisResult(JSON.parse(storedAnalysis))
      } catch (e) {
        console.error("Failed to parse stored analysis:", e)
      }
    }
  }, [params.id])

  if (!play) {
    return <div className="text-center py-12">Play not found</div>
  }

  const totalVotes = play.yesVotes + play.noVotes
  const yesPercentage = totalVotes > 0 ? Math.round((play.yesVotes / totalVotes) * 100) : 50
  const noPercentage = 100 - yesPercentage

  // Use either the real analysis result or fall back to the mock data
  const aiVerdict = analysisResult ? analysisResult.verdict.toLowerCase() : play.aiVerdict
  const confidenceScore = analysisResult ? analysisResult.confidenceScore : play.confidenceScore
  const aiExplanation = analysisResult ? analysisResult.explanation : play.aiExplanation
  const ruleReference = analysisResult ? analysisResult.ruleReference : play.ruleReference

  const getVerdictText = (verdict: string) => {
    switch (verdict) {
      case "correct":
      case "correct_call":
        return "✅ Correct Call"
      case "incorrect":
      case "incorrect_call":
        return "❌ Incorrect Call"
      case "unclear":
        return "❓ Unclear"
      default:
        return ""
    }
  }

  const getVerdictClass = (verdict: string) => {
    switch (verdict) {
      case "correct":
      case "correct_call":
        return "verdict-correct"
      case "incorrect":
      case "incorrect_call":
        return "verdict-incorrect"
      case "unclear":
        return "verdict-unclear"
      default:
        return ""
    }
  }

  // Audio playback function
  const playAudioNarration = () => {
    if (analysisResult?.audioNarration) {
      const audio = new Audio(`data:audio/mp3;base64,${analysisResult.audioNarration}`)
      audio.play()
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Link href="/" className="flex items-center text-gray-400 hover:text-white mb-4">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Feed
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Player and Game Info - Takes up 2/3 on desktop */}
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
            {/* Video Player */}
            <div className="relative aspect-video">
              {/* If we have frames from the analysis, show the key frame */}
              {isClient && analysisResult?.frames && analysisResult.frames.length > 0 ? (
                <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center">
                  <img
                    src={`data:image/jpeg;base64,${analysisResult.frames.find(f => f.isKeyFrame)?.base64 || analysisResult.frames[0].base64}`}
                    alt="Key frame"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ) : (
                <iframe
                  src={play.videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  title={`${play.homeTeam} vs ${play.awayTeam}`}
                ></iframe>
              )}

              {/* Video Controls Overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon" className="rounded-full bg-white/20 hover:bg-white/30">
                    <SkipBack className="h-6 w-6 text-white" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full bg-white/20 hover:bg-white/30 h-14 w-14">
                    <Play className="h-8 w-8 text-white" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full bg-white/20 hover:bg-white/30">
                    <SkipForward className="h-6 w-6 text-white" />
                  </Button>
                </div>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="w-full bg-white/30 h-1 rounded-full mb-4">
                  <div className="bg-nba-red h-full rounded-full" style={{ width: "35%" }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                      <Volume2 className="h-4 w-4" />
                    </Button>
                    <span className="text-white text-sm">0:35 / 1:24</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Game Info */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-xl font-bold">
                  {play.homeTeam} vs {play.awayTeam}
                </h1>
                <div className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                  {play.quarter} • {play.timeLeft}
                </div>
              </div>
              <p className="text-gray-400 mb-4">{play.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-800 px-3 py-1 rounded-full text-sm">Official Call: {play.officialCall}</div>
                  <Link
                    href={`/referee/${play.refereeId}`}
                    className="flex items-center space-x-2 text-gray-400 hover:text-white"
                  >
                    <div className="relative h-6 w-6 rounded-full overflow-hidden">
                      <Image
                        src={referees.find((ref) => ref.id === play.refereeId)?.avatar || "/placeholder.svg"}
                        alt="Referee"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm">{referees.find((ref) => ref.id === play.refereeId)?.name}</span>
                  </Link>
                  <span className="text-sm text-gray-400">{formatTimeAgo(play.timestamp)}</span>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis Panel - Takes up 1/3 on desktop */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 rounded-lg border border-gray-800 h-full">
            <div className="p-4 border-b border-gray-800">
              <h2 className="text-lg font-bold mb-1">AI Analysis</h2>
              <div className="flex items-center justify-between">
                <div className={`text-xl font-bold ${getVerdictClass(aiVerdict)}`}>
                  {getVerdictText(aiVerdict)}
                </div>
                <div className="bg-gray-800 px-3 py-1 rounded-full text-sm">{confidenceScore}% confidence</div>
              </div>
              {analysisResult?.audioNarration && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={playAudioNarration}
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Play Audio Narration
                </Button>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Explanation:</h3>
              <p className="text-gray-300 mb-4">{aiExplanation}</p>

              {ruleReference && (
                <div className="bg-gray-800 p-3 rounded-lg mb-4">
                  <h3 className="font-semibold mb-1 text-sm text-gray-300">NBA Rule Reference:</h3>
                  <p className="text-sm text-gray-400">{ruleReference}</p>
                </div>
              )}

              <h3 className="font-semibold mb-2">Fan Vote:</h3>
              <div className="flex justify-between items-center mb-2 text-sm">
                <span>Good Call</span>
                <span>Bad Call</span>
              </div>
              <div className="h-4 bg-gray-800 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-nba-blue" style={{ width: `${yesPercentage}%`, float: "left" }}></div>
                <div className="h-full bg-nba-red" style={{ width: `${noPercentage}%`, float: "left" }}></div>
              </div>
              <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
                <span>{yesPercentage}%</span>
                <span>{noPercentage}%</span>
              </div>

              <div className="flex space-x-2 mb-6">
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  Good Call
                </Button>
                <Button variant="outline" className="flex-1 flex items-center justify-center gap-2">
                  <ThumbsDown className="h-4 w-4" />
                  Bad Call
                </Button>
              </div>

              <div className="border-t border-gray-800 pt-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Comments ({play.comments.length})
                </h3>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {play.comments.map((comment) => (
                    <div key={comment.id} className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className="relative h-8 w-8 rounded-full overflow-hidden">
                          <Image
                            src={comment.avatar || "/placeholder.svg"}
                            alt={comment.user}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">{comment.user}</h4>
                          <span className="text-xs text-gray-500">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-300 mt-1">{comment.text}</p>
                        <div className="flex items-center mt-2">
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-400">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-gray-400">
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


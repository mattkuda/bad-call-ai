"use client"

import { hardCodedPlays, referees } from "@/lib/data"
import { Button } from "@/components/ui/button"
import {
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  ChevronLeft,
  Play,
  Volume2,
  SkipBack,
  SkipForward,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatTimeAgo } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

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

// Add Play interface to match the one in data.ts and analyze-play.tsx
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
  // Analysis-specific fields
  frames?: Array<{
    base64: string
    index: number
    isKeyFrame: boolean
  }>
  keyFrameIndex?: number
  audioNarration?: string
}

export default function PlayPage() {
  const { id } = useParams();

  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [recentPlay, setRecentPlay] = useState<Play | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)

  // New state variables for demo functionality
  const [goodVotes, setGoodVotes] = useState(0)
  const [badVotes, setbadVotes] = useState(0)
  const [newComment, setNewComment] = useState("")
  const [demoComments, setDemoComments] = useState<PlayComment[]>([])
  const [feedbackGiven, setFeedbackGiven] = useState(false)

  // Only find a play from the mock data if we're not looking at a recent analysis
  const hardCodedPlay = id !== "recent" ? hardCodedPlays.find((p) => p.id === id) : null
  const isRecentAnalysis = id === "recent"

  useEffect(() => {
    setIsClient(true)

    // Only use localStorage when id is "recent"
    if (isRecentAnalysis) {
      const storedAnalysis = localStorage.getItem("analysis-recent")
      if (storedAnalysis) {
        try {
          const parsedData = JSON.parse(storedAnalysis)

          // If the stored data has all the Play fields, use it directly
          if (parsedData.id && parsedData.homeTeam && parsedData.aiVerdict) {
            setRecentPlay(parsedData)

            // Also set analysisResult for backward compatibility
            setAnalysisResult({
              // Map the verdict from Play interface format to AnalysisResult format
              verdict: parsedData.aiVerdict === 'correct'
                ? 'CORRECT_CALL'
                : parsedData.aiVerdict === 'incorrect'
                  ? 'INCORRECT_CALL'
                  : 'UNCLEAR',
              confidenceScore: parsedData.confidenceScore,
              explanation: parsedData.aiExplanation,
              ruleReference: parsedData.ruleReference,
              keyFrameIndex: parsedData.keyFrameIndex || 0,
              frames: parsedData.frames,
              audioNarration: parsedData.audioNarration
            })
          } else {
            // Legacy format - just the analysis result
            setAnalysisResult(parsedData)
          }
        } catch (e) {
          console.error("Failed to parse stored analysis:", e)
        }
      }
    }
  }, [isRecentAnalysis])

  // Get frames from the appropriate source
  const frames = isRecentAnalysis
    ? (recentPlay?.frames || analysisResult?.frames)
    : undefined

  // Set current frame to key frame initially when frames change
  useEffect(() => {
    if (frames && frames.length > 0) {
      const keyFrameIndex = frames.findIndex(f => f.isKeyFrame);
      setCurrentFrameIndex(keyFrameIndex >= 0 ? keyFrameIndex : 0);
    }
  }, [frames]);

  // Handle the case where we're looking at a recent analysis but no data is found
  if (isRecentAnalysis && !recentPlay && !analysisResult && isClient) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">
          <h2 className="text-xl font-bold mb-4">No recent analysis found</h2>
          <p className="text-gray-400 mb-6">Submit a play for analysis to see results here.</p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Handle the case where we're looking for a specific play but it's not found
  if (!isRecentAnalysis && !hardCodedPlay) {
    return <div className="text-center py-12">Play not found</div>
  }

  // Use the appropriate play data based on the source
  const playData = isRecentAnalysis
    ? (recentPlay || {
      homeTeam: "Warriors",
      awayTeam: "Rockets",
      quarter: "4th",
      timeLeft: "0:12",
      description: "Kevin Durant is attempting to save the ball from going out of bounds on the baseline.",
      officialCall: "Kevin Durant was NOT out of bounds while saving the ball.",
      refereeId: "1",
      timestamp: new Date().toISOString(),
      yesVotes: 0,
      noVotes: 0,
      comments: [],
      videoUrl: "",
      // Map the verdict from AnalysisResult format to Play interface format
      aiVerdict: analysisResult?.verdict === 'CORRECT_CALL'
        ? 'correct'
        : analysisResult?.verdict === 'INCORRECT_CALL'
          ? 'incorrect'
          : 'unclear',
      confidenceScore: analysisResult?.confidenceScore || 0,
      aiExplanation: analysisResult?.explanation || "",
      ruleReference: analysisResult?.ruleReference || "",
      // Include frames and audio from analysisResult
      frames: analysisResult?.frames,
      keyFrameIndex: analysisResult?.keyFrameIndex,
      audioNarration: analysisResult?.audioNarration
    })
    : hardCodedPlay!;

  // Calculate total votes including demo votes
  const totalVotes = playData.yesVotes + playData.noVotes + goodVotes + badVotes
  const yesPercentage = totalVotes > 0
    ? Math.round(((playData.yesVotes + goodVotes) / totalVotes) * 100)
    : 50
  const noPercentage = 100 - yesPercentage

  // Use the appropriate data source for verdict, confidence, explanation, etc.
  const aiVerdict = playData.aiVerdict
  const confidenceScore = playData.confidenceScore
  const aiExplanation = playData.aiExplanation
  const ruleReference = playData.ruleReference

  // Handler functions for demo functionality
  const handleGoodVote = () => {
    setGoodVotes(prev => prev + 1)
    setFeedbackGiven(true)
  }

  const handleBadVote = () => {
    setbadVotes(prev => prev + 1)
    setFeedbackGiven(true)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const newCommentObj: PlayComment = {
      id: `demo-${Date.now()}`,
      user: "You",
      avatar: "/placeholder.svg",
      text: newComment,
      likes: 0,
      timestamp: "Just now"
    }

    setDemoComments(prev => [newCommentObj, ...prev])
    setNewComment("")
  }

  // Combine original comments with demo comments
  const allComments = [...demoComments, ...(playData.comments || [])]

  const getVerdictText = (verdict: string) => {
    if (!verdict) return "";

    switch (verdict.toLowerCase()) {
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
    if (!verdict) return "";

    switch (verdict.toLowerCase()) {
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
    if (isRecentAnalysis && (recentPlay?.audioNarration || analysisResult?.audioNarration)) {
      const audioData = recentPlay?.audioNarration || analysisResult?.audioNarration
      if (audioData) {
        const audio = new Audio(`data:audio/mp3;base64,${audioData}`)
        audio.play()
      }
    }
  }

  // Get the current frame to display
  const currentFrame = frames && frames.length > 0 ? frames[currentFrameIndex] : undefined;

  // Functions to navigate between frames
  const goToPreviousFrame = () => {
    if (frames && frames.length > 0) {
      setCurrentFrameIndex(prev => (prev > 0 ? prev - 1 : frames.length - 1));
    }
  };

  const goToNextFrame = () => {
    if (frames && frames.length > 0) {
      setCurrentFrameIndex(prev => (prev < frames.length - 1 ? prev + 1 : 0));
    }
  };

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
              {isRecentAnalysis ? (
                <div className="relative aspect-video">
                  <video
                    src="/videos/Short-KD.mp4"
                    className="absolute inset-0 w-full h-full object-contain bg-black"
                    controls
                    autoPlay={true}
                    loop
                    muted
                  />
                  <p >
                    Test
                  </p>
                </div>
              ) : (
                <iframe
                  src={playData.videoUrl}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  title={`${playData.homeTeam} vs ${playData.awayTeam}`}
                ></iframe>
              )}
            </div>
            {/* Game Info */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-xl font-bold">
                  {isRecentAnalysis ? "Recent Analysis" : `${playData.homeTeam} vs ${playData.awayTeam}`}
                </h1>
                {!isRecentAnalysis && (
                  <div className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                    {playData.quarter} • {playData.timeLeft}
                  </div>
                )}
              </div>
              <p className="text-gray-400 mb-4">{playData.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  {!isRecentAnalysis ? (
                    <>
                      <div className="bg-gray-800 px-3 py-1 rounded-full text-sm">Official Call: {playData.officialCall}</div>
                      <Link
                        href={`/referee/${playData.refereeId}`}
                        className="flex items-center space-x-2 text-gray-400 hover:text-white"
                      >
                        <div className="relative h-6 w-6 rounded-full overflow-hidden">
                          <Image
                            src={referees.find((ref) => ref.id === playData.refereeId)?.imageUrl || "/placeholder.svg"}
                            alt="Referee"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm">{referees.find((ref) => ref.id === playData.refereeId)?.name}</span>
                      </Link>
                      <span className="text-sm text-gray-400">
                        {typeof playData.timestamp === 'string'
                          ? formatTimeAgo(new Date(playData.timestamp))
                          : formatTimeAgo(playData.timestamp)}
                      </span>
                    </>
                  ) : (
                    <div className="bg-gray-800 px-3 py-1 rounded-full text-sm">AI Analysis</div>
                  )}
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Key Frame Section - Only show for recent analyses with frames */}
            {isClient && isRecentAnalysis && frames && frames.length > 0 && (
              <div className="p-4 border-t border-gray-800">
                <h2 className="text-lg font-bold mb-3">AI Analysis Frames</h2>
                <div className="bg-black rounded-lg overflow-hidden">
                  <div className="flex flex-col items-center justify-center p-4">
                    {currentFrame ? (
                      <>
                        <img
                          src={`data:image/jpeg;base64,${currentFrame.base64}`}
                          alt={`Frame ${currentFrame.index + 1}`}
                          className="max-w-full max-h-[400px] object-contain"
                        />
                        <div className="mt-4 text-center px-4">
                          <p className="text-white text-sm">
                            {currentFrame.isKeyFrame ? "Key frame identified by AI as most relevant to the call" : "Frame view"}
                          </p>
                          <p className="text-gray-400 text-xs mt-1">
                            Frame {currentFrame.index + 1} of {frames.length}
                          </p>
                        </div>
                      </>
                    ) : (
                      <p className="text-gray-400">No frame available</p>
                    )}
                  </div>

                  {/* Frame navigation controls */}
                  <div className="flex justify-center space-x-4 pb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPreviousFrame}
                      className="bg-gray-800/80 hover:bg-gray-700/80 text-white border-gray-700"
                    >
                      <SkipBack className="h-4 w-4 mr-1" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextFrame}
                      className="bg-gray-800/80 hover:bg-gray-700/80 text-white border-gray-700"
                    >
                      Next
                      <SkipForward className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
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
              {isRecentAnalysis && (recentPlay?.audioNarration || analysisResult?.audioNarration) && (
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

              {isRecentAnalysis ? (
                <>
                  <h3 className="font-semibold mb-2">Your Feedback:</h3>
                  <div className="flex space-x-2 mb-6">
                    <Button
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-2"
                      onClick={handleGoodVote}
                      disabled={feedbackGiven}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Good Analysis {goodVotes > 0 && `(${goodVotes})`}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-2"
                      onClick={handleBadVote}
                      disabled={feedbackGiven}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      Poor Analysis {badVotes > 0 && `(${badVotes})`}
                    </Button>
                  </div>
                  {feedbackGiven && (
                    <p className="text-sm text-green-500 text-center mb-4">Thanks for your feedback!</p>
                  )}
                </>
              ) : (
                <>
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
                    <Button
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-2"
                      onClick={handleGoodVote}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      Good Call {goodVotes > 0 && `(+${goodVotes})`}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-2"
                      onClick={handleBadVote}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      Bad Call {badVotes > 0 && `(+${badVotes})`}
                    </Button>
                  </div>
                </>
              )}

              <div className="border-t border-gray-800 pt-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {isRecentAnalysis ? 'Comments' : `Comments (${allComments.length})`}
                </h3>

                {/* Comment form */}
                <form onSubmit={handleCommentSubmit} className="mb-4">
                  <div className="flex space-x-2">
                    <div className="flex-shrink-0">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden bg-gray-700">
                        <Image
                          src="/placeholder.svg"
                          alt="Your avatar"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <Button type="submit" size="sm" variant="outline">Post</Button>
                  </div>
                </form>

                {isRecentAnalysis && demoComments.length === 0 ? (
                  <div className="bg-gray-800 rounded-lg p-4 text-center text-gray-400">
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                    {allComments.map((comment) => (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


'use client'
import Link from "next/link"
import Image from "next/image"
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatTimeAgo } from "@/lib/utils"
import { referees } from "@/lib/data"

interface PlayCardProps {
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
  refereeId?: string
  timestamp?: Date
}

export default function PlayCard({
  id,
  thumbnail,
  homeTeam,
  awayTeam,
  quarter,
  timeLeft,
  officialCall,
  aiVerdict,
  confidenceScore,
  yesVotes,
  noVotes,
  commentCount,
  refereeId,
  timestamp,
}: PlayCardProps) {
  const totalVotes = yesVotes + noVotes
  const yesPercentage = totalVotes > 0 ? Math.round((yesVotes / totalVotes) * 100) : 50
  const noPercentage = 100 - yesPercentage

  const getVerdictText = (verdict: string) => {
    switch (verdict) {
      case "correct":
        return "✅ Correct Call"
      case "incorrect":
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
        return "verdict-correct"
      case "incorrect":
        return "verdict-incorrect"
      case "unclear":
        return "verdict-unclear"
      default:
        return ""
    }
  }

  return (
    <Link href={`/play/${id}`}>
      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition duration-300 hover:shadow-lg">
        <div className="relative aspect-video">
          <Image
            src={thumbnail || "/placeholder.svg"}
            alt={`${homeTeam} vs ${awayTeam}`}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold">
                  {homeTeam} vs {awayTeam}
                </p>
                <p className="text-xs text-gray-400">
                  {quarter} • {timeLeft}
                </p>
              </div>
              <div className="bg-black/70 px-2 py-1 rounded text-xs">{officialCall}</div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm text-gray-400">{timestamp ? formatTimeAgo(timestamp) : ""}</div>
            <Link
              href={`/referee/${refereeId}`}
              className="text-sm text-gray-400 hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {refereeId && referees.find((ref) => ref.id === refereeId)?.name}
            </Link>
          </div>
          <div className="flex justify-between items-center mb-3">
            <div className={cn("font-bold", getVerdictClass(aiVerdict))}>{getVerdictText(aiVerdict)}</div>
            <div className="text-sm text-gray-400">{confidenceScore}% confidence</div>
          </div>

          {/* Vote Split Bar */}
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-nba-blue" style={{ width: `${yesPercentage}%`, float: "left" }}></div>
            <div className="h-full bg-nba-red" style={{ width: `${noPercentage}%`, float: "left" }}></div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <div className="flex items-center space-x-1">
                <ThumbsUp className="h-4 w-4 text-nba-blue" />
                <span className="text-sm">{yesPercentage}%</span>
              </div>
              <div className="flex items-center space-x-1">
                <ThumbsDown className="h-4 w-4 text-nba-red" />
                <span className="text-sm">{noPercentage}%</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">{commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}


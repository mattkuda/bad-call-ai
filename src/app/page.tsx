import { plays } from "@/lib/data"
import PlayCard from "@/components/play-card"
import { Button } from "@/components/ui/button"
import { Flame, Scale, Clock } from "lucide-react"

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Sorting Tabs */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <Button variant="nba-blue" className="flex items-center gap-2">
            <Flame className="h-4 w-4" />
            HOT
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Scale className="h-4 w-4" />
            CONTROVERSIAL
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            RECENT
          </Button>
        </div>
      </div>

      {/* Play Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plays.map((play) => (
          <PlayCard
            key={play.id}
            id={play.id}
            thumbnail={play.thumbnail}
            homeTeam={play.homeTeam}
            awayTeam={play.awayTeam}
            quarter={play.quarter}
            timeLeft={play.timeLeft}
            officialCall={play.officialCall}
            aiVerdict={play.aiVerdict as "correct" | "incorrect" | "unclear"}
            confidenceScore={play.confidenceScore}
            yesVotes={play.yesVotes}
            noVotes={play.noVotes}
            commentCount={play.commentCount}
          />
        ))}
      </div>
    </div>
  )
}


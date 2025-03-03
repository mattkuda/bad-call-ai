import { hardCodedPlays } from "@/lib/data"
import PlayCard from "@/components/play-card"
import { Button } from "@/components/ui/button"
import { Flame, Scale, Clock } from "lucide-react"

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Sorting Tabs */}
      <div className="flex justify-between items-center mb-8 rounded-lg">
        <div className="flex space-x-3">
          <Button variant="default" className="rounded-md blue-gradient flex items-center gap-2 font-medium">
            <Flame className="h-4 w-4" />
            HOT
          </Button>
          <Button variant="ghost" className="flex items-center gap-2 hover:bg-[#272729]">
            <Scale className="h-4 w-4" />
            CONTROVERSIAL
          </Button>
          <Button variant="ghost" className="flex items-center gap-2 hover:bg-[#272729]">
            <Clock className="h-4 w-4" />
            RECENT
          </Button>
        </div>
      </div>
      {/* Play Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hardCodedPlays.map((play) => (
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
            refereeId={play.refereeId}
            timestamp={play.timestamp}
            videoUrl={play.videoUrl}
          />
        ))}
      </div>
    </div>
  )
}


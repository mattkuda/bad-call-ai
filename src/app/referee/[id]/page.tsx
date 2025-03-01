import Image from "next/image"
import { hardCodedPlays, referees } from "@/lib/data"
import PlayCard from "@/components/play-card"

interface RefereePageProps {
  params: {
    id: string
  }
}

export default function RefereePage({ params }: RefereePageProps) {
  const referee = referees.find((ref) => ref.id === params.id)

  if (!referee) {
    return <div className="text-center py-12">Referee not found</div>
  }

  const refereePlays = hardCodedPlays.filter((play) => play.refereeId === params.id)
  const accuracyPercentage = Math.round((referee.correctCalls / referee.totalReviewedCalls) * 100)

  return (
    <div className="max-w-7xl mx-auto">
      {/* Referee Profile Header */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative h-32 w-32 rounded-full overflow-hidden">
            <Image src={referee.imageUrl || "/placeholder.svg"} alt={referee.name} fill className="object-cover" />
          </div>
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{referee.name}</h1>
            <p className="text-gray-400 mb-4">{referee.bio}</p>
            <div className="grid grid-cols-4 gap-4 max-w-2xl">
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{accuracyPercentage}%</div>
                <div className="text-sm text-gray-400">Accuracy</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{referee.totalReviewedCalls}</div>
                <div className="text-sm text-gray-400">Reviews</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold">{referee.yearsExperience}</div>
                <div className="text-sm text-gray-400">Years</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-500">{referee.correctCalls}</div>
                <div className="text-sm text-gray-400">Correct</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviewed Plays */}
      <h2 className="text-2xl font-bold mb-6">Recent Reviewed Plays</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {refereePlays.map((play) => (
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


import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { referees } from "@/lib/data"
import { Star, ArrowUpDown } from "lucide-react"

export default function LeaderboardPage() {
  // Calculate accuracy percentage for each referee
  const refereesWithStats = referees
    .map((ref) => {
      const accuracyPercentage = Math.round((ref.correctCalls / ref.totalReviewedCalls) * 100)
      return {
        ...ref,
        accuracyPercentage,
      }
    })
    .sort((a, b) => b.accuracyPercentage - a.accuracyPercentage)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Referee Leaderboard</h1>
        <Button variant="ghost" className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4" />
          Sort by
        </Button>
      </div>

      <div className="grid gap-4">
        {refereesWithStats.map((ref, index) => (
          <Link key={ref.id} href={`/referee/${ref.id}`}>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image src={ref.imageUrl || "/placeholder.png"} alt={ref.name} fill className="object-cover" />
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h2 className="text-lg font-semibold flex items-center gap-2">
                        {ref.name}
                        {index === 0 && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                      </h2>
                      <p className="text-sm text-gray-400">{ref.yearsExperience} years experience</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{ref.accuracyPercentage}%</div>
                      <div className="text-sm text-gray-400">accuracy</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm font-medium">{ref.correctCalls}</div>
                      <div className="text-xs text-gray-400">Correct</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{ref.incorrectCalls}</div>
                      <div className="text-xs text-gray-400">Incorrect</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{ref.totalReviewedCalls}</div>
                      <div className="text-xs text-gray-400">Total Reviews</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}


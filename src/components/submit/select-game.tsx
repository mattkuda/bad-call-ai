"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

interface Game {
  id: string
  homeTeam: string
  awayTeam: string
  date: string
  homeTeamLogo: string
  awayTeamLogo: string
}

const recentGames: Game[] = [
  {
    id: "1",
    homeTeam: "Warriors",
    awayTeam: "Rockets",
    date: "Nov 10, 2024",
    homeTeamLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/gs.png&h=200&w=200",
    awayTeamLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/hou.png&h=200&w=200",
  },
  {
    id: "2",
    homeTeam: "Bucks",
    awayTeam: "Heat",
    date: "Nov 9, 2024",
    homeTeamLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/mil.png&h=200&w=200",
    awayTeamLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/mia.png&h=200&w=200",
  },
  {
    id: "3",
    homeTeam: "Lakers",
    awayTeam: "Celtics",
    date: "Nov 8, 2024",
    homeTeamLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/lal.png&h=200&w=200",
    awayTeamLogo: "https://a.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/bos.png&h=200&w=200",
  },
]

interface SelectGameProps {
  onSelect: (gameId: string) => void
}

export default function SelectGame({ onSelect }: SelectGameProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredGames = recentGames.filter(
    (game) =>
      game.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Submit a Play</h1>
        <p className="text-gray-400">Select a recent NBA game to submit a play for review.</p>
      </div>

      <div className="relative">
        <Input
          type="search"
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      <div className="grid gap-4">
        {filteredGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(game.id)}
            className="bg-[#1A1A1B] border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="relative h-10 w-10">
                    <Image
                      src={game.homeTeamLogo || "/placeholder.png"}
                      alt={game.homeTeam}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-semibold">{game.homeTeam}</span>
                </div>
                <span className="text-gray-400">vs</span>
                <div className="flex items-center gap-2">
                  <div className="relative h-10 w-10">
                    <Image
                      src={game.awayTeamLogo || "/placeholder.png"}
                      alt={game.awayTeam}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-semibold">{game.awayTeam}</span>
                </div>
              </div>
              <span className="text-sm text-gray-400">{game.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


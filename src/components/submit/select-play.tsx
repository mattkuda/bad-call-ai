"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Upload } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Play {
  id: string
  description: string
  aiContext?: string
  officialCall: string
  timestamp: string
}

const recentPlays: Record<string, Play[]> = {
  "1": [
    {
      id: "play1",
      description: "Kevin Durant saves ball from out of bounds",
      aiContext: "Kevin Durant is attempting to save the ball from going out of bounds on the baseline. Attached is a slow motion of the play.",
      officialCall: "Kevin Durant was NOT out of bounds while saving the ball.",
      timestamp: "4th Quarter, 0:32 Remaining",
    },
    {
      id: "play2",
      description: "Tatum step-back three",
      officialCall: "Shooting foul on defender",
      timestamp: "3rd Quarter, 1:45 Remaining",
    },
    {
      id: "play3",
      description: "Davis post-up move",
      officialCall: "Offensive foul called",
      timestamp: "3rd Quarter, 0:58 Remaining",
    },
  ],
}

interface SelectPlayProps {
  gameId: string
  onSelect: (playId: string, videoFile: File, officialCall: string, aiContext: string) => void
}

export default function SelectPlay({ gameId, onSelect }: SelectPlayProps) {
  const plays = recentPlays[gameId] || []
  const [selectedPlayId, setSelectedPlayId] = useState<string | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handlePlaySelect = (playId: string) => {
    setSelectedPlayId(playId)
  }

  const handleVideoSubmit = () => {
    if (selectedPlayId && videoFile) {
      const selectedPlay = plays.find(play => play.id === selectedPlayId)
      if (selectedPlay) {
        setIsUploading(true)
        // Skip the API call here and let AnalyzePlay handle it
        onSelect(selectedPlayId, videoFile, selectedPlay.officialCall, selectedPlay?.aiContext || "")
      }
    }
  }

  if (selectedPlayId) {
    const selectedPlay = plays.find(play => play.id === selectedPlayId)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-2xl font-bold mb-2">Upload Play Video</h1>
          <p className="text-gray-400">Upload an MP4 video of the selected play for AI analysis.</p>
        </div>

        <div className="bg-[#1A1A1B] border border-gray-800 rounded-lg p-6">
          <div className="mb-4">
            <h3 className="font-semibold">{selectedPlay?.description}</h3>
            <p className="text-sm text-gray-400">{selectedPlay?.timestamp}</p>
          </div>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
              <Input
                type="file"
                accept="video/mp4"
                className="hidden"
                id="video-upload"
                onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              />
              <label
                htmlFor="video-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="text-gray-400">
                  {videoFile ? videoFile.name : "Click to upload MP4 video"}
                </span>
              </label>
            </div>

            <div className="flex-col space-y-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSelectedPlayId(null)}
              >
                Back
              </Button>
              <Button
                variant="default"
                className="w-full btn-new"
                disabled={!videoFile || isUploading}
                onClick={handleVideoSubmit}
              >
                {isUploading ? 'Uploading...' : 'Analyze Play'}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Select a Recent Play</h1>
        <p className="text-gray-400">Choose a play from this game to submit for AI analysis.</p>
      </div>

      <div className="grid gap-4">
        {plays.map((play, index) => (
          <motion.div
            key={play.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1A1A1B] border border-gray-800 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{play.description}</h3>
                <p className="text-sm text-gray-400">{play.timestamp}</p>
              </div>
              <Button className="btn-new" onClick={() => handlePlaySelect(play.id)}>Select</Button>
            </div>
            <div className="inline-block bg-gray-800 px-3 py-1 rounded-full text-sm">
              Official Call: {play.officialCall}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}


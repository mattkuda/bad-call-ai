"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AnalyzePlay } from "./analyze-play"
import { Upload, Video } from "lucide-react"

export function UploadForm() {
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [officialCall, setOfficialCall] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [playId, setPlayId] = useState("")

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setVideoFile(e.target.files[0])
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!videoFile || !officialCall) return

        // Generate a unique ID for this play
        const newPlayId = `play-${Date.now()}`
        setPlayId(newPlayId)
        setIsSubmitted(true)
    }

    return (
        <div className="max-w-2xl mx-auto">
            {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="video">Upload Video</Label>
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                            {videoFile ? (
                                <div className="space-y-2">
                                    <Video className="h-12 w-12 mx-auto text-nba-blue" />
                                    <p className="text-sm text-gray-400">{videoFile.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setVideoFile(null)}
                                    >
                                        Change Video
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <Upload className="h-12 w-12 mx-auto text-gray-500" />
                                    <p className="text-sm text-gray-400">
                                        Drag and drop a video file, or click to browse
                                    </p>
                                    <Input
                                        id="video"
                                        type="file"
                                        accept="video/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                    <Button type="button" variant="outline" onClick={() => document.getElementById("video")?.click()}>
                                        Select Video
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="officialCall">Official Call</Label>
                        <Textarea
                            id="officialCall"
                            placeholder="Describe the official's call (e.g., 'Blocking foul on defender #23')"
                            value={officialCall}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setOfficialCall(e.target.value)}
                            className="min-h-[100px]"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!videoFile || !officialCall}
                    >
                        Analyze Play
                    </Button>
                </form>
            ) : (
                <AnalyzePlay
                    playId={playId}
                    videoFile={videoFile!}
                    officialCall={officialCall}
                />
            )}
        </div>
    )
} 
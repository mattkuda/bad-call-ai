import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAgo(date: Date | undefined) {
  if (!date) return "recently"

  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return "just now"
}

/**
 * Extracts the YouTube video ID from various YouTube URL formats
 * @param url YouTube URL (can be standard, shortened, or embed format)
 * @returns YouTube video ID or null if not found
 */
export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null

  // Handle different YouTube URL formats
  const regexPatterns = [
    // Standard YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=|youtube\.com\/watch\?.+&v=)([^&]+)/,
    // YouTube Embed URL: https://www.youtube.com/embed/VIDEO_ID
    /youtube\.com\/embed\/([^/?]+)/,
    // YouTube Shortened URL: https://youtu.be/VIDEO_ID
    /youtu\.be\/([^/?]+)/,
  ]

  for (const pattern of regexPatterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

/**
 * Generates a YouTube thumbnail URL from a YouTube video URL
 * @param videoUrl YouTube video URL
 * @param quality Thumbnail quality: 'default', 'hqdefault', 'mqdefault', 'sddefault', 'maxresdefault'
 * @returns YouTube thumbnail URL or fallback image if video ID can't be extracted
 */
export function getYouTubeThumbnailUrl(videoUrl: string, quality: 'default' | 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault' = 'hqdefault'): string {
  const videoId = extractYouTubeVideoId(videoUrl)

  if (!videoId) {
    return "/placeholder.png?height=400&width=600"
  }

  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
}


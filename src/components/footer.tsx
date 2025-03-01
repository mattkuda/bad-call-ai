import Link from "next/link"
import { Twitter, Instagram, Youtube, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1B] border-t border-[#343536] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center mb-2">
              <div className="relative h-6 w-6 mr-2">
                <div className="absolute inset-0 blue-gradient rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-[8px]">AI</span>
                </div>
              </div>
              <span className="text-sm font-bold">
                <span className="text-nba-blue">Bad</span> <span className="text-nba-red">Call</span>{" "}
                <span className="text-white">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Bad Call AI. All rights reserved.</p>
          </div>
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link href="#" className="text-gray-400 hover:text-white transition">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition">
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link href="/submit" className="text-sm text-gray-400 hover:text-white transition">
              Submit a Play
            </Link>
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}


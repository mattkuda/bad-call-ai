"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, X, User, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-10 mr-2">
              <div className="absolute inset-0 bg-nba-blue rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-xs">AI</span>
              </div>
            </div>
            <span className="text-xl font-bold">
              <span className="text-nba-blue">Bad</span> <span className="text-nba-red">Call</span>{" "}
              <span className="text-white">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-nba-blue transition">
              Home
            </Link>
            <Link href="/leaderboard" className="text-gray-400 hover:text-white transition">
              Leaderboard
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition">
              About
            </Link>
            <Button asChild className="bg-nba-blue text-white hover:bg-nba-blue/90 transition" variant="default">
              <Link href="/submit" className="flex items-center gap-2">
                Submit Play
                <Send className="w-4 h-4" />
              </Link>
            </Button>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex relative w-1/3">
            <Input
              type="search"
              placeholder="Search plays..."
              className="w-full bg-gray-800 border-gray-700 focus:border-nba-blue pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

          {/* User Profile & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-gray-800 mt-3">
            <div className="flex mb-4">
              <Input type="search" placeholder="Search plays..." className="w-full bg-gray-800 border-gray-700" />
              <Button variant="ghost" size="icon" className="ml-2">
                <Search className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-white hover:text-nba-blue transition px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/leaderboard"
                className="text-gray-400 hover:text-white transition px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Leaderboard
              </Link>
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Button asChild className="bg-nba-blue rounded-full text-white hover:bg-nba-blue/90 transition" variant="default">
                <Link href="/submit">Submit Play</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, X, User, Send, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NewButton } from "@/components/ui/new-button"
import Image from "next/image"
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-[#1A1A1B] border-b border-[#343536] sticky top-0 z-50 modern-shadow">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-10 mr-2">
              <Image src="/BlueLogo.png" alt="Bad Call AI" fill className="object-contain" />
            </div>
            <span className="text-xl font-bold text-gradient">
              Bad Call AI
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
            <Button asChild className="btn-new" variant="default">
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
              className="w-full bg-[#272729] border-[#343536] focus:border-nba-blue pr-10 focus:ring-nba-blue/20"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

          {/* User Profile & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full hidden md:flex hover:bg-[#272729]">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden hover:bg-[#272729]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-[#343536] mt-3">
            <div className="flex mb-4">
              <Input type="search" placeholder="Search plays..." className="w-full bg-[#272729] border-[#343536] focus:border-nba-blue" />
              <Button variant="ghost" size="icon" className="ml-2 hover:bg-[#272729]">
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
              <Link
                href="/text-gradient-example"
                className="text-gray-400 hover:text-white transition px-2 py-1 flex items-center gap-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <Type className="h-4 w-4" />
                Text Gradients
              </Link>
              <div className="mb-3">
                <NewButton asChild>
                  <Link
                    href="/button-example"
                    className="flex items-center justify-center gap-2 w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    What&apos;s new
                  </Link>
                </NewButton>
              </div>
              <Button asChild className="blue-gradient text-white hover:shadow-lg transition" variant="default">
                <Link href="/submit" className="flex items-center gap-2">
                  Submit Play
                  <Send className="w-4 h-4" />
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}


import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css";
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Bad Call AI - NBA Referee Call Analysis",
  description: "AI-powered analysis of controversial NBA referee calls",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-gray-100 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  )
}


import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css";
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Roboto } from "next/font/google"

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] })

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
      <body className={`${roboto.className} bg-[#0D0D0F] text-gray-100 min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">{children}</main>
        <Footer />
      </body>
    </html>
  )
}


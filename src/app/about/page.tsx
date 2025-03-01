import { Button } from "@/components/ui/button"
import { Bot, Users, Upload, Mail } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Bad Call AI</h1>
        <p className="text-xl text-gray-400">Using artificial intelligence to analyze and improve NBA officiating</p>
      </div>

      <div className="grid gap-12">
        {/* Mission Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Bad Call AI aims to bring transparency and objectivity to NBA officiating through the power of artificial
            intelligence. We analyze controversial calls, foster community discussion, and help improve the game we all
            love.
          </p>
        </section>

        {/* How It Works Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm text-gray-400">
                Our AI analyzes video footage of controversial calls using advanced computer vision and the latest NBA
                rulebook.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Community Voting</h3>
              <p className="text-sm text-gray-400">
                Fans can vote and comment on calls, providing additional perspectives and fostering meaningful
                discussion.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Submit Plays</h3>
              <p className="text-sm text-gray-400">
                Users can submit controversial plays for analysis, helping build our database of reviewed calls.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center bg-gray-900 border border-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-300 mb-6">
            Have questions, suggestions, or want to contribute? We'd love to hear from you!
          </p>
          <Button className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contact Us
          </Button>
        </section>

        {/* Team Section */}
        <section className="text-center">
          <p className="text-sm text-gray-400">
            Built with ❤️ by basketball fans, for basketball fans.
            <br />© {new Date().getFullYear()} Bad Call AI. All rights reserved.
          </p>
        </section>
      </div>
    </div>
  )
}


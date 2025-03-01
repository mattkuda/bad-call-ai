Page Layout Document: Bad Call AI
Version: 1.0
Purpose: Defines UI layouts and structure for an AI-based referee call analysis platform.
Framework: Next.js + TailwindCSS

1. Home Page (/)
Purpose: Displays a feed of controversial calls ranked by hotness, controversy, or recency.
Layout Structure
📌 Header

Logo ("Bad Call AI") – Left side
Navigation Links: "Home," "Leaderboard," "About"
Search Bar – Centered
User Profile Icon (if authentication is added later)
📌 Main Content (Feed)

Sorting Tabs: "HOT" 🔥 | "CONTROVERSIAL" ⚖️ | "RECENT" 🕒
List of Play Cards (Each controversial play has a preview)
📌 Play Card Component (List View)

Video Thumbnail (Preview frame from the clip)
Game Info: Matchup (e.g., Lakers vs. Celtics), Quarter/Time
Official Call: (e.g., "Blocking Foul")
AI Verdict: ✅ Correct | ❌ Incorrect | ❓ Unclear
Vote Split Bar: Live % of fan votes on call
Upvote/Downvote Buttons
Comment Count
Click Anywhere → Goes to Play Details Page (/play/[id])
📌 Sidebar (Optional for Larger Screens)

Leaderboard of "Most Controversial Refs"
Trending Plays (Most Discussed Calls Today)
📌 Footer

Social Media Links
"Submit a Play" Button (Future)
2. Play Details Page (/play/[id])
Purpose: Show full breakdown of a controversial play with AI analysis, fan voting, and discussion.
Layout Structure
📌 Header (Same as Home Page)

📌 Main Content

Video Player (Full Width)

MP4 or YouTube Embed
Slow-Motion Toggle
Frame-by-Frame Scrubbing
Auto-Pause at Key Moment
AI Overlays (Highlight players, ball, key infractions)
AI Analysis Panel (Right Side / Below Video on Mobile)

Official Call: "Blocking Foul on Player X"
AI Verdict: ✅ Correct | ❌ Incorrect | ❓ Unclear
Confidence Score (%)
Rule Reference: NBA Rulebook snippet (If implemented)
Key Infractions Detected (Optional Future Feature)
❌ Restricted area violation detected
❌ Excessive contact detected
Fan Voting Section

"Was this the right call?" (Live Poll)
✅ Yes
❌ No
Vote % Bar: (Dynamic Animation)
"Compare to Past Similar Calls" (Stretch Feature)
Comment Section

Sort Options: "Top," "Recent," "Most Liked"
User Comments (Upvote/Downvote)
Verified Analyst Comments (Badge for Expert Takes)
Referee Stats Box (If Enabled)

Referee Name & Photo
"This ref has missed 65% of overturned calls this season."
League Ranking of Referee (Controversial Index)
📌 Footer

Share to Twitter/X Button (Auto-fills with AI Decision + Play URL)
Back to Feed Button
3. Leaderboard Page (/leaderboard)
Purpose: Ranks referees based on AI analysis and community voting.
Layout Structure
📌 Header (Same as Home Page)

📌 Main Content

Sorting Options: "Most Missed Calls" | "Most Overturned Calls" | "Most Controversial Ref"
Referee Rankings Table
Referee Name
Total Games Officiated
Missed Call %
Overturned Calls
Fan Controversy Score
Click a Ref → View Detailed Breakdown (/ref/[id])
📌 Footer

Navigation to Home & Play Feed
4. About Page (/about)
Purpose: Explain Bad Call AI and its methodology.
Layout Structure
📌 Header (Same as Home Page)

📌 Main Content

"What is Bad Call AI?" (Brief intro)
"How does it work?"
AI Vision Analysis
NBA Rulebook Reference
Fan Voting Integration
"Can I Submit Plays?"
Future feature mention
"Who Built This?" (Hackathon Credit / Dev Team Info)
Press & Contact Info
Email / Twitter links
📌 Footer

Back to Home Button

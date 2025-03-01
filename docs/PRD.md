Product Requirements Document (PRD)
Bad Call AI
Version: 1.0 (Hackathon MVP)
Owner: [Your Name]
Date: [Hackathon Start Date]

1. Overview
1.1 Purpose
Bad Call AI is an interactive AI-powered tool that analyzes controversial NBA calls using computer vision, AI rule evaluation, and fan engagement. The app processes game footage, evaluates the referee's decision, and lets fans vote and discuss whether it was the right call.

1.2 Key Objectives
Automate call analysis using OpenAI’s vision model.
Provide a clear, engaging UI that makes reviewing plays fun and interactive.
Allow fans to vote, comment, and engage with plays in a Reddit/Twitter-style format.
Prioritize flair over functionality for hackathon impact.
2. Features & Requirements
2.1 Core Features (MVP)
✅ Controversial Play Feed

Displays a list of hot NBA calls that were either officially challenged or flagged by fans.
Sorting options:
HOT – Most upvoted plays.
CONTROVERSIAL – Closest fan vote split (e.g., 45-55%).
RECENT – Latest reviewed plays.
✅ AI Call Analysis

User selects a play → AI analyzes it.
AI Verdict: Correct Call / Incorrect Call / Unclear.
Confidence Score (%).
Simple AI Explanation with an optional NBA rule reference.
✅ Interactive Video Review

Embedded MP4 or YouTube video of the play.
Slow-motion toggle.
AI Visual Breakdown (bounding boxes on players, ball location, etc.).
"Pause at the Key Moment" feature (auto-pauses at the frame the AI deems most relevant).
✅ Fan Engagement & Voting

Users vote: "Good Call" ✅ or "Bad Call" ❌.
Live Fan Vote Bar dynamically updates.
Comment Section for discussions and debates.
✅ Social Sharing

One-click Twitter/X sharing with an auto-generated caption (e.g., "Bad Call AI says this was a BAD CALL! Do you agree? Vote now: [link]").
2.2 Stretch Features (Post-Hackathon)
🏆 Referee Grading System

Pull ref data from ESPN API (who officiated the game).
AI tracks how often a ref makes controversial calls.
Ref Leaderboards (e.g., "Most Overturned Calls," "Most Controversial Ref of the Month").
🏆 AI vs. Humans Leaderboard

Tracks how often the AI disagrees with the official call.
"AI has overturned 78% of challenge calls in the last month."
🏆 Multi-Sport Support

Expand beyond NBA (NFL, Soccer, UFC, etc.).
🏆 Live Game Tracking

Integrate ESPN API to display which games have had official challenges in real time.
3. Technical Requirements
3.1 Tech Stack
Component	Technology
Frontend	Next.js + Tailwind CSS
Backend (API)	Next.js API Routes
AI Vision Analysis	OpenAI GPT-4V API
Video Processing	ffmpeg.wasm (to extract frames, if needed)
Data Storage	JSON/local storage (for hackathon), Cloud DB later
Video Hosting	MP4 (local) → YouTube (later)
Auth (If Needed)	Clerk/Auth.js (or skip for MVP)
3.2 OpenAI Vision API Prompt
(Refine this as needed in testing)

Input: Single frame from the controversial play.
Prompt:
"Analyze this basketball play frame. The official referee call was [INSERT CALL]. Determine whether it was a Correct Call, Incorrect Call, or Unclear. Consider player positioning, restricted area violations, ball trajectory, and foul criteria. Explain your reasoning briefly in 2-3 sentences. If the call is incorrect, reference the relevant NBA rule."

4. User Experience (UX) & Flair Priorities
**🔹 Keep it visually engaging & intuitive.
🔹 High-energy UI:

Dramatic AI verdict animations (whistle sounds, red flashing lights for incorrect calls).
Smooth transitions & overlays for frame-by-frame analysis.
Dynamic voting bars that shift in real-time.
🔹 Fake it if needed:

Pre-load AI decisions in JSON to avoid slow OpenAI response times.
Smooth UI wins over deep accuracy.

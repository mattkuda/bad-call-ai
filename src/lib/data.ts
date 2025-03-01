interface Play {
  id: string
  thumbnail: string
  homeTeam: string
  awayTeam: string
  quarter: string
  timeLeft: string
  officialCall: string
  aiVerdict: "correct" | "incorrect" | "unclear"
  confidenceScore: number
  yesVotes: number
  noVotes: number
  commentCount: number
  description: string
  videoUrl: string
  aiExplanation: string
  ruleReference: string
  comments: Array<{
    id: string
    user: string
    avatar: string
    text: string
    likes: number
    timestamp: string
  }>
  refereeId?: string
  timestamp?: Date
}

export const plays: Play[] = [
  {
    id: "1",
    thumbnail: "/placeholder.svg?height=400&width=600",
    homeTeam: "Lakers",
    awayTeam: "Celtics",
    quarter: "Q4",
    timeLeft: "2:34",
    officialCall: "Blocking Foul",
    aiVerdict: "incorrect",
    confidenceScore: 87,
    yesVotes: 1245,
    noVotes: 5678,
    commentCount: 342,
    description:
      "LeBron James drives to the basket and collides with Jayson Tatum. Referee calls a blocking foul on Tatum.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    aiExplanation:
      "The defender had established legal guarding position before the offensive player began his upward motion. His feet were set outside the restricted area, and he maintained a legal vertical position. This should have been called an offensive foul.",
    ruleReference:
      "Rule 12, Section II, Paragraph a.1: A player is entitled to a vertical position even to the extent of holding his arms above his shoulders, as in post play or when double-teaming in pressing tactics.",
    comments: [
      {
        id: "c1",
        user: "BasketballFan23",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Terrible call! Tatum was clearly set outside the restricted area.",
        likes: 89,
        timestamp: "2h ago",
      },
      {
        id: "c2",
        user: "LakersNation",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Nah, Tatum was still moving. Good call by the ref!",
        likes: 45,
        timestamp: "1h ago",
      },
      {
        id: "c3",
        user: "RefExpert",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Looking at the replay, his right foot was still sliding when contact was made. It's a close call but I think the ref got it right.",
        likes: 67,
        timestamp: "45m ago",
      },
    ],
  },
  {
    id: "2",
    thumbnail: "/placeholder.svg?height=400&width=600",
    homeTeam: "Warriors",
    awayTeam: "Suns",
    quarter: "Q3",
    timeLeft: "5:12",
    officialCall: "Shooting Foul",
    aiVerdict: "correct",
    confidenceScore: 92,
    yesVotes: 3421,
    noVotes: 1234,
    commentCount: 156,
    description: "Devin Booker attempts a three-pointer and Draymond Green contests, making contact with Booker's arm.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    aiExplanation:
      "The defender made contact with the shooter's arm during the shooting motion. This is a clear shooting foul according to NBA rules.",
    ruleReference:
      "Rule 12, Section I, Paragraph b: Contact initiated by the defensive player guarding a player with the ball is not legal. This contact includes, but is not limited to, forearm, hands, or body check.",
    comments: [
      {
        id: "c4",
        user: "WarriorsGSW",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Booker always gets these soft calls. Barely any contact!",
        likes: 34,
        timestamp: "3h ago",
      },
      {
        id: "c5",
        user: "PhoenixRising",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Clear foul, Green hit his elbow during the shot.",
        likes: 78,
        timestamp: "2h ago",
      },
    ],
  },
  {
    id: "3",
    thumbnail: "/placeholder.svg?height=400&width=600",
    homeTeam: "Bucks",
    awayTeam: "76ers",
    quarter: "Q4",
    timeLeft: "0:08",
    officialCall: "Out of Bounds",
    aiVerdict: "unclear",
    confidenceScore: 51,
    yesVotes: 2456,
    noVotes: 2345,
    commentCount: 289,
    description: "Joel Embiid saves a ball from going out of bounds, but officials rule he stepped on the line.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    aiExplanation:
      "The available camera angles make it difficult to determine if Embiid's foot was on the line. From the main broadcast angle, it appears his heel might be hovering above the line, but there's no conclusive evidence.",
    ruleReference:
      "Rule 8, Section I: A player who touches the floor on or outside the boundary line is out-of-bounds.",
    comments: [
      {
        id: "c6",
        user: "TrustTheProcess",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "His heel was clearly above the line! Terrible call in a crucial moment.",
        likes: 112,
        timestamp: "5h ago",
      },
      {
        id: "c7",
        user: "BucksInSix",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "The side angle shows his foot was on the line. Good call.",
        likes: 95,
        timestamp: "4h ago",
      },
    ],
  },
  {
    id: "4",
    thumbnail: "/placeholder.svg?height=400&width=600",
    homeTeam: "Nuggets",
    awayTeam: "Mavericks",
    quarter: "Q2",
    timeLeft: "8:45",
    officialCall: "Traveling Violation",
    aiVerdict: "incorrect",
    confidenceScore: 78,
    yesVotes: 1876,
    noVotes: 3245,
    commentCount: 201,
    description: "Luka Doncic executes a step-back move and is called for traveling.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    aiExplanation:
      "Doncic gathered the ball and took two legal steps in a continuous motion. The gather step is not counted as one of the two allowed steps. This should not have been called a travel.",
    ruleReference:
      "Rule 10, Section XIII: A player who receives the ball while progressing may take two steps in coming to a stop, passing or shooting the ball.",
    comments: [
      {
        id: "c8",
        user: "MavsNation",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Refs always calling travels on Luka's step-backs when they're perfectly legal!",
        likes: 156,
        timestamp: "7h ago",
      },
      {
        id: "c9",
        user: "NuggLife",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "He took 3 steps after the gather, clear travel.",
        likes: 89,
        timestamp: "6h ago",
      },
    ],
  },
  {
    id: "5",
    thumbnail: "/placeholder.svg?height=400&width=600",
    homeTeam: "Heat",
    awayTeam: "Knicks",
    quarter: "Q3",
    timeLeft: "3:21",
    officialCall: "Offensive Foul",
    aiVerdict: "correct",
    confidenceScore: 95,
    yesVotes: 4532,
    noVotes: 987,
    commentCount: 178,
    description: "Jimmy Butler drives to the basket and is called for an offensive foul for extending his arm.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    aiExplanation:
      "Butler clearly extended his arm and created space by pushing off the defender. This is a textbook offensive foul.",
    ruleReference:
      "Rule 12, Section III, Paragraph a: A player shall not hold, push, charge into, impede the progress of an opponent by extending a hand, arm, leg or knee or by bending the body into a position that is not normal.",
    comments: [
      {
        id: "c10",
        user: "HeatCulture",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "That's a tough call, but I can see why they called it. Jimmy does extend that arm a lot.",
        likes: 67,
        timestamp: "2h ago",
      },
      {
        id: "c11",
        user: "KnicksForever",
        avatar: "/placeholder.svg?height=40&width=40",
        text: "Finally the refs call Butler for that push-off! He does it every drive.",
        likes: 124,
        timestamp: "1h ago",
      },
    ],
  },
].map((play) => ({
  ...play,
  refereeId: ["1", "2", "3"][Math.floor(Math.random() * 3)],
  timestamp: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
}))

// Add referees data
export const referees = [
  {
    id: "1",
    name: "Scott Foster",
    avatar: "/placeholder.svg?height=400&width=400",
    yearsExperience: 28,
    totalReviewedCalls: 245,
    correctCalls: 186,
    incorrectCalls: 42,
    unclearCalls: 17,
    bio: "Scott Foster has been an NBA referee for 28 seasons. He has officiated 1,477 regular season games and 187 playoff games.",
  },
  {
    id: "2",
    name: "Tony Brothers",
    avatar: "/placeholder.svg?height=400&width=400",
    yearsExperience: 26,
    totalReviewedCalls: 198,
    correctCalls: 142,
    incorrectCalls: 38,
    unclearCalls: 18,
    bio: "Tony Brothers has officiated 1,378 regular season games and 168 playoff games, including multiple NBA Finals appearances.",
  },
  {
    id: "3",
    name: "James Capers",
    avatar: "/placeholder.svg?height=400&width=400",
    yearsExperience: 24,
    totalReviewedCalls: 167,
    correctCalls: 128,
    incorrectCalls: 27,
    unclearCalls: 12,
    bio: "James Capers has been a respected NBA official since 1995, working numerous playoff games and All-Star events.",
  },
]


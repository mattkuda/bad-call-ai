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

export const hardCodedPlays: Play[] = [
  {
    id: "1",
    thumbnail: "/placeholder.png?height=400&width=600",
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
    videoUrl: "https://www.youtube.com/embed/k9yjtFFXuB4?si=tqx9zSVVHzZSa8Nr",
    aiExplanation:
      "The defender had established legal guarding position before the offensive player began his upward motion. His feet were set outside the restricted area, and he maintained a legal vertical position. This should have been called an offensive foul.",
    ruleReference:
      "Rule 12, Section II, Paragraph a.1: A player is entitled to a vertical position even to the extent of holding his arms above his shoulders, as in post play or when double-teaming in pressing tactics.",
    comments: [
      {
        id: "c1",
        user: "BasketballFan23",
        avatar: "/placeholder.png?height=40&width=40",
        text: "Terrible call! Tatum was clearly set outside the restricted area.",
        likes: 89,
        timestamp: "2h ago",
      },
      {
        id: "c2",
        user: "LakersNation",
        avatar: "/placeholder.png?height=40&width=40",
        text: "Nah, Tatum was still moving. Good call by the ref!",
        likes: 45,
        timestamp: "1h ago",
      },
      {
        id: "c3",
        user: "RefExpert",
        avatar: "/placeholder.png?height=40&width=40",
        text: "Looking at the replay, his right foot was still sliding when contact was made. It's a close call but I think the ref got it right.",
        likes: 67,
        timestamp: "45m ago",
      },
    ],
  },
  {
    id: "2",
    thumbnail: "/placeholder.png?height=400&width=600",
    homeTeam: "Heat",
    awayTeam: "Spurs",
    quarter: "Q4",
    timeLeft: "0:06",
    officialCall: "Shooting Foul",
    aiVerdict: "correct",
    confidenceScore: 92,
    yesVotes: 3421,
    noVotes: 1234,
    commentCount: 156,
    description: "Ray Allen ties Game 6 of the 2008 NBA Finals with a three-pointer.",
    videoUrl: "https://www.youtube.com/embed/YRIMQi7X7mI?si=JdK1o5rhesZSvSEo",
    aiExplanation:
      "Ray Allen made contact with the defender's arm during the shooting motion. This is a clear shooting foul according to NBA rules.",
    ruleReference:
      "Rule 12, Section III, Paragraph a.1: A player shall not hold, push, charge into, impede the progress of an opponent by extending a hand, arm, leg or knee or by bending the body into a position that is not normal.",
    comments: [
      {
        id: "c4",
        user: "WarriorsGSW",
        avatar: "/placeholder.png?height=40&width=40",
        text: "Booker always gets these soft calls. Barely any contact!",
        likes: 34,
        timestamp: "3h ago",
      },
      {
        id: "c5",
        user: "PhoenixRising",
        avatar: "/placeholder.png?height=40&width=40",
        text: "Clear foul, Green hit his elbow during the shot.",
        likes: 78,
        timestamp: "2h ago",
      },
    ],
  },
  {
    id: "3",
    thumbnail: "/placeholder.png?height=400&width=600",
    homeTeam: "Rockets",
    awayTeam: "Blazers",
    quarter: "Q1",
    timeLeft: "0:08",
    officialCall: "Ejection",
    aiVerdict: "unclear",
    confidenceScore: 51,
    yesVotes: 2456,
    noVotes: 2345,
    commentCount: 289,
    description: "Fred VanVleet pokes the ref after getting rejected.",
    videoUrl: "https://www.youtube.com/embed/QKiDoMcPMAE?si=W1HIUidZPL8iarwp",
    aiExplanation:
      "The available camera angles make it difficult to determine if Embiid's foot was on the line. From the main broadcast angle, it appears his heel might be hovering above the line, but there's no conclusive evidence.",
    ruleReference:
      "Rule 8, Section I: A player who touches the floor on or outside the boundary line is out-of-bounds.",
    comments: [
      {
        id: "c6",
        user: "TrustTheProcess",
        avatar: "/placeholder.png?height=40&width=40",
        text: "His heel was clearly above the line! Terrible call in a crucial moment.",
        likes: 112,
        timestamp: "5h ago",
      },
      {
        id: "c7",
        user: "BucksInSix",
        avatar: "/placeholder.png?height=40&width=40",
        text: "The side angle shows his foot was on the line. Good call.",
        likes: 95,
        timestamp: "4h ago",
      },
    ],
  },
  {
    id: "4",
    thumbnail: "/placeholder.png?height=400&width=600",
    homeTeam: "Vikings",
    awayTeam: "Saints",
    quarter: "Q2",
    timeLeft: "8:45",
    officialCall: "Pass Interference",
    aiVerdict: "incorrect",
    confidenceScore: 78,
    yesVotes: 1876,
    noVotes: 3245,
    commentCount: 201,
    description: "Saints don't get the pass interference call.",
    videoUrl: "https://www.youtube.com/embed/mmfEYmyXnK0?si=CTuYpPMzvR2UUOB5",
    aiExplanation:
      "Doncic gathered the ball and took two legal steps in a continuous motion. The gather step is not counted as one of the two allowed steps. This should not have been called a travel.",
    ruleReference:
      "Rule 10, Section XIII: A player who receives the ball while progressing may take two steps in coming to a stop, passing or shooting the ball.",
    comments: [
      {
        id: "c8",
        user: "MavsNation",
        avatar: "/placeholder.png?height=40&width=40",
        text: "Refs always calling travels on Luka's step-backs when they're perfectly legal!",
        likes: 156,
        timestamp: "7h ago",
      },
      {
        id: "c9",
        user: "NuggLife",
        avatar: "/placeholder.png?height=40&width=40",
        text: "He took 3 steps after the gather, clear travel.",
        likes: 89,
        timestamp: "6h ago",
      },
    ],
  },
  {
    id: "5",
    thumbnail: "/placeholder.png?height=400&width=600",
    homeTeam: "Celtics",
    awayTeam: "Mavericks",
    quarter: "Q2",
    timeLeft: "0:00",
    officialCall: "Successful 3 point shot",
    aiVerdict: "correct",
    confidenceScore: 100,
    yesVotes: 4532,
    noVotes: 25,
    commentCount: 178,
    description: "Payton Pritchard half court shot at the buzzer.",
    videoUrl: "https://www.youtube.com/embed/PP2p3m-7PWw?si=hojIoX4cRZRcEtPa",
    aiExplanation:
      "Payton Pritchard successfully drains a half-court shot at the buzzer to win the game for the Celtics.",
    ruleReference:
      "Rule 12, Section III, Paragraph a.1: A player shall not hold, push, charge into, impede the progress of an opponent by extending a hand, arm, leg or knee or by bending the body into a position that is not normal.",
    comments: [
      {
        id: "c10",
        user: "HeatCulture",
        avatar: "/placeholder.png?height=40&width=40",
        text: "That's a tough call, but I can see why they called it. Jimmy does extend that arm a lot.",
        likes: 1,
        timestamp: "2h ago",
      },
      {
        id: "c11",
        user: "KnicksForever",
        avatar: "/placeholder.png?height=40&width=40",
        text: "Finally the refs call Butler for that push-off! He does it every drive.",
        likes: 124,
        timestamp: "1h ago",
      },
    ],
  },
  {
    id: "6",
    thumbnail: "/placeholder.png?height=400&width=600",
    homeTeam: "Rockets",
    awayTeam: "Spurs",
    quarter: "Q2",
    timeLeft: "4:43",
    officialCall: "No Basket",
    aiVerdict: "incorrect",
    confidenceScore: 100,
    yesVotes: 4532,
    noVotes: 1244,
    commentCount: 178,
    description: "James Harden dunks on a fast break.",
    videoUrl: "https://www.youtube.com/embed/zbBrx69c2b4?si=kneb6jWBk0GzKJfU",
    aiExplanation:
      "James Harden successfully drains a half-court shot at the buzzer to win the game for the Celtics.",
    ruleReference:
      "Rule 12, Section III, Paragraph a.1: A player shall not hold, push, charge into, impede the progress of an opponent by extending a hand, arm, leg or knee or by bending the body into a position that is not normal.",
    comments: [
      {
        id: "c12",
        user: "HeatCulture",
        avatar: "/placeholder.png?height=40&width=40",
        text: "That's a tough call, but I can see why they called it. Jimmy does extend that arm a lot.",
        likes: 1,
        timestamp: "2h ago",
      },
      {
        id: "c13",
        user: "KnicksForever",
        avatar: "/placeholder.png?height=40&width=40",
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
    imageUrl: "https://www.nbra.net/wp-content/uploads/2016/05/20220919_RPSM_SFR_0514-e1667419882615.jpg",
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
    imageUrl: "https://www.nbra.net/wp-content/uploads/2016/05/Tony-Brothers-scaled.jpg",
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
    imageUrl: "https://www.nbra.net/wp-content/uploads/2016/05/20220919_RPSM_SFR_0298-e1667320970792.jpg",
    yearsExperience: 24,
    totalReviewedCalls: 167,
    correctCalls: 128,
    incorrectCalls: 27,
    unclearCalls: 12,
    bio: "James Capers has been a respected NBA official since 1995, working numerous playoff games and All-Star events.",
  },
]


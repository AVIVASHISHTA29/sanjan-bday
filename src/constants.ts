// ===== ASSETS =====
// All image and video paths used throughout the app
export const ASSETS = {
  victory: "/assets/victory.jpeg",
  tile1: "/assets/lvl3/Padhai meets.jpg",
  tile2: "/assets/lvl3/Jaipur.jpg",
  tile3: "/assets/lvl3/IMG-20230630-WA0054.jpeg",
  tile4: "/assets/lvl3/Diwali party.jpg",
  tile5: "/assets/lvl3/2.mp4",
  tile6: "/assets/lvl3/1.MOV",
  zoomed: "/assets/zoom.jpeg",
  revealFull: "/assets/normal.jpeg",
};

// ===== TYPES =====
export type LevelKind =
  | "intro"
  | "flappy"
  | "emoji"
  | "tiles"
  | "mcq"
  | "manifest"
  | "zoom"
  | "treat"
  | "text"
  | "compliment"
  | "candle"
  | "outro";

export type Level = {
  kind: LevelKind;
  title: string;
  subtitle?: string;
  emojiSets?: {
    emojis: string;
    caption: string;
    img?: string;
    isVideo?: boolean;
  }[];
  tiles?: { img: string; caption: string; isVideo?: boolean }[];
  question?: string;
  options?: string[];
  correct?: string;
  prompt?: string;
};

// ===== LEVELS =====
// All game levels configuration
// Edit the content, titles, captions, and asset paths here
export const LEVELS: Level[] = [
  {
    kind: "intro",
    title: "🎉 The Friendship Arcade: Birthday Edition",
    subtitle:
      "Welcome to your personal arcade, where every game is rigged for you to win — because duh, it's your birthday.",
  },
  {
    kind: "flappy",
    title: "1️⃣ Flappy Bestie 🕹️",
    subtitle:
      "Fly through your 5 goals — CAT, Essays, LORs, Dream College & Business Owner. You literally can't lose.",
  },
  {
    kind: "emoji",
    title: "2️⃣ Emoji Decode 💬",
    subtitle: "Every guess is right. Tap to reveal my caption for each.",
    emojiSets: [
      {
        emojis: "🧋📸😂☀️",
        caption: "That chaotic café day.",
        img: "/assets/lvl2/Farre.jpg",
      },
      {
        emojis: "🎶💔🚗",
        caption: "The heartbreak drive playlist.",
        img: "/assets/lvl2/Lunch.mov",
        isVideo: true,
      },
      {
        emojis: "🌸🍷📸✨",
        caption: "Aesthetic girls' night.",
        img: "/assets/lvl2/Two twoo tattooo.mov",
        isVideo: true,
      },
    ],
  },
  {
    kind: "tiles",
    title: "3️⃣ Six Tiles of Memory 🖼️",
    subtitle: "Pick any tile to reveal the moment. Every choice = confetti.",
    tiles: [
      {
        img: ASSETS.tile1,
        caption: "Padhai meets — study sessions and memories.",
      },
      {
        img: ASSETS.tile2,
        caption: "Jaipur — adventures and good times.",
      },
      { img: ASSETS.tile3, caption: "Memory — captured moments together." },
      {
        img: ASSETS.tile4,
        caption: "Diwali party — celebrations and joy.",
      },
      {
        img: ASSETS.tile5,
        caption: "Video memory — special moments captured!",
        isVideo: true,
      },
      {
        img: ASSETS.tile6,
        caption: "Video memory — more special moments!",
        isVideo: true,
      },
    ],
  },
  {
    kind: "mcq",
    title: "4️⃣ What Is Sanj Known For? 👑",
    question:
      "A) Being dramatic  •  B) Talking 24/7  •  C) Taking aesthetic pics  •  D) All of the above",
    options: ["A", "B", "C", "D"],
    correct: "D",
  },
  {
    kind: "manifest",
    title: "5️⃣ Manifestation Wheel 🔮",
    subtitle:
      "Spin for a cute cosmic blessing — the universe is clearly on your side 💫",
  },
  {
    kind: "zoom",
    title: "6️⃣ Zoomed-In Mystery 🔍",
    subtitle:
      "Guess the memory from the zoomed pic. Click reveal — you're always right.",
  },
  {
    kind: "treat",
    title: "7️⃣ Choose Your Birthday Treat 🍰",
    subtitle: "Pick one. It magically appears in your honor (obviously).",
  },
  {
    kind: "text",
    title: "8️⃣ Crossword of Good Vibes ✏️",
    subtitle:
      "BESTIE • CHAOS • MAGIC • LAUGH • SANJ • LOVE — finish your cozy puzzle and hit 'Next'.",
    prompt: "Imagine you've finished the crossword. Hit 'Next' to continue →",
  },
  {
    kind: "compliment",
    title: "9️⃣ Compliment Generator 💬",
    subtitle: "Get a random dose of love, laughter, and cosmic validation 💫",
  },
  {
    kind: "candle",
    title: "🔟 Light Your Birthday Candle 🕯️",
    subtitle: "Click the candle, make a wish, breathe. Then hit 'Next'.",
  },
  {
    kind: "outro",
    title: "🎂 You Beat The Friendship Arcade!",
    subtitle: "You unlocked joy, chaos, and cupcakes. Happy Birthday, Sanj 💖",
  },
];

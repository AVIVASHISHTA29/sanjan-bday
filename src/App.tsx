import { useState } from "react";
import ComplimentGenerator from "./ComplimentGenerator";
import FlappyBestie from "./Flappybestie";
import ManifestationWheel from "./ManifestationWheel";
import "./styles.css";

const ASSETS = {
  victory: "https://placehold.co/600x400?text=Victory+Image",
  tile1: "https://placehold.co/300x200?text=Goa+Trip",
  tile2: "https://placehold.co/300x200?text=Sleepover",
  tile3: "https://placehold.co/300x200?text=Matching+Fits",
  tile4: "https://placehold.co/300x200?text=Coffee+Chaos",
  tile5: "https://placehold.co/300x200?text=Coldplay+Concert",
  tile6: "https://placehold.co/300x200?text=Birthday+Surprise",
  zoomed: "https://placehold.co/180x180?text=Zoomed+Hint",
  revealFull: "https://placehold.co/600x350?text=Full+Photo+Reveal",
};

type LevelKind =
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

type Level = {
  kind: LevelKind;
  title: string;
  subtitle?: string;
  emojiSets?: { emojis: string; caption: string; img?: string }[];
  tiles?: { img: string; caption: string }[];
  question?: string;
  options?: string[];
  correct?: string;
  prompt?: string;
};

const LEVELS: Level[] = [
  {
    kind: "intro",
    title: "🎉 The Friendship Arcade: Birthday Edition",
    subtitle:
      "Welcome to your personal arcade, where every game is rigged for you to win — because duh, it’s your birthday.",
  },
  {
    kind: "flappy",
    title: "1️⃣ Flappy Bestie 🕹️",
    subtitle:
      "Fly through your 5 goals — CAT, Essays, LORs, Dream College & Business Owner. You literally can’t lose.",
  },
  {
    kind: "emoji",
    title: "2️⃣ Emoji Decode 💬",
    subtitle: "Every guess is right. Tap to reveal my caption for each.",
    emojiSets: [
      {
        emojis: "🧋📸😂☀️",
        caption: "That chaotic café day.",
        img: "https://placehold.co/300x200?text=Café+Day",
      },
      {
        emojis: "🎶💔🚗",
        caption: "The heartbreak drive playlist.",
        img: "https://placehold.co/300x200?text=Drive+Playlist",
      },
      {
        emojis: "🌸🍷📸✨",
        caption: "Aesthetic girls' night.",
        img: "https://placehold.co/300x200?text=Girls+Night",
      },
    ],
  },
  {
    kind: "tiles",
    title: "3️⃣ Six Tiles of Memory 🖼️",
    subtitle: "Pick any tile to reveal the moment. Every choice = confetti.",
    tiles: [
      { img: ASSETS.tile1, caption: "Goa Trip — sun, chaos, legends." },
      {
        img: ASSETS.tile2,
        caption: "Sleepover — unhinged laughs, zero sleep.",
      },
      { img: ASSETS.tile3, caption: "Matching outfits — main characters." },
      {
        img: ASSETS.tile4,
        caption: "Great Coffee Chaos — ‘we’ll share’ (we didn’t).",
      },
      { img: ASSETS.tile5, caption: "Coldplay Concert — love & loud singing!" },
      {
        img: ASSETS.tile6,
        caption: "Birthday Surprise — absolute golden memory.",
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
      "Guess the memory from the zoomed pic. Click reveal — you’re always right.",
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
      "BESTIE • CHAOS • MAGIC • LAUGH • SANJ • LOVE — finish your cozy puzzle and hit ‘Next’.",
    prompt: "Imagine you’ve finished the crossword. Hit ‘Next’ to continue →",
  },
  {
    kind: "compliment",
    title: "9️⃣ Compliment Generator 💬",
    subtitle: "Get a random dose of love, laughter, and cosmic validation 💫",
  },
  {
    kind: "candle",
    title: "🔟 Light Your Birthday Candle 🕯️",
    subtitle: "Click the candle, make a wish, breathe. Then hit ‘Next’.",
  },
  {
    kind: "outro",
    title: "🎂 You Beat The Friendship Arcade!",
    subtitle: "You unlocked joy, chaos, and cupcakes. Happy Birthday, Sanj 💖",
  },
];

export default function App() {
  const [step, setStep] = useState(0);
  const level = LEVELS[step];
  const [emojiRevealed, setEmojiRevealed] = useState<boolean[]>([]);
  const [selectedMCQ, setSelectedMCQ] = useState<string>("");
  const [zoomRevealed, setZoomRevealed] = useState(false);
  const [candleLit, setCandleLit] = useState(true);

  const next = () => {
    const nextStep = Math.min(step + 1, LEVELS.length - 1);
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const visibleLevelNumber = Math.min(step, 10);

  return (
    <div className="app">
      {level.kind !== "outro" && (
        <button className="btn skip-btn" onClick={next}>
          Skip →
        </button>
      )}

      <header className="header">
        <h1 className="title">🎮 Friendship Arcade: Birthday Edition</h1>
        <p className="tag">Everything is rigged in your favor ✨</p>
      </header>

      <main className="card">
        <h2 className="level-title">{level.title}</h2>
        {level.subtitle && <p className="subtitle">{level.subtitle}</p>}

        {/* INTRO */}
        {level.kind === "intro" && (
          <>
            <p className="lead">
              Press Start to begin your birthday adventure 💖
            </p>
            <button className="btn next" onClick={next}>
              Press Start →
            </button>
          </>
        )}

        {/* FLAPPY */}
        {level.kind === "flappy" && (
          <>
            <FlappyBestie onComplete={next} />
            <button className="btn next" onClick={next}>
              Next →
            </button>
          </>
        )}

        {/* EMOJI */}
        {level.kind === "emoji" && level.emojiSets && (
          <>
            <div className="emoji-grid">
              {level.emojiSets.map((e, i) => (
                <div
                  className="emoji-card"
                  key={i}
                  onClick={() =>
                    setEmojiRevealed((arr) => {
                      const copy = [...arr];
                      copy[i] = !copy[i];
                      return copy;
                    })
                  }
                >
                  <div className="emoji">{e.emojis}</div>
                  <div className={`caption ${emojiRevealed[i] ? "show" : ""}`}>
                    {e.caption}
                  </div>
                  {emojiRevealed[i] && e.img && (
                    <img src={e.img} alt={e.caption} className="emoji-image" />
                  )}
                </div>
              ))}
            </div>
            <button className="btn next" onClick={next}>
              Next →
            </button>
          </>
        )}

        {/* TILES */}
        {level.kind === "tiles" && level.tiles && (
          <>
            <div className="tiles-grid">
              {level.tiles.map((t, i) => (
                <div className="tile" key={i}>
                  <img src={t.img} alt={`tile-${i}`} />
                  <div className="tile-caption">{t.caption}</div>
                </div>
              ))}
            </div>
            <button className="btn next" onClick={next}>
              Next →
            </button>
          </>
        )}

        {/* MCQ */}
        {level.kind === "mcq" && (
          <>
            <p className="question">{level.question}</p>
            <div className="options">
              {level.options?.map((opt) => (
                <label key={opt} className="opt">
                  <input
                    type="radio"
                    name="mcq"
                    value={opt}
                    onChange={() => setSelectedMCQ(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
            {selectedMCQ && (
              <p className="success">
                🎉 Correct! (Obviously it’s D: All of the above.) Queen
                behaviour 💅
              </p>
            )}
            <button className="btn next" onClick={next}>
              Next →
            </button>
          </>
        )}

        {/* MANIFESTATION */}
        {level.kind === "manifest" && (
          <>
            <ManifestationWheel onComplete={next} />
            <button className="btn next" onClick={next}>
              Next →
            </button>
          </>
        )}

        {/* ZOOM */}
        {level.kind === "zoom" && (
          <>
            <div className="zoom-wrap">
              {!zoomRevealed ? (
                <>
                  <img
                    className="zoomed"
                    src={ASSETS.zoomed}
                    alt="zoomed hint"
                  />
                  <button className="btn" onClick={() => setZoomRevealed(true)}>
                    Reveal Photo
                  </button>
                </>
              ) : (
                <img
                  className="reveal"
                  src={ASSETS.revealFull}
                  alt="full reveal"
                />
              )}
            </div>
            <button className="btn next" onClick={next}>
              Next →
            </button>
          </>
        )}

        {/* TREAT */}
        {level.kind === "treat" && (
          <>
            <div className="treats">
              {["🧁 Cupcake", "🍪 Cookie", "🍩 Donut", "🍰 Cheesecake"].map(
                (treat) => (
                  <button key={treat} className="pill">
                    {treat}
                  </button>
                )
              )}
            </div>
            <button className="btn next" onClick={next}>
              Next →
            </button>
          </>
        )}

        {/* TEXT */}
        {level.kind === "text" && (
          <>
            <p className="crossword-text">
              {level.subtitle}
              <br />
              <br />
              <em>{level.prompt}</em>
            </p>
            <div className="crossword-placeholder">
              <img
                src="https://placehold.co/600x400?text=Crossword+Image+Placeholder"
                alt="Crossword"
                className="crossword-image"
              />
            </div>
            <button className="btn next" onClick={next}>
              Done →
            </button>
          </>
        )}

        {/* COMPLIMENT */}
        {level.kind === "compliment" && (
          <>
            <ComplimentGenerator onComplete={next} />
            <button className="btn next" onClick={next}>
              Next →
            </button>
          </>
        )}

        {/* CANDLE */}
        {level.kind === "candle" && (
          <>
            <div className="candle" onClick={() => setCandleLit(false)}>
              <div className={`flame ${candleLit ? "lit" : ""}`} />
              <div className="wick" />
              <div className="wax" />
            </div>
            <p className="hint">
              Click the candle to blow it out, make a wish ✨
            </p>
            <button className="btn next" onClick={next}>
              Next →
            </button>
          </>
        )}

        {/* OUTRO */}
        {level.kind === "outro" && (
          <div className="final">
            <p>
              You’ve unlocked joy, chaos, and cupcakes. <br />
              <strong>Happy Birthday, Sanj 💖</strong>
            </p>
            <img className="victory" src={ASSETS.victory} alt="victory" />
          </div>
        )}
      </main>

      {/* FOOTER */}
      {level.kind !== "outro" && (
        <footer className="foot">
          <button
            className="ghost"
            onClick={() => window.location.reload()}
            title="Restart"
          >
            ↻ Restart
          </button>
          {step === 0 ? (
            <span className="steps">✨ Let’s Begin!</span>
          ) : (
            <span className="steps">Level {visibleLevelNumber} / 10</span>
          )}
        </footer>
      )}
    </div>
  );
}

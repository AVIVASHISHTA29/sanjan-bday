import { useState } from "react";
import ComplimentGenerator from "./ComplimentGenerator";
import FlappyBestie from "./Flappybestie";
import ManifestationWheel from "./ManifestationWheel";
import "./styles.css";

const ASSETS = {
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
  emojiSets?: { emojis: string; caption: string; img?: string; isVideo?: boolean }[];
  tiles?: { img: string; caption: string; isVideo?: boolean }[];
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
      { img: ASSETS.tile1, caption: "Padhai meets — study sessions and memories." },
      {
        img: ASSETS.tile2,
        caption: "Jaipur — adventures and good times.",
      },
      { img: ASSETS.tile3, caption: "Memory — captured moments together." },
      {
        img: ASSETS.tile4,
        caption: "Diwali party — celebrations and joy.",
      },
      { img: ASSETS.tile5, caption: "Video memory — special moments captured!", isVideo: true },
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
  const [tilesFlipped, setTilesFlipped] = useState<boolean[]>([]);

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
                    e.isVideo ? (
                      <video
                        src={e.img}
                        controls
                        className="emoji-image"
                        style={{
                          width: "100%",
                          maxWidth: "280px",
                          borderRadius: "8px",
                          marginTop: "10px",
                          border: "2px solid #7b1fa2",
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      >
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img src={e.img} alt={e.caption} className="emoji-image" />
                    )
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
                <div
                  className={`tile-card ${tilesFlipped[i] ? "flipped" : ""}`}
                  key={i}
                  onClick={() =>
                    setTilesFlipped((arr) => {
                      const copy = [...arr];
                      copy[i] = !copy[i];
                      return copy;
                    })
                  }
                >
                  <div className="card-inner">
                    <div className="card-front">
                      <div className="polaroid">
                        <div className="polaroid-image">
                          {t.isVideo ? (
                            <video
                              src={t.img}
                              controls
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            >
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <img src={t.img} alt={`tile-${i}`} />
                          )}
                        </div>
                        <div className="polaroid-caption">
                          <span className="date">{t.caption.split("—")[0]}</span>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="message-content">
                        <p className="message">{t.caption}</p>
                      </div>
                    </div>
                  </div>
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
                src="/assets/crossword.png"
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

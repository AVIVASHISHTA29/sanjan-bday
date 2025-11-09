import { useState } from "react";
import ComplimentGenerator from "./ComplimentGenerator";
import FlappyBestie from "./Flappybestie";
import ManifestationWheel from "./ManifestationWheel";
import { ASSETS, LEVELS } from "./constants";
import "./styles.css";

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

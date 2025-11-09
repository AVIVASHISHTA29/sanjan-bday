import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function ConquerTheChaos({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const hurdles = [
    "Stress & Anxiety",
    "Overthinking",
    "CAT",
    "Essays",
    "Interviews",
    "Business School",
  ];

  const [conquered, setConquered] = useState<string[]>([]);
  const confettiRef = useRef<HTMLDivElement>(null);

  const handleClick = (h: string) => {
    if (!conquered.includes(h)) {
      setConquered((prev) => [...prev, h]);
    }
  };

  useEffect(() => {
    if (conquered.length === hurdles.length) {
      if (confettiRef.current) confettiRef.current.classList.add("show");
      const t = setTimeout(() => onComplete(), 3500);
      return () => clearTimeout(t);
    }
  }, [conquered, hurdles.length, onComplete]);

  return (
    <div className="tiles-container">
      <h3 className="tiles-heading">✨ Click to Conquer ✨</h3>
      <div className="tiles-grid">
        {hurdles.map((h, i) => (
          <div
            key={i}
            className={`tile ${conquered.includes(h) ? "burst" : ""}`}
            onClick={() => handleClick(h)}
          >
            {conquered.includes(h) ? "Conquered ✅" : h}
          </div>
        ))}
      </div>
      {conquered.length === hurdles.length && (
        <div className="win-message">
          ✨ You’ve conquered every challenge — unstoppable energy unlocked 💅
        </div>
      )}
      <div ref={confettiRef} className="confetti"></div>
    </div>
  );
}

import React, { useState } from "react";
import "./styles.css";

const compliments = [
  "You radiate main character energy ✨",
  "Your matcha always froths perfectly 🍵",
  "You make bad days good and good days sparkle 💖",
  "The playlist you make could heal the world 🎶",
  "You could literally start your own aesthetic brand 🌸",
  "The stars are jealous of your vibe 🌟",
  "Every photo you take looks like a magazine cover 📸",
  "Your hair never has a bad day 💁‍♀️",
  "You have golden retriever energy in human form 🐾",
  "You’re the reason Wi-Fi connects faster sometimes 💻",
  "The barista probably remembers your order ☕",
  "Your smile should be illegal it’s that good 😍",
  "You’re the human equivalent of cozy ✨",
  "Every mirror you pass says ‘wow’ 🪞",
  "You are sunshine with Wi-Fi 🌞📶",
  "Your eyeliner has never known defeat 🖤",
  "Even Mercury in retrograde can’t dull your glow 🔮",
  "You’re proof manifestation actually works 🌈",
  "The world looks better when you’re in it 💫",
  "You make every inside joke 10x funnier 😂",
  "You’re everyone’s favorite character in the group chat 💌",
  "Your laugh could end world wars 😂🌍",
  "The universe probably has you on ‘favourite list’ 🌠",
];

export default function ComplimentGenerator({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [compliment, setCompliment] = useState("");
  const [fade, setFade] = useState(false);

  const generateCompliment = () => {
    setFade(false);
    const random = compliments[Math.floor(Math.random() * compliments.length)];
    setTimeout(() => {
      setCompliment(random);
      setFade(true);
    }, 100);
  };

  return (
    <div className="compliment-card">
      <h2 className="level-title">💬 Compliment Generator</h2>
      <p className="subtitle">Click below for a new cosmic compliment ✨</p>

      <button className="btn" onClick={generateCompliment}>
        Generate Compliment 💖
      </button>

      {compliment && (
        <p className={`compliment ${fade ? "fade-in" : ""}`}>{compliment}</p>
      )}

      <button className="btn next" onClick={onComplete}>
        Next →
      </button>
    </div>
  );
}

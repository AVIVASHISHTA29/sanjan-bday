import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

const ITEMS = [
  "📚 May you always find the perfect book in every store you walk into.",
  "🍵 May your matcha always taste perfect.",
  "💬 May you meet fascinating people and build lifelong connections.",
  "💅 May your eyeliner match both eyes on the first try.",
  "☕ May your coffee always be the perfect temperature.",
  "🧠 May your brain cooperate with both dreams and deadlines.",
  "🧋 May your bubble tea never be watery.",
  "🪩 May your playlists stay iconic forever.",
  "🕯️ May your candles never tunnel again.",
  "💌 May your texts always send when confidence is full.",
];

export default function ManifestationWheel({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const SIZE = 420;
    const R = SIZE / 2;
    const ARC = (2 * Math.PI) / ITEMS.length;
    const INNER_PAD = 56;

    canvas.width = SIZE;
    canvas.height = SIZE;

    const colors = ["#e5b3fe", "#cfa3ff", "#b57aff", "#c69cff", "#d9a2ff"];

    function fitAndWrap(
      text: string,
      maxWidth: number,
      maxLines: number,
      ctx: CanvasRenderingContext2D,
      startSize: number,
      minSize = 8
    ) {
      for (let fs = startSize; fs >= minSize; fs -= 1) {
        ctx.font = `bold ${fs}px "Courier Prime", monospace`;
        const words = text.split(" ");
        const lines: string[] = [];
        let line = "";
        for (let w of words) {
          const test = line ? line + " " + w : w;
          const width = ctx.measureText(test).width;
          if (width <= maxWidth) line = test;
          else {
            lines.push(line);
            line = w;
          }
          if (lines.length >= maxLines) break;
        }
        if (line && lines.length < maxLines) lines.push(line);
        if (lines.length <= maxLines) return { fontSize: fs, lines };
      }
      ctx.font = `bold ${minSize}px "Courier Prime", monospace`;
      return { fontSize: minSize, lines: [text] };
    }

    function drawWheel(rotation = 0) {
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.save();
      ctx.translate(R, R);
      ctx.rotate(rotation);

      for (let i = 0; i < ITEMS.length; i++) {
        const start = i * ARC;
        const end = start + ARC;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, R, start, end);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();

        ctx.save();
        ctx.clip();

        const mid = start + ARC / 2;
        const textRadius = R - (INNER_PAD + 10);
        const maxWidth = 2 * textRadius * Math.sin(ARC / 2) - 16;

        const { fontSize, lines } = fitAndWrap(ITEMS[i], maxWidth, 3, ctx, 13);

        ctx.fillStyle = "#2e006b";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `bold ${fontSize}px "Courier Prime", monospace`;

        ctx.rotate(mid);
        ctx.translate(textRadius, 0);
        const lineHeight = fontSize * 1.2;
        const totalH = lineHeight * lines.length;
        for (let li = 0; li < lines.length; li++) {
          const offsetY = (li - (lines.length - 1) / 2) * lineHeight;
          ctx.lineWidth = 3;
          ctx.strokeStyle = "rgba(255,255,255,0.65)";
          ctx.strokeText(lines[li], 0, offsetY);
          ctx.fillText(lines[li], 0, offsetY);
        }

        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(0, 0, 48, 0, 2 * Math.PI);
      ctx.fillStyle = "#ffeb3b";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#2e006b";
      ctx.stroke();
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(R - 12, 16);
      ctx.lineTo(R + 12, 16);
      ctx.lineTo(R, 40);
      ctx.closePath();
      ctx.fillStyle = "#ffeb3b";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#2e006b";
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(R, R, R - 3, 0, 2 * Math.PI);
      ctx.lineWidth = 6;
      ctx.strokeStyle = "#ffeb3b";
      ctx.stroke();
    }

    // --- FASTER SPIN SETTINGS ---
    let rotation = 0;
    let speed = 0;
    let anim = 0;

    function animate() {
      rotation += speed;
      // slow down more gradually at first, then quicker
      speed *= 0.985;
      drawWheel(rotation);
      if (speed > 0.002) {
        anim = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(anim);
        const normalized =
          (2 * Math.PI - (rotation % (2 * Math.PI))) % (2 * Math.PI);
        const idx =
          Math.floor((normalized / (2 * Math.PI)) * ITEMS.length + 0.5) %
          ITEMS.length;
        setResult(ITEMS[idx]);
        setSpinning(false);
      }
    }

    function spin() {
      if (spinning) return;
      setSpinning(true);
      setResult(null);
      // 🚀 tuned for snappier feel: higher initial speed, more spins
      speed = 1.5 + Math.random() * 0.8;
      rotation += Math.random() * 2 * Math.PI;
      animate();
    }

    drawWheel(0);
    canvas.addEventListener("click", spin);
    return () => canvas.removeEventListener("click", spin);
  }, [spinning]);

  return (
    <div className="wheel-container">
      <h3 className="tiles-heading">🔮 Spin the Manifestation Wheel</h3>
      <p className="hint">Click the wheel to spin!</p>
      <canvas ref={canvasRef} className="wheel-canvas" />
      {result && (
        <div className="result-box">
          <p>{result}</p>
          <button className="btn next" onClick={onComplete}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

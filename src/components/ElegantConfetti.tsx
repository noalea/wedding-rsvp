"use client";

import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  symbol: string;
  animationDelay: number;
  duration: number;
}

export default function ElegantConfetti() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  const createConfettiPieces = () => {
    const pieces: ConfettiPiece[] = [];
    const colors = [
      "text-rose-300",
      "text-rose-400",
      "text-stone-400",
      "text-rose-200",
    ];
    const symbols = ["🌸", "🌿", "✨", "🤍"];

    for (let i = 0; i < 8; i++) {
      pieces.push({
        id: Date.now() + i, // Unique ID for each batch
        x: Math.random() * 100,
        y: -10,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        animationDelay: Math.random() * 3,
        duration: 6 + Math.random() * 2,
      });
    }
    return pieces;
  };

  useEffect(() => {
    // Create initial confetti
    setConfetti(createConfettiPieces());

    // Set up looping interval
    const interval = setInterval(() => {
      setConfetti(createConfettiPieces());
    }, 3000); // New batch every 3 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes elegantFall {
          0% {
            transform: translateY(-100px) scale(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(100vh) scale(0.2) rotate(360deg);
            opacity: 0;
          }
        }
        .elegant-confetti {
          animation: elegantFall var(--duration) ease-out var(--delay) forwards;
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className={`absolute ${piece.color} opacity-80 elegant-confetti`}
            style={
              {
                left: `${piece.x}%`,
                "--duration": `${piece.duration}s`,
                "--delay": `${piece.animationDelay}s`,
              } as React.CSSProperties
            }
          >
            {piece.symbol}
          </div>
        ))}
      </div>
    </>
  );
}

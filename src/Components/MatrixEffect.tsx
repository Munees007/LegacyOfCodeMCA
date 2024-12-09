// src/components/MatrixEffect.tsx
import React, { useEffect } from 'react';

const MatrixEffect: React.FC = () => {
  useEffect(() => {
    const canvas = document.getElementById('matrix-container') as HTMLCanvasElement;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

      context.fillStyle = '#FFF'; // Green text
      context.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        context.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const updateMatrix = setInterval(draw, 50);

    return () => clearInterval(updateMatrix);
  }, []);

  return (
    <canvas
      id="matrix-container"
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ background: 'transparent' }}
    ></canvas>
  );
};

export default MatrixEffect;

'use client';

import { useEffect, useRef } from 'react';

// Hand-authored pixel runner. Each frame is a 16x16 bitmap of row strings:
//   '.' transparent · 'W' body (white) · 'A' accent (visor)
//   '1' near limb · '2' far limb  — colored per half of the cycle so the two
//   strides read distinctly (near = white, far = dimmed) without flipping.
const SW = 16;
const SH = 16;
const RUN_STEPS_PER_SECOND = 9;

const WHITE = '#f4f4f5';
const ACCENT = '#7cffb2';
const DIM = 'rgba(244,244,245,0.42)';

// stride extended (contact)
const FRAME_A = [
  '......WWW.......',
  '......WAA.......',
  '......WWW.......',
  '.......W........',
  '.....WWWWW......',
  '....2WWWWW1.....',
  '...2.WWWWW.1....',
  '.....WWWWW......',
  '.....WWWWW......',
  '.....22.11......',
  '....22...11.....',
  '...22.....11....',
  '..22.......11...',
  '.22........11...',
  '................',
  '................',
];

// legs passing under the body
const FRAME_B = [
  '......WWW.......',
  '......WAA.......',
  '......WWW.......',
  '.......W........',
  '.....WWWWW......',
  '.....WWWWW1.....',
  '....2WWWWW......',
  '.....WWWWW......',
  '.....WWWWW......',
  '.....2211.......',
  '.....2.11.......',
  '....2..11.......',
  '...2...11.......',
  '..22...11.......',
  '................',
  '................',
];

const IDLE = [
  '......WWW.......',
  '......WAA.......',
  '......WWW.......',
  '.......W........',
  '.....WWWWW......',
  '....WWWWWWW.....',
  '.....WWWWW......',
  '.....WWWWW......',
  '.....WWWWW......',
  '.....WWWWW......',
  '.....W...W......',
  '.....W...W......',
  '.....W...W......',
  '.....W...W......',
  '....WW...WW.....',
  '................',
];

// 4-frame run cycle: A/B for one stride, then A/B with near<->far swapped.
const CYCLE = [
  { grid: FRAME_A, half: 0 },
  { grid: FRAME_B, half: 0 },
  { grid: FRAME_A, half: 1 },
  { grid: FRAME_B, half: 1 },
];

function colorFor(ch, half) {
  if (ch === 'W') return WHITE;
  if (ch === 'A') return ACCENT;
  if (ch === '1') return half === 0 ? WHITE : DIM;
  if (ch === '2') return half === 0 ? DIM : WHITE;
  return null;
}

function drawFrame(octx, grid, half) {
  octx.clearRect(0, 0, SW, SH);
  for (let row = 0; row < grid.length; row += 1) {
    const line = grid[row];
    for (let col = 0; col < line.length; col += 1) {
      const color = colorFor(line[col], half);
      if (!color) continue;
      octx.fillStyle = color;
      octx.fillRect(col, row, 1, 1);
    }
  }
}

export default function StickFigure({ isMoving, direction = 1, className }) {
  const canvasRef = useRef(null);
  const phaseRef = useRef(0);
  const lastTimeRef = useRef(null);
  const rafRef = useRef(null);
  const movingRef = useRef(isMoving);
  const dirRef = useRef(direction);

  movingRef.current = isMoving;
  dirRef.current = direction;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const off = document.createElement('canvas');
    off.width = SW;
    off.height = SH;
    const octx = off.getContext('2d');

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const sizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
    };

    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);

    const render = () => {
      if (movingRef.current) {
        const frame = CYCLE[Math.floor(phaseRef.current) % CYCLE.length];
        drawFrame(octx, frame.grid, frame.half);
      } else {
        drawFrame(octx, IDLE, 0);
      }

      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      if (dirRef.current < 0) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(off, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    };

    const animate = (time) => {
      rafRef.current = requestAnimationFrame(animate);
      if (lastTimeRef.current != null && movingRef.current) {
        const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
        phaseRef.current += dt * RUN_STEPS_PER_SECOND;
      }
      lastTimeRef.current = time;
      render();
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', sizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

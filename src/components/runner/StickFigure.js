'use client';

import { useEffect, useRef } from 'react';

// Low-res logical canvas; blitted to the on-screen canvas with smoothing off
// so every limb reads as crisp chunky pixels.
const LW = 34;
const LH = 48;
const RUN_CYCLES_PER_SECOND = 3.6;
const TAU = Math.PI * 2;

const THIGH = 11;
const SHIN = 11;
const UPPER_ARM = 8;
const FORE_ARM = 8;

const T_AMP = 0.62; // thigh swing
const K_MIN = 0.12; // resting knee flex
const K_AMP = 1.15; // extra knee flex during swing
const A_AMP = 0.5; // arm swing
const ELBOW = 0.5; // elbow flex

function legPose(hipX, hipY, p) {
  const thigh = T_AMP * Math.cos(TAU * p);
  const swing = p > 0.5 ? Math.sin(Math.PI * (p - 0.5) / 0.5) : 0;
  const flex = K_MIN + K_AMP * swing;

  const kneeX = hipX + THIGH * Math.sin(thigh);
  const kneeY = hipY + THIGH * Math.cos(thigh);

  const shin = thigh - flex;
  const footX = kneeX + SHIN * Math.sin(shin);
  const footY = kneeY + SHIN * Math.cos(shin);

  return { kneeX, kneeY, footX, footY };
}

function armPose(shX, shY, p) {
  const upper = A_AMP * Math.cos(TAU * p + Math.PI);
  const elbowX = shX + UPPER_ARM * Math.sin(upper);
  const elbowY = shY + UPPER_ARM * Math.cos(upper);
  const fore = upper + ELBOW;
  const handX = elbowX + FORE_ARM * Math.sin(fore);
  const handY = elbowY + FORE_ARM * Math.cos(fore);
  return { elbowX, elbowY, handX, handY };
}

function seg(ctx, x1, y1, x2, y2, w) {
  ctx.lineWidth = w;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function drawFigure(octx, cycle, isMoving) {
  octx.clearRect(0, 0, LW, LH);

  const cx = LW / 2;
  const groundY = LH - 4;
  const bob = isMoving ? Math.abs(Math.sin(cycle * TAU)) * 1.6 : 0;

  const hipY = groundY - 18 - bob;
  const shoulderY = hipY - 13;
  const neckY = shoulderY - 2;
  const headR = 4.5;
  const headY = neckY - headR - 1;
  const lean = isMoving ? 2 : 0.5;
  const bodyX = cx + lean;

  octx.strokeStyle = '#f4f4f5';
  octx.fillStyle = '#f4f4f5';
  octx.lineCap = 'round';
  octx.lineJoin = 'round';

  const pRight = cycle % 1;
  const pLeft = (cycle + 0.5) % 1;

  // Back limbs (dimmer) for depth
  octx.globalAlpha = 0.55;
  const backLeg = isMoving ? legPose(bodyX, hipY, pLeft) : { kneeX: cx - 4, kneeY: hipY + 9, footX: cx - 5, footY: groundY };
  seg(octx, bodyX, hipY, backLeg.kneeX, backLeg.kneeY, 3.4);
  seg(octx, backLeg.kneeX, backLeg.kneeY, backLeg.footX, backLeg.footY, 3.4);
  const backArm = isMoving ? armPose(bodyX, shoulderY, pLeft) : { elbowX: cx - 4, elbowY: shoulderY + 7, handX: cx - 5, handY: shoulderY + 13 };
  seg(octx, bodyX, shoulderY, backArm.elbowX, backArm.elbowY, 3);
  seg(octx, backArm.elbowX, backArm.elbowY, backArm.handX, backArm.handY, 3);
  octx.globalAlpha = 1;

  // Torso
  seg(octx, bodyX, neckY, bodyX, hipY, 4);

  // Front limbs
  const frontLeg = isMoving ? legPose(bodyX, hipY, pRight) : { kneeX: cx + 4, kneeY: hipY + 9, footX: cx + 5, footY: groundY };
  seg(octx, bodyX, hipY, frontLeg.kneeX, frontLeg.kneeY, 3.6);
  seg(octx, frontLeg.kneeX, frontLeg.kneeY, frontLeg.footX, frontLeg.footY, 3.6);

  const frontArm = isMoving ? armPose(bodyX, shoulderY, pRight) : { elbowX: cx + 4, elbowY: shoulderY + 7, handX: cx + 5, handY: shoulderY + 13 };
  seg(octx, bodyX, shoulderY, frontArm.elbowX, frontArm.elbowY, 3.2);
  seg(octx, frontArm.elbowX, frontArm.elbowY, frontArm.handX, frontArm.handY, 3.2);

  // Head
  octx.beginPath();
  octx.arc(bodyX, headY, headR, 0, TAU);
  octx.fill();

  // Accent visor
  octx.fillStyle = '#7cffb2';
  octx.fillRect(bodyX, headY - 1.5, headR, 2.4);
}

export default function StickFigure({ isMoving, direction = 1, className }) {
  const canvasRef = useRef(null);
  const offRef = useRef(null);
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
    off.width = LW;
    off.height = LH;
    offRef.current = off;
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
      drawFigure(octx, phaseRef.current % 1, movingRef.current);
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
        phaseRef.current += dt * RUN_CYCLES_PER_SECOND;
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

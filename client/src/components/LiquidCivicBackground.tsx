/**
 * Civic Field Manual visual reminder: this is the supplied liquid-metal 3D canvas.
 * Preserve its cursor folds, press ripples, timing, and fixed pointer-transparent position.
 */
import { useEffect, useRef } from "react";

type Ripple = { x: number; y: number; startedAt: number; strength: number };

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.max(minimum, Math.min(maximum, value));

const rippleDisplacement = (x: number, y: number, now: number, ripples: Ripple[]) => {
  let displacement = 0;
  ripples.forEach((ripple) => {
    const age = (now - ripple.startedAt) / 920;
    if (age >= 1) return;
    const radialDistance = Math.hypot(x - ripple.x, y - ripple.y);
    const ringRadius = 20 + age * 278;
    const ringWidth = 48 + age * 44;
    const delta = radialDistance - ringRadius;
    const envelope = Math.exp(-(delta * delta) / (2 * ringWidth * ringWidth));
    const softWave = Math.cos(delta * 0.043) * envelope;
    displacement += softWave * (1 - age) * ripple.strength * 6.2;
  });
  return displacement;
};

export default function LiquidCivicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cursor = { x: window.innerWidth * 0.56, y: window.innerHeight * 0.25 };
    const surface = { x: cursor.x, y: cursor.y };
    const materialImage = new Image();
    materialImage.decoding = "async";
    materialImage.src = "https://samadhan-set-javvhyyc.manus.space/manus-storage/liquid-civic-metal-study_7b115f6f.jpg";
    const ripples: Ripple[] = [];
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let frame = 0;
    let animationFrame = 0;
    let lastFrame = performance.now();

    const resize = () => {
      width = Math.max(window.innerWidth, 1);
      height = Math.max(window.innerHeight, 1);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = (now: number) => {
      const delta = Math.min((now - lastFrame) / 16.67, 2);
      lastFrame = now;
      frame += delta;
      surface.x += (cursor.x - surface.x) * 0.055 * delta;
      surface.y += (cursor.y - surface.y) * 0.055 * delta;

      const base = context.createLinearGradient(0, 0, width, height);
      base.addColorStop(0, "#aeb1b0");
      base.addColorStop(0.22, "#e6e7e2");
      base.addColorStop(0.48, "#f3f2ed");
      base.addColorStop(0.76, "#bec1c0");
      base.addColorStop(1, "#e7e5df");
      context.fillStyle = base;
      context.fillRect(0, 0, width, height);

      if (materialImage.complete && materialImage.naturalWidth > 0) {
        context.save();
        context.globalAlpha = 0.1;
        context.globalCompositeOperation = "soft-light";
        context.drawImage(materialImage, 0, 0, width, height);
        context.restore();
      }

      const ambient = context.createRadialGradient(width * 0.18, height * 0.08, 0, width * 0.18, height * 0.08, Math.max(width, height) * 0.75);
      ambient.addColorStop(0, "rgba(255,255,255,0.98)");
      ambient.addColorStop(0.48, "rgba(255,255,255,0.12)");
      ambient.addColorStop(1, "rgba(22,35,36,0.20)");
      context.fillStyle = ambient;
      context.fillRect(0, 0, width, height);

      context.save();
      context.globalCompositeOperation = "multiply";
      for (let fold = 0; fold < 5; fold += 1) {
        const foldY = height * (0.1 + fold * 0.22) + Math.sin(frame * 0.012 + fold * 1.9) * 42;
        const foldGradient = context.createLinearGradient(0, foldY - 90, width, foldY + 190);
        foldGradient.addColorStop(0, "rgba(42,51,51,0)");
        foldGradient.addColorStop(0.36, "rgba(42,51,51,0.035)");
        foldGradient.addColorStop(0.52, "rgba(24,35,35,0.18)");
        foldGradient.addColorStop(0.69, "rgba(255,255,255,0.34)");
        foldGradient.addColorStop(1, "rgba(255,255,255,0)");
        context.fillStyle = foldGradient;
        context.fillRect(0, foldY - 120, width, 340);
      }
      context.restore();

      context.save();
      context.globalCompositeOperation = "overlay";
      for (let grain = 0; grain < width; grain += 6) {
        const grainStrength = 0.035 + (Math.sin(grain * 0.31 + frame * 0.005) + 1) * 0.018;
        context.strokeStyle = `rgba(46,54,54,${grainStrength})`;
        context.beginPath();
        context.moveTo(grain, 0);
        context.lineTo(grain + Math.sin(grain * 0.037) * 8, height);
        context.stroke();
      }
      context.restore();

      const columns = Math.ceil(width / 50) + 3;
      const rows = Math.ceil(height / 48) + 3;
      const horizon = height * 0.15;
      context.lineCap = "round";

      for (let row = 0; row <= rows; row += 1) {
        const y = row * 48 - 48;
        const points: Array<{ x: number; y: number }> = [];
        context.beginPath();
        for (let column = 0; column <= columns; column += 1) {
          const x = column * 50 - 50;
          const dx = x - surface.x;
          const dy = y - surface.y;
          const distance = Math.hypot(dx, dy);
          const cursorFold = Math.exp(-(distance * distance) / 250000) * Math.cos(distance * 0.027 - frame * 0.052) * 4.8;
          const gentleWave = Math.sin(x * 0.009 + y * 0.014 + frame * 0.013) * 2.4;
          const perspective = ((y - horizon) / Math.max(height, 1)) * Math.sin(x * 0.004) * 3;
          const rippleLift = rippleDisplacement(x, y, now, ripples);
          points.push({ x, y: y + gentleWave + cursorFold + perspective + rippleLift });
        }
        context.moveTo(points[0].x, points[0].y);
        for (let pointIndex = 1; pointIndex < points.length - 1; pointIndex += 1) {
          const point = points[pointIndex];
          const next = points[pointIndex + 1];
          context.quadraticCurveTo(point.x, point.y, (point.x + next.x) / 2, (point.y + next.y) / 2);
        }
        context.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        const intensity = clamp(0.075 + row / rows * 0.065, 0.075, 0.14);
        context.strokeStyle = `rgba(38, 49, 50, ${intensity})`;
        context.lineWidth = 0.48;
        context.shadowColor = "rgba(255,255,255,0.24)";
        context.shadowBlur = 2;
        context.stroke();
      }

      for (let column = 0; column <= columns; column += 1) {
        const x = column * 50 - 50;
        const points: Array<{ x: number; y: number }> = [];
        context.beginPath();
        for (let row = 0; row <= rows; row += 1) {
          const y = row * 48 - 48;
          const dx = x - surface.x;
          const dy = y - surface.y;
          const distance = Math.hypot(dx, dy);
          const cursorFold = Math.exp(-(distance * distance) / 265000) * Math.sin(distance * 0.024 - frame * 0.047) * 3.5;
          const gentleWave = Math.cos(y * 0.012 + x * 0.006 + frame * 0.012) * 1.8;
          const rippleLift = rippleDisplacement(x, y, now, ripples);
          points.push({ x: x + cursorFold + gentleWave + rippleLift * 0.085, y });
        }
        context.moveTo(points[0].x, points[0].y);
        for (let pointIndex = 1; pointIndex < points.length - 1; pointIndex += 1) {
          const point = points[pointIndex];
          const next = points[pointIndex + 1];
          context.quadraticCurveTo(point.x, point.y, (point.x + next.x) / 2, (point.y + next.y) / 2);
        }
        context.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        context.strokeStyle = "rgba(255,255,255,0.38)";
        context.lineWidth = 0.35;
        context.shadowColor = "transparent";
        context.shadowBlur = 0;
        context.stroke();
      }

      const tealGlow = context.createRadialGradient(surface.x, surface.y, 0, surface.x, surface.y, Math.min(width, height) * 0.42);
      tealGlow.addColorStop(0, "rgba(13,124,134,0.22)");
      tealGlow.addColorStop(0.32, "rgba(13,124,134,0.075)");
      tealGlow.addColorStop(1, "rgba(13,124,134,0)");
      context.fillStyle = tealGlow;
      context.fillRect(0, 0, width, height);

      for (let i = ripples.length - 1; i >= 0; i -= 1) {
        const ripple = ripples[i];
        const age = (now - ripple.startedAt) / 920;
        if (age >= 1) ripples.splice(i, 1);
      }

      if (!reduceMotion) animationFrame = requestAnimationFrame(draw);
    };

    const onPointerMove = (event: PointerEvent) => { cursor.x = event.clientX; cursor.y = event.clientY; };
    const onPointerDown = (event: PointerEvent) => {
      ripples.push({ x: event.clientX, y: event.clientY, startedAt: performance.now(), strength: 1 });
      if (ripples.length > 4) ripples.shift();
      if (reduceMotion) draw(performance.now());
    };

    resize();
    draw(performance.now());
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return <canvas ref={canvasRef} className="liquid-civic-background" aria-hidden="true" />;
}

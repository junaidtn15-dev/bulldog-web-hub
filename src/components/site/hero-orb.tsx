import { useEffect, useRef, useState } from "react";

type P3 = { x: number; y: number; z: number };

/** 2D profile of a car silhouette (top-left origin, ~400x170 space). */
const PROFILE: [number, number][][] = [
  [
    [30, 120], [44, 96], [62, 118], [78, 96], [110, 80], [140, 48],
    [214, 44], [250, 76], [300, 88], [352, 104], [372, 118], [340, 122], [30, 122],
  ],
  [[112, 80], [140, 50], [214, 46], [246, 76], [112, 80]],
  [[176, 48], [178, 78]],
];

const WHEELS: [number, number, number][] = [
  [108, 124, 21],
  [308, 124, 21],
];

const READOUTS = [
  { label: "Curb Weight", value: "1,486 kg" },
  { label: "Metal Value", value: "$1,190" },
  { label: "Demand", value: "High" },
  { label: "Pickup", value: "Today" },
];

function buildModel(): { lines: [P3, P3][]; cloud: P3[] } {
  const lines: [P3, P3][] = [];
  const cloud: P3[] = [];
  const depth = 46;
  const toLocal = (x: number, y: number, z: number): P3 => ({
    x: x - 200,
    y: -(y - 90),
    z,
  });

  for (const poly of PROFILE) {
    for (const side of [-depth, depth]) {
      for (let i = 0; i < poly.length - 1; i++) {
        const a = toLocal(poly[i][0], poly[i][1], side);
        const b = toLocal(poly[i + 1][0], poly[i + 1][1], side);
        lines.push([a, b]);
        for (let t = 0; t <= 1; t += 0.16) {
          cloud.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, z: side });
        }
      }
    }
    // ribs connecting the two sides
    for (let i = 0; i < poly.length; i += 2) {
      lines.push([toLocal(poly[i][0], poly[i][1], -depth), toLocal(poly[i][0], poly[i][1], depth)]);
    }
  }

  for (const [cx, cy, r] of WHEELS) {
    for (const side of [-depth - 6, depth + 6]) {
      const seg = 22;
      for (let i = 0; i < seg; i++) {
        const a0 = (i / seg) * Math.PI * 2;
        const a1 = ((i + 1) / seg) * Math.PI * 2;
        const p0 = toLocal(cx + Math.cos(a0) * r, cy + Math.sin(a0) * r, side);
        const p1 = toLocal(cx + Math.cos(a1) * r, cy + Math.sin(a1) * r, side);
        lines.push([p0, p1]);
        cloud.push(p0);
      }
    }
  }
  return { lines, cloud };
}

/**
 * Hero centrepiece: a fully 3D rotating holographic wireframe of a vehicle
 * built on canvas, orbited by data rings and drifting value particles that
 * spiral into a glowing payout core. Decorative only.
 */
export function HeroOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0, active: 0 });
  const [payout, setPayout] = useState(0);

  useEffect(() => {
    const target = 4820;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 2200);
      const eased = 1 - Math.pow(1 - k, 3);
      setPayout(Math.round(target * eased));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const { lines, cloud } = buildModel();
    const sparks = Array.from({ length: 120 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: 220 + Math.random() * 260,
      y: (Math.random() - 0.5) * 240,
      sp: 0.004 + Math.random() * 0.01,
      pull: 0.14 + Math.random() * 0.5,
      s: Math.random() * 1.6 + 0.5,
    }));

    let w = 0, h = 0, raf = 0, t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const project = (p: P3, yaw: number, pitch: number, scale: number) => {
      const cy = Math.cos(yaw), sy = Math.sin(yaw);
      let x = p.x * cy - p.z * sy;
      let z = p.x * sy + p.z * cy;
      const cp = Math.cos(pitch), sp = Math.sin(pitch);
      let y = p.y * cp - z * sp;
      z = p.y * sp + z * cp;
      const f = 620 / (620 + z);
      return { x: w / 2 + x * f * scale, y: h / 2 - y * f * scale, f };
    };

    const draw = () => {
      t += reduce ? 0 : 1;
      const time = t / 60;
      const scale = Math.min(w / 560, h / 400) * 1.15;
      const yaw = time * 0.35 + pointer.current.x * 0.6;
      const pitch = -0.18 + Math.sin(time * 0.4) * 0.06 + pointer.current.y * 0.35;

      ctx.clearRect(0, 0, w, h);

      // core glow
      const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.min(w, h) * 0.5);
      g.addColorStop(0, "rgba(37,99,235,0.20)");
      g.addColorStop(0.5, "rgba(34,184,255,0.07)");
      g.addColorStop(1, "rgba(37,99,235,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // orbit rings
      for (let ring = 0; ring < 3; ring++) {
        const rad = 210 + ring * 52;
        const tilt = 0.42 + ring * 0.12;
        ctx.beginPath();
        for (let i = 0; i <= 90; i++) {
          const a = (i / 90) * Math.PI * 2 + time * (0.18 + ring * 0.07);
          const p = project(
            { x: Math.cos(a) * rad, y: Math.sin(a) * rad * Math.sin(tilt) * 0.5, z: Math.sin(a) * rad },
            yaw * 0.4, pitch, scale,
          );
          i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = `rgba(37,99,235,${0.16 - ring * 0.035})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // spiralling value sparks
      for (const s of sparks) {
        s.a += s.sp;
        s.r -= s.pull;
        if (s.r < 120) { s.r = 300 + Math.random() * 220; s.y = (Math.random() - 0.5) * 240; }
        const p = project({ x: Math.cos(s.a) * s.r, y: s.y, z: Math.sin(s.a) * s.r }, yaw * 0.5, pitch, scale);
        const near = Math.max(0, 1 - (s.r - 120) / 260);
        ctx.beginPath();
        ctx.arc(p.x, p.y, s.s * p.f, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${34 + near * 40},${140 + near * 60},${255},${0.15 + near * 0.55})`;
        ctx.fill();
      }

      // wireframe vehicle
      ctx.lineWidth = 1.6;
      ctx.shadowColor = "rgba(34,184,255,0.7)";
      ctx.shadowBlur = 8;
      for (const [a, b] of lines) {
        const pa = project(a, yaw, pitch, scale);
        const pb = project(b, yaw, pitch, scale);
        const depth = (pa.f + pb.f) / 2;
        const alpha = Math.max(0, Math.min(1, (depth - 0.78) * 3.4));
        ctx.strokeStyle = `rgba(${16 + alpha * 24},${70 + alpha * 90},${220 + alpha * 30},${0.3 + alpha * 0.7})`;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;

      // vertex nodes
      for (const c of cloud) {
        const p = project(c, yaw, pitch, scale);
        const alpha = Math.max(0, Math.min(1, (p.f - 0.8) * 3));
        if (alpha <= 0.02) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.1 * p.f, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,184,255,${alpha * 0.7})`;
        ctx.fill();
      }

      // scan plane sweeping vertically through the model
      const sweep = ((Math.sin(time * 0.8) + 1) / 2) * 200 - 100;
      ctx.beginPath();
      for (let i = 0; i <= 60; i++) {
        const a = (i / 60) * Math.PI * 2;
        const p = project({ x: Math.cos(a) * 240, y: sweep, z: Math.sin(a) * 240 }, yaw, pitch, scale);
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "rgba(34,184,255,0.45)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-4/3 w-full select-none"
      onPointerMove={(e) => {
        const r = wrapRef.current?.getBoundingClientRect();
        if (!r) return;
        pointer.current.x = (e.clientX - r.left) / r.width - 0.5;
        pointer.current.y = (e.clientY - r.top) / r.height - 0.5;
      }}
      onPointerLeave={() => { pointer.current.x = 0; pointer.current.y = 0; }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

      {/* live payout core */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
        <div className="glass rounded-2xl px-5 py-3 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Live Offer Estimate
          </p>
          <p className="font-display text-3xl font-extrabold tracking-tight text-gradient tabular-nums">
            ${payout.toLocaleString()}
          </p>
        </div>
      </div>

      {/* orbiting readouts */}
      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        {READOUTS.map((r, i) => {
          const pos = [
            { top: "8%", left: "2%" },
            { top: "16%", right: "2%" },
            { bottom: "30%", left: "0%" },
            { bottom: "24%", right: "0%" },
          ][i];
          return (
            <div
              key={r.label}
              className="glass absolute rounded-lg px-3 py-2"
              style={{ ...pos, animation: `floaty ${5 + i * 0.6}s ease-in-out infinite` }}
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{r.label}</p>
              <p className="font-display text-sm font-bold text-foreground">{r.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

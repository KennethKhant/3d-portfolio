"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Link from "next/link";

/**
 * 3D floating, flippable "digital card" about page (no splash here).
 */
export default function About3D() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-black text-zinc-100">
      {/* Cinematic animated background */}
      <BackgroundGrid />

      {/* Dim vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_70%,rgba(0,0,0,0.85)_100%)]" />

      {/* Center stage: title + card */}
      <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 pt-6 sm:pt-10">
        <HeroTitle />
        <div className="mt-10 grid w-full place-items-center">
          <FlipCard />
        </div>

      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-14 px-6 pb-10 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Kaung Khant• UC San Diego • Electrical Engineering
      </footer>
    </main>
  );
}

function HeroTitle() {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl font-bold tracking-tight sm:text-5xl"
      >
       Hellooo! <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"></span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.95, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base"
      >
        Electrical Engineering @ UCSD • PCB Design,  Embedded systems & Control, Robotic 
      </motion.p>
    </div>
  );
}

/** Primary CTA button */
function PrimaryLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-red-600/30 outline-none transition active:scale-[0.98] hover:bg-red-500 focus-visible:ring-2 focus-visible:ring-red-400"
    >
      {label}
    </Link>
  );
}

/** Secondary/ghost button */
function GhostLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-zinc-200 backdrop-blur transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
    >
      {label}
    </Link>
  );
}

/**
 * Flippable 3D digital card with hover tilt and soft float.
 */
function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const tz = useMotionValue(0);

  useEffect(() => {
    const id = setInterval(() => {
      const t = Date.now() / 1000;
      tz.set(Math.sin(t) * 6);
    }, 1000 / 30);
    return () => clearInterval(id);
  }, [tz]);

  const handlePointerMove = (e: React.PointerEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 18);
    rx.set(-(py - 0.5) * 14); 
  };

  const resetTilt = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      onClick={() => setIsFlipped((v) => !v)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setIsFlipped((v) => !v)}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}

className="group relative h-[2240px] w-[380px] cursor-pointer select-none [perspective:1200px] sm:h-[300px] sm:w-[560px]"
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, translateZ: tz }}
        className="relative h-full w-full rounded-3xl border border-white/10 bg-white/5 p-0.5 shadow-2xl backdrop-blur [transform-style:preserve-3d]"
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{ background: "linear-gradient(120deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02) 40%, transparent 60%)" }}
        />

        <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-zinc-900 to-zinc-800 [transform-style:preserve-3d]">
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0 [transform-style:preserve-3d]"
          >
            {/* FRONT */}
            <div className="absolute inset-0 grid place-items-center [backface-visibility:hidden]">
              <CardFront />
            </div>
            {/* BACK */}
            <div className="absolutse inset-0 grid rotate-y-180 place-items-center [backface-visibility:hidden]">
              <CardBack />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}


function CardFront() {
  return (
    <div className="flex h-full w-full items-center gap-5 p-6 sm:gap-7 sm:p-7">
      {/* Avatar / monogram */}
      <div className="relative shrink-0">
        <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-red-600 to-red-400 p-0.5 shadow-lg shadow-red-700/30 sm:h-24 sm:w-24">
          <div className="grid h-full w-full place-items-center rounded-full bg-zinc-900 text-2xl font-semibold text-zinc-200 sm:text-3xl">
            Ken
          </div>
        </div>
        <div className="pointer-events-none absolute -inset-2 -z-10 rounded-full bg-red-600/20 blur-2xl" />
      </div>

      {/* Text + chips + pills */}
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">Kaung Khant (Ken)</h3>
        <p className="mt-0.5 text-xs text-zinc-300 sm:text-sm">
          Electrical Engineering @ UC San Diego
        </p>
        <p className="mt-1 hidden text-[11px] text-zinc-400 sm:block">
          PCB Design • Embedded systems & Control • Robotics 
        </p>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:mt-4">
          <InfoPill label="Email" value="kkkhant@ucsd.edu" />
          <InfoPill label="Site" value="kennethkhant.github.io" />
          <InfoPill label="GitHub" value="github.com/KennethKhant" />
          <InfoPill label="LinkedIn" value="in/kaungkkhant" />
        </div>
      </div>
    </div>
  );
}


function CardBack() {
  return (
    <div className="grid h-full w-full grid-cols-[1fr_auto] items-center gap-4 p-6 sm:gap-6 sm:p-7">
      {/* Left: quick links */}
      <div>
        <h3 className="text-base font-semibold sm:text-lg">Quick Links</h3>
        <div className="mt-3 grid max-w-[360px] gap-2 text-sm sm:grid-cols-2">
          <SmartLink href="https://kennethkhant.github.io/capabilities">Projects</SmartLink>
          <SmartLink href="https://kennethkhant.github.io/resume">Resume</SmartLink>
          <SmartLink href="https://kennethkhant.github.io/contact">Contact</SmartLink>
          <SmartLink href="https://www.linkedin.com/in/ken-kaung">LinkedIn</SmartLink>
        </div>
      </div>

      {/* Right: QR */}
      <div className="justify-self-end text-center">
        <div className="text-[10px] text-zinc-400">Scan to connect</div>
        <div className="mt-2">
          <QRPlaceholder />
        </div>
      </div>
    </div>
  );
}


function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-left">
      <div className="text-[10px] uppercase tracking-wider text-zinc-400">{label}</div>
      <div className="truncate text-zinc-200">{value}</div>
    </div>
  );
}

function SmartLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-zinc-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
    >
      {children}
    </Link>
  );
}

/** Minimal QR placeholder (replace with your real QR PNG/SVG later) */
function QRPlaceholder() {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24 rounded-md bg-white/90 p-2">
      <rect x="8" y="8" width="26" height="26" fill="#000" />
      <rect x="86" y="8" width="26" height="26" fill="#000" />
      <rect x="8" y="86" width="26" height="26" fill="#000" />
      <rect x="46" y="46" width="10" height="10" fill="#000" />
      <rect x="60" y="46" width="6" height="6" fill="#000" />
      <rect x="72" y="46" width="8" height="8" fill="#000" />
      <rect x="46" y="60" width="8" height="8" fill="#000" />
      <rect x="58" y="60" width="10" height="10" fill="#000" />
      <rect x="74" y="60" width="6" height="6" fill="#000" />
      <rect x="46" y="74" width="6" height="6" fill="#000" />
      <rect x="58" y="74" width="8" height="8" fill="#000" />
      <rect x="72" y="74" width="10" height="10" fill="#000" />
    </svg>
  );
}

function BackgroundGrid() {
  const rows = 7;
  const cols = 10;
  const cells = useMemo(() => Array.from({ length: rows * cols }, (_, i) => i), []);
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="grid h-full w-full grid-cols-10">
          {cells.map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 6 + ((i % cols) / cols) * 3, repeat: Infinity, ease: "easeInOut" }}
              className="m-1 rounded-md bg-gradient-to-br from-zinc-700 to-zinc-900 shadow-inner"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

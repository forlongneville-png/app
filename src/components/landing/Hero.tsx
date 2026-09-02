// FILE: src/components/landing/Hero.tsx
"use client";

import { motion } from "framer-motion";

interface HeroProps {
  onGetStarted: () => void;
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero({ onGetStarted }: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* Faint watermark of the brand mark — considered, not stock-photo generic */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-24 -top-16 h-[420px] w-[420px] text-brand-ink/[0.05] sm:-right-10 sm:top-0"
      >
        <path
          d="M60 340 C60 200 150 60 340 40 C320 220 200 320 60 340 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M70 320 C110 250 160 200 220 170"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
        />
      </svg>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-28"
      >
        <div className="max-w-xl">
          <motion.h1
            variants={item}
            className="text-4xl font-medium leading-[1.1] tracking-tight text-brand-ink sm:text-5xl"
          >
            A professional website for your business or school, live in
            minutes.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft"
          >
            We build and host it for you, connected to your own domain, so
            you can focus on running things — not maintaining a website.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onGetStarted}
              className="rounded-full bg-brand-ink px-6 py-3.5 text-base font-medium text-paper transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Get Started
            </button>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-brand-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-brand-ink"
            >
              See how it works
            </a>
          </motion.div>
        </div>

        <motion.div variants={item} className="relative mx-auto w-full max-w-md lg:mx-0">
          <BrowserMockup />
        </motion.div>
      </motion.div>
    </section>
  );
}

function BrowserMockup() {
  return (
    <div className="rounded-2xl border border-line bg-white p-2.5 shadow-[0_1px_2px_rgba(13,33,23,0.04),0_16px_40px_-16px_rgba(13,33,23,0.18)]">
      <div className="flex items-center gap-1.5 px-2 pb-2.5 pt-1">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <div className="ml-3 flex-1 truncate rounded-md bg-paper-dim px-3 py-1 text-xs text-ink-soft">
          yourbusiness.zadoc.online
        </div>
      </div>
      <div className="rounded-xl bg-brand-50 p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-3 w-16 rounded-full bg-brand-ink/70" />
          <div className="flex gap-2">
            <div className="h-2 w-8 rounded-full bg-brand-ink/25" />
            <div className="h-2 w-8 rounded-full bg-brand-ink/25" />
          </div>
        </div>
        <div className="mb-1.5 h-4 w-4/5 rounded-full bg-brand-ink/80" />
        <div className="mb-4 h-4 w-3/5 rounded-full bg-brand-ink/80" />
        <div className="mb-1.5 h-2.5 w-full rounded-full bg-brand-ink/15" />
        <div className="mb-5 h-2.5 w-2/3 rounded-full bg-brand-ink/15" />
        <div className="h-8 w-28 rounded-full bg-brand-ink" />
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-2.5 px-1 pb-1">
        <div className="h-14 rounded-lg bg-paper-dim" />
        <div className="h-14 rounded-lg bg-paper-dim" />
        <div className="h-14 rounded-lg bg-paper-dim" />
      </div>
    </div>
  );
}

// FILE: src/components/landing/Header.tsx
"use client";

import Image from "next/image";

interface HeaderProps {
  onGetStarted: () => void;
}

export default function Header({ onGetStarted }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          <Image
            src="/logo.png"
            alt="zadoc business"
            width={36}
            height={36}
            className="h-9 w-9"
            priority
          />
          <span className="text-lg font-medium tracking-tight text-brand-ink">
            zadoc business
          </span>
        </a>

        <nav className="flex items-center gap-6">
          <a
            href="#how-it-works"
            className="hidden text-sm text-ink-soft transition-colors hover:text-brand-ink sm:inline-block"
          >
            How it works
          </a>
          <a
            href="#contact"
            className="hidden text-sm text-ink-soft transition-colors hover:text-brand-ink sm:inline-block"
          >
            Contact
          </a>
          <button
            type="button"
            onClick={onGetStarted}
            className="rounded-full bg-brand-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
}

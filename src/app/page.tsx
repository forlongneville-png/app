// FILE: src/app/page.tsx
"use client";

import { useState } from "react";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Footer from "@/components/landing/Footer";
import GetStartedModal from "@/components/landing/GetStartedModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header onGetStarted={() => setIsModalOpen(true)} />

      <main className="flex-1">
        <Hero onGetStarted={() => setIsModalOpen(true)} />
        <HowItWorks />

        <section className="border-t border-line bg-brand-ink">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-20">
            <div>
              <h2 className="text-2xl font-medium tracking-tight text-paper sm:text-3xl">
                Ready for your business or school to be online?
              </h2>
              <p className="mt-2 max-w-md text-paper/70">
                Message us your details and we&apos;ll take it from there.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex-none rounded-full bg-paper px-6 py-3.5 text-base font-medium text-brand-ink transition-colors hover:bg-paper-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink"
            >
              Get Started
            </button>
          </div>
        </section>
      </main>

      <Footer />

      <GetStartedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

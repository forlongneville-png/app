"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-50 to-white px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-sm text-zinc-500 shadow-sm">
          <Sparkles className="h-4 w-4 text-zinc-400" />
          business.zadoc.online
        </div>

        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
          Hello, World 👋
        </h1>

        <p className="max-w-md text-lg text-zinc-600">
          Welcome to the business.zadoc.online site of the company.
        </p>
      </motion.div>
    </div>
  );
}

// FILE: src/components/landing/Footer.tsx
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-line bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="zadoc business" width={24} height={24} className="h-6 w-6" />
          <span className="text-sm font-medium text-brand-ink">zadoc business</span>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
          <a
            href="https://wa.me/237683473299"
            className="transition-colors hover:text-brand-ink"
          >
            WhatsApp
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-brand-ink">
            How it works
          </a>
          <a href="#top" className="transition-colors hover:text-brand-ink">
            Back to top
          </a>
        </nav>

        <p className="text-sm text-ink-soft">
          © {year} zadoc business. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

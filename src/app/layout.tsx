import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "business.zadoc.online — Websites for businesses & schools",
  description:
    "We build and host professional websites for businesses and schools, live in under a minute, connected to your own domain.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased ${geist.variable}`}>
      <body className="min-h-full flex flex-col font-sans bg-paper text-brand-ink">
        {children}
      </body>
    </html>
  );
}

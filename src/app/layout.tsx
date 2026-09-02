import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "business.zadoc.online",
  description: "Welcome to business.zadoc.online site of the company.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

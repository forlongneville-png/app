// FILE: src/components/landing/HowItWorks.tsx
import { MessageCircle, LayoutTemplate, Link2, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: MessageCircle,
    title: "Tell us what you need",
    description:
      "Send us a message on WhatsApp with a few details about your business or school — no forms, no jargon.",
  },
  {
    icon: LayoutTemplate,
    title: "We build your site",
    description:
      "Our team puts together a clean, professional site for you and has it live in under a minute.",
  },
  {
    icon: Link2,
    title: "Connect your domain",
    description:
      "We link it to your own domain name, so visitors find you at an address that's truly yours.",
  },
  {
    icon: Rocket,
    title: "You're online",
    description:
      "Your site is hosted and kept running by us. No maintenance, no hosting bills to chase.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-line bg-paper-dim/60">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
        <div className="max-w-lg">
          <h2 className="text-3xl font-medium tracking-tight text-brand-ink sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Four steps, and most of the work is on us.
          </p>
        </div>

        <ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-brand-ink text-paper">
                <step.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-medium text-brand-ink">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// FILE: src/components/landing/GetStartedModal.tsx
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { buildWhatsAppLink, type InquiryFormData } from "@/lib/whatsapp";

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = InquiryFormData;

type FormErrors = Partial<Record<"name" | "businessName" | "phone", string>>;

const initialForm: FormState = {
  name: "",
  businessName: "",
  phone: "",
  email: "",
  message: "",
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Remember what had focus, move focus in, and restore it on close.
  useEffect(() => {
    if (isOpen) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      const raf = requestAnimationFrame(() => firstFieldRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
    previouslyFocused.current?.focus();
  }, [isOpen]);

  // Escape to close.
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // Simple manual focus trap: keep Tab cycling inside the dialog.
  const handleKeyDownTrap = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    ).filter((el) => el.offsetParent !== null);

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey) {
      if (active === first || !dialogRef.current.contains(active)) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (active === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }, []);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key in errors) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }

  function validate(): boolean {
    const nextErrors: FormErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your full name.";
    if (!form.businessName.trim())
      nextErrors.businessName = "Please enter your business or school name.";
    if (!form.phone.trim()) nextErrors.phone = "Please enter a phone number.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    const link = buildWhatsAppLink(form);
    window.location.href = link;
  }

  // Clear the form only after the close animation finishes, so the
  // fields don't visibly reset while the dialog is still animating out.
  function handleExitComplete() {
    setForm(initialForm);
    setErrors({});
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/40 px-4 py-8 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="get-started-title"
            className="relative w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-[0_24px_60px_-20px_rgba(13,33,23,0.35)] sm:p-8"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={handleKeyDownTrap}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full p-1.5 text-ink-soft transition-colors hover:bg-paper-dim hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <h2 id="get-started-title" className="text-xl font-medium text-brand-ink">
              Let&apos;s get your site started
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              Share a few details and we&apos;ll continue the conversation on WhatsApp.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <Field
                id="name"
                label="Full name"
                required
                error={errors.name}
                inputRef={firstFieldRef}
                value={form.name}
                onChange={(value) => updateField("name", value)}
              />
              <Field
                id="businessName"
                label="Business / school name"
                required
                error={errors.businessName}
                value={form.businessName}
                onChange={(value) => updateField("businessName", value)}
              />
              <Field
                id="phone"
                label="Phone number"
                type="tel"
                required
                error={errors.phone}
                value={form.phone}
                onChange={(value) => updateField("phone", value)}
              />
              <Field
                id="email"
                label="Email (optional)"
                type="email"
                value={form.email ?? ""}
                onChange={(value) => updateField("email", value)}
              />

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-brand-ink"
                >
                  What do you need? (optional)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  className="w-full resize-none rounded-lg border border-line bg-paper px-3.5 py-2.5 text-sm text-brand-ink placeholder:text-ink-soft/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                  placeholder="e.g. a simple site for my restaurant with a menu page"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-brand-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
              >
                Next
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  error?: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  error,
  inputRef,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-brand-ink">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-lg border bg-paper px-3.5 py-2.5 text-sm text-brand-ink placeholder:text-ink-soft/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
          error ? "border-red-400" : "border-line"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

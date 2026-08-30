"use client";

import React from "react";
import Link from "next/link";
import { ValidationError, useForm } from "@formspree/react";
import { MessageSquare, Send } from "lucide-react";

function normalizeFormspreeId(value: string) {
  const trimmed = value.trim();
  const match = trimmed.match(/formspree\.io\/f\/([a-zA-Z0-9]+)/);
  return match?.[1] ?? trimmed;
}

export default function ContactForm() {
  const formId = normalizeFormspreeId(
    process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? "",
  );
  const [state, handleSubmit, reset] = useForm(formId);

  return (
    <div className="w-full">
      {!formId && (
        <div className="mb-6 p-3.5 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]">
          <p className="text-xs text-[var(--text-secondary)]">
            Set <code>NEXT_PUBLIC_FORMSPREE_FORM_ID</code> in{" "}
            <code>.env.local</code> to activate live submission.
          </p>
        </div>
      )}

      {state.succeeded ? (
        <div className="space-y-4 py-8 text-center">
          <div className="p-6 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] max-w-md mx-auto">
            <h3 className="font-bold text-lg text-[var(--text-primary)]">
              Message Sent!
            </h3>
            <p className="mt-1 text-xs text-[var(--text-secondary)] leading-relaxed">
              Thanks for reaching out. Our team will get back to you within 24
              hours.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="rounded-xl bg-[#0f172a] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-[#1e293b] transition-colors cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Full Name & Email Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-[11px] font-bold tracking-wider text-[var(--text-primary)] uppercase"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                required
                className="w-full h-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:border-[var(--text-primary)] outline-none transition-colors"
              />
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
                className="text-xs text-red-500"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-[11px] font-bold tracking-wider text-[var(--text-primary)] uppercase"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your email"
                required
                className="w-full h-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:border-[var(--text-primary)] outline-none transition-colors"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-xs text-red-500"
              />
            </div>
          </div>

          {/* Row 2: Company / Project */}
          <div className="space-y-1.5">
            <label
              htmlFor="company"
              className="text-[11px] font-bold tracking-wider text-[var(--text-primary)] uppercase"
            >
              Company / Project
            </label>
            <input
              id="company"
              name="company"
              type="text"
              placeholder="ACME Corp"
              className="w-full h-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:border-[var(--text-primary)] outline-none transition-colors"
            />
            <ValidationError
              prefix="Company"
              field="company"
              errors={state.errors}
              className="text-xs text-red-500"
            />
          </div>

          {/* Row 3: Your Message */}
          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="text-[11px] font-bold tracking-wider text-[var(--text-primary)] uppercase"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about your project..."
              required
              className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/50 focus:border-[var(--text-primary)] outline-none transition-colors resize-none"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="text-xs text-red-500"
            />
          </div>

          <ValidationError
            errors={state.errors}
            className="text-xs text-red-500"
          />

          {/* Send Message Button */}
          <button
            type="submit"
            disabled={state.submitting || !formId}
            className="w-full rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white py-4 font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            <span>{state.submitting ? "Sending..." : "Send Message"}</span>
          </button>

          {/* Bottom Quick Chat Option */}
          <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <MessageSquare className="h-4 w-4 text-[var(--text-secondary)] shrink-0" />
            <span>
              Prefer a quick chat?{" "}
              <Link
                href="mailto:rafkhan9323@gmail.com"
                className="font-bold tracking-wider uppercase text-[var(--text-primary)] hover:underline"
              >
                Schedule a call
              </Link>
            </span>
          </div>
        </form>
      )}
    </div>
  );
}

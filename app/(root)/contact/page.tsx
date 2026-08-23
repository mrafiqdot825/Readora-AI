import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with Readora",
  description:
    "Have questions about Readora? Need help with your account? Contact our support team and we'll respond within 24 hours.",
  keywords: [
    "contact readora",
    "customer support",
    "help center",
    "get in touch",
    "support",
  ],
  openGraph: {
    title: "Contact Readora - We're Here to Help",
    description:
      "Get in touch with our team for questions, support, or feedback about your AI voice learning experience.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="wrapper container pt-24 pb-16">
      <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-10 mb-8">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-md border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)] mb-4">
              Get in Touch
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[var(--text-primary)]">
              Let&apos;s Start a Conversation
            </h1>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
              Have questions about Readora? Need help with your account? Or just
              want to share feedback? Drop us a message and we&apos;ll respond
              as soon as possible.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <article className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4">
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-brand)]">
                24h
              </p>
              <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                Response Promise
              </p>
            </article>
            <article className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4">
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-brand)]">
                7d
              </p>
              <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                Weekly Support
              </p>
            </article>
            <article className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4">
              <p className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-brand)]">
                1:1
              </p>
              <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                Human Assistance
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
        <article className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5">
          <h2 className="text-base font-semibold text-[var(--text-primary)] font-serif mb-2">
            Email Support
          </h2>
          <p className="text-sm text-[var(--color-brand)] font-medium">
            rafkhan9323@gmail.com
          </p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Best for account questions and product feedback.
          </p>
        </article>

        <article className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5">
          <h2 className="text-base font-semibold text-[var(--text-primary)] font-serif mb-2">
            Location
          </h2>
          <p className="text-sm text-[var(--text-primary)]">
            KPITB Tower, 2nd Floor, Chamkani Peshawer, Pakistan
          </p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            For partnerships and in-person collaboration requests.
          </p>
        </article>

        <article className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5">
          <h2 className="text-base font-semibold text-[var(--text-primary)] font-serif mb-2">
            Response Time
          </h2>
          <p className="text-sm text-[var(--text-primary)]">Within 24 hours</p>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            Most replies arrive the same business day.
          </p>
        </article>
      </section>

      <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8">
        <div className="mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)]">
            Message Us
          </span>
          <h2 className="mt-1 text-xl sm:text-2xl font-bold font-serif text-[var(--text-primary)]">
            Tell us what you need
          </h2>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { PricingTable } from "@clerk/nextjs";
import { CheckCircle2, Clock3, FileText, Sparkles, Waves } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing & Plans - Choose Your Subscription",
  description:
    "Upgrade to unlock more documents, longer voice sessions, and advanced AI features. Choose the perfect plan for your learning needs.",
  keywords: [
    "readora pricing",
    "subscription plans",
    "premium features",
    "AI voice plans",
    "document limits",
  ],
  openGraph: {
    title: "Readora Pricing - Unlock Premium Features",
    description:
      "Choose the perfect plan for your AI-powered learning journey. More documents, longer sessions, advanced features.",
    type: "website",
  },
};

export default function SubscriptionsPage() {
  const highlights = [
    {
      title: "More Documents",
      description:
        "Scale from occasional uploads to an always-on personal library.",
      icon: FileText,
    },
    {
      title: "Longer Voice Sessions",
      description:
        "Stay in flow with extended conversations and fewer interruptions.",
      icon: Waves,
    },
    {
      title: "Faster Study Loops",
      description:
        "Use AI summaries and Q&A to reduce revision time each week.",
      icon: Clock3,
    },
  ];

  const included = [
    "Secure document storage",
    "Context-aware answers",
    "Cross-device access",
    "Simple upgrade or cancel anytime",
  ];

  return (
    <main className="container wrapper relative py-10">
      <section className="mb-10 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-6 py-8 sm:px-10">
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] px-3 py-1 text-xs font-semibold tracking-wider text-[var(--color-brand)] uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Pricing Plans
          </span>
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            Choose Your Plan, Study Smarter
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            Start free and upgrade when you are ready for deeper document
            analysis, longer voice sessions, and faster learning loops.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4"
              >
                <Icon className="mb-2 h-4 w-4 text-[var(--color-brand)]" />
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 sm:p-8">
        <div className="mb-6 flex flex-col gap-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)]">
              Included in every plan
            </p>
            <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
              Flexible billing, secure document management, and cross-device
              access.
            </p>
          </div>
          <ul className="grid gap-1.5 text-xs text-[var(--text-primary)] sm:text-right">
            {included.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 sm:justify-end"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-[#7c9a82]" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-[var(--border-subtle)] bg-white p-3 sm:p-5">
          <PricingTable />
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          {
            title: "No Hidden Fees",
            description: "What you see in pricing is exactly what you pay.",
          },
          {
            title: "Built for Learners",
            description:
              "Designed for students, researchers, and professionals working with long-form documents.",
          },
          {
            title: "Cancel Any Time",
            description:
              "You stay in control. Upgrade, downgrade, or cancel without friction.",
          },
        ].map((note) => (
          <article
            key={note.title}
            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4"
          >
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              {note.title}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
              {note.description}
            </p>
          </article>
        ))}
      </section>

      <p className="mt-6 text-center text-xs text-[var(--text-secondary)]">
        Need help deciding? Reach us via the contact page and we will suggest
        the right plan for your usage.
      </p>
    </main>
  );
}

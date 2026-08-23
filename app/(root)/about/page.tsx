import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - Voice AI Document Learning Platform",
  description:
    "Learn how Readora revolutionizes document interaction with AI-powered voice conversations. Discover our mission to transform passive reading into active learning.",
  keywords: [
    "about readora",
    "AI document platform",
    "voice learning",
    "document AI technology",
    "interactive reading",
  ],
  openGraph: {
    title: "About Readora - Transform How You Learn",
    description:
      "Readora combines voice AI with intelligent content understanding to help you learn faster and understand better.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Readora - Transform How You Learn",
    description:
      "Readora combines voice AI with intelligent content understanding to help you learn faster and understand better.",
  },
};

const highlights = [
  {
    title: "Intelligent Document Processing",
    icon: "01",
    description:
      "Upload PDFs, books, and research papers effortlessly. Our advanced AI parses, segments, and indexes your content with precision, making every piece of information instantly searchable and retrievable.",
    stats: "99.9% accuracy",
  },
  {
    title: "Voice-First Interaction",
    icon: "02",
    description:
      "Engage in natural, real-time AI voice conversations with your documents. Ask questions, explore concepts, and gain deeper understanding through intuitive spoken dialogue.",
    stats: "Real-time responses",
  },
  {
    title: "Smart Learning & Discovery",
    icon: "03",
    description:
      "Your personal AI-powered library that learns from you. Search, organize, and connect ideas across all your documents in one seamless, intelligent workspace.",
    stats: "Unlimited storage",
  },
];

const features = [
  {
    step: "01",
    title: "Upload Your Documents",
    description:
      "Drop any PDF, book, or research paper. We handle the rest with intelligent processing and indexing.",
  },
  {
    step: "02",
    title: "AI Analyzes & Organizes",
    description:
      "Our AI breaks down content into meaningful segments, creating a searchable knowledge base.",
  },
  {
    step: "03",
    title: "Start Talking",
    description:
      "Have natural voice conversations about your content. Ask questions, explore ideas, and learn faster.",
  },
];

const benefits = [
  "10x faster information retrieval",
  "Enhanced comprehension and retention",
  "Natural language understanding",
  "Centralized knowledge management",
  "Private and secure by default",
  "Access anywhere, anytime",
];

const metrics = [
  { label: "Documents Processed", value: "2M+" },
  { label: "Avg. Response Time", value: "<1s" },
  { label: "Learner Satisfaction", value: "98%" },
];

export default function AboutPage() {
  return (
    <main className="wrapper container pt-24 pb-16">
      <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-10 mb-10">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <span className="inline-flex rounded-md border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)] mb-4">
              About Readora
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[var(--text-primary)]">
              Talk. Learn. Understand.
            </h1>

            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
              Readora transforms static documents into interactive voice
              conversations, helping you learn faster, understand deeper, and
              engage with ideas in the most natural way possible.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1 text-xs font-medium text-[var(--text-primary)]">
                AI-Powered
              </span>
              <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1 text-xs font-medium text-[var(--text-primary)]">
                Voice-First
              </span>
              <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1 text-xs font-medium text-[var(--text-primary)]">
                Grounded Citations
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {metrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4"
              >
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[var(--color-brand)]">
                  {metric.value}
                </p>
                <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                  {metric.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="mb-10">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)]">
            Core Advantages
          </p>
          <h2 className="text-2xl font-serif font-bold text-[var(--text-primary)] mt-1">
            Why readers choose Readora
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex rounded-md border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] px-2.5 py-0.5 text-xs font-mono font-bold text-[var(--color-brand)] mb-3">
                  {item.icon}
                </span>
                <h3 className="font-serif text-lg font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-xs font-medium text-[var(--color-brand)]">
                {item.stats}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Simple Workflow */}
      <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 mb-10">
        <div className="max-w-xl mb-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)]">
            Simple Workflow
          </p>
          <h2 className="text-2xl font-serif font-bold text-[var(--text-primary)] mt-1">
            From upload to insight in minutes
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.step}
              className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-brand)] text-xs font-bold text-white mb-3">
                {feature.step}
              </span>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Mission & Benefits */}
      <section className="grid gap-6 md:grid-cols-2 mb-10">
        <article className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)]">
            Built For Focus
          </p>
          <h2 className="text-xl font-serif font-bold text-[var(--text-primary)] mt-1 mb-4">
            Everything you need in one workspace
          </h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-2 text-xs text-[var(--text-primary)]"
              >
                <span className="text-[#7c9a82] font-bold">✓</span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-serif font-bold text-[var(--text-primary)] mb-3">
              Our Mission
            </h2>
            <p className="text-xs leading-relaxed text-[var(--text-secondary)] mb-3">
              We&apos;re on a mission to transform how people interact with
              documents. By combining advanced voice AI with intelligent content
              understanding, Readora empowers students, professionals,
              researchers, and curious minds to move beyond passive reading.
            </p>
            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
              Learning should be conversational, discovery should be effortless,
              and knowledge should be accessible to everyone.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
            <Link
              href="/books/new"
              className="inline-flex rounded-lg bg-[var(--color-brand)] px-4 py-2 text-xs font-medium text-white hover:opacity-90 transition-opacity duration-150"
            >
              Get Started Now &rarr;
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}

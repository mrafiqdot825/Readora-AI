"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useSubscription } from "@/hooks/userSubscription";
import { getUserBookCount } from "@/lib/actions/book.actions";
import {
  ArrowRight,
  AudioLines,
  BookOpen,
  Brain,
  FileText,
  Headphones,
  Mic,
  Upload,
  Volume2,
  Zap,
} from "lucide-react";

type PersonaKey = "ahmed" | "sarah" | "umar";

const DEMO_PREVIEWS: Record<
  PersonaKey,
  {
    personaName: string;
    personaStyle: string;
    bookTitle: string;
    bookAuthor: string;
    userQuery: string;
    aiResponse: string;
    citation: string;
    tags: string[];
  }
> = {
  ahmed: {
    personaName: "Ahmed Ali Khan",
    personaStyle: "Gentle & Reflective",
    bookTitle: "The Forty Rules of Love",
    bookAuthor: "Elif Shafak",
    userQuery: "What does Shams explain about the nature of true patience?",
    aiResponse:
      "Patience is not sitting and waiting passively; it means looking at the thorn and seeing the rose, looking at the night and seeing the dawn.",
    citation: "Chapter 3 • Page 42",
    tags: ["Philosophy", "Mysticism", "Character Study"],
  },
  sarah: {
    personaName: "Sarah Ali Shah",
    personaStyle: "Analytical & Engaging",
    bookTitle: "Thinking, Fast and Slow",
    bookAuthor: "Daniel Kahneman",
    userQuery: "How does System 1 differ from System 2 in cognitive bias?",
    aiResponse:
      "System 1 operates automatically and quickly, with little or no effort. System 2 allocates conscious attention to effortful mental computations and critical validation.",
    citation: "Chapter 1 • Page 21",
    tags: ["Cognitive Science", "Behavioral Economics"],
  },
  umar: {
    personaName: "Umar Khan",
    personaStyle: "Concise & Academic",
    bookTitle: "Attention Is All You Need",
    bookAuthor: "Vaswani et al.",
    userQuery: "What is the primary breakthrough of self-attention mechanisms?",
    aiResponse:
      "Self-attention allows the model to connect all positions with a constant number of sequentially executed operations, capturing dependencies regardless of their distance.",
    citation: "Section 3.2 • Page 4",
    tags: ["Machine Learning", "Transformers", "NLP"],
  },
};

const SAMPLE_PROMPTS = [
  "Summarize key arguments",
  "Explain chapter in simple terms",
  "Find quotes & page citations",
  "Test my comprehension",
];

const HeroSection = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { limits } = useSubscription();
  const [isChecking, setIsChecking] = useState(false);
  const [activePersona, setActivePersona] = useState<PersonaKey>("ahmed");

  const handleUploadClick = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    setIsChecking(true);
    try {
      const count = await getUserBookCount();
      if (count >= limits.maxBooks) {
        router.push("/subscriptions");
      } else {
        router.push("/books/new");
      }
    } finally {
      setIsChecking(false);
    }
  };

  const preview = DEMO_PREVIEWS[activePersona];

  return (
    <section className="relative w-full min-h-[calc(100svh-4rem)] flex flex-col justify-between pt-20 pb-8 sm:pt-24 sm:pb-10">
      <div className="wrapper container flex-1 flex flex-col justify-center my-auto">
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Eyebrow Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="inline-flex items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)]">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] animate-pulse" />
                Voice-First Reading Platform
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-card)] px-2.5 py-1 text-xs text-[var(--text-secondary)] font-medium">
                <Zap className="h-3 w-3 text-[var(--color-brand)]" />
                Sub-Second Voice Synthesis
              </span>
            </div>

            {/* Master Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12]">
              Transform Your Documents Into Live Voice Dialogue
            </h1>

            {/* Value Proposition Description */}
            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl">
              Upload books, PDFs, research papers, or study notes. Ask questions
              naturally using real-time voice, explore concepts interactively,
              and receive precise explanations grounded directly in your pages.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleUploadClick}
                disabled={isChecking}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-brand)] px-6 py-3.5 text-sm font-medium text-white transition-opacity duration-150 hover:opacity-90 active:opacity-100 disabled:opacity-50 cursor-pointer"
              >
                {isChecking ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Checking...
                  </span>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    <span>Upload Document</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <a
                href="#library"
                className="inline-flex items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-5 py-3.5 text-sm font-medium text-[var(--text-primary)] transition-colors duration-150 hover:bg-[var(--bg-secondary)] cursor-pointer"
              >
                Explore Shelf
              </a>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-transparent px-4 py-3.5 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
              >
                How It Works
              </Link>
            </div>

            {/* Prompt Suggestions Strip */}
            <div className="mt-6 flex flex-col gap-2 w-full">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Try asking questions like:
              </span>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_PROMPTS.map((prompt) => (
                  <span
                    key={prompt}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-card)] px-2.5 py-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--color-brand)] transition-colors duration-150 cursor-default"
                  >
                    <Mic className="h-3 w-3 text-[var(--color-brand)] opacity-70" />
                    &ldquo;{prompt}&rdquo;
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics and Trust Badges */}
            <div className="mt-8 pt-5 border-t border-[var(--border-subtle)] grid grid-cols-3 gap-4 w-full max-w-lg">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  3 Personas
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Expressive voices
                </p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  100% Grounded
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Exact page citations
                </p>
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  &lt; 60s
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Document indexing
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Voice Session Showcase */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-5 sm:p-6 flex flex-col gap-4">
              {/* Persona Selector Tabs */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                  Active Persona
                </span>
                <div className="inline-flex rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-0.5">
                  {(["ahmed", "sarah", "umar"] as PersonaKey[]).map((key) => {
                    const isSelected = activePersona === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setActivePersona(key)}
                        className={`px-2.5 py-1 rounded text-xs font-medium capitalize transition-colors duration-150 cursor-pointer ${
                          isSelected
                            ? "bg-[var(--color-brand)] text-white"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                      >
                        {key}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Document Header */}
              <div className="flex items-center justify-between rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] text-[var(--color-brand)]">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[var(--text-primary)]">
                      {preview.bookTitle}
                    </p>
                    <p className="text-[11px] text-[var(--text-secondary)]">
                      {preview.bookAuthor}
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-2.5 py-1 text-[10px] font-medium text-[var(--color-brand)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7c9a82] animate-pulse" />
                  Live Voice Active
                </div>
              </div>

              {/* User Dialogue Turn */}
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                  You (Spoken)
                </span>
                <div className="rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] px-3.5 py-2 text-xs text-[var(--text-primary)] max-w-[90%]">
                  {preview.userQuery}
                </div>
              </div>

              {/* AI Dialogue Turn */}
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-brand)] font-semibold">
                    {preview.personaName} ({preview.personaStyle})
                  </span>
                  <AudioLines className="h-3 w-3 text-[var(--color-brand)] animate-pulse" />
                </div>
                <div className="rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] px-3.5 py-2.5 text-xs text-[var(--text-primary)] leading-relaxed">
                  {preview.aiResponse}
                </div>
              </div>

              {/* Grounded Citation & Audio Player Simulation */}
              <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-2.5 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-[var(--color-brand)] font-medium">
                  <FileText className="h-3.5 w-3.5" />
                  <span>{preview.citation}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Volume2 className="h-3.5 w-3.5 text-[var(--color-brand)]" />
                  <span className="font-mono text-[10px]">01:24 / 03:50</span>
                </div>
              </div>

              {/* Topic Tags */}
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] text-[var(--text-secondary)] font-medium mr-1">
                  Indexed Topics:
                </span>
                {preview.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] px-1.5 py-0.5 text-[10px] text-[var(--text-secondary)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Architecture / Feature Pillars */}
        <div className="mt-10 pt-8 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4">
            <div className="flex items-center gap-2.5 mb-1.5">
              <Upload className="h-4 w-4 text-[var(--color-brand)]" />
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                1. Upload &amp; Index
              </h2>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Drop PDFs, books, or notes. Readora breaks content into semantic
              knowledge segments instantly.
            </p>
          </div>

          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4">
            <div className="flex items-center gap-2.5 mb-1.5">
              <Headphones className="h-4 w-4 text-[var(--color-brand)]" />
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                2. Spoken Dialogue
              </h2>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Tap the microphone to speak naturally. Ask questions, interrupt,
              or dive deeper on any point.
            </p>
          </div>

          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4">
            <div className="flex items-center gap-2.5 mb-1.5">
              <Brain className="h-4 w-4 text-[var(--color-brand)]" />
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                3. Grounded Accuracy
              </h2>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Zero hallucinations. Every voice answer links directly to verified
              page citations from your material.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

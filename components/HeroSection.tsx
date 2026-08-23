"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useSubscription } from "@/hooks/userSubscription";
import { getUserBookCount } from "@/lib/actions/book.actions";
import { ArrowRight, AudioLines, BookOpen, Brain, Upload } from "lucide-react";

const HeroSection = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { limits } = useSubscription();
  const [isChecking, setIsChecking] = useState(false);

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

  const features = [
    {
      icon: AudioLines,
      title: "Voice Dialogue",
      description:
        "Ask questions naturally using voice and receive real-time answers.",
    },
    {
      icon: BookOpen,
      title: "Any Document",
      description:
        "Upload PDFs, research papers, or study notes into your personal shelf.",
    },
    {
      icon: Brain,
      title: "Grounded Q&A",
      description:
        "Every response is context-aware and strictly referenced from your material.",
    },
  ];

  return (
    <section className="mb-12 pt-6 sm:pt-10">
      <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-10 lg:p-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)] mb-5">
            Voice-First Reading Platform
          </div>

          <h1 className="font-serif text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl leading-tight">
            Transform Your Documents Into Live Voice Dialogue
          </h1>

          <p className="mt-4 text-base text-[var(--text-secondary)] leading-relaxed sm:text-lg max-w-2xl">
            Upload your books, papers, or notes and interact through natural
            spoken conversation. Instant answers grounded directly in your
            pages.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleUploadClick}
              disabled={isChecking}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-brand)] px-5 py-3 text-sm font-medium text-white transition-opacity duration-150 hover:opacity-90 active:opacity-100 disabled:opacity-50 cursor-pointer"
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

            <button
              type="button"
              onClick={() => router.push("/about")}
              className="inline-flex items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-transparent px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors duration-150 hover:bg-[var(--bg-secondary)] cursor-pointer"
            >
              How It Works
            </button>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <Icon className="h-4 w-4 text-[var(--color-brand)]" />
                  <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                    {feature.title}
                  </h2>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

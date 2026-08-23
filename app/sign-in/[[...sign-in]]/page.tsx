import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowLeft, BookOpen, Mic, Sparkles } from "lucide-react";
import { CLERK_AUTH_APPEARANCE_OVERRIDE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sign In - Access Your Documents",
  description:
    "Sign in to Readora to access your personal AI-powered document library and continue your voice learning journey.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4 py-12">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <section className="hidden lg:flex rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 xl:p-10 flex-col justify-between">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to home
            </Link>

            <div className="mt-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                <span className="text-xs font-semibold text-[var(--color-brand)] tracking-wider uppercase">
                  Welcome back
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-serif font-bold text-[var(--text-primary)] leading-tight">
                Continue Your Voice Learning Journey
              </h1>

              <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed max-w-md">
                Sign in to open your document library, resume saved sessions,
                and keep learning through natural conversations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-8 border-t border-[var(--border-subtle)]">
            <div className="rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-3.5">
              <BookOpen className="w-4 h-4 text-[var(--color-brand)]" />
              <p className="mt-1.5 text-xs font-semibold text-[var(--text-primary)]">
                Access your library
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                Revisit PDFs and documents from any device.
              </p>
            </div>

            <div className="rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-3.5">
              <Mic className="w-4 h-4 text-[var(--color-brand)]" />
              <p className="mt-1.5 text-xs font-semibold text-[var(--text-primary)]">
                Keep conversations going
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                Continue voice Q&A exactly where you left off.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full max-w-md mx-auto lg:max-w-none rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 flex flex-col justify-center">
          <div className="mb-4 lg:hidden">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to home
            </Link>
          </div>

          <div className="w-full overflow-x-hidden">
            <SignIn
              routing="path"
              path="/sign-in"
              appearance={{
                elements: {
                  ...CLERK_AUTH_APPEARANCE_OVERRIDE,
                  rootBox: `${CLERK_AUTH_APPEARANCE_OVERRIDE.rootBox} w-full`,
                  card: `${CLERK_AUTH_APPEARANCE_OVERRIDE.card} !w-full`,
                },
              }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

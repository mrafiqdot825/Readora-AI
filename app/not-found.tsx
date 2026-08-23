"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg-primary)]">
      <div className="max-w-md w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-tertiary)]">
            <BookOpen className="h-7 w-7 text-[var(--color-brand)]" />
          </div>
        </div>

        <p className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-brand)] mb-1">
          404 Error
        </p>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)] mb-2">
          Document Not Found
        </h1>

        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
          The page or document you&apos;re looking for doesn&apos;t exist or has
          been moved.
        </p>

        <div className="flex justify-center">
          <Button
            asChild
            className="rounded-lg bg-[var(--color-brand)] px-5 py-2 text-xs font-medium text-white hover:opacity-90 transition-opacity duration-150"
          >
            <Link href="/" className="inline-flex items-center gap-2">
              <Home className="w-3.5 h-3.5" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application Error:", {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
    });
  }, [error]);

  const isDevelopment = process.env.NODE_ENV === "development";
  const isAuthError =
    error.message.includes("auth") || error.message.includes("unauthorized");
  const isNetworkError =
    error.message.includes("fetch") || error.message.includes("network");
  const isDBError =
    error.message.includes("database") || error.message.includes("mongodb");

  const getErrorMessage = () => {
    if (isAuthError) {
      return "You don't have permission to access this page. Please sign in again.";
    }
    if (isNetworkError) {
      return "We're having trouble connecting to our servers. Please check your internet connection.";
    }
    if (isDBError) {
      return "We're experiencing database issues. Our team has been notified.";
    }
    return "Something went wrong while processing your request.";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg-primary)]">
      <div className="max-w-md w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-tertiary)]">
            <AlertCircle className="h-6 w-6 text-[var(--color-brand)]" />
          </div>
        </div>

        <p className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-brand)] mb-1">
          Error Encountered
        </p>

        <h1 className="text-2xl font-serif font-bold text-[var(--text-primary)] mb-2">
          Unable to Load Content
        </h1>

        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
          {getErrorMessage()}
        </p>

        {isDevelopment && error.message && (
          <div className="mt-4 p-3 bg-[var(--bg-primary)] rounded-md border border-[var(--border-subtle)] text-left mb-6">
            <p className="text-xs font-mono text-red-500 break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2.5 justify-center items-center">
          <Button
            onClick={reset}
            className="rounded-lg bg-[var(--color-brand)] px-4 py-2 text-xs font-medium text-white hover:opacity-90 transition-opacity duration-150 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Try Again
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors duration-150"
          >
            <Link href="/" className="inline-flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

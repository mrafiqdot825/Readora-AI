import React from "react";
import { Loader2 } from "lucide-react";

type RouteLoadingProps = {
  title?: string;
  description?: string;
};

const RouteLoading = ({
  title = "Curating Your Library",
  description = "Shelving your latest books, indexing summaries, and setting up a smooth reading experience.",
}: RouteLoadingProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--bg-primary)] px-5">
      <div className="w-full max-w-md rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 text-center">
        <div className="flex justify-center mb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-tertiary)]">
            <Loader2 className="h-6 w-6 animate-spin text-[var(--color-brand)]" />
          </div>
        </div>

        <h2 className="font-serif text-2xl font-semibold text-[var(--text-primary)]">
          {title}
        </h2>

        <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default RouteLoading;

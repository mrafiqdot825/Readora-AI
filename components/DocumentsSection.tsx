import React from "react";
import BookCard from "@/components/BookCard";
import Search from "@/components/Search";
import { getAllBooks } from "@/lib/actions/book.actions";

type DocumentItem = {
  _id: string;
  title: string;
  author: string;
  coverURL: string;
  slug: string;
};

interface DocumentsSectionProps {
  query?: string;
}

const DocumentsSection = async ({ query }: DocumentsSectionProps) => {
  // Intentionally not auth-scoped: this section is public and shows all uploads.
  const bookResults = await getAllBooks(query);
  const books: DocumentItem[] = bookResults.success
    ? ((bookResults.data ?? []) as DocumentItem[])
    : [];

  return (
    <section id="library" className="mb-12 scroll-mt-24">
      <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-md border border-[var(--border-subtle)] px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)] bg-[var(--bg-tertiary)] mb-2">
              Document Library
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)]">
              Your Knowledge Shelf
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)] leading-relaxed">
              Explore every uploaded document in one place, then resume your AI
              voice conversations instantly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] border border-[var(--border-subtle)] bg-[var(--bg-primary)]">
              {books.length} {books.length === 1 ? "document" : "documents"}
            </span>
            <Search />
          </div>
        </div>

        {books.length === 0 ? (
          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-10 text-center max-w-md mx-auto">
            <h3 className="text-base font-serif font-semibold text-[var(--text-primary)]">
              Your shelf is waiting for its first document
            </h3>
            <p className="mt-1.5 text-xs text-[var(--text-secondary)] leading-relaxed">
              Upload a PDF, report, or book to start building your personal
              document library.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {books.map((book) => (
              <BookCard
                key={book._id}
                title={book.title}
                author={book.author}
                coverURL={book.coverURL}
                slug={book.slug}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DocumentsSection;

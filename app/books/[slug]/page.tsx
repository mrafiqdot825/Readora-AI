import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getBookBySlug } from "@/lib/actions/book.actions";
import VapiControls from "@/components/Vapicontrols";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBookBySlug(slug);

  if (!result.success || !result.data) {
    return {
      title: "Book Not Found",
      description: "The requested book could not be found.",
    };
  }

  const book = result.data;

  return {
    title: `${book.title} by ${book.author}`,
    description: `Read and interact with "${book.title}" by ${book.author} using AI-powered voice conversations. Ask questions, explore concepts, and learn through natural dialogue.`,
    keywords: [
      book.title,
      book.author,
      "interactive reading",
      "voice AI book",
      "AI reading assistant",
    ],
    openGraph: {
      title: `${book.title} - Interactive Voice Reading`,
      description: `Experience "${book.title}" by ${book.author} with AI-powered voice conversations`,
      type: "article",
      images: book.coverURL ? [{ url: book.coverURL, alt: book.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${book.title} by ${book.author}`,
      description: `Read and interact with "${book.title}" using AI voice technology`,
      images: book.coverURL ? [book.coverURL] : [],
    },
  };
}

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { slug } = await params;
  const result = await getBookBySlug(slug);

  if (!result.success || !result.data) {
    redirect("/");
  }

  const book = result.data;

  return (
    <div className="w-full min-h-screen bg-[var(--bg-primary)]">
      <div className="pt-20 sm:pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center justify-center px-3 py-1 bg-[var(--bg-card)] rounded-md border border-[var(--border-subtle)] mb-3">
              <span className="text-xs font-medium text-[var(--color-brand)]">
                Interactive Reading Experience
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[var(--text-primary)] mb-1">
              {book.title}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              by{" "}
              <span className="font-semibold text-[var(--text-primary)]">
                {book.author}
              </span>
            </p>
          </div>

          {/* Main Card Container */}
          <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--border-subtle)] overflow-hidden mb-6 p-5 sm:p-8">
            <VapiControls book={book} />
          </div>

          {/* Info Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[var(--bg-card)] p-3.5 rounded-lg border border-[var(--border-subtle)]">
              <p className="text-xs text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)] mr-1">
                  Tip:
                </span>
                Click the microphone to start your interactive voice
                conversation.
              </p>
            </div>
            <div className="bg-[var(--bg-tertiary)] p-3.5 rounded-lg border border-[var(--border-subtle)]">
              <p className="text-xs text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)] mr-1">
                  Voice Assistant:
                </span>
                Ask questions, explore concepts, and receive citations in real
                time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

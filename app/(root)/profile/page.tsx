import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import BookCard from "@/components/BookCard";
import { getUserBooks } from "@/lib/actions/book.actions";
import { getUserVoiceSessions } from "@/lib/actions/session.action";
import { getUserPlan } from "@/lib/subscription.server";
import { getCurrentBillingPeriodStart } from "@/lib/subscription-constants";

export const metadata: Metadata = {
  title: "My Profile | Readora",
  description: "View your uploaded books, voice sessions, and account details.",
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const PLAN_BADGE: Record<string, { label: string; className: string }> = {
  free: {
    label: "Free",
    className:
      "bg-[var(--bg-tertiary)] text-[var(--color-brand)] border border-[var(--border-subtle)]",
  },
  standard: {
    label: "Standard",
    className:
      "bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-subtle)]",
  },
  pro: {
    label: "Pro",
    className:
      "bg-[var(--bg-tertiary)] text-[var(--color-brand)] border border-[var(--color-brand)]",
  },
};

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const [user, booksResult, sessionsResult, plan] = await Promise.all([
    currentUser(),
    getUserBooks(userId),
    getUserVoiceSessions(userId),
    getUserPlan(),
  ]);

  const books = booksResult.success ? (booksResult.data ?? []) : [];
  const sessions = sessionsResult.data ?? [];
  const planLocked = sessionsResult.planLocked;

  // Stats
  const totalSegments = books.reduce(
    (sum: number, b: (typeof books)[number]) => sum + (b.totalSegments ?? 0),
    0,
  );

  const billingStart = getCurrentBillingPeriodStart();
  const monthSessions = sessions.filter(
    (s) => new Date(s.startedAt) >= billingStart,
  ).length;

  const badge = PLAN_BADGE[plan] ?? PLAN_BADGE.free;
  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Reader";
  const email = user?.emailAddresses?.[0]?.emailAddress ?? "";

  const statCards = [
    { label: "Books Uploaded", value: books.length },
    { label: "Total Segments", value: totalSegments.toLocaleString() },
    { label: "Sessions This Month", value: monthSessions },
    { label: "Current Plan", value: badge.label },
  ];

  return (
    <main className="wrapper container pt-24 pb-16">
      {/* Profile Header */}
      <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] overflow-hidden text-xl font-serif font-bold text-[var(--color-brand)] shrink-0">
              {user?.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={fullName}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              ) : (
                fullName.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-primary)]">
                  {fullName}
                </h1>
                <span
                  className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}
                >
                  {badge.label}
                </span>
              </div>
              {email && (
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  {email}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {plan !== "pro" && (
              <Link
                href="/subscriptions"
                className="rounded-md bg-[var(--color-brand)] px-3.5 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity duration-150"
              >
                Upgrade Plan
              </Link>
            )}

            <SignOutButton redirectUrl="/">
              <button
                type="button"
                className="cursor-pointer rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3.5 py-1.5 text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors duration-150"
              >
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-4 text-center"
          >
            <p className="text-2xl font-serif font-bold text-[var(--color-brand)]">
              {value}
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
              {label}
            </p>
          </div>
        ))}
      </section>

      {/* Uploaded Documents Section */}
      <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8 mb-8">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-[var(--border-subtle)]">
          <div>
            <h2 className="text-lg font-serif font-bold text-[var(--text-primary)]">
              My Documents
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Documents currently saved and indexed
            </p>
          </div>
          <Link
            href="/books/new"
            className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors duration-150"
          >
            + Upload New
          </Link>
        </div>

        {books.length === 0 ? (
          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-8 text-center">
            <p className="text-sm font-medium text-[var(--text-primary)]">
              You haven&apos;t uploaded any documents yet.
            </p>
            <Link
              href="/books/new"
              className="mt-4 inline-flex rounded-md bg-[var(--color-brand)] px-4 py-2 text-xs font-medium text-white hover:opacity-90 transition-opacity duration-150"
            >
              Upload Your First Document
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {books.map((book) => (
              <div key={book._id} className="flex flex-col gap-1">
                <BookCard
                  title={book.title}
                  author={book.author}
                  coverURL={book.coverURL}
                  slug={book.slug}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Voice Sessions */}
      <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 sm:p-8">
        <div className="mb-6 pb-3 border-b border-[var(--border-subtle)]">
          <h2 className="text-lg font-serif font-bold text-[var(--text-primary)]">
            Voice Sessions
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Recent voice interactions and durations
          </p>
        </div>

        {planLocked ? (
          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-8 text-center">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
              Session History Unavailable
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mb-4 max-w-sm mx-auto">
              Session history is available on the Standard and Pro plans.
              Upgrade to track your reading sessions.
            </p>
            <Link
              href="/subscriptions"
              className="rounded-md bg-[var(--color-brand)] px-4 py-2 text-xs font-medium text-white hover:opacity-90 transition-opacity duration-150"
            >
              View Plans
            </Link>
          </div>
        ) : sessions.length === 0 ? (
          <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-8 text-center">
            <p className="text-xs text-[var(--text-secondary)]">
              No voice sessions yet. Open a document and click the microphone to
              talk!
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-secondary)]">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Document</th>
                  <th className="py-2.5 px-3 font-semibold text-right">
                    Duration
                  </th>
                  <th className="py-2.5 px-3 font-semibold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-primary)]">
                {sessions.map((session) => (
                  <tr
                    key={session._id}
                    className="hover:bg-[var(--bg-primary)] transition-colors duration-150"
                  >
                    <td className="py-2.5 px-3 font-medium">
                      <Link
                        href={
                          session.bookSlug ? `/books/${session.bookSlug}` : "#"
                        }
                        className="hover:text-[var(--color-brand)]"
                      >
                        {session.bookTitle}
                      </Link>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-right text-[var(--color-brand)]">
                      {formatDuration(session.durationSeconds)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-[var(--text-secondary)]">
                      {formatDate(session.startedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

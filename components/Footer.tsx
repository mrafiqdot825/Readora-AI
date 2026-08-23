"use client";

import Link from "next/link";
import Image from "next/image";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "/subscriptions" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Support", href: "/contact" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]">
      <div className="wrapper py-10 md:py-12">
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 md:p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-6 lg:col-span-5">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <div className="rounded-md border border-[var(--border-subtle)] bg-white p-1">
                  <Image
                    src="/assets/logo.png"
                    alt="Readora"
                    width={30}
                    height={20}
                  />
                </div>
                <span className="logo-text">Readora</span>
              </Link>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
                A calm reading studio where your documents become expressive
                conversations through AI voices.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] px-2.5 py-1 text-xs font-medium text-[var(--color-brand)]">
                  Voice-first
                </span>
                <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] px-2.5 py-1 text-xs font-medium text-[var(--color-brand)]">
                  Summaries
                </span>
                <span className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] px-2.5 py-1 text-xs font-medium text-[var(--color-brand)]">
                  Study Flow
                </span>
              </div>
            </div>

            <div className="md:col-span-3 lg:col-span-3">
              <h3 className="font-serif text-base font-semibold text-[var(--text-primary)]">
                Explore
              </h3>
              <nav className="mt-3 flex flex-col gap-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="w-fit text-sm font-medium text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--color-brand)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="md:col-span-3 lg:col-span-2">
              <h3 className="font-serif text-base font-semibold text-[var(--text-primary)]">
                Legal
              </h3>
              <nav className="mt-3 flex flex-col gap-2">
                {legalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="w-fit text-sm font-medium text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--color-brand)]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="md:col-span-12 lg:col-span-2">
              <h3 className="font-serif text-base font-semibold text-[var(--text-primary)]">
                Get Started
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                Turn your next PDF into a guided audio experience.
              </p>
              <Link
                href="/books/new"
                className="mt-4 inline-flex rounded-lg bg-[var(--color-brand)] px-4 py-2 text-sm font-medium text-white transition-opacity duration-150 hover:opacity-90"
              >
                Upload Now
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-[var(--border-subtle)] pt-5">
            <p className="text-center text-xs text-[var(--text-secondary)]">
              &copy; {currentYear} Readora. Crafted for readers, students, and
              storytellers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

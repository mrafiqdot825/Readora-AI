"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/subscriptions" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const pathName = usePathname();
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isLinkActive = (href: string) =>
    pathName === href || (href !== "/" && pathName.startsWith(href));

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[var(--bg-primary)]/95 backdrop-blur-xs border-b border-[var(--border-subtle)]">
      <div className="wrapper">
        <div className="navbar-height flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={closeMobileMenu}
          >
            <div className="rounded-md border border-[var(--border-subtle)] bg-white p-1">
              <Image
                src="/assets/logo.png"
                alt="Readora-AI"
                width={30}
                height={20}
              />
            </div>
            <span className="logo-text">Readora</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map(({ label, href }) => {
              const isActive = isLinkActive(href);

              return (
                <Link
                  href={href}
                  key={label}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "text-[var(--color-brand)] font-semibold border-b border-[var(--color-brand)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <SignedOut>
              <Link
                href="/sign-in"
                className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3.5 py-1.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors duration-150"
              >
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-2.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-card)] px-2.5 py-1">
                <UserButton />
                {user?.firstName && (
                  <Link
                    href="/profile"
                    className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--color-brand)] transition-colors duration-150"
                  >
                    {user.firstName}
                  </Link>
                )}
              </div>
            </SignedIn>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <SignedOut>
              <Link
                href="/sign-in"
                className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-1 text-sm font-medium text-[var(--text-primary)]"
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

            <button
              onClick={toggleMobileMenu}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)] transition-colors duration-150 hover:bg-[var(--bg-secondary)] cursor-pointer"
              aria-label="Toggle menu"
              aria-controls="mobile-nav"
            >
              <span className="sr-only">Open main menu</span>
              <span
                className={cn(
                  "block h-0.5 w-4 rounded-full bg-current transition-transform duration-200",
                  isMobileMenuOpen
                    ? "translate-y-0.5 rotate-45"
                    : "-translate-y-1",
                )}
              />
              <span
                className={cn(
                  "absolute block h-0.5 w-4 rounded-full bg-current transition-opacity duration-200",
                  isMobileMenuOpen ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-4 rounded-full bg-current transition-transform duration-200",
                  isMobileMenuOpen
                    ? "-translate-y-0.5 -rotate-45"
                    : "translate-y-1",
                )}
              />
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          className={cn(
            "lg:hidden overflow-hidden border-t border-[var(--border-subtle)] transition-all duration-200",
            isMobileMenuOpen
              ? "max-h-80 opacity-100 py-3"
              : "max-h-0 opacity-0 py-0",
          )}
        >
          <nav className="flex flex-col gap-1">
            {navItems.map(({ label, href }) => {
              const isActive = isLinkActive(href);

              return (
                <Link
                  href={href}
                  key={label}
                  onClick={closeMobileMenu}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "text-[var(--color-brand)] font-semibold bg-[var(--bg-tertiary)]"
                      : "text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]",
                  )}
                >
                  {label}
                </Link>
              );
            })}
            <SignedIn>
              {user?.firstName && (
                <Link
                  href="/profile"
                  onClick={closeMobileMenu}
                  className="rounded-md px-3 py-2 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                >
                  {user.firstName}&apos;s Profile
                </Link>
              )}
            </SignedIn>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

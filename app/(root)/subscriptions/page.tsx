"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { ArrowRight, Check, Sparkles } from "lucide-react";

export default function SubscriptionsPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handlePlanClick = () => {
    if (!isSignedIn) {
      router.push("/sign-in");
    } else {
      router.push("/books/new");
    }
  };

  const isAnnual = billingCycle === "annual";

  return (
    <main className="container wrapper relative py-12 sm:py-16">
      {/* Top Header */}
      <div className="mx-auto max-w-3xl text-center mb-8">
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] px-3 py-1 text-xs font-semibold tracking-wider text-[var(--color-brand)] uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Pricing Plans
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
          Choose the plan that fits your study, research, or team workflow.
          Scale up whenever you need deeper voice sessions and more capacity.
        </p>
      </div>

      {/* Billing Switcher Toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center gap-1 p-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xs">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
              !isAnnual
                ? "bg-[#0f172a] text-white shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Monthly billing
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
              isAnnual
                ? "bg-[#0f172a] text-white shadow-xs"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <span>Annual billing</span>
            <span className="inline-block rounded-full bg-[#2563eb] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
              SAVE 25%
            </span>
          </button>
        </div>
      </div>

      {/* 3 Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch mb-16">
        {/* Card 1: Starter */}
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 sm:p-10 flex flex-col justify-between transition-all duration-200 hover:border-[var(--text-primary)]/30">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              Starter
            </h2>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)]">
                $0
              </span>
              <span className="text-xs text-[var(--text-secondary)] font-medium">
                Forever
              </span>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed min-h-[40px]">
              For individuals or small teams just getting started with voice
              reading.
            </p>

            <button
              onClick={handlePlanClick}
              className="mt-6 w-full rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white py-3.5 font-semibold text-xs sm:text-sm transition-colors text-center cursor-pointer"
            >
              Get Started Free
            </button>
            <p className="mt-2 text-center text-[11px] text-[var(--text-secondary)]">
              Free forever
            </p>

            <div className="border-t border-[var(--border-subtle)] my-6" />

            <div>
              <p className="text-xs font-bold text-[var(--text-primary)] mb-4">
                Starter plan includes:
              </p>
              <ul className="space-y-3">
                {[
                  "Up to 3 team members & documents",
                  "2 active production projects",
                  "Basic workflow automation & indexing",
                  "Real-time team collaboration",
                  "7-day version history & cloud backup",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]"
                  >
                    <Check className="h-4 w-4 text-[#2563eb] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Card 2: Pro (Highlighted with Blue Cloud/Mesh Gradient) */}
        <div className="rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden text-white shadow-xl shadow-blue-500/20 bg-gradient-to-b from-[#3b82f6] via-[#2563eb] to-[#1d4ed8] border border-blue-400/40">
          {/* Subtle Ambient Glow Background Orbs */}
          <div className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-white/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-blue-300/20 blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Pro</h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/40 bg-white/20 text-white backdrop-blur-xs">
                MOST POPULAR
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-white">
                ${isAnnual ? "21" : "29"}
              </span>
              <span className="text-xs text-white/80 font-medium">
                / user / month
              </span>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-white/90 leading-relaxed min-h-[40px]">
              For growing teams who need high performance, longer voice calls,
              and scale.
            </p>

            <button
              onClick={handlePlanClick}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 text-white py-3.5 font-semibold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start 14-Day Free Trial</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-2 text-center text-[11px] text-white/75">
              {isAnnual ? "Billed annually" : "Billed monthly"}
            </p>

            <div className="border-t border-white/25 my-6" />

            <div>
              <p className="text-xs font-bold text-white mb-4">
                All Starter features, plus:
              </p>
              <ul className="space-y-3">
                {[
                  "Unlimited team members & seats",
                  "Unlimited high-speed projects & books",
                  "Priority AI model & voice synthesis",
                  "Advanced telemetry & custom filters",
                  "30-day version history & instant playback",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-xs text-white/95"
                  >
                    <Check className="h-4 w-4 text-white shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Card 3: Business */}
        <div className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-8 sm:p-10 flex flex-col justify-between transition-all duration-200 hover:border-[var(--text-primary)]/30">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                Business
              </h2>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
                ENTERPRISE GRADE
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)]">
                ${isAnnual ? "59" : "79"}
              </span>
              <span className="text-xs text-[var(--text-secondary)] font-medium">
                / user / month
              </span>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed min-h-[40px]">
              For companies requiring dedicated security, custom voice cloning,
              and controls.
            </p>

            <button
              onClick={handlePlanClick}
              className="mt-6 w-full rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-white py-3.5 font-semibold text-xs sm:text-sm transition-colors text-center cursor-pointer"
            >
              Start Free Trial
            </button>
            <p className="mt-2 text-center text-[11px] text-[var(--text-secondary)]">
              {isAnnual ? "Billed annually" : "Billed monthly"}
            </p>

            <div className="border-t border-[var(--border-subtle)] my-6" />

            <div>
              <p className="text-xs font-bold text-[var(--text-primary)] mb-4">
                All Pro features, plus:
              </p>
              <ul className="space-y-3">
                {[
                  "Custom roles & granular permissions",
                  "Enterprise admin security dashboard",
                  "Dedicated custom automated workflows",
                  "Advanced analytics & audit reporting",
                  "180-day compliance version history",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]"
                  >
                    <Check className="h-4 w-4 text-[#2563eb] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Assistance */}
      <p className="mt-8 text-center text-xs text-[var(--text-secondary)]">
        Need custom licensing or academic campus pricing?{" "}
        <Link
          href="/contact"
          className="text-[var(--color-brand)] font-semibold hover:underline"
        >
          Contact our team
        </Link>
      </p>
    </main>
  );
}

"use client";

import { ValidationError, useForm } from "@formspree/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function normalizeFormspreeId(value: string) {
  const trimmed = value.trim();
  const match = trimmed.match(/formspree\.io\/f\/([a-zA-Z0-9]+)/);
  return match?.[1] ?? trimmed;
}

export default function ContactForm() {
  const formId = normalizeFormspreeId(
    process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? "",
  );
  const [state, handleSubmit, reset] = useForm(formId);

  return (
    <div className="w-full">
      {!formId && (
        <div className="mb-6 p-4 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]">
          <p className="text-xs text-[var(--text-secondary)]">
            Set <code>NEXT_PUBLIC_FORMSPREE_FORM_ID</code> in{" "}
            <code>.env.local</code> to activate this contact form.
          </p>
        </div>
      )}

      {state.succeeded ? (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-subtle)]">
            <p className="text-sm font-medium text-[var(--color-brand)]">
              Thanks for contacting us. Your message has been sent.
            </p>
          </div>
          <Button
            type="button"
            onClick={reset}
            className="rounded-lg bg-[var(--color-brand)] text-white hover:opacity-90 transition-opacity duration-150"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-xs font-medium text-[var(--text-primary)]"
              >
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                required
                className="h-10 rounded-lg bg-[var(--bg-primary)] border-[var(--border-subtle)] text-sm"
              />
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
                className="text-xs text-red-500"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-xs font-medium text-[var(--text-primary)]"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                className="h-10 rounded-lg bg-[var(--bg-primary)] border-[var(--border-subtle)] text-sm"
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="text-xs text-red-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="subject"
              className="text-xs font-medium text-[var(--text-primary)]"
            >
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="What's this about?"
              required
              className="h-10 rounded-lg bg-[var(--bg-primary)] border-[var(--border-subtle)] text-sm"
            />
            <ValidationError
              prefix="Subject"
              field="subject"
              errors={state.errors}
              className="text-xs text-red-500"
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="message"
              className="text-xs font-medium text-[var(--text-primary)]"
            >
              Message
            </Label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us more..."
              required
              className="w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)] transition-colors outline-none resize-none focus-visible:border-[var(--color-brand)] placeholder:text-[var(--text-secondary)] disabled:opacity-50"
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="text-xs text-red-500"
            />
          </div>

          <ValidationError
            errors={state.errors}
            className="text-xs text-red-500"
          />

          <Button
            type="submit"
            disabled={state.submitting || !formId}
            className="rounded-lg bg-[var(--color-brand)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity duration-150 cursor-pointer"
          >
            {state.submitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      )}
    </div>
  );
}

"use client";

// Footer — newsletter signup.

import { useState, useTransition, type FormEvent } from "react";
import { Check, LoaderCircle } from "lucide-react";

import { subscribe } from "@/actions/newsletter";
import { CONTROL, Field } from "@/components/forms/Field";
import { Button } from "@/components/ui/button";
import { MESSAGES, validateNewsletter } from "@/lib/forms";
import type { FormCopy, FormField } from "@/types";

type Props = {
  copy: FormCopy & { email: FormField };
};

export function NewsletterForm({ copy }: Props) {
  const [pending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const values = { email: email.trim() };
    const errors = validateNewsletter(values);

    if (errors.email) {
      setError(errors.email);
      return;
    }

    setError(null);

    startTransition(async () => {
      const result = await subscribe(values);

      if (result.success) {
        setDone(true);
        return;
      }

      setError(result.error ?? MESSAGES.generic);
    });
  }

  // Inline confirmation, never a toast. The form is gone because there is
  // nothing left to do with it.
  if (done) {
    return (
      <p
        className="flex items-center gap-2 text-[14px] text-fg"
        // The form was replaced under the reader; announce what took its place.
        role="status"
      >
        <Check className="h-4 w-4 shrink-0 text-success" aria-hidden="true" />
        {copy.successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full lg:w-auto">
      {/* items-end puts the button on the input's baseline without a magic
          margin to clear the label. The error sits below the whole row, so a
          failing field never pushes the button out of alignment. */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="w-full sm:w-[280px]">
          <Field id="newsletter-email" label={copy.email.label}>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={copy.email.placeholder}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={pending}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "newsletter-email-error" : undefined}
              className={CONTROL}
            />
          </Field>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="w-full shrink-0 sm:w-auto"
        >
          {pending ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              {copy.pendingLabel}
            </>
          ) : (
            copy.submitLabel
          )}
        </Button>
      </div>

      {error ? (
        <p id="newsletter-email-error" className="mt-2 text-[13px] text-danger">
          {error}
        </p>
      ) : null}
    </form>
  );
}

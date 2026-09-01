"use client";

// Pricing page — contact form.

import { useState, useTransition, type FormEvent } from "react";
import { Check, LoaderCircle } from "lucide-react";

import { sendContactMessage } from "@/actions/contact";
import { CONTROL, Field } from "@/components/forms/Field";
import { Button } from "@/components/ui/button";
import { MESSAGES, validateContact } from "@/lib/forms";
import type { FormCopy, FormField } from "@/types";

type Props = {
  copy: FormCopy & {
    name: FormField;
    email: FormField;
    company: FormField;
    message: FormField;
  };
};

const EMPTY = { name: "", email: "", company: "", message: "" };

export function ContactForm({ copy }: Props) {
  const [pending, startTransition] = useTransition();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function update(field: keyof typeof EMPTY, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Every failing field at once. Fixing one error only to be shown the
    // next is the worst version of this interaction.
    const found = validateContact(values);

    if (Object.keys(found).length > 0) {
      setErrors(found);
      setFormError(null);
      return;
    }

    setErrors({});
    setFormError(null);

    startTransition(async () => {
      const result = await sendContactMessage(values);

      if (result.success) {
        setDone(true);
        return;
      }

      setFormError(result.error ?? MESSAGES.generic);
    });
  }

  if (done) {
    return (
      <div
        role="status"
        className="mx-auto mt-12 flex max-w-reading flex-col items-center gap-3 rounded-lg border border-border bg-surface p-8 text-center"
      >
        <Check className="h-6 w-6 text-success" aria-hidden="true" />
        <p className="text-[15px] text-fg">{copy.successMessage}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto mt-12 flex w-full max-w-reading flex-col gap-5"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field id="contact-name" label={copy.name.label} error={errors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={copy.name.placeholder}
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            disabled={pending}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={CONTROL}
          />
        </Field>

        <Field id="contact-email" label={copy.email.label} error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={copy.email.placeholder}
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            disabled={pending}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={CONTROL}
          />
        </Field>
      </div>

      <Field
        id="contact-company"
        label={copy.company.label}
        error={errors.company}
      >
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          placeholder={copy.company.placeholder}
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
          disabled={pending}
          className={CONTROL}
        />
      </Field>

      <Field
        id="contact-message"
        label={copy.message.label}
        error={errors.message}
      >
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder={copy.message.placeholder}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          disabled={pending}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          className={`${CONTROL} resize-y`}
        />
      </Field>

      {/* A failure from the action rather than from a field, so it belongs
          with the button and not under an input. */}
      {formError ? (
        <p role="alert" className="text-[13px] text-danger">
          {formError}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="w-full sm:w-auto sm:self-start"
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
    </form>
  );
}

/**
 * Form messages and the client-side validators.
 *
 * **No zod in this file, deliberately.** It is imported by the two form
 * components, which means anything here ships to the browser on every page —
 * the newsletter form lives in the footer. Importing zod here put 79 KiB of
 * it, 86% unused, into the bundle for every visitor, to check an email and a
 * couple of string lengths. Measured in feature 21.
 *
 * The server still validates with zod, in `actions/`, against these same
 * message constants. That is the half that has to be trustworthy: the checks
 * below are a courtesy to the person typing, and are not relied on.
 */

/** Every Server Action in this project resolves to this shape. */
export type ActionResult = {
  success: boolean;
  error?: string;
};

/**
 * Shared by the client validators and the server schemas, so a message and
 * the rule it describes cannot drift into disagreeing.
 */
export const MESSAGES = {
  email: "Enter a valid email address.",
  name: "Tell us your name.",
  message: "A sentence or two helps us give you a useful answer.",
  generic: "Something went wrong. Please try again.",
} as const;

export const MIN_MESSAGE_LENGTH = 20;

/**
 * Deliberately permissive. A regex cannot decide whether an address exists,
 * and every one that tries rejects somebody's real address — the send is what
 * actually validates it. This rules out the typos worth catching before a
 * round trip.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL.test(value.trim());
}

export type NewsletterValues = { email: string };

export type ContactValues = {
  name: string;
  email: string;
  company: string;
  message: string;
};

/** Field name to message. An empty object means the form is ready to send. */
export function validateNewsletter(
  values: NewsletterValues,
): Record<string, string> {
  return isValidEmail(values.email) ? {} : { email: MESSAGES.email };
}

export function validateContact(values: ContactValues): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!values.name.trim()) errors.name = MESSAGES.name;
  if (!isValidEmail(values.email)) errors.email = MESSAGES.email;
  if (values.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = MESSAGES.message;
  }

  return errors;
}

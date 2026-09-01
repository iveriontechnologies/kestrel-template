"use server";

import { z } from "zod";

import { MESSAGES, type ActionResult } from "@/lib/forms";

// The schema lives here rather than in lib/forms.ts so that zod stays out of
// the client bundle. It shares MESSAGES with the client validator, so the
// wording cannot drift.
const schema = z.object({
  email: z.email(MESSAGES.email),
});

export async function subscribe(input: unknown): Promise<ActionResult> {
  // Validated again here even though the client already did. The client check
  // is a courtesy to the person typing; this one is the actual guard.
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    const issue = parsed.error.issues[0];

    return {
      success: false,
      // A field-level message is copy written for a person. A structural one
      // ("expected object, received undefined") only happens when something
      // calls this action with the wrong shape, and is not fit to show anyone.
      error: issue && issue.path.length > 0 ? issue.message : MESSAGES.generic,
    };
  }

  try {
    // TODO (buyer): connect your email provider here.
    // Example: await resend.contacts.create({ email: parsed.data.email });
    //
    // The delay below exists only so the pending state is visible in the demo.
    // Delete it along with this comment when you wire up a real provider.
    await new Promise((resolve) => setTimeout(resolve, 700));

    return { success: true };
  } catch (error) {
    console.error("[actions/newsletter]", error);
    return { success: false, error: MESSAGES.generic };
  }
}

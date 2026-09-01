"use server";

import { z } from "zod";

import { MESSAGES, MIN_MESSAGE_LENGTH, type ActionResult } from "@/lib/forms";

// Kept here, not in lib/forms.ts, so zod stays out of the client bundle.
const schema = z.object({
  name: z.string().trim().min(1, MESSAGES.name),
  email: z.email(MESSAGES.email),
  company: z.string().trim().optional(),
  message: z.string().trim().min(MIN_MESSAGE_LENGTH, MESSAGES.message),
});

export async function sendContactMessage(
  input: unknown,
): Promise<ActionResult> {
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    const issue = parsed.error.issues[0];

    return {
      success: false,
      error: issue && issue.path.length > 0 ? issue.message : MESSAGES.generic,
    };
  }

  try {
    // TODO (buyer): deliver this message somewhere you will actually read it.
    // Example: await resend.emails.send({
    //   to: "sales@yourcompany.com",
    //   from: "site@yourcompany.com",
    //   subject: `New enquiry from ${parsed.data.name}`,
    //   text: parsed.data.message,
    // });
    //
    // The delay below exists only so the pending state is visible in the demo.
    // Delete it along with this comment when you wire up real delivery.
    await new Promise((resolve) => setTimeout(resolve, 900));

    return { success: true };
  } catch (error) {
    console.error("[actions/contact]", error);
    return { success: false, error: MESSAGES.generic };
  }
}

// Lightweight, typed GTM dataLayer helpers.

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

type LeadConversion = {
  email: string;
  /** E.164, ex.: +5511999998888 */
  phone: string;
};

/**
 * Pushes the `lead-convertido` conversion event (with email/phone) to GTM's
 * dataLayer and resolves once GTM has fired the tags bound to it — via
 * `eventCallback` — or after a safety timeout, whichever comes first.
 *
 * Awaiting this before a full-page redirect prevents the classic race where
 * the document unloads before the conversion pixels/beacons are sent.
 */
export function trackLeadConverted({
  email,
  phone,
}: LeadConversion): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    window.dataLayer = window.dataLayer ?? [];

    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    window.dataLayer.push({
      event: "lead-convertido",
      email,
      phone,
      form_id: "medictec-lp001",
      // GTM invokes this after every tag bound to the event has fired.
      eventCallback: done,
      eventTimeout: 1500,
    });

    // Hard fallback: if GTM is blocked/absent, eventCallback never runs.
    window.setTimeout(done, 1600);
  });
}

export {};

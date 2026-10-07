"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (command: string, name: string, parameters?: Record<string, string>) => void;
  }
}

export default function AnalyticsEvents() {
  useEffect(() => {
    function trackClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[data-analytics-event]");
      const eventName = link?.dataset.analyticsEvent;
      if (eventName !== "contact_click" && eventName !== "resume_download") return;
      window.gtag?.("event", eventName, {
        // Report the action without email addresses, link URLs, or query values.
        page_location: `${window.location.origin}${window.location.pathname}`,
      });
    }
    document.addEventListener("click", trackClick);
    return () => document.removeEventListener("click", trackClick);
  }, []);

  return null;
}

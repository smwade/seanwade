import Script from "next/script";

export default function AnalyticsEvents() {
  return <Script src="/analytics.js" strategy="afterInteractive" />;
}

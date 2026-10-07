import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Sean Wade - Research Scientist & Engineer",
    template: "%s | Sean Wade",
  },
  description:
    "Sean Wade is a research scientist and engineer working on LLM evaluation, generative AI, and health machine learning. Explore his experience, writing, and tools.",
  keywords: [
    "Sean Wade",
    "Research Engineer",
    "Machine Learning",
    "LLM",
    "Deep Learning",
    "PyTorch",
    "JAX",
    "Computer Vision",
  ],
  authors: [{ name: "Sean Wade" }],
  openGraph: {
    title: "Sean Wade - Research Scientist & Engineer",
    description:
      "Sean Wade is a research scientist and engineer working on LLM evaluation, generative AI, and health machine learning. Explore his experience, writing, and tools.",
    images: [{ url: "https://seanwade.com/images/sean-wade.jpeg" }],
    url: "https://seanwade.com",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sean Wade - Research Scientist & Engineer",
    description:
      "Sean Wade is a research scientist and engineer working on LLM evaluation, generative AI, and health machine learning. Explore his experience, writing, and tools.",
    images: ["https://seanwade.com/images/sean-wade.jpeg"],
  },
  metadataBase: new URL("https://seanwade.com"),
  icons: {
    icon: "/images/pulshealth-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#0a0a0a" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-82TGJ7K92V"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-82TGJ7K92V');
          `}
        </Script>
      </head>
      <body>
        <Navbar />
        <AnalyticsEvents />
        <main className="mx-auto max-w-[800px] px-8 pt-8 pb-16 max-sm:px-5">
          {children}
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sean Wade",
              jobTitle: "Research Scientist and Engineer",
              email: "hello@seanwade.com",
              url: "https://seanwade.com",
              sameAs: [
                "https://www.linkedin.com/in/sean-wade-linked/",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}

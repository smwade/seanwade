import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Sean Wade - Research Engineer",
    template: "%s | Sean Wade",
  },
  description:
    "Sean Wade's personal portfolio website showcasing his experience as a Research Engineer in machine learning, deep learning, and computer vision.",
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
    title: "Sean Wade - Research Engineer",
    description:
      "Sean Wade's personal portfolio website showcasing his experience as a Research Engineer in machine learning, deep learning, and computer vision.",
    images: [{ url: "https://seanwade.com/images/sean-wade.jpeg" }],
    url: "https://seanwade.com",
    type: "website",
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
        <main className="mx-auto max-w-[800px] px-8 pt-[6rem] pb-16 max-sm:px-5">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sean Wade",
              jobTitle: "Research Engineer",
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

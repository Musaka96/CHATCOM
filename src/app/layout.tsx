import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chathelper.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "C.H.A.T. — Chat Tool for OnlyFans & Fansly Chatters | Sell PPVs Faster",
    template: "%s | C.H.A.T.",
  },
  description:
    "C.H.A.T. is an always-on-top chat helper for OnlyFans and Fansly chatters: instant message scripts, live PPV & tip tracking, one-click shift reports. The chatting script tool built for solo chatters, not agencies.",
  keywords: [
    "chat tool",
    "chatter tool",
    "OnlyFans chat tool",
    "Fansly chat tool",
    "chat helper",
    "chatting script tool",
    "chatter script app",
    "OnlyFans chatter software",
    "PPV tracker",
    "chatter sales tracker",
    "live chat snippet tool",
    "OnlyFans management tool for chatters",
  ],
  authors: [{ name: "C.H.A.T." }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "C.H.A.T. — Chat Tool for OnlyFans & Fansly Chatters",
    description:
      "Instant snippet paste, live PPV & tip tracking, one-click shift reports. The chat helper script tool built for solo chatters.",
    url: siteUrl,
    siteName: "C.H.A.T.",
    images: ["/images/mascot.png"],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "C.H.A.T. — Chat Tool for OnlyFans & Fansly Chatters",
    description:
      "Instant snippet paste, live PPV & tip tracking, one-click shift reports.",
    images: ["/images/mascot.png"],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-grid">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "C.H.A.T.",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Windows",
              description:
                "An always-on-top chat helper tool for OnlyFans and Fansly chatters: instant message scripts, live PPV and tip tracking, one-click shift reports.",
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

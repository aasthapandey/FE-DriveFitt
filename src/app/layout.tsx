import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Drive FITT - Premium Fitness & Sports Club | Gurugram",
    template: "%s | Drive FITT Premium Club",
  },
  description:
    "Join Drive FITT, Gurugram's premier fitness & sports club. Experience state-of-the-art facilities for cricket, fitness, recovery, and more.",
  keywords: [
    "fitness club",
    "sports club",
    "cricket coaching",
    "gym",
    "recovery",
    "gurugram",
    "premium fitness",
    "personal training",
  ],
  authors: [{ name: "Drive FITT Premium Club" }],
  creator: "Drive FITT Premium Club",
  publisher: "Drive FITT Premium Club",
  metadataBase: new URL("https://drivefitt.club"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://drivefitt.club",
    siteName: "Drive FITT Premium Club",
    title: "Drive FITT - Premium Fitness & Sports Club | Gurugram",
    description:
      "Join Drive FITT, Gurugram's premier fitness & sports club. Experience state-of-the-art facilities for cricket, fitness, recovery, and more.",
    images: [
      {
        url: "https://da8nru77lsio9.cloudfront.net/images/homec/hero.webp",
        width: 1200,
        height: 630,
        alt: "Drive FITT Premium Sports Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Drive_Fitt",
    creator: "@Drive_Fitt",
    title: "Drive FITT - Premium Fitness & Sports Club | Gurugram",
    description:
      "Join Drive FITT, Gurugram's premier fitness & sports club. Experience state-of-the-art facilities for cricket, fitness, recovery, and more.",
    images: ["https://da8nru77lsio9.cloudfront.net/images/homec/hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE", // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://drivefitt.club" />
        <meta name="geo.region" content="IN-HR" />
        <meta name="geo.placename" content="Gurugram" />
        <meta name="geo.position" content="28.4595;77.0266" />
        <meta name="ICBM" content="28.4595, 77.0266" />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <div className="max-w-[1980px] mx-auto bg-[#0E1119]">{children}</div>
      </body>
    </html>
  );
}

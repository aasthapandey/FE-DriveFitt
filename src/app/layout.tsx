import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DriveFITT - Premium Fitness & Sports Club | Gurugram",
  description:
    "Join DriveFITT, Gurugram's premier fitness & sports club. Experience state-of-the-art facilities for cricket, fitness, recovery, and more.",
  keywords:
    "fitness club, cricket training, sports club, Gurugram, premium fitness, recovery center, gym, elite gym, luxury, premium gym",
  authors: [{ name: "Garvit Tyagi" }],
  creator: "Garvit Tyagi",
  publisher: "Garvit Tyagi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "DriveFITT - Premium Fitness & Sports Club",
    description:
      "Join DriveFITT, Gurugram's premier fitness & sports club. Experience state-of-the-art facilities for cricket, fitness, recovery, and more.",
    url: "https://drivefitt.club",
    siteName: "DriveFITT",
    images: [
      {
        url: "https://drivefitt.club/og-image.svg",
        width: 1200,
        height: 630,
        alt: "DriveFITT Premium Sports Club",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DriveFITT - Premium Fitness & Sports Club",
    description:
      "Join DriveFITT, Gurugram's premier fitness & sports club. Experience state-of-the-art facilities for cricket, fitness, recovery, and more.",
    images: ["https://drivefitt.club/twitter-image.svg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <div className="max-w-[1980px] mx-auto bg-[#0E1119]">{children}</div>
      </body>
    </html>
  );
}

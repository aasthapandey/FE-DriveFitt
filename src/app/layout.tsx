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

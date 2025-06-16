import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@component/components/Navbar";

export const metadata: Metadata = {
  title: "DriveFit",
  description: "DriveFit - Your Ultimate Driving Companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}

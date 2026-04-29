import type { Metadata } from "next";
import { Geist, Geist_Mono, Oi, Ultra, Play, DM_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oi = Oi({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-oi",
});

const ultra = Ultra({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-ultra",
});

const play = Play({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-play",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "MoodiUM",
  description: "A Mood Tracker made in NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${oi.variable}
          ${ultra.variable}
          ${play.variable}
          ${dmSans.variable}
        `}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

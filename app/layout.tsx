'use client'

import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import { ThemeProvider } from "./providers/ThemeProvider";
import { TranslationProvider } from "@/lib/i18n/TranslationContext";
import { ParallaxProvider } from 'react-scroll-parallax';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <ThemeProvider>
          <TranslationProvider>
            <ParallaxProvider>
              {children}
              <CustomCursor />
            </ParallaxProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

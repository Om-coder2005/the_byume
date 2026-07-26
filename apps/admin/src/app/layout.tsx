import type { Metadata } from "next";
import { Nunito, Fredoka, Gochi_Hand, Space_Mono } from "next/font/google";
import "./globals.css";
import React from "react";


const nunito = Nunito({
  weight: ["400", "600", "700"],
  variable: "--font-sans",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  weight: ["400", "600"],
  variable: "--font-serif",
  subsets: ["latin"],
});

const gochi = Gochi_Hand({
  weight: "400",
  variable: "--font-note",
  subsets: ["latin"],
});

const space = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Byume Admin Studio",
  description: "Manage your craft studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
        <script src="https://code.iconify.design/iconify-icon/2.0.0/iconify-icon.min.js" async></script>
      </head>
      <body
        className={`${nunito.variable} ${fredoka.variable} ${gochi.variable} ${space.variable} antialiased text-[var(--color-foreground)]`}
      >
        {children}
      </body>
    </html>
  );
}

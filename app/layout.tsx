import type { Metadata } from "next";
import { SWRegister } from "./sw-register";
import { PushNotificationManager } from "@ui/push-notification-manager";
import { PushNotificationInstallPrompt } from "@ui/push-notification-install-prompt";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyWings UNF",
  description: "MyWings Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SWRegister />
        <PushNotificationManager />
        <PushNotificationInstallPrompt />
        {children}
      </body>
    </html>
  );
}

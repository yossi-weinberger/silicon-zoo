import type { Metadata } from "next";
import { Manrope, DM_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { PostHogProvider } from "@/components/PostHogProvider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Silicon Zoo — Is your tech animal already taken?",
    template: "%s · Silicon Zoo",
  },
  description:
    "Search an animal and discover which tech brands, products and open-source projects already use it.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://silicon-zoo.vercel.app",
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmMono.variable}`}>
      <body>
        <PostHogProvider>{children}</PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}

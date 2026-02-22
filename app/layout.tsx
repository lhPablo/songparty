import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Sans } from "next/font/google";
import { Providers } from "@/providers/Providers";

import "@/styles/globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "block",
});

const notoSans = Noto_Sans({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "block",
});

export const metadata: Metadata = {
  title: "Song Party",
  description: "Song Party app",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`dark ${beVietnamPro.variable} ${notoSans.variable} antialiased`}
    >
      <head />
      <body className="font-body bg-bg-light text-text-primary dark:bg-bg-dark dark:text-text-primary">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
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

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`dark ${beVietnamPro.variable} ${notoSans.variable} antialiased`}
    >
      <head />
      <body className="font-body bg-bg-light text-text-primary dark:bg-bg-dark dark:text-text-primary">
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

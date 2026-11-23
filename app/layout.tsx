import type { Metadata } from "next";
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
    title: "Next.jsとコード読解を学ぶ｜初心者×AIの勉強記録",
  description:
    "Next.js入門、何から始めればいい？何を勉強すればいいかわからない初心者の私が、AIに質問しながら進めた、はじめの一歩の記録です。質問の仕方、つまずいた点、用語メモも紹介。同じ悩みの方の参考になれば嬉しいです。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { profile } from "@/data/portfolio";
import "./globals.css";

const title = `${profile.name} 포트폴리오`;
const description = `${profile.role} · ${profile.stack}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://yoonkeee.github.io"),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", title, description, locale: "ko_KR" },
};

export const viewport: Viewport = {
  themeColor: "#f6f7f9",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preload" href="/fonts/pretendard-subset.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}

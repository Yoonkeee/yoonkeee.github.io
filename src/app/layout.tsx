import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { profile } from "@/data/portfolio";
import { BASE_PATH } from "@/data/site";
import "./globals.css";

const title = `${profile.name} 포트폴리오`;
const description = `${profile.role} · ${profile.stack}`;
const fontUrl = `${BASE_PATH}/fonts/pretendard-subset.woff2`;
const fontFace = `@font-face{font-family:"Pretendard Variable";font-style:normal;font-weight:45 920;font-display:swap;src:url("${fontUrl}") format("woff2")}`;

export const metadata: Metadata = {
  metadataBase: new URL(`https://yoonkeee.github.io${BASE_PATH}`),
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
        <link rel="preload" href={fontUrl} as="font" type="font/woff2" crossOrigin="anonymous" />
        <style>{fontFace}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}

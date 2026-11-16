import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const fontUrl = "/fonts/pretendard-subset.woff2";
const fontFace = `@font-face{font-family:"Pretendard Variable";font-style:normal;font-weight:45 920;font-display:swap;src:url("${fontUrl}") format("woff2")}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://yoonkeee.github.io"),
};

export const viewport: Viewport = {
  themeColor: "#f6f7f9",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <head>
        <link rel="preload" href={fontUrl} as="font" type="font/woff2" crossOrigin="anonymous" />
        <style>{fontFace}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}

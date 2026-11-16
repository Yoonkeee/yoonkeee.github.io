import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "./globals.css";

const title = "김윤기 · 프론트엔드 개발자 포트폴리오";
const description =
  "React, Next.js, TypeScript로 기업용 SaaS와 실제 매장에서 쓰는 서비스를 만드는 프론트엔드 개발자 김윤기의 포트폴리오입니다.";

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
      <body>{children}</body>
    </html>
  );
}

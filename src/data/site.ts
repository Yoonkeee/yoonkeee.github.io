import type { Metadata } from "next";
import { profile } from "./portfolio";

export const ROUTES = { home: "/", resume: "/resume/", portfolio: "/pf/" } as const;

export function pageMetadata(title: string, path: string): Metadata {
  const description = `${profile.role} · ${profile.stack}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, title, description, locale: "ko_KR" },
  };
}

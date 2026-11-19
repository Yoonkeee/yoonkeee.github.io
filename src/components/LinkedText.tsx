import type { ReactNode } from "react";
import type { InlineLink } from "@/data/portfolio";

type LinkedTextProps = {
  text: string;
  /** Phrases in `text`, in reading order, that become links in place. */
  links?: readonly InlineLink[];
};

export function LinkedText({ text, links = [] }: LinkedTextProps) {
  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const link of links) {
    const start = text.indexOf(link.text, cursor);
    if (start < 0) continue;
    parts.push(
      text.slice(cursor, start),
      <a key={link.href} href={link.href}>
        {link.text}
      </a>,
    );
    cursor = start + link.text.length;
  }
  if (parts.length === 0) return text;

  return (
    <>
      {parts}
      {text.slice(cursor)}
    </>
  );
}

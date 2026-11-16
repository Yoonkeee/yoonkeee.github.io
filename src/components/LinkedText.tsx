import type { InlineLink } from "@/data/portfolio";

type LinkedTextProps = {
  text: string;
  link?: InlineLink;
};

export function LinkedText({ text, link }: LinkedTextProps) {
  const start = link ? text.indexOf(link.text) : -1;
  if (!link || start < 0) return text;

  return (
    <>
      {text.slice(0, start)}
      <a href={link.href}>{link.text}</a>
      {text.slice(start + link.text.length)}
    </>
  );
}

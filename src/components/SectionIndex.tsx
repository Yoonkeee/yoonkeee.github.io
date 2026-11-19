"use client";

import { useEffect, useState } from "react";
import styles from "./SectionIndex.module.css";

type IndexEntry = { id: string; no: string; title: string };

function cssPixels(name: string) {
  return parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name)) || 0;
}

export function SectionIndex({
  label,
  sections,
  className,
}: {
  label: string;
  sections: readonly IndexEntry[];
  className?: string;
}) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const targets = sections.flatMap((section) => document.getElementById(section.id) ?? []);
    let frame = 0;

    const update = () => {
      frame = 0;
      const readingLine = cssPixels("--header-h") + cssPixels("--pin-h") + 1;
      const reached = targets.filter((target) => target.getBoundingClientRect().top <= readingLine);
      const scrolledToEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const reading = reached.length > 0 && scrolledToEnd ? targets.at(-1) : reached.at(-1);
      setCurrent(reading?.id ?? null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);

  return (
    <nav aria-label={label} className={className}>
      <ol className={styles.list}>
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={styles.link}
              aria-current={current === section.id ? "location" : undefined}
            >
              <span className={styles.no}>{section.no}</span>
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

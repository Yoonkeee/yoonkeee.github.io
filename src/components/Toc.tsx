import styles from "./Toc.module.css";

export type TocEntry = { href: string; no: string; title: string; note?: string };

export function Toc({ entries }: { entries: TocEntry[] }) {
  return (
    <nav id="toc" aria-label="목차" className={styles.toc}>
      <ol className={styles.index}>
        {entries.map((entry) => (
          <li key={entry.href}>
            <a href={entry.href}>
              <span className={styles.no}>{entry.no}</span>
              <span className={styles.entry}>
                <span className={styles.title}>{entry.title}</span>
                {entry.note && <span className={styles.note}>{entry.note}</span>}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

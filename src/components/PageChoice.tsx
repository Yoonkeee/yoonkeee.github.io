import Link from "next/link";
import { ArrowRightIcon } from "./icons";
import styles from "./PageChoice.module.css";

export type PageCard = { href: string; title: string; contents: string[] };

export function PageChoice({ pages }: { pages: PageCard[] }) {
  return (
    <nav aria-label="페이지 선택" className={styles.choice}>
      <ul className={styles.cards}>
        {pages.map((page) => (
          <li key={page.href} className={styles.card}>
            <h2 className={styles.title}>
              <Link className={styles.link} href={page.href}>
                {page.title}
              </Link>
            </h2>
            <ArrowRightIcon className={styles.arrow} width={32} height={32} />
            <ul className={styles.contents}>
              {page.contents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}

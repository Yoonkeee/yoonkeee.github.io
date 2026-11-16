import Link from "next/link";
import { profile } from "@/data/portfolio";
import { ROUTES } from "@/data/site";
import styles from "./SiteHeader.module.css";

const PAGES = [
  { href: ROUTES.resume, label: "이력서" },
  { href: ROUTES.portfolio, label: "포트폴리오" },
];

export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link className={styles.brand} href={ROUTES.home} aria-current={current === ROUTES.home ? "page" : undefined}>
          {profile.name}
        </Link>
        <nav aria-label="주요 메뉴">
          <ul className={styles.links}>
            {PAGES.map((page) => (
              <li key={page.href}>
                <Link href={page.href} aria-current={page.href === current ? "page" : undefined}>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

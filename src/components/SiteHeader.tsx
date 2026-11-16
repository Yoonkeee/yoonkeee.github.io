import Link from "next/link";
import { profile } from "@/data/portfolio";
import { ROUTES } from "@/data/site";
import styles from "./SiteHeader.module.css";

export type HeaderLink = { href: string; label: string };

export function SiteHeader({ links }: { links: HeaderLink[] }) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link className={styles.brand} href={ROUTES.home}>
          {profile.name}
        </Link>
        <nav aria-label="주요 메뉴">
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

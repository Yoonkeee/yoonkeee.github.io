import { profile } from "@/data/portfolio";
import styles from "./SiteHeader.module.css";

const LINKS = [
  { href: "#projects", label: "프로젝트" },
  { href: "#feedback", label: "피드백" },
  { href: "#contact", label: "연락처" },
];

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.brand} href="#main">
          {profile.name}
        </a>
        <nav aria-label="주요 메뉴">
          <ul className={styles.links}>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

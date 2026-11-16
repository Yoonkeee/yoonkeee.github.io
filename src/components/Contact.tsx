import { profile } from "@/data/portfolio";
import { ArrowUpRightIcon, GithubIcon, MailIcon } from "./icons";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <footer id="contact" className={styles.contact}>
      <div className="container">
        <h2 className={styles.title}>연락처</h2>
        <ul className={styles.links}>
          <li>
            <a className={styles.link} href={`mailto:${profile.email}`}>
              <MailIcon width={24} height={24} />
              {profile.email}
            </a>
          </li>
          <li>
            <a className={styles.link} href={profile.github.url}>
              <GithubIcon width={24} height={24} />
              {profile.github.label}
            </a>
          </li>
        </ul>
        <div className={styles.foot}>
          <p>© 2026 {profile.name}</p>
          <a className={styles.source} href={profile.repository}>
            이 사이트의 소스 코드
            <ArrowUpRightIcon width={14} height={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}

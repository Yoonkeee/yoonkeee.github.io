import type { ReactNode } from "react";
import { profile } from "@/data/portfolio";
import { GithubIcon, MailIcon } from "./icons";
import styles from "./Hero.module.css";

export function Hero({ children }: { children: ReactNode }) {
  return (
    <section className={`container ${styles.hero}`} aria-labelledby="hero-name">
      <div className={styles.column}>
        <h1 id="hero-name" className={styles.name}>
          {profile.name}
        </h1>
        <p className={styles.role}>
          <span>{profile.role}</span>{" "}
          <span className={styles.stack}>{profile.stack}</span>
        </p>
        <p className={styles.lead}>
          {profile.intro.map((sentence) => (
            <span key={sentence} className={styles.sentence}>
              {sentence}{" "}
            </span>
          ))}
        </p>
        <div className={styles.actions}>
          <a className={styles.primary} href={`mailto:${profile.email}`}>
            <MailIcon />
            {profile.email}
          </a>
          <a className={styles.secondary} href={profile.github.url}>
            <GithubIcon />
            {profile.github.label}
          </a>
        </div>
        {children}
      </div>
    </section>
  );
}

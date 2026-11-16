import { feedback, profile, projects } from "@/data/portfolio";
import { GithubIcon, MailIcon } from "./icons";
import styles from "./Hero.module.css";

const entries = [
  ...projects.map((project) => ({ href: `#${project.id}`, no: project.no, title: project.title, note: project.since })),
  {
    href: "#feedback",
    no: String(projects.length + 1).padStart(2, "0"),
    title: "동료 피드백",
    note: `${feedback.length}건`,
  },
];

export function Hero() {
  return (
    <section className={`container ${styles.hero}`} aria-labelledby="hero-name">
      <div className={styles.column}>
        <h1 id="hero-name" className={styles.name}>
          {profile.name}
        </h1>
        <p className={styles.role}>
          <span>{profile.role}</span>
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
        <nav id="toc" aria-label="목차" className={styles.toc}>
          <ol className={styles.index}>
            {entries.map((entry) => (
              <li key={entry.href}>
                <a href={entry.href}>
                  <span className={styles.no}>{entry.no}</span>
                  <span className={styles.entry}>
                    <span className={styles.title}>{entry.title}</span>
                    <span className={styles.note}>{entry.note}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}

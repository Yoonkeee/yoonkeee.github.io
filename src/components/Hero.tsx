import { feedback, profile, projects } from "@/data/portfolio";
import { GithubIcon, MailIcon } from "./icons";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={`container ${styles.hero}`} aria-labelledby="hero-name">
      <div className={styles.grid}>
        <div>
          <h1 id="hero-name" className={styles.name}>
            {profile.name}
          </h1>
          <p className={styles.role}>
            <span>{profile.role}</span>
            <span className={styles.stack}>{profile.stack}</span>
          </p>
          <p className={styles.lead}>{profile.lead}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href={`mailto:${profile.email}`}>
              <MailIcon />
              이메일 보내기
            </a>
            <a className={styles.secondary} href={profile.github.url}>
              <GithubIcon />
              GitHub
            </a>
          </div>
        </div>
        <nav aria-label="목차">
          <ol className={styles.index}>
            {projects.map((project) => (
              <li key={project.id}>
                <a href={`#${project.id}`}>
                  <span className={styles.no}>{project.no}</span>
                  <span className={styles.entry}>{project.title}</span>
                  <span className={styles.when}>{project.since}</span>
                </a>
              </li>
            ))}
            <li>
              <a href="#feedback">
                <span className={styles.no}>{String(projects.length + 1).padStart(2, "0")}</span>
                <span className={styles.entry}>동료 피드백</span>
                <span className={styles.when}>{feedback.length}건</span>
              </a>
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import {
  resumeSections,
  type Bullet,
  type Record,
  type ResumeSectionId,
  type Skill,
  type Work,
} from "@/data/resume";
import styles from "./ResumeSection.module.css";

export function ResumeSection({
  id,
  pinEntries = false,
  children,
}: {
  id: ResumeSectionId;
  pinEntries?: boolean;
  children: ReactNode;
}) {
  const section = resumeSections.find((item) => item.id === id);
  if (!section) return null;
  const titleId = `${id}-title`;

  return (
    <section id={id} className={`container ${styles.section}`} aria-labelledby={titleId}>
      <div className={styles.frame} data-pin={pinEntries || undefined}>
        <header className={styles.head}>
          <p className={styles.no}>{section.no}</p>
          <h2 id={titleId} className={styles.title}>
            {section.title}
          </h2>
        </header>
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  );
}

export function Entry({
  title,
  role,
  meta,
  desc,
  summary,
  children,
}: {
  title: string;
  role?: string;
  meta: string[];
  desc: string;
  summary?: string;
  children: ReactNode;
}) {
  return (
    <article className={styles.entry}>
      <header className={styles.entryHead}>
        <h3 className={styles.entryTitle}>
          {title}
          {role && <span className={styles.role}>{role}</span>}
        </h3>
        <p className={styles.meta}>
          {meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </p>
      </header>
      <div className={styles.entryBody}>
        <p className={styles.desc}>{desc}</p>
        {summary && <p className={styles.summary}>{summary}</p>}
        {children}
      </div>
    </article>
  );
}

export function WorkBlock({ work }: { work: Work }) {
  return (
    <section className={styles.work}>
      <div className={styles.workHead}>
        <h4 className={styles.workTitle}>{work.title}</h4>
        <p className={styles.workPeriod}>{work.period}</p>
      </div>
      <BulletList bullets={work.bullets} />
    </section>
  );
}

export function BulletList({ bullets }: { bullets: Bullet[] }) {
  return (
    <ul className={styles.bullets}>
      {bullets.map((bullet) => (
        <li key={bullet.text}>
          {bullet.sub ? <span className={styles.bulletTitle}>{bullet.text}</span> : bullet.text}
          {bullet.sub && (
            <ul className={styles.subBullets}>
              {bullet.sub.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export function StackLine({ items }: { items: string[] }) {
  return <p className={styles.stack}>{items.join(" · ")}</p>;
}

export function RecordList({ records }: { records: Record[] }) {
  return (
    <dl className={styles.rows}>
      {records.map((record) => (
        <div key={record.title}>
          <dt className={styles.period}>{record.period}</dt>
          <dd>
            <span className={styles.rowTitle}>{record.title}</span>
            <span className={styles.note}>{record.note}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function SkillList({ skills }: { skills: Skill[] }) {
  return (
    <dl className={styles.rows}>
      {skills.map((skill) => (
        <div key={skill.label}>
          <dt>{skill.label}</dt>
          <dd>
            {skill.items.join(" · ")}
            {skill.note && <span className={styles.note}>{skill.note}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

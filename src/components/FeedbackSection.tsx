import type { ReactNode } from "react";
import { feedback, feedbackHeading, imageOf, type Feedback } from "@/data/portfolio";
import { ExpandIcon, PersonIcon } from "./icons";
import { ZoomButton } from "./Lightbox";
import { PinBar, pinScope } from "./PinBar";
import styles from "./FeedbackSection.module.css";

export function FeedbackSection() {
  return (
    <section id="feedback" className={`container ${styles.section}`} aria-labelledby="feedback-title">
      <div className={styles.frame}>
        <header>
          <p className={styles.no}>{feedbackHeading.no}</p>
          <h2 id="feedback-title" className={styles.title}>
            {feedbackHeading.title}
          </h2>
        </header>
        <div className={`${styles.list} ${pinScope}`}>
          <PinBar no={feedbackHeading.no} title={feedbackHeading.title} />
          {feedback.map((item) => (
            <Entry key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Entry({ item }: { item: Feedback }) {
  const { large } = imageOf(item.image);

  return (
    <article id={item.id} className={styles.entry}>
      <header className={styles.entryHead}>
        <h3 className={styles.kind}>{item.kind}</h3>
        {item.type === "note" && <p className={styles.date}>{item.date}</p>}
      </header>
      <EntryBody item={item} />
      <ZoomButton className={styles.source} target={{ ...large, alt: `${item.kind} 피드백 원본 캡처` }}>
        <ExpandIcon width={16} height={16} />
        원본 캡처 보기
        <span className="visually-hidden">: {item.kind}</span>
      </ZoomButton>
    </article>
  );
}

function EntryBody({ item }: { item: Feedback }) {
  switch (item.type) {
    case "note":
      return (
        <Voice className={styles.note}>
          {item.paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.text}>
              {paragraph}
            </p>
          ))}
        </Voice>
      );
    case "review":
      return (
        <>
          <p className={styles.question}>{item.question}</p>
          <p className={styles.score}>{item.score}</p>
          <ul className={styles.comments}>
            {item.comments.map((comment) => (
              <Voice key={comment} as="li">
                <p className={styles.text}>{comment}</p>
              </Voice>
            ))}
          </ul>
        </>
      );
    default:
      return item satisfies never;
  }
}

function Voice({ as: Tag = "div", className, children }: { as?: "div" | "li"; className?: string; children: ReactNode }) {
  return (
    <Tag className={className ? `${styles.voice} ${className}` : styles.voice}>
      <span className={styles.avatar} aria-hidden="true">
        <PersonIcon width={16} height={16} />
      </span>
      <div className={styles.words}>{children}</div>
    </Tag>
  );
}

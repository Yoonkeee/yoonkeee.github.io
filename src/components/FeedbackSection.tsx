import type { ReactNode } from "react";
import { feedback, imageOf, type Feedback, type FeedbackNote, type FeedbackReview } from "@/data/portfolio";
import { ExpandIcon } from "./icons";
import { ZoomButton } from "./Lightbox";
import styles from "./FeedbackSection.module.css";

const notes = feedback.filter((item): item is FeedbackNote => item.type === "note");
const reviews = feedback.filter((item): item is FeedbackReview => item.type === "review");

export function FeedbackSection() {
  return (
    <section id="feedback" className={`container ${styles.section}`} aria-labelledby="feedback-title">
      <header className={styles.head}>
        <h2 id="feedback-title" className={styles.title}>
          동료 피드백
        </h2>
        <p className={styles.lead}>
          피드백 {notes.length}건과 다면 평가 {reviews.length}건을 원문 그대로 옮겼습니다. 카드마다 원본 캡처를 볼 수
          있습니다.
        </p>
      </header>
      <div className={styles.columns}>
        <div className={styles.column}>
          {notes.map((item) => (
            <Card key={item.id} item={item}>
              <p className={styles.meta}>
                <span>{item.date}</span>
                <span>{item.tags.join(" · ")}</span>
              </p>
              {item.paragraphs.map((paragraph) => (
                <p key={paragraph} className={styles.text}>
                  {paragraph}
                </p>
              ))}
            </Card>
          ))}
        </div>
        <div className={styles.column}>
          {reviews.map((item) => (
            <Card key={item.id} item={item}>
              <p className={styles.question}>{item.question}</p>
              <p className={styles.score}>{item.score}</p>
              <ul className={styles.comments}>
                {item.comments.map((comment) => (
                  <li key={comment}>{comment}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ item, children }: { item: Feedback; children: ReactNode }) {
  const { large } = imageOf(item.image);

  return (
    <article id={item.id} className={styles.card}>
      <h3 className={styles.kind}>{item.kind}</h3>
      {children}
      <ZoomButton className={styles.source} target={{ ...large, alt: `${item.kind} 피드백 원본 캡처` }}>
        <ExpandIcon width={16} height={16} />
        원본 캡처 보기
        <span className="visually-hidden">: {item.kind}</span>
      </ZoomButton>
    </article>
  );
}

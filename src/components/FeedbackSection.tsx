import { feedback, imageOf, type Feedback } from "@/data/portfolio";
import { ExpandIcon } from "./icons";
import { ZoomButton } from "./Lightbox";
import styles from "./FeedbackSection.module.css";

export function FeedbackSection() {
  return (
    <section id="feedback" className={`container ${styles.section}`} aria-labelledby="feedback-title">
      <div className={styles.frame}>
        <header className={styles.head}>
          <h2 id="feedback-title" className={styles.title}>
            동료 피드백
          </h2>
        </header>
        <div className={styles.list}>
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
      return item.paragraphs.map((paragraph) => (
        <p key={paragraph} className={styles.text}>
          {paragraph}
        </p>
      ));
    case "review":
      return (
        <>
          <p className={styles.question}>{item.question}</p>
          <p className={styles.score}>{item.score}</p>
          <ul className={styles.comments}>
            {item.comments.map((comment) => (
              <li key={comment}>{comment}</li>
            ))}
          </ul>
        </>
      );
    default:
      return item satisfies never;
  }
}

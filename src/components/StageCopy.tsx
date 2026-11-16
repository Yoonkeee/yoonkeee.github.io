import type { FrameKind, StageStep } from "@/data/portfolio";
import styles from "./Stage.module.css";

const PAIR_POSITIONS: Partial<Record<FrameKind, readonly [string, string]>> = {
  inline: ["위", "아래"],
  phone: ["왼쪽", "오른쪽"],
};

export function StageCopy({ step }: { step: StageStep }) {
  const positions = step.shots.length === 2 ? PAIR_POSITIONS[step.frame] : undefined;

  return (
    <>
      {step.shots.map((shot, index) => (
        <h3 key={shot.image} className={styles.title}>
          {positions && (
            <>
              <span className={styles.position}>{positions[index]}</span>{" "}
            </>
          )}
          {shot.caption}
        </h3>
      ))}
      {step.body && <p className={styles.body}>{step.body}</p>}
    </>
  );
}

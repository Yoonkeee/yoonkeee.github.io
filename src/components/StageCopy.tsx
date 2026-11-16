import type { StageStep } from "@/data/portfolio";
import { ShotNotes } from "./ShotGroup";
import styles from "./Stage.module.css";

export function StageCopy({ step }: { step: StageStep }) {
  return (
    <>
      <p className={styles.label}>{step.label}</p>
      <h3 className={styles.title}>{step.title}</h3>
      <p className={styles.body}>{step.body}</p>
      <ShotNotes frame={step.frame} shots={step.shots} />
    </>
  );
}

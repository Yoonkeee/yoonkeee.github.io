import type { FrameKind, StageStep } from "@/data/portfolio";
import { ImageIcon } from "./icons";
import styles from "./Stage.module.css";

const PAIR_POSITIONS: Partial<Record<FrameKind, readonly [string, string]>> = {
  inline: ["위", "아래"],
  phone: ["왼쪽", "오른쪽"],
};

export function ShotCaptions({ step }: { step: StageStep }) {
  const positions = step.shots.length === 2 ? PAIR_POSITIONS[step.frame] : undefined;

  return step.shots.map((shot, index) => (
    <p key={shot.image} className={styles.caption}>
      <ImageIcon className={styles.captionIcon} width={16} height={16} />
      <span>
        {positions && (
          <>
            <span className={styles.position}>{positions[index]}</span>{" "}
          </>
        )}
        {shot.caption}
      </span>
    </p>
  ));
}

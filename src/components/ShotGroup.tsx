import type { CSSProperties } from "react";
import { imageOf, type FrameKind, type Shot } from "@/data/portfolio";
import { ExpandIcon } from "./icons";
import { ZoomButton } from "./Lightbox";
import { Picture } from "./Picture";
import styles from "./ShotGroup.module.css";

const SIZES: Record<FrameKind, string> = {
  screen: "(min-width: 1024px) 60vw, 100vw",
  diagram: "(min-width: 1024px) 60vw, 100vw",
  phone: "380px",
  inline: "400px",
};

const INLINE_SCALE = 0.6;

export function ShotGroup({ frame, shots }: { frame: FrameKind; shots: Shot[] }) {
  return (
    <div className={styles.group} data-frame={frame}>
      {shots.map((shot) => {
        const { large } = imageOf(shot.image);

        return (
          <figure
            key={shot.image}
            className={styles.figure}
            style={{ "--shot-width": `${Math.round(large.width * INLINE_SCALE)}px` } as CSSProperties}
          >
            <ZoomButton
              className={styles.frame}
              target={{ ...large, alt: shot.caption }}
              label={`확대해서 보기: ${shot.caption}`}
            >
              <span className={styles.viewport} data-pan={frame === "screen" ? "" : undefined}>
                <Picture name={shot.image} alt="" sizes={SIZES[frame]} />
              </span>
              <span className={styles.hint}>
                <ExpandIcon width={16} height={16} />
              </span>
            </ZoomButton>
          </figure>
        );
      })}
    </div>
  );
}

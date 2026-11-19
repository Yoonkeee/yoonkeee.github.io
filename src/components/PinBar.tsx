import styles from "./PinBar.module.css";

/** Class for the block a PinBar names; the bar must be that block's first child. */
export const pinScope = styles.scope;

type PinBarProps = {
  no: string;
  title: string;
  item?: { title: string; meta?: string };
  /** "narrow" hides the section name at 768px and up, where the section bar shows it beside this bar. */
  trail?: "always" | "narrow";
};

/**
 * One line under the site header naming what is being read. It rests just above its block, where the block's
 * vertical clip hides it, and is uncovered as the block's top edge scrolls under the site header, so no script
 * decides when it shows.
 */
export function PinBar({ no, title, item, trail = "always" }: PinBarProps) {
  return (
    <p className={item ? `${styles.bar} ${styles.item}` : styles.bar} data-trail={trail} aria-hidden="true">
      <span className={styles.trail}>
        <span className={styles.no}>{no}</span>
        <span className={styles.title}>{title}</span>
        {item && <span className={styles.sep}>›</span>}
      </span>
      {item && (
        <>
          <span className={styles.current}>{item.title}</span>
          {item.meta && <span className={styles.meta}>{item.meta}</span>}
        </>
      )}
    </p>
  );
}

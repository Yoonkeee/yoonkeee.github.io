import { ImageIcon } from "./icons";
import styles from "./ShotGroup.module.css";

export function ShotCaption({ caption }: { caption: string }) {
  return (
    <figcaption className={styles.caption}>
      <ImageIcon className={styles.captionIcon} width={16} height={16} />
      <span>{caption}</span>
    </figcaption>
  );
}

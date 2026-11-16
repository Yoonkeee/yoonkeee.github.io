"use client";

import {
  createContext,
  use,
  useCallback,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import type { ImageVariant } from "@/data/portfolio";
import { CloseIcon } from "./icons";
import styles from "./Lightbox.module.css";

type LightboxTarget = ImageVariant & { alt: string };

const LightboxContext = createContext<(target: LightboxTarget) => void>(() => {});

export function LightboxProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [target, setTarget] = useState<LightboxTarget | null>(null);

  const open = useCallback((next: LightboxTarget) => {
    setTarget(next);
    dialogRef.current?.showModal();
  }, []);

  const closeOnBackdrop = (event: MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) dialogRef.current?.close();
  };

  return (
    <LightboxContext value={open}>
      {children}
      <dialog ref={dialogRef} className={styles.dialog} aria-label="이미지 확대 보기" onClose={() => setTarget(null)}>
        <form method="dialog" className={styles.bar}>
          <button className={styles.close} aria-label="닫기">
            <CloseIcon />
          </button>
        </form>
        {target && (
          <div className={styles.scroller} onClick={closeOnBackdrop}>
            <figure className={styles.figure} style={{ "--natural-width": `${target.width}px` } as CSSProperties}>
              <img src={target.src} width={target.width} height={target.height} alt={target.alt} />
              <figcaption>{target.alt}</figcaption>
            </figure>
          </div>
        )}
      </dialog>
    </LightboxContext>
  );
}

type ZoomButtonProps = {
  target: LightboxTarget;
  className?: string;
  label?: string;
  children: ReactNode;
};

export function ZoomButton({ target, className, label, children }: ZoomButtonProps) {
  const open = use(LightboxContext);

  return (
    <button type="button" className={className} aria-label={label} onClick={() => open(target)}>
      {children}
    </button>
  );
}

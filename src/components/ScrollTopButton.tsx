"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "./icons";
import styles from "./ScrollTopButton.module.css";

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
    // The button hides at the top, so keyboard focus moves to the first link in the header instead of being dropped.
    document.querySelector<HTMLElement>("header a")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      className={styles.button}
      data-visible={visible}
      aria-label="맨 위로"
      onClick={scrollToTop}
    >
      <ArrowUpIcon />
    </button>
  );
}

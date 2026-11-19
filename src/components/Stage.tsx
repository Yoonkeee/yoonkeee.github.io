"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./Stage.module.css";

export type StageStepView = {
  id: string;
  label: string;
  copy: ReactNode;
  visual: ReactNode;
};

type StageProps = {
  head: ReactNode;
  steps: StageStepView[];
};

type PinnedLayout = { pinned: boolean; top: number };

const PAN_START = 0.2;
const PAN_SPAN = 0.6;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Which step the pinned stage shows at the current scroll position, and how far into it. */
function stepAt(root: HTMLElement, sticky: HTMLElement, top: number, count: number) {
  const range = root.offsetHeight - sticky.offsetHeight;
  const stepSize = range / count;
  const scrolled = clamp(top - root.getBoundingClientRect().top, 0, range);
  const index = Math.min(count - 1, Math.floor(scrolled / stepSize));
  return { index, within: clamp((scrolled - index * stepSize) / stepSize, 0, 1) };
}

export function Stage({ head, steps }: StageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const layoutRef = useRef<PinnedLayout>({ pinned: false, top: 0 });
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const count = steps.length;

  useEffect(() => {
    const root = rootRef.current;
    const sticky = stickyRef.current;
    if (!root || !sticky) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let mounted = true;

    // The stylesheet pins the stage by default. Measure that pinned layout and
    // fall back to the document flow when a text or image block does not fit.
    const fit = () => {
      if (root.dataset.mode === "flow") {
        // Hold the height so the page does not move while the pinned layout is measured.
        root.style.height = `${root.offsetHeight}px`;
        delete root.dataset.mode;
      }
      const style = getComputedStyle(sticky);
      const pinnable = style.position === "sticky";
      const top = parseFloat(style.top) || 0;
      const limit = sticky.clientHeight - parseFloat(style.paddingBottom) + 1;
      const fits =
        pinnable &&
        [...root.querySelectorAll<HTMLElement>("[data-step] > *")].every(
          (block) => block.offsetTop + block.offsetHeight <= limit,
        );
      if (pinnable && !fits) root.dataset.mode = "flow";
      root.style.removeProperty("height");
      layoutRef.current = { pinned: fits, top };
    };

    const pan = (index: number, within: number) => {
      const viewports = root.querySelectorAll<HTMLElement>("[data-pan]");
      const current = root.querySelector<HTMLElement>(`[data-step="${index}"] [data-pan]`);
      for (const viewport of viewports) {
        if (viewport !== current) viewport.style.removeProperty("--pan-y");
      }
      if (!current || reducedMotion.matches) return;
      const image = current.querySelector("img");
      const overflow = image ? image.offsetHeight - current.clientHeight : 0;
      const travel = clamp((within - PAN_START) / PAN_SPAN, 0, 1);
      current.style.setProperty("--pan-y", `${Math.round(-Math.max(overflow, 0) * travel)}px`);
    };

    const update = () => {
      frame = 0;
      const { pinned, top } = layoutRef.current;
      if (!pinned) return;
      const { index, within } = stepAt(root, sticky, top, count);
      root.style.setProperty("--step-progress", within.toFixed(3));
      pan(index, within);
      if (index !== activeRef.current) {
        activeRef.current = index;
        setActive(index);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const relayout = () => {
      fit();
      if (!layoutRef.current.pinned) {
        for (const viewport of root.querySelectorAll<HTMLElement>("[data-pan]")) viewport.style.removeProperty("--pan-y");
      }
      schedule();
    };

    relayout();
    // Unpinning changes the height of this stage, so a link that opened the page at an anchor is re-aligned once.
    if (root.dataset.mode === "flow" && location.hash) {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: "instant" });
    }
    document.fonts.ready.then(() => {
      if (mounted) relayout();
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", relayout);
    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", relayout);
    };
  }, [count]);

  const goTo = useCallback(
    (index: number, behavior: ScrollBehavior) => {
      const root = rootRef.current;
      const sticky = stickyRef.current;
      const { pinned, top } = layoutRef.current;
      if (!root || !sticky || !pinned) return;
      const range = root.offsetHeight - sticky.offsetHeight;
      const start = window.scrollY + root.getBoundingClientRect().top - top;
      window.scrollTo({ top: start + (range / count) * index + 1, behavior });
    },
    [count],
  );

  // The browser scrolls a focused element into view after the focus event, so the stage is aligned once that scroll has landed.
  const revealFocusedStep = (index: number) => {
    requestAnimationFrame(() => {
      const root = rootRef.current;
      const sticky = stickyRef.current;
      const { pinned, top } = layoutRef.current;
      if (root && sticky && pinned && stepAt(root, sticky, top, count).index !== index) goTo(index, "instant");
    });
  };

  return (
    <div
      ref={rootRef}
      className={styles.stage}
      data-steps={count > 1 ? "many" : "one"}
      style={{ "--steps": count } as CSSProperties}
    >
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.head}>{head}</div>
        {count > 1 && (
          <div className={styles.nav}>
            <ol className={styles.dots}>
              {steps.map((step, index) => (
                <li key={step.id}>
                  <button
                    type="button"
                    className={styles.dot}
                    data-state={index < active ? "done" : index === active ? "current" : "todo"}
                    aria-current={index === active ? "step" : undefined}
                    aria-label={`${index + 1}단계: ${step.label}`}
                    onClick={() => goTo(index, "auto")}
                  >
                    <span className={styles.dotNo} aria-hidden="true">
                      {index + 1}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <p className={styles.count} aria-hidden="true">
              {active + 1} / {count}
            </p>
          </div>
        )}
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={styles.step}
            data-step={index}
            data-state={index < active ? "past" : index === active ? "current" : "next"}
            style={{ "--step": index } as CSSProperties}
            onFocus={() => revealFocusedStep(index)}
          >
            <div className={styles.copy}>{step.copy}</div>
            <div className={styles.visual}>{step.visual}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";

/**
 * Same-page anchor links scroll without adding a history entry or a #fragment to the URL,
 * so Back leaves the page instead of stepping through every section that was visited.
 */
export function InPageLinks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[href*='#']");
      if (!(link instanceof HTMLAnchorElement) || link.target) return;
      if (link.origin !== location.origin || link.pathname !== location.pathname || link.search !== location.search) return;
      const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ block: "start" });
      // Fragment navigation moves keyboard focus to the target; keep that for skip links and section jumps.
      if (target.tabIndex < 0 && !target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
        target.dataset.anchorFocus = "";
        target.addEventListener(
          "blur",
          () => {
            target.removeAttribute("tabindex");
            delete target.dataset.anchorFocus;
          },
          { once: true },
        );
      }
      target.focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

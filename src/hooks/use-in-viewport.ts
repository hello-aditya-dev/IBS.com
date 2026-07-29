"use client";

import { useEffect, useRef, useState } from "react";

export function useInViewport<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Track whether the page is visible (tab is active)
    let pageVisible = !document.hidden;

    const handleVisibilityChange = () => {
      pageVisible = !document.hidden;
      // If the page just became visible, re-check intersection
      if (pageVisible) {
        // The IntersectionObserver will fire naturally; no manual action needed
      } else {
        setInView(false);
      }
    };

    // Track whether the element is in the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only mark as in-view if both the element is visible AND the page is visible
        setInView(entry.isIntersecting && pageVisible);
      },
      { threshold: 0 },
    );

    observer.observe(el);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return { ref, inView };
}

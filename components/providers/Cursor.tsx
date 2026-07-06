"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"default" | "view">("default");

  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      prefersReducedMotion()
    ) {
      return;
    }
    // SSRでは判定できない環境検出のため、マウント後のsetStateが必要
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled || !dotRef.current || !ringRef.current) return;

    const dotX = gsap.quickTo(dotRef.current, "x", {
      duration: 0.12,
      ease: "power3.out",
    });
    const dotY = gsap.quickTo(dotRef.current, "y", {
      duration: 0.12,
      ease: "power3.out",
    });
    const ringX = gsap.quickTo(ringRef.current, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    const ringY = gsap.quickTo(ringRef.current, "y", {
      duration: 0.45,
      ease: "power3.out",
    });

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX - 4);
      dotY(e.clientY - 4);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a, button, [data-cursor]",
      );
      setMode(target ? "view" : "default");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ translate: "-50% -50%" }}
        data-mode={mode}
        aria-hidden="true"
      >
        <span className="cursor-label">VIEW</span>
      </div>
    </>
  );
}

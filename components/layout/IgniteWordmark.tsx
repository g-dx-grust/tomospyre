"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const WORD = "TOMOSPYRE";

/** フッターの巨大ワードマーク。スクロールインで1文字ずつ暗→熱グラデに「点火」する */
export default function IgniteWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.querySelectorAll<HTMLElement>(".ignite-hot").forEach((c) => {
        c.style.opacity = "1";
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".ignite-hot"),
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            end: "top 45%",
            scrub: 0.6,
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-label={WORD}
      role="img"
      className="select-none overflow-hidden whitespace-nowrap text-center font-display font-bold leading-[0.95] tracking-[-0.02em]"
      style={{ fontSize: "clamp(2.6rem, 12.5vw, 13rem)" }}
    >
      {WORD.split("").map((ch, i) => (
        <span key={i} aria-hidden="true" className="relative inline-block">
          <span className="text-bone/[0.07]">{ch}</span>
          <span className="ignite-hot heat-text absolute inset-0 opacity-0">
            {ch}
          </span>
        </span>
      ))}
    </div>
  );
}

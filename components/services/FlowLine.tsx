"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/** スクロール連動で熱色のプログレスラインが伸びる制作フロー */
export default function FlowLine({ steps }: { steps: string[] }) {
  const wrapRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const line = lineRef.current;
    if (!wrap || !line) return;

    if (prefersReducedMotion()) {
      line.style.transform = "scaleY(1)";
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-flow-step]", wrap).forEach((el, i) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, x: 24 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: (i % 3) * 0.05,
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <ol ref={wrapRef} className="relative space-y-0 pl-10 md:pl-14">
      {/* ベースライン + プログレスライン */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-3 top-2 w-px bg-bone/12 md:left-5"
      />
      <div
        ref={lineRef}
        aria-hidden="true"
        className="absolute bottom-6 left-3 top-2 w-px origin-top md:left-5"
        style={{
          background:
            "linear-gradient(180deg, var(--color-heat-1), var(--color-heat-2))",
          transform: "scaleY(0)",
        }}
      />
      {steps.map((step, i) => (
        <li key={step} data-flow-step className="relative pb-10 last:pb-0">
          <span
            aria-hidden="true"
            className="absolute -left-10 top-1 grid size-6 place-items-center md:-left-14 md:size-10"
          >
            <span className="size-2.5 rounded-full heat-bg shadow-[0_0_14px_rgba(255,107,53,0.8)]" />
          </span>
          <p className="font-mono text-[10px] tracking-[0.3em] text-heat-2">
            STEP {String(i + 1).padStart(2, "0")}
          </p>
          <p className="mt-1.5 font-jp text-lg font-bold md:text-xl">{step}</p>
        </li>
      ))}
    </ol>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { ceoMessage } from "@/lib/data/company";

/**
 * 代表メッセージ。セクションをpinし、スクロールに応じて
 * 段落が1つずつ浮かび上がる。reduced-motionでは全文即時表示。
 */
export default function MessagePin() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || prefersReducedMotion()) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const paras = wrap.querySelectorAll<HTMLElement>("[data-msg-line]");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: `+=${paras.length * 55}%`,
          pin: true,
          scrub: 0.6,
        },
      });
      paras.forEach((p) => {
        tl.fromTo(
          p,
          { autoAlpha: 0.07, y: 28 },
          { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
        ).to({}, { duration: 0.35 }); // 行間の溜め
      });
      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative bg-coal">
      <section
        className="mx-auto flex min-h-svh max-w-4xl flex-col justify-center px-5 py-32 md:px-10"
        aria-labelledby="message-heading"
      >
        <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
          MESSAGE
        </p>
        <h2
          id="message-heading"
          className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl"
        >
          代表メッセージ
        </h2>
        <div className="mt-12 space-y-7">
          {ceoMessage.paragraphs.map((p, i) => (
            <p
              key={i}
              data-msg-line
              className="font-jp text-base font-medium leading-loose text-bone/90 md:text-xl md:leading-[2.1]"
            >
              {p}
            </p>
          ))}
        </div>
        <p
          data-msg-line
          className="mt-12 text-right font-jp text-sm font-bold tracking-widest text-heat-2 md:text-base"
        >
          {ceoMessage.signature}
        </p>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { brand } from "@/lib/data/company";

/** TOMO / SPYRE が左右からパララックス合流して社名になる */
export default function OriginMerge() {
  const wrapRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const st = {
        trigger: wrap,
        start: "top 78%",
        end: "top 22%",
        scrub: 0.6,
      };
      gsap.fromTo(
        leftRef.current,
        { xPercent: -46, autoAlpha: 0.15 },
        { xPercent: 0, autoAlpha: 1, ease: "none", scrollTrigger: st },
      );
      gsap.fromTo(
        rightRef.current,
        { xPercent: 46, autoAlpha: 0.15 },
        { xPercent: 0, autoAlpha: 1, ease: "none", scrollTrigger: st },
      );
      gsap.fromTo(
        resultRef.current,
        { autoAlpha: 0, scale: 0.96 },
        {
          autoAlpha: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top 45%",
            end: "top 15%",
            scrub: 0.6,
          },
        },
      );
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={wrapRef}
      className="overflow-hidden px-5 py-32 md:px-12 md:py-44"
      aria-labelledby="origin-heading"
    >
      <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
        NAME ORIGIN
      </p>
      <h2 id="origin-heading" className="sr-only">
        社名の由来
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div ref={leftRef}>
          <p
            className="font-display font-bold leading-none tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
          >
            TOMO
          </p>
          <p className="mt-4 font-mono text-xs tracking-[0.2em] text-heat-2">
            {brand.nameOrigin.tomo.meaning}
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ash">
            明日を灯す。TOMOには「Tomorrow」と、日本語の「灯す」が重なっています。
          </p>
        </div>
        <div ref={rightRef} className="md:text-right">
          <p
            className="font-display font-bold leading-none tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
          >
            SPYRE
          </p>
          <p className="mt-4 font-mono text-xs tracking-[0.2em] text-heat-2">
            {brand.nameOrigin.spyre.meaning}
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ash md:ml-auto">
            人を鼓舞し、尖塔（spire）のように高く立ち上がる存在であること。
          </p>
        </div>
      </div>

      <p
        ref={resultRef}
        className="heat-text mt-20 text-center font-display font-bold leading-none tracking-tight"
        style={{ fontSize: "clamp(2.4rem, 7.5vw, 6.5rem)" }}
      >
        TOMOSPYRE
      </p>
      <p className="mt-6 text-center font-jp text-sm font-bold text-bone/85 md:text-lg">
        {brand.nameOrigin.statement}
      </p>
    </section>
  );
}

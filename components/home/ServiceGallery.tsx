"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { services } from "@/lib/data/services";
import ServiceVisual from "@/components/services/ServiceVisual";
import TiltCard from "@/components/motion/TiltCard";

/**
 * 5サービスのpinされた横スクロールギャラリー（デスクトップ）。
 * モバイル・reduced-motionでは縦積みにフォールバック。
 */
export default function ServiceGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const track = trackRef.current;
        const section = sectionRef.current;
        if (!track || !section) return;

        const getDistance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-coal py-24 lg:h-svh lg:py-0"
      aria-labelledby="services-heading"
    >
      <div className="absolute left-5 top-10 z-10 md:left-12 lg:top-16">
        <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
          03 / SERVICES
        </p>
        <h2
          id="services-heading"
          className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl"
        >
          5つの<span className="heat-text">AIサービス</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex flex-col gap-10 px-5 pt-28 md:px-12 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-0 lg:pt-24 lg:pr-[10vw]"
      >
        {services.map((s, i) => (
          <div
            key={s.slug}
            className={`lg:w-[58vw] lg:shrink-0 lg:px-[4vw] ${
              i % 2 === 0 ? "lg:-mt-6" : "lg:mt-14"
            }`}
          >
            <TiltCard>
              <Link
                href={`/services/${s.slug}`}
                data-cursor="view"
                className="group block border border-bone/10 bg-void/60 transition-colors hover:border-heat-1/50"
              >
                <ServiceVisual slug={s.slug} className="h-52 md:h-64" />
                <div className="flex items-end justify-between gap-6 p-7 md:p-9">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.3em] text-heat-2">
                      SERVICE {s.num} — {s.nameEn}
                    </p>
                    <h3 className="mt-3 font-jp text-2xl font-bold md:text-3xl">
                      {s.nameJa}
                    </h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-ash">
                      {s.catch}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="grid size-12 shrink-0 place-items-center rounded-full border border-bone/20 transition-all duration-300 group-hover:heat-bg group-hover:text-void"
                  >
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </Link>
            </TiltCard>
            <p
              aria-hidden="true"
              className="outline-num pointer-events-none mt-4 font-display text-[16vw] font-bold leading-none lg:-mt-10 lg:text-[11rem]"
            >
              {s.num}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

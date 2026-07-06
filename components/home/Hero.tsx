"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import TextReveal from "@/components/motion/TextReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import { brand, company } from "@/lib/data/company";

const EmberField = dynamic(() => import("@/components/three/EmberField"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 55% 65% at 50% 62%, rgba(255,107,53,0.22), rgba(255,180,84,0.07) 45%, transparent 72%)",
      }}
    />
  ),
});

/**
 * TOP Hero。火の粉フィールドの上にeditorialなタイポグラフィ。
 * スクロールでpinされ、粒子が一斉にバースト（着火）して次セクションの光へ転化する。
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=85%",
        pin: true,
        scrub: true,
        onUpdate(self) {
          progressRef.current = self.progress;
          gsap.set(contentRef.current, {
            autoAlpha: Math.max(0, 1 - self.progress * 1.6),
            y: -self.progress * 90,
          });
          gsap.set(glowRef.current, {
            opacity: Math.max(0, self.progress * 1.4 - 0.25),
          });
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh items-center overflow-hidden"
      aria-label="TOMOSPYRE — AIとひとの力で、できることを増やしていく。"
    >
      <EmberField progressRef={progressRef} className="absolute inset-0" />

      {/* バースト時に立ち上がる光（次セクションへの転化） */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] opacity-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 90% at 50% 105%, rgba(255,107,53,0.35), rgba(255,180,84,0.12) 45%, transparent 75%)",
        }}
      />

      {/* 縦書きアクセント */}
      <p
        aria-hidden="true"
        className="v-text absolute right-5 top-1/2 hidden -translate-y-1/2 font-jp text-sm font-medium text-bone/40 md:block"
      >
        明日に火を灯す
      </p>

      <div
        ref={contentRef}
        className="relative z-10 w-full px-5 pb-24 pt-32 md:px-12"
      >
        <p className="font-mono text-[11px] tracking-[0.3em] text-heat-2">
          {brand.heroLabel}
        </p>

        <div
          aria-hidden="true"
          className="mt-6 font-display font-bold leading-[0.9] tracking-[-0.03em]"
          style={{ fontSize: "clamp(4rem, 12vw, 11rem)" }}
        >
          <TextReveal as="span" className="block">
            IGNITE
          </TextReveal>
          <TextReveal as="span" className="heat-text block" delay={0.15}>
            TOMORROW
          </TextReveal>
        </div>

        <h1 className="mt-8 max-w-4xl font-jp text-2xl font-bold leading-snug md:text-4xl">
          <TextReveal by="lines" delay={0.4}>
            AIとひとの力で、できることを増やしていく。
          </TextReveal>
        </h1>

        <p className="mt-6 max-w-xl text-sm leading-loose text-ash md:text-base">
          {`${company.name}は、AIクリエイティブを主軸に人材支援・総合インフラの3本柱で、人と企業の可能性に火を灯す会社です。${brand.locationCopy}。`}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton href="/services" variant="solid">
            サービスを見る
          </MagneticButton>
          <MagneticButton href="/recruit">採用情報を見る</MagneticButton>
          <MagneticButton href="/contact">お問い合わせ</MagneticButton>
        </div>
      </div>

      <p className="absolute bottom-6 left-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-ash md:left-12">
        <ArrowDown size={12} aria-hidden="true" className="animate-bounce" />
        SCROLL TO IGNITE
      </p>
    </section>
  );
}

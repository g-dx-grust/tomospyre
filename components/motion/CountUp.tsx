"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  to: number;
  decimals?: number;
  className?: string;
  duration?: number;
};

/**
 * スクロールインで0からカウントアップ。
 * SSRでは最終値を出力するため、JS無効環境や reduced-motion でも情報は読める。
 */
export default function CountUp({
  to,
  decimals = 0,
  className,
  duration = 1.6,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: to,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        onUpdate() {
          el.textContent = obj.v.toFixed(decimals);
        },
      });
    }, el);

    return () => ctx.revert();
  }, [to, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {to.toFixed(decimals)}
    </span>
  );
}

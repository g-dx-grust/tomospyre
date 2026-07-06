"use client";

import {
  createElement,
  useEffect,
  useRef,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap, SplitText, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** 文字単位（既定）か行単位か */
  by?: "chars" | "lines";
  delay?: number;
};

/**
 * 主要見出し用のクリップリビール。
 * SSRではテキストをそのまま出力し、クライアントでSplitTextに分割して
 * 下からのマスクリビールをScrollTriggerで発火する。
 */
export default function TextReveal({
  children,
  as = "span",
  className,
  by = "chars",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    // background-clip:text はtransformされた子スパンに背景を描画しないため、
    // グラデーション見出しは要素全体のクリップリビールにフォールバックする
    if (el.classList.contains("heat-text")) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)", yPercent: 18 },
          {
            clipPath: "inset(0 0 -10% 0)",
            yPercent: 0,
            duration: 1,
            ease: "power4.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "restart none restart none",
            },
          },
        );
      }, el);
      return () => ctx.revert();
    }

    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      split = SplitText.create(el, {
        type: by === "chars" ? "lines,chars" : "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          const targets = by === "chars" ? self.chars : self.lines;
          return gsap.fromTo(
            targets,
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: 0.9,
              ease: "power4.out",
              stagger: by === "chars" ? 0.02 : 0.09,
              delay,
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "restart none restart none",
              },
            },
          );
        },
      });
    }, el);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [by, delay]);

  // 動的タグへのref受け渡し。refはeffect内でのみ読む
  // eslint-disable-next-line react-hooks/refs
  return createElement(as, { ref, className }, children);
}

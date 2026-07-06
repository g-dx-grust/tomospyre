"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
};

/** カーソル接近で吸い付き、hoverで熱グラデーションが液体状に満ちる主要CTA */
export default function MagneticButton({
  href,
  children,
  variant = "ghost",
  className,
}: Props) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      prefersReducedMotion()
    ) {
      return;
    }

    const xTo = gsap.quickTo(inner, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(inner, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.32);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.32);
    };
    const onLeave = () => {
      gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const base =
    "btn-liquid inline-flex items-center gap-3 rounded-full px-8 py-4 font-mono text-sm tracking-[0.15em] uppercase transition-colors duration-300";
  const look =
    variant === "solid"
      ? "bg-bone text-void"
      : "border border-bone/25 text-bone";

  return (
    <span ref={wrapRef} className="inline-block p-2 -m-2">
      <Link
        ref={innerRef}
        href={href}
        className={`${base} ${look} ${className ?? ""}`}
      >
        {children}
      </Link>
    </span>
  );
}

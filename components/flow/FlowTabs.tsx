"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { flows } from "@/lib/data/company";

/**
 * 3フロー（制作/派遣/紹介）のARIA準拠タブUI。
 * タブ切替時にステップが時間差で組み上がる。
 */
export default function FlowTabs() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (active + 1) % flows.length;
    if (e.key === "ArrowLeft") next = (active - 1 + flows.length) % flows.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = flows.length - 1;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  const flow = flows[active];

  return (
    <MotionConfig reducedMotion="user">
      <div
        role="tablist"
        aria-label="ご利用の流れの種類"
        className="flex flex-wrap gap-2 border-b border-bone/12 pb-px"
        onKeyDown={onKeyDown}
      >
        {flows.map((f, i) => {
          const selected = i === active;
          return (
            <button
              key={f.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${baseId}-tab-${f.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${f.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative rounded-t px-5 py-3.5 font-jp text-sm font-bold transition-colors md:px-8 md:text-base ${
                selected ? "text-heat-2" : "text-ash hover:text-bone"
              }`}
            >
              <span className="mr-2 font-mono text-[10px] tracking-[0.2em]">
                0{i + 1}
              </span>
              {f.label}
              {selected && (
                <motion.span
                  layoutId="flow-tab-underline"
                  className="heat-bg absolute inset-x-0 -bottom-px h-0.5"
                />
              )}
            </button>
          );
        })}
      </div>

      {flows.map((f, i) => (
        <div
          key={f.id}
          role="tabpanel"
          id={`${baseId}-panel-${f.id}`}
          aria-labelledby={`${baseId}-tab-${f.id}`}
          hidden={i !== active}
          className="pt-14"
        >
          {i === active && (
            <AnimatePresence mode="wait">
              <motion.ol
                key={f.id}
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.09 } },
                }}
              >
                {f.steps.map((step, si) => (
                  <motion.li
                    key={step}
                    variants={{
                      hidden: { opacity: 0, y: 28, scale: 0.97 },
                      show: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                    className="relative border border-bone/12 bg-coal p-7"
                  >
                    <p
                      aria-hidden="true"
                      className="outline-num font-display text-5xl font-bold"
                    >
                      {String(si + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-4 font-jp text-base font-bold leading-snug md:text-lg">
                      {step}
                    </p>
                    {si < f.steps.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 font-mono text-heat-1 lg:block"
                      >
                        →
                      </span>
                    )}
                  </motion.li>
                ))}
              </motion.ol>
            </AnimatePresence>
          )}
        </div>
      ))}

      <p className="mt-10 font-mono text-[11px] tracking-wide text-ash">
        MODE: {flow.labelEn} — {flow.steps.length} STEPS
      </p>
    </MotionConfig>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/nav";
import { LogoLockup } from "@/components/ui/Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // ページ遷移でメニューを閉じる（レンダー中のstate調整パターン）
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <MotionConfig reducedMotion="user">
      <header className="fixed inset-x-0 top-0 z-[100]">
        <div className="flex items-center justify-between border-b border-bone/8 bg-void/55 px-5 py-3 backdrop-blur-xl md:px-8">
          <Link href="/" aria-label="TOMOSPYRE トップページ">
            <LogoLockup />
          </Link>

          <nav aria-label="メイン" className="hidden items-center gap-7 lg:flex">
            {navLinks.map((l) => {
              const active =
                pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`group relative font-mono text-[11px] tracking-[0.2em] transition-colors ${
                    active ? "text-heat-2" : "text-bone/70 hover:text-bone"
                  }`}
                >
                  {l.en}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px w-full heat-bg origin-left transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="btn-liquid rounded-full border border-heat-1/60 px-5 py-2 font-mono text-[11px] tracking-[0.2em] text-heat-2"
            >
              CONTACT
            </Link>
          </nav>

          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-bone/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[95] flex flex-col justify-center overflow-hidden bg-void/97 px-8 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* 粒子の残光 */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 45% at 80% 85%, rgba(255,107,53,0.16), transparent 70%), radial-gradient(ellipse 40% 30% at 15% 15%, rgba(77,216,255,0.07), transparent 70%)",
              }}
            />
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="ember"
                style={{
                  left: `${8 + i * 12}%`,
                  bottom: "-4px",
                  width: `${3 + (i % 3) * 2}px`,
                  height: `${3 + (i % 3) * 2}px`,
                  animationDuration: `${5 + (i % 4) * 2}s`,
                  animationDelay: `${i * 0.7}s`,
                }}
              />
            ))}

            <nav aria-label="モバイルメニュー" className="relative">
              <ul className="space-y-2">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -32 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.45 }}
                  >
                    <Link
                      href={l.href}
                      className="group flex items-baseline gap-4 py-2"
                    >
                      <span className="font-mono text-[10px] tracking-[0.2em] text-heat-1">
                        0{i + 1}
                      </span>
                      <span className="font-display text-4xl font-bold tracking-tight text-bone group-hover:heat-text">
                        {l.en}
                      </span>
                      <span className="text-xs text-ash">{l.label}</span>
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ delay: 0.08 + navLinks.length * 0.06, duration: 0.45 }}
                >
                  <Link href="/contact" className="group flex items-baseline gap-4 py-2">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-heat-1">
                      07
                    </span>
                    <span className="font-display text-4xl font-bold tracking-tight heat-text">
                      CONTACT
                    </span>
                    <span className="text-xs text-ash">お問い合わせ</span>
                  </Link>
                </motion.li>
              </ul>
            </nav>

            <motion.p
              className="relative mt-12 font-mono text-[10px] tracking-[0.25em] text-ash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              IGNITE TOMORROW — NAGOYA / TOKYO / OSAKA
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

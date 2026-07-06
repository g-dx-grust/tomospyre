"use client";

import { motion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * ページ遷移: 熱グラデーションのオーバーレイが画面を舐めて剥がれ、
 * コンテンツがフェードインする。App Routerのtemplateはナビゲーション毎に
 * 再マウントされるため、enterアニメーションが都度発火する。
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden="true"
        className="heat-bg pointer-events-none fixed inset-0 z-[150]"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
        style={{ transformOrigin: "top" }}
      />
      {/* transformを残すとfixed/pinが壊れるため、コンテンツはopacityのみ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

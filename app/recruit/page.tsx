import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ContactCTA from "@/components/ui/ContactCTA";
import Marquee from "@/components/motion/Marquee";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import TiltCard from "@/components/motion/TiltCard";
import RequirementsTable from "@/components/recruit/RequirementsTable";
import { recruitCommon, jobs } from "@/lib/data/recruit";

export const metadata: Metadata = {
  title: "採用情報",
  description: `${recruitCommon.h1} ${recruitCommon.lead}`,
};

export default function RecruitPage() {
  return (
    <>
      <PageHero
        label="RECRUIT — 採用情報"
        titleEn="JOIN US"
        titleJa={recruitCommon.h1}
        lead={recruitCommon.lead}
        vertical="可能性に火を灯す"
      />

      {/* 共通バッジ */}
      <section className="px-5 pb-10 md:px-12" aria-label="採用の特徴">
        <ul className="flex flex-wrap gap-3">
          {recruitCommon.badges.map((b) => (
            <li
              key={b}
              className="rounded-full border border-heat-1/50 px-5 py-2 font-jp text-sm font-bold text-heat-3"
            >
              {b}
            </li>
          ))}
        </ul>
      </section>

      {/* キー数値（ライトセクション・巨大カウントアップ） */}
      <section
        className="light-section mt-16 bg-bone px-5 py-28 text-void md:px-12"
        aria-label="給与・休日"
      >
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div className="border-t-2 border-void pt-6">
            <p className="font-mono text-[10px] tracking-[0.25em] text-void/60">
              SALARY — 月給
            </p>
            <p className="mt-3 font-display font-bold leading-none tracking-tight">
              <CountUp to={recruitCommon.salaryMin} className="text-8xl md:text-9xl" />
              <span className="text-4xl">–</span>
              <CountUp to={recruitCommon.salaryMax} className="text-8xl md:text-9xl" />
              <span className="ml-2 font-jp text-3xl font-bold">万円</span>
            </p>
            <p className="mt-3 text-xs leading-relaxed text-void/60">
              インセンティブあり・昇給あり・残業手当支給
              <br />
              経験・スキル・前職を考慮します
            </p>
          </div>
          <div className="border-t-2 border-void pt-6">
            <p className="font-mono text-[10px] tracking-[0.25em] text-void/60">
              HOLIDAYS — 年間休日
            </p>
            <p className="mt-3 font-display font-bold leading-none tracking-tight">
              <CountUp to={recruitCommon.holidayDays} className="text-8xl md:text-9xl" />
              <span className="ml-2 font-jp text-3xl font-bold">日</span>
            </p>
            <p className="mt-3 text-xs leading-relaxed text-void/60">
              完全週休2日制（土日祝休み）
              <br />
              残業月平均5時間以内
            </p>
          </div>
        </div>
      </section>

      {/* 職種一覧 — 3D tilt + ホバーで奥行き反転 */}
      <section
        className="px-5 py-32 md:px-12"
        aria-labelledby="positions-heading"
      >
        <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
          POSITIONS
        </p>
        <h2
          id="positions-heading"
          className="mt-3 font-jp text-2xl font-bold md:text-4xl"
        >
          募集職種
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j, i) => (
            <Reveal key={j.slug} delay={(i % 3) * 0.07} className="h-full">
              <TiltCard className="h-full">
                <Link
                  href={`/recruit/${j.slug}`}
                  className="flip-card block h-full min-h-72 outline-none"
                  aria-label={`${j.title}の求人を見る`}
                >
                  <span className="flip-inner block h-full min-h-72">
                    <span className="flip-face flex h-full min-h-72 flex-col justify-between border border-bone/12 bg-coal p-7">
                      <span className="flex items-start justify-between">
                        <span
                          aria-hidden="true"
                          className="outline-num font-display text-6xl font-bold"
                        >
                          {j.num}
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.25em] text-heat-2">
                          {j.titleEn}
                        </span>
                      </span>
                      <span>
                        <span className="block font-jp text-xl font-bold leading-snug">
                          {j.title}
                        </span>
                        <span className="heat-rule mt-4 block w-14" />
                      </span>
                    </span>
                    <span className="flip-back flip-face flex h-full flex-col justify-between overflow-hidden bg-bone p-7 text-void">
                      <span className="line-clamp-5 block text-sm leading-relaxed">
                        {j.summary}
                      </span>
                      <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-heat-1">
                        VIEW DETAIL
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </span>
                    </span>
                  </span>
                </Link>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 募集要項（共通） */}
      <section
        className="border-t border-bone/8 bg-coal px-5 py-28 md:px-12"
        aria-labelledby="requirements-heading"
      >
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
            REQUIREMENTS
          </p>
          <h2
            id="requirements-heading"
            className="mt-3 font-jp text-2xl font-bold md:text-4xl"
          >
            募集要項（全職種共通）
          </h2>
          <div className="mt-12">
            <RequirementsTable />
          </div>
        </div>
      </section>

      <Marquee />
      <ContactCTA />
    </>
  );
}

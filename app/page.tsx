import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/home/Hero";
import ServiceGallery from "@/components/home/ServiceGallery";
import Marquee from "@/components/motion/Marquee";
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import CountUp from "@/components/motion/CountUp";
import MagneticButton from "@/components/motion/MagneticButton";
import ContactCTA from "@/components/ui/ContactCTA";
import {
  brand,
  company,
  pillars,
  pillarsLead,
  strengths,
} from "@/lib/data/company";
import { recruitCommon } from "@/lib/data/recruit";

export const metadata: Metadata = {
  title: `${company.name}｜${brand.mainCopy}`,
  description: `${brand.mainCopy} 名古屋発、東京・大阪の3都市5拠点。AIクリエイティブ事業を主軸に、人材支援事業・総合インフラ事業で企業の成長を支えます。`,
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* 02 — 4つの事業ピラー */}
      <section
        className="relative px-5 py-32 md:px-12 md:py-40"
        aria-labelledby="pillars-heading"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-64"
          style={{
            background:
              "radial-gradient(ellipse 70% 100% at 50% -20%, rgba(255,107,53,0.14), transparent 75%)",
          }}
        />
        <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
          02 / BUSINESS
        </p>
        <h2
          id="pillars-heading"
          className="mt-4 max-w-3xl font-jp text-3xl font-bold leading-snug md:text-5xl"
        >
          <TextReveal by="lines">4本柱で、企業の成長を支える。</TextReveal>
        </h2>
        <Reveal className="mt-6 max-w-2xl">
          <p className="text-sm leading-loose text-ash md:text-base">
            {pillarsLead}
          </p>
        </Reveal>

        <div className="mt-20 space-y-0">
          {pillars.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.08}>
              <div
                className={`grid gap-6 border-t border-bone/10 py-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_minmax(0,1.7fr)] md:items-baseline ${
                  i === pillars.length - 1 ? "border-b" : ""
                }`}
              >
                <p
                  aria-hidden="true"
                  className="outline-num font-display text-7xl font-bold leading-none md:text-9xl"
                >
                  {p.num}
                </p>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-heat-2">
                    {p.nameEn}
                  </p>
                  <h3 className="mt-2 font-jp text-xl font-bold md:text-2xl">
                    {p.name}
                  </h3>
                  <p className="mt-2 heat-text font-jp text-sm font-bold">
                    {p.heading}
                  </p>
                </div>
                <p className="text-sm leading-loose text-ash">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12">
          <MagneticButton href="/business">事業内容を見る</MagneticButton>
        </Reveal>
      </section>

      {/* 03 — サービス横スクロールギャラリー */}
      <ServiceGallery />

      <Marquee />

      {/* 04 — Philosophy */}
      <section
        className="relative overflow-hidden px-5 py-32 md:px-12 md:py-44"
        aria-labelledby="philosophy-heading"
      >
        <p
          aria-hidden="true"
          className="v-text absolute right-6 top-1/2 hidden -translate-y-1/2 font-jp text-xs text-bone/30 lg:block"
        >
          人と企業の可能性に火を灯す
        </p>
        <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
          04 / PHILOSOPHY
        </p>
        <h2
          id="philosophy-heading"
          className="mt-6 font-jp font-bold leading-tight"
          style={{ fontSize: "clamp(2.4rem, 7vw, 5.5rem)" }}
        >
          <TextReveal>明日に、火を灯す。</TextReveal>
        </h2>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-6">
          <Reveal>
            <div className="border-l-2 border-heat-1 pl-6">
              <p className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                TOMO
              </p>
              <p className="mt-2 font-mono text-xs tracking-[0.2em] text-heat-2">
                {brand.nameOrigin.tomo.meaning}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="border-l-2 border-heat-2 pl-6">
              <p className="font-display text-4xl font-bold tracking-tight md:text-6xl">
                SPYRE
              </p>
              <p className="mt-2 font-mono text-xs tracking-[0.2em] text-heat-2">
                {brand.nameOrigin.spyre.meaning}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14 max-w-2xl">
          <p className="text-sm leading-loose text-ash md:text-base">
            {brand.nameOrigin.statement}。AIは人の仕事を奪うものではなく、人の「できること」を増やす火種です。
            私たちはその火を、企業の「作る」「届ける」「働く」のすべてに灯していきます。
          </p>
        </Reveal>
      </section>

      {/* 05 — 数値バンド */}
      <section
        className="border-y border-bone/10 bg-coal px-5 py-20 md:px-12"
        aria-label="TOMOSPYREの数字"
      >
        <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          <div>
            <dt className="font-mono text-[10px] tracking-[0.25em] text-ash">
              FOUNDED — 設立
            </dt>
            <dd className="mt-3 font-display font-bold leading-none">
              <CountUp
                to={2025}
                className="text-6xl md:text-7xl"
                duration={1.8}
              />
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] tracking-[0.25em] text-ash">
              OFFICES — 拠点（名古屋・東京・大阪）
            </dt>
            <dd className="mt-3 font-display font-bold leading-none">
              <CountUp to={5} className="heat-text text-6xl md:text-7xl" />
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] tracking-[0.25em] text-ash">
              SERVICES — サービス領域
            </dt>
            <dd className="mt-3 font-display font-bold leading-none">
              <CountUp to={5} className="text-6xl md:text-7xl" />
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] tracking-[0.25em] text-ash">
              LICENSE — 労働者派遣事業許可
            </dt>
            <dd className="mt-3 font-mono text-2xl font-medium tracking-wide text-heat-2 md:text-3xl">
              {company.permit}
            </dd>
          </div>
        </dl>
      </section>

      {/* 06 — Why TOMOSPYRE */}
      <section
        className="px-5 py-32 md:px-12 md:py-40"
        aria-labelledby="why-heading"
      >
        <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
          06 / WHY TOMOSPYRE
        </p>
        <h2
          id="why-heading"
          className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl"
        >
          <TextReveal>WHY US</TextReveal>
        </h2>
        <div className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {strengths.map((s, i) => (
            <Reveal key={s.num} delay={(i % 3) * 0.08}>
              <div className={i % 2 === 1 ? "lg:mt-10" : ""}>
                <p className="font-mono text-[10px] tracking-[0.25em] text-heat-2">
                  {s.num} — {s.titleEn}
                </p>
                <h3 className="mt-3 font-jp text-lg font-bold">{s.title}</h3>
                <div className="heat-rule mt-4 w-16" aria-hidden="true" />
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <Link
              href="/strengths"
              data-cursor="view"
              className="group flex h-full min-h-28 items-center justify-between border border-bone/15 px-6 transition-colors hover:border-heat-1/60 lg:mt-10"
            >
              <span className="font-jp text-sm font-bold">
                選ばれる理由をすべて見る
              </span>
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 07 — Recruit teaser（ライトセクション） */}
      <section
        className="light-section bg-bone px-5 py-32 text-void md:px-12 md:py-44"
        aria-labelledby="recruit-teaser-heading"
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
            07 / RECRUIT
          </p>
          <h2
            id="recruit-teaser-heading"
            className="mt-4 max-w-3xl font-jp font-bold leading-snug"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.4rem)" }}
          >
            <TextReveal by="lines">{recruitCommon.h1}</TextReveal>
          </h2>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            <Reveal>
              <div className="border-t-2 border-void pt-6">
                <p className="font-mono text-[10px] tracking-[0.25em] text-void/60">
                  SALARY — 月給
                </p>
                <p className="mt-2 font-display font-bold leading-none tracking-tight">
                  <CountUp
                    to={recruitCommon.salaryMin}
                    className="text-7xl md:text-8xl"
                  />
                  <span className="text-3xl md:text-4xl">–</span>
                  <CountUp
                    to={recruitCommon.salaryMax}
                    className="text-7xl md:text-8xl"
                  />
                  <span className="ml-2 font-jp text-2xl font-bold md:text-3xl">
                    万円
                  </span>
                </p>
                <p className="mt-2 text-xs text-void/60">
                  インセンティブ・昇給・残業手当あり
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="border-t-2 border-void pt-6">
                <p className="font-mono text-[10px] tracking-[0.25em] text-void/60">
                  HOLIDAYS — 年間休日
                </p>
                <p className="mt-2 font-display font-bold leading-none tracking-tight">
                  <CountUp
                    to={recruitCommon.holidayDays}
                    className="text-7xl md:text-8xl"
                  />
                  <span className="ml-2 font-jp text-2xl font-bold md:text-3xl">
                    日
                  </span>
                </p>
                <p className="mt-2 text-xs text-void/60">
                  完全週休2日制（土日祝休み）
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-14">
            <MagneticButton
              href="/recruit"
              className="!border-void/30 !text-void hover:!text-void"
            >
              採用情報を見る
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* 08 — Contact CTA */}
      <ContactCTA />
    </>
  );
}

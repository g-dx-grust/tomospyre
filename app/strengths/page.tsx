import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactCTA from "@/components/ui/ContactCTA";
import Marquee from "@/components/motion/Marquee";
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import { strengths, company } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "選ばれる理由",
  description: `${company.name}が選ばれる5つの理由。誠実で丁寧な対応、スピード感のある提案、未来を見据えた支援、AIによる制作力、未経験人材の育成力。`,
};

export default function StrengthsPage() {
  return (
    <>
      <PageHero
        label="STRENGTHS — 選ばれる理由"
        titleEn="WHY US"
        titleJa="TOMOSPYREが選ばれる、5つの理由。"
        lead="「明日に火を灯す」という理念と、AIクリエイティブの実行力。私たちが企業からも、働く人からも選ばれ続ける理由をご紹介します。"
        vertical="火を灯す理由"
      />

      <section className="px-5 pb-32 md:px-12" aria-label="選ばれる理由の一覧">
        <div className="space-y-0">
          {strengths.map((s, i) => (
            <Reveal key={s.num}>
              <article
                className={`grid gap-8 border-t border-bone/10 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.6fr)] md:items-start md:py-20 ${
                  i === strengths.length - 1 ? "border-b" : ""
                }`}
              >
                <p
                  aria-hidden="true"
                  className="outline-num select-none font-display font-bold leading-none"
                  style={{ fontSize: "clamp(6rem, 16vw, 13rem)" }}
                >
                  {s.num}
                </p>
                <div className={i % 2 === 1 ? "md:mt-8" : ""}>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-heat-2">
                    {s.titleEn}
                  </p>
                  <h2 className="mt-3 font-jp text-2xl font-bold leading-snug md:text-3xl">
                    <TextReveal by="lines">{s.title}</TextReveal>
                  </h2>
                  <div className="heat-rule mt-6 w-20" aria-hidden="true" />
                </div>
                <p
                  className={`text-sm leading-loose text-ash md:text-base ${
                    i % 2 === 1 ? "md:mt-8" : ""
                  }`}
                >
                  {s.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Marquee />
      <ContactCTA />
    </>
  );
}

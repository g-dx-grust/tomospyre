import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ContactCTA from "@/components/ui/ContactCTA";
import Marquee from "@/components/motion/Marquee";
import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import { pillars, pillarsLead, company } from "@/lib/data/company";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "事業内容",
  description: `${company.name}の事業内容。AIクリエイティブ事業を主軸に、人材支援事業・総合インフラ事業・モバイル販売事業の4本柱で企業の成長を支えます。`,
};

export default function BusinessPage() {
  return (
    <>
      <PageHero
        label="BUSINESS — 事業内容"
        titleEn="4 PILLARS"
        titleJa="企業の成長を支える、4つの事業。"
        lead={pillarsLead}
        vertical="作る・届ける・働くを前へ"
      />

      {pillars.map((p, i) => {
        const isLight = i % 2 === 1;
        return (
        <section
          key={p.num}
          className={`relative overflow-hidden px-5 py-28 md:px-12 md:py-36 ${
            isLight ? "light-section bg-bone text-void" : ""
          }`}
          aria-labelledby={`pillar-${p.num}`}
        >
          <p
            aria-hidden="true"
            className={`outline-num pointer-events-none absolute -top-10 select-none font-display font-bold leading-none ${
              i % 2 === 0 ? "-right-6" : "-left-6"
            }`}
            style={{ fontSize: "clamp(10rem, 30vw, 26rem)" }}
          >
            {p.num}
          </p>
          <div
            className={`relative mx-auto grid max-w-6xl gap-10 md:grid-cols-2 ${
              i % 2 === 1 ? "md:[direction:rtl]" : ""
            }`}
          >
            <div className="md:[direction:ltr]">
              <p
                className={`font-mono text-[10px] tracking-[0.3em] ${
                  isLight ? "text-heat-1" : "text-heat-2"
                }`}
              >
                PILLAR {p.num} — {p.nameEn}
              </p>
              <h2
                id={`pillar-${p.num}`}
                className="mt-4 font-jp text-3xl font-bold leading-snug md:text-5xl"
              >
                <TextReveal by="lines">{p.name}</TextReveal>
              </h2>
              <p
                className={`mt-5 font-jp text-base font-bold md:text-xl ${
                  isLight ? "text-heat-1" : "heat-text"
                }`}
              >
                {p.heading}
              </p>
            </div>
            <Reveal className="md:[direction:ltr]">
              <p
                className={`text-sm leading-loose md:text-base ${
                  isLight ? "text-void/70" : "text-ash"
                }`}
              >
                {p.body}
              </p>
              {i === 0 && (
                <ul className="mt-8 space-y-3">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group flex items-center justify-between border-b border-bone/15 pb-3 text-sm transition-colors hover:text-heat-2"
                      >
                        <span>
                          <span className="mr-3 font-mono text-[10px] text-heat-1">
                            {s.num}
                          </span>
                          {s.nameJa}
                        </span>
                        <ArrowUpRight
                          size={14}
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {i === 1 && (
                <p className="mt-8 font-mono text-xs tracking-wide text-void/60">
                  労働者派遣事業許可番号: {company.permit}
                </p>
              )}
            </Reveal>
          </div>
        </section>
        );
      })}

      <Marquee />
      <ContactCTA />
    </>
  );
}

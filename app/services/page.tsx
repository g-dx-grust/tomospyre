import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ContactCTA from "@/components/ui/ContactCTA";
import Marquee from "@/components/motion/Marquee";
import Reveal from "@/components/motion/Reveal";
import ServiceVisual from "@/components/services/ServiceVisual";
import TiltCard from "@/components/motion/TiltCard";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "サービス一覧",
  description:
    "WEBデザイン、AI画像デザイナー、AI動画編集スタッフ、AI事務効率化、AI WEBマーケティング。TOMOSPYREの5つのAIクリエイティブサービス。",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="SERVICES — サービス一覧"
        titleEn="AI SERVICES"
        titleJa="AIの力で、企業の「作る」「届ける」「働く」を前へ。"
        lead="TOMOSPYREのAIクリエイティブ事業は5つの領域で企業を支援します。制作のスピードとコスト、そして品質。そのすべてをAIと人の掛け算で実現します。"
        vertical="作るを変える"
      />

      <section className="px-5 pb-32 md:px-12" aria-label="サービス一覧">
        <div className="space-y-24 md:space-y-32">
          {services.map((s, i) => (
            <Reveal key={s.slug}>
              <div
                className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
                  i % 2 === 1 ? "md:[direction:rtl]" : ""
                }`}
              >
                <TiltCard className="md:[direction:ltr]">
                  <Link
                    href={`/services/${s.slug}`}
                    data-cursor="view"
                    aria-label={`${s.nameJa}の詳細を見る`}
                    className="group block border border-bone/10 bg-coal transition-colors hover:border-heat-1/50"
                  >
                    <ServiceVisual slug={s.slug} className="h-64 md:h-80" />
                  </Link>
                </TiltCard>
                <div className="md:[direction:ltr]">
                  <p
                    aria-hidden="true"
                    className="outline-num font-display text-8xl font-bold leading-none md:text-9xl"
                  >
                    {s.num}
                  </p>
                  <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-heat-2">
                    SERVICE {s.num} — {s.nameEn}
                  </p>
                  <h2 className="mt-3 font-jp text-2xl font-bold md:text-4xl">
                    {s.nameJa}
                  </h2>
                  <p className="heat-text mt-4 font-jp text-base font-bold md:text-lg">
                    {s.catch}
                  </p>
                  <p className="mt-4 max-w-lg text-sm leading-loose text-ash">
                    {s.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-full border border-bone/15 px-4 py-1.5 text-xs text-bone/75"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group mt-8 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-heat-2"
                  >
                    VIEW DETAIL
                    <ArrowUpRight
                      size={14}
                      aria-hidden="true"
                      className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Marquee />
      <ContactCTA />
    </>
  );
}

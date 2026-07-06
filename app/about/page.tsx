import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import MessagePin from "@/components/about/MessagePin";
import OriginMerge from "@/components/about/OriginMerge";
import ContactCTA from "@/components/ui/ContactCTA";
import Marquee from "@/components/motion/Marquee";
import Reveal from "@/components/motion/Reveal";
import { company, offices, brand } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "会社概要",
  description: `${company.name}の会社概要・代表メッセージ・理念。${brand.locationCopy}。AIクリエイティブ事業を主軸に、人材支援事業・総合インフラ事業を展開しています。`,
};

const profile = [
  { label: "会社名", value: `${company.name}（${company.reading}）` },
  { label: "設立", value: company.founded },
  { label: "資本金", value: company.capital },
  { label: "代表者", value: `${company.ceoTitle} ${company.ceo}` },
  { label: "所在地", value: company.address },
  { label: "事業内容", value: company.business },
  { label: "派遣許可番号", value: company.permit },
  { label: "E-mail", value: company.email },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="ABOUT — 会社概要"
        titleEn="ABOUT US"
        titleJa="明日に火を灯す会社であること。"
        lead="TOMOSPYREは、AIクリエイティブ事業を主軸に、人材支援事業・総合インフラ事業を展開する名古屋発の企業です。人と企業の可能性に火を灯すことを使命としています。"
        vertical="明日に火を灯す"
      />

      {/* 代表メッセージ（pinセクション） */}
      <MessagePin />

      {/* 語源のパララックス合流 */}
      <OriginMerge />

      <Marquee />

      {/* 会社概要（ライトセクション） */}
      <section
        className="light-section bg-bone px-5 py-32 text-void md:px-12"
        aria-labelledby="profile-heading"
      >
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
            COMPANY PROFILE
          </p>
          <h2
            id="profile-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl"
          >
            会社概要
          </h2>
          <Reveal className="mt-12">
            <dl>
              {profile.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-1 border-t border-void/15 py-5 md:grid-cols-[220px_1fr] md:gap-6"
                >
                  <dt className="font-jp text-sm font-bold text-void/60">
                    {row.label}
                  </dt>
                  <dd className="text-sm leading-relaxed md:text-base">
                    {row.label === "E-mail" ? (
                      <a
                        href={`mailto:${company.email}`}
                        className="text-heat-1 underline-offset-4 hover:underline"
                      >
                        {row.value}
                      </a>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              ))}
              <div className="border-t border-void/15" />
            </dl>
          </Reveal>
        </div>
      </section>

      {/* 拠点 */}
      <section
        className="px-5 py-32 md:px-12"
        aria-labelledby="offices-heading"
      >
        <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
          LOCATIONS
        </p>
        <h2
          id="offices-heading"
          className="mt-3 font-jp text-2xl font-bold md:text-4xl"
        >
          {brand.locationCopy}
        </h2>
        <div className="mt-14 grid gap-px overflow-hidden border border-bone/10 bg-bone/10 md:grid-cols-2 lg:grid-cols-3">
          {offices.map((o, i) => (
            <Reveal key={o.city} delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col justify-between bg-void p-7">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] text-heat-2">
                    LOCATION 0{i + 1}
                  </p>
                  <h3 className="mt-3 font-jp text-xl font-bold">{o.city}</h3>
                </div>
                <div className="mt-6">
                  <p className="text-xs leading-relaxed text-ash">{o.address}</p>
                  <p className="mt-2 font-mono text-[11px] text-heat-1">
                    {o.station}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}

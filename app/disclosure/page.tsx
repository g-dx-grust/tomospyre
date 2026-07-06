import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/motion/Reveal";
import { disclosure, company } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "労働者派遣事業に関する情報公開",
  description: `労働者派遣法第23条第5項の規定に基づく${company.name}の情報公開。マージン率、教育訓練、労使協定等の情報を掲載しています。`,
};

export default function DisclosurePage() {
  return (
    <>
      <PageHero
        label="DISCLOSURE — 情報公開"
        titleEn="DISCLOSURE"
        titleJa="労働者派遣事業に関する情報公開"
        lead={`${disclosure.law}（${disclosure.asOf}）`}
      />

      <section
        className="px-5 pb-32 md:px-12"
        aria-label="労働者派遣事業に関する情報"
      >
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <dl>
              {disclosure.items.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-1.5 border-t border-bone/12 py-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] md:gap-8"
                >
                  <dt className="font-jp text-sm font-bold text-ash">
                    {item.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-bone/90 md:text-base">
                    {item.value}
                  </dd>
                </div>
              ))}
              <div className="border-t border-bone/12" />
            </dl>
          </Reveal>

          <Reveal className="mt-12">
            <p className="text-xs leading-relaxed text-ash">
              本情報に関するお問い合わせは{" "}
              <a
                href={`mailto:${company.email}`}
                className="text-heat-2 underline-offset-4 hover:underline"
              >
                {company.email}
              </a>{" "}
              までご連絡ください。
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

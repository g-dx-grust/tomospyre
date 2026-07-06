import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import TextReveal from "@/components/motion/TextReveal";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import ContactCTA from "@/components/ui/ContactCTA";
import ServiceVisual from "@/components/services/ServiceVisual";
import FlowLine from "@/components/services/FlowLine";
import { services, getService } from "@/lib/data/services";
import { jobs } from "@/lib/data/recruit";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return {
    title: `${service.nameJa}｜サービス`,
    description: `${service.catch} ${service.description}`,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const relatedJob = jobs.find((j) => j.serviceSlug === service.slug);

  return (
    <>
      {/* Hero — ページ固有のCSS 3Dビジュアル */}
      <section className="relative overflow-hidden px-5 pb-24 pt-40 md:px-12 md:pt-48">
        <ServiceVisual
          slug={service.slug}
          className="absolute inset-x-0 top-24 h-[420px] opacity-50 md:top-16 md:h-[520px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(5,6,7,0.55) 55%, var(--color-void) 100%)",
          }}
        />
        <div className="relative">
          <p className="font-mono text-[11px] tracking-[0.3em] text-heat-2">
            SERVICE {service.num} — {service.nameEn}
          </p>
          <p
            aria-hidden="true"
            className="outline-num absolute -top-24 right-0 hidden select-none font-display font-bold leading-none lg:block"
            style={{ fontSize: "clamp(10rem, 22vw, 20rem)" }}
          >
            {service.num}
          </p>
          <h1 className="mt-6">
            <TextReveal
              as="span"
              by="lines"
              className="block max-w-4xl font-jp font-bold leading-tight"
            >
              <span style={{ fontSize: "clamp(2rem, 5.5vw, 4.2rem)" }}>
                {service.catch}
              </span>
            </TextReveal>
            <span className="mt-5 block font-jp text-lg font-bold text-heat-2 md:text-2xl">
              {service.nameJa}
            </span>
          </h1>
          <Reveal delay={0.3} className="mt-6 max-w-2xl">
            <p className="text-sm leading-loose text-ash md:text-base">
              {service.description}
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {service.features.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-heat-1/40 px-4 py-1.5 text-xs text-heat-3"
                >
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 課題 */}
      <section
        className="border-t border-bone/8 px-5 py-28 md:px-12"
        aria-labelledby="challenges-heading"
      >
        <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
          CHALLENGES
        </p>
        <h2
          id="challenges-heading"
          className="mt-3 font-jp text-2xl font-bold md:text-4xl"
        >
          <TextReveal by="lines">こんな課題はありませんか？</TextReveal>
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {service.challenges.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className={i % 2 === 1 ? "md:mt-10" : ""}>
                <p
                  aria-hidden="true"
                  className="outline-num font-display text-6xl font-bold"
                >
                  0{i + 1}
                </p>
                <h3 className="mt-4 font-jp text-lg font-bold leading-snug">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-loose text-ash">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 提供価値（ライトセクション） */}
      <section
        className="light-section bg-bone px-5 py-28 text-void md:px-12"
        aria-labelledby="values-heading"
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
            VALUE
          </p>
          <h2
            id="values-heading"
            className="mt-3 font-jp text-2xl font-bold md:text-4xl"
          >
            <TextReveal by="lines">TOMOSPYREが提供する価値</TextReveal>
          </h2>
          <div className="mt-14 space-y-0">
            {service.values.map((v, i) => (
              <Reveal key={v.title}>
                <div className="grid gap-4 border-t border-void/15 py-10 md:grid-cols-[80px_1fr_1.4fr] md:gap-8">
                  <p
                    aria-hidden="true"
                    className="font-display text-4xl font-bold text-heat-1"
                  >
                    0{i + 1}
                  </p>
                  <h3 className="font-jp text-xl font-bold leading-snug">
                    {v.title}
                  </h3>
                  <p className="text-sm leading-loose text-void/70">{v.body}</p>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-void/15" />
          </div>
        </div>
      </section>

      {/* 対応範囲 */}
      <section
        className="px-5 py-28 md:px-12"
        aria-labelledby="scope-heading"
      >
        <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
          SCOPE
        </p>
        <h2
          id="scope-heading"
          className="mt-3 font-jp text-2xl font-bold md:text-4xl"
        >
          対応範囲
        </h2>
        <Reveal className="mt-10">
          <ul className="flex max-w-4xl flex-wrap gap-3">
            {service.scope.map((item) => (
              <li
                key={item}
                className="rounded-full border border-bone/20 px-5 py-2.5 text-sm text-bone/85 transition-colors hover:border-heat-2/60 hover:text-heat-3"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* 制作・運用フロー */}
      <section
        className="border-t border-bone/8 bg-coal px-5 py-28 md:px-12"
        aria-labelledby="flow-heading"
      >
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
              WORKFLOW
            </p>
            <h2
              id="flow-heading"
              className="mt-3 font-jp text-2xl font-bold md:text-4xl"
            >
              制作・運用フロー
            </h2>
            <p className="mt-6 text-sm leading-loose text-ash">
              お問い合わせから納品・運用まで、専任チームがワンストップで伴走します。
            </p>
          </div>
          <FlowLine steps={[...service.flow]} />
        </div>
      </section>

      {/* よくある相談 */}
      <section
        className="px-5 py-28 md:px-12"
        aria-labelledby="faq-heading"
      >
        <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
          FAQ
        </p>
        <h2
          id="faq-heading"
          className="mt-3 font-jp text-2xl font-bold md:text-4xl"
        >
          よくある相談
        </h2>
        <div className="mt-12 max-w-3xl">
          {service.faq.map((f) => (
            <Reveal key={f.q}>
              <details className="group border-b border-bone/12 py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-jp text-base font-bold md:text-lg [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="mr-4 font-display text-heat-1">Q.</span>
                    {f.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-heat-2 transition-transform duration-300 group-open:rotate-45"
                  >
                    ＋
                  </span>
                </summary>
                <p className="mt-4 pl-9 text-sm leading-loose text-ash">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
        {relatedJob && (
          <Reveal className="mt-14">
            <Link
              href={`/recruit/${relatedJob.slug}`}
              className="group inline-flex items-center gap-3 border border-bone/15 px-6 py-4 text-sm transition-colors hover:border-heat-1/60"
            >
              <span className="font-mono text-[10px] tracking-[0.25em] text-heat-2">
                RECRUIT
              </span>
              この仕事に挑戦したい方はこちら — {relatedJob.title}求人
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        )}
      </section>

      <Marquee />
      <ContactCTA />
    </>
  );
}

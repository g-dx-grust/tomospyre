import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import TextReveal from "@/components/motion/TextReveal";
import Reveal from "@/components/motion/Reveal";
import Marquee from "@/components/motion/Marquee";
import MagneticButton from "@/components/motion/MagneticButton";
import ContactCTA from "@/components/ui/ContactCTA";
import RequirementsTable from "@/components/recruit/RequirementsTable";
import { jobs, getJob, recruitCommon } from "@/lib/data/recruit";
import { getService } from "@/lib/data/services";

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const job = getJob((await params).slug);
  if (!job) return {};
  return {
    title: `${job.title} 求人｜採用情報`,
    description: `${job.title}（正社員）の求人情報。${job.summary}`,
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const job = getJob((await params).slug);
  if (!job) notFound();

  const service = getService(job.serviceSlug);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-20 pt-40 md:px-12 md:pt-48">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 55% at 85% 5%, rgba(255,107,53,0.14), transparent 70%)",
          }}
        />
        <p
          aria-hidden="true"
          className="outline-num absolute right-2 top-28 hidden select-none font-display font-bold leading-none lg:block"
          style={{ fontSize: "clamp(9rem, 20vw, 18rem)" }}
        >
          {job.num}
        </p>
        <div className="relative">
          <p className="font-mono text-[11px] tracking-[0.3em] text-heat-2">
            RECRUIT {job.num} — {job.titleEn}
          </p>
          <h1 className="mt-5">
            <TextReveal
              as="span"
              className="block font-jp font-bold leading-tight"
            >
              <span style={{ fontSize: "clamp(2.2rem, 6.5vw, 5rem)" }}>
                {job.title}
              </span>
            </TextReveal>
            <span className="mt-4 block font-jp text-base font-bold text-heat-2 md:text-xl">
              正社員採用・未経験歓迎
            </span>
          </h1>
          <Reveal delay={0.25}>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {recruitCommon.badges.map((b) => (
                <li
                  key={b}
                  className="rounded-full border border-heat-1/50 px-4 py-1.5 font-jp text-xs font-bold text-heat-3"
                >
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.35} className="mt-8 max-w-2xl">
            <p className="text-sm leading-loose text-ash md:text-base">
              {job.summary}
            </p>
          </Reveal>
          <Reveal delay={0.45} className="mt-10">
            <MagneticButton href="/contact" variant="solid">
              この職種に応募する
            </MagneticButton>
          </Reveal>
        </div>
        <div className="heat-rule relative mt-16 w-2/3" aria-hidden="true" />
      </section>

      {/* 仕事内容 */}
      <section className="px-5 py-24 md:px-12" aria-labelledby="duties-heading">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
              JOB DESCRIPTION
            </p>
            <h2
              id="duties-heading"
              className="mt-3 font-jp text-2xl font-bold md:text-3xl"
            >
              仕事内容
            </h2>
          </div>
          <div>
            <ul className="space-y-5">
              {job.duties.map((d, i) => (
                <Reveal key={d} delay={i * 0.06}>
                  <li className="flex items-start gap-4 border-b border-bone/10 pb-5">
                    <span className="mt-0.5 font-mono text-xs text-heat-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-jp text-base font-medium leading-relaxed md:text-lg">
                      {d}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
            {job.training && (
              <Reveal className="mt-8">
                <div className="border-l-2 border-heat-1 bg-coal p-6">
                  <p className="font-mono text-[10px] tracking-[0.25em] text-heat-2">
                    TRAINING — 研修
                  </p>
                  <p className="mt-3 text-sm leading-loose text-bone/85">
                    {job.training}
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* おすすめ / 魅力ポイント */}
      {(job.recommended || job.points || job.appeal) && (
        <section
          className="light-section bg-bone px-5 py-24 text-void md:px-12"
          aria-labelledby="points-heading"
        >
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
              HIGHLIGHTS
            </p>
            <h2
              id="points-heading"
              className="mt-3 font-jp text-2xl font-bold md:text-3xl"
            >
              この仕事の魅力
            </h2>
            <div className="mt-12 grid gap-12 md:grid-cols-2">
              {job.recommended && (
                <div>
                  <h3 className="font-jp text-base font-bold text-void/70">
                    こんな方におすすめ
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {job.recommended.map((r) => (
                      <li key={r} className="flex items-start gap-3">
                        <Check
                          size={16}
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-heat-1"
                        />
                        <span className="text-sm leading-relaxed md:text-base">
                          {r}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(job.points || job.appeal) && (
                <div>
                  <h3 className="font-jp text-base font-bold text-void/70">
                    {job.points ? "おすすめポイント" : "魅力ポイント"}
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-2.5">
                    {(job.points ?? job.appeal ?? []).map((p) => (
                      <li
                        key={p}
                        className="rounded-full border border-void/25 px-4 py-2 font-jp text-sm font-bold"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {job.faq && (
        <section className="px-5 py-24 md:px-12" aria-labelledby="job-faq-heading">
          <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
            FAQ
          </p>
          <h2
            id="job-faq-heading"
            className="mt-3 font-jp text-2xl font-bold md:text-3xl"
          >
            よくある質問
          </h2>
          <div className="mt-10 max-w-3xl">
            {job.faq.map((f) => (
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
        </section>
      )}

      {/* 募集要項 */}
      <section
        className="border-t border-bone/8 bg-coal px-5 py-24 md:px-12"
        aria-labelledby="job-req-heading"
      >
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
            REQUIREMENTS
          </p>
          <h2
            id="job-req-heading"
            className="mt-3 font-jp text-2xl font-bold md:text-3xl"
          >
            募集要項
          </h2>
          <div className="mt-10">
            <RequirementsTable />
          </div>
          {service && (
            <Link
              href={`/services/${service.slug}`}
              className="group mt-10 inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-heat-2"
            >
              この職種が携わるサービスを見る — {service.nameJa}
              <ArrowUpRight
                size={14}
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          )}
        </div>
      </section>

      <Marquee />
      <ContactCTA />
    </>
  );
}

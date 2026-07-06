import Reveal from "@/components/motion/Reveal";
import TextReveal from "@/components/motion/TextReveal";
import MagneticButton from "@/components/motion/MagneticButton";
import { company } from "@/lib/data/company";

/** 全ページ共通の締めCTAバンド */
export default function ContactCTA() {
  return (
    <section
      className="relative overflow-hidden py-32 md:py-44"
      aria-labelledby="cta-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 110%, rgba(255,107,53,0.28), rgba(255,180,84,0.08) 50%, transparent 78%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 text-center md:px-10">
        <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
          CONTACT
        </p>
        <h2
          id="cta-heading"
          aria-label="IGNITE YOUR NEXT"
          className="mt-4 font-display font-bold leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 8vw, 7.5rem)" }}
        >
          <TextReveal as="span" className="block">
            IGNITE
          </TextReveal>
          <TextReveal as="span" className="heat-text block" delay={0.1}>
            YOUR NEXT
          </TextReveal>
        </h2>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-loose text-ash md:text-base">
            AIクリエイティブのご相談も、人材のご相談も、採用のご応募も。
            まずは一度、お話を聞かせてください。
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/contact" variant="solid">
              お問い合わせ
            </MagneticButton>
            <MagneticButton href={`mailto:${company.email}`}>
              {company.email}
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

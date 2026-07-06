import TextReveal from "@/components/motion/TextReveal";
import Reveal from "@/components/motion/Reveal";

type Props = {
  label: string;
  titleEn: string;
  titleJa: string;
  lead?: string;
  vertical?: string;
};

/** 下層ページ共通のHero。巨大EN見出し+日本語タイトル+縦書きアクセント */
export default function PageHero({
  label,
  titleEn,
  titleJa,
  lead,
  vertical,
}: Props) {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-40 md:px-12 md:pb-28 md:pt-48">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 55% at 82% 8%, rgba(255,107,53,0.13), transparent 70%)",
        }}
      />
      {vertical && (
        <p
          aria-hidden="true"
          className="v-text absolute right-5 top-40 hidden font-jp text-xs font-medium text-bone/35 lg:block"
        >
          {vertical}
        </p>
      )}
      <p className="relative font-mono text-[11px] tracking-[0.3em] text-heat-2">
        {label}
      </p>
      <h1 className="relative mt-4">
        <TextReveal
          as="span"
          className="block font-display font-bold leading-[0.92] tracking-[-0.03em]"
        >
          <span style={{ fontSize: "clamp(3rem, 9.5vw, 8.5rem)" }}>
            {titleEn}
          </span>
        </TextReveal>
        <TextReveal
          as="span"
          by="lines"
          delay={0.25}
          className="mt-5 block font-jp text-xl font-bold text-bone/90 md:text-3xl"
        >
          {titleJa}
        </TextReveal>
      </h1>
      {lead && (
        <Reveal delay={0.4} className="relative mt-8 max-w-2xl">
          <p className="text-sm leading-loose text-ash md:text-base">{lead}</p>
        </Reveal>
      )}
      <div className="heat-rule relative mt-14 w-2/3" aria-hidden="true" />
    </section>
  );
}

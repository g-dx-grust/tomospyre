import { brand } from "@/lib/data/company";

type Props = {
  text?: string;
  className?: string;
};

/** セクション区切りの無限マーキー帯 */
export default function Marquee({ text = brand.marquee, className }: Props) {
  const unit = `${text} — `;
  return (
    <div
      className={`overflow-hidden border-y border-bone/10 py-5 ${className ?? ""}`}
      aria-label={text}
    >
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="shrink-0 whitespace-nowrap font-display text-2xl font-medium tracking-[0.18em] text-bone/35 md:text-4xl"
          >
            {unit.repeat(4)}
          </span>
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import MagneticButton from "@/components/motion/MagneticButton";

/** 404 — 消えかけの火の粉が漂う */
export default function NotFound() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 70%, rgba(255,107,53,0.10), transparent 70%)",
        }}
      />
      {[...Array(14)].map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="ember"
          style={{
            left: `${(i * 7.3 + 4) % 96}%`,
            bottom: "-6px",
            width: `${2 + (i % 3) * 2}px`,
            height: `${2 + (i % 3) * 2}px`,
            opacity: 0,
            animationDuration: `${6 + (i % 5) * 2.2}s`,
            animationDelay: `${i * 0.9}s`,
          }}
        />
      ))}

      <p className="font-mono text-[11px] tracking-[0.3em] text-heat-2">
        SIGNAL LOST — PAGE NOT FOUND
      </p>
      <h1
        className="heat-text mt-4 font-display font-bold leading-none tracking-tight"
        style={{ fontSize: "clamp(8rem, 28vw, 22rem)" }}
      >
        404
      </h1>
      <p className="mt-6 max-w-md text-sm leading-loose text-ash">
        お探しのページは見つかりませんでした。
        <br />
        火種は消えても、次の火はすぐに灯せます。
      </p>
      <div className="mt-10">
        <MagneticButton href="/" variant="solid">
          トップへ戻る
        </MagneticButton>
      </div>
      <Link
        href="/contact"
        className="mt-6 font-mono text-xs tracking-[0.2em] text-heat-2 underline-offset-4 hover:underline"
      >
        お問い合わせはこちら
      </Link>
    </section>
  );
}

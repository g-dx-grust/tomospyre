/** サービスごとの固有CSS 3Dビジュアル（WebGL不使用・軽量） */
export default function ServiceVisual({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`vis-stage relative overflow-hidden ${className ?? "h-56"}`}
    >
      {slug === "web-design" && (
        <div className="vis-grid-plane absolute -inset-x-16 top-1/4 bottom-[-30%]" />
      )}

      {slug === "ai-image-design" && (
        <>
          <div className="vis-frame left-[14%] top-[18%] h-28 w-40 rounded-sm" />
          <div
            className="vis-frame left-[42%] top-[38%] h-32 w-44 rounded-sm"
            style={{ animationDelay: "-2.4s" }}
          />
          <div
            className="vis-frame left-[66%] top-[12%] h-24 w-32 rounded-sm"
            style={{ animationDelay: "-4.8s" }}
          />
        </>
      )}

      {slug === "ai-video-editing" && (
        <>
          <div className="absolute inset-x-0 top-[30%] h-px bg-bone/15" />
          <div className="absolute inset-x-0 top-[55%] h-px bg-bone/15" />
          <div className="absolute inset-x-0 top-[80%] h-px bg-bone/15" />
          <div className="vis-clip w-40" style={{ top: "26%" }} />
          <div
            className="vis-clip w-28"
            style={{ top: "51%", animationDelay: "-1.8s" }}
          />
          <div
            className="vis-clip w-52"
            style={{ top: "76%", animationDelay: "-3.4s" }}
          />
        </>
      )}

      {slug === "ai-office-automation" && (
        <>
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 300 200"
            preserveAspectRatio="none"
          >
            <path
              d="M60 150 L150 100 L240 140 M150 100 L110 45 M150 100 L225 55"
              stroke="rgba(255,180,84,0.3)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
          {[
            { left: "18%", top: "72%" },
            { left: "48%", top: "48%", delay: "-0.6s" },
            { left: "78%", top: "68%", delay: "-1.2s" },
            { left: "34%", top: "20%", delay: "-1.8s" },
            { left: "73%", top: "25%", delay: "-2.4s" },
          ].map((n, i) => (
            <span
              key={i}
              className="vis-node"
              style={{
                left: n.left,
                top: n.top,
                animationDelay: n.delay,
              }}
            />
          ))}
        </>
      )}

      {slug === "ai-web-marketing" && (
        <>
          {[12, 28, 44, 60, 76].map((left, i) => (
            <div
              key={left}
              className="vis-bar"
              style={{
                left: `${left}%`,
                height: `${38 + i * 13}%`,
                animationDelay: `${-i * 0.9}s`,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

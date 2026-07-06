/** T字+スパイア+発火点のブランドマーク（favicon.svgと同一モチーフ） */
export function LogoMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="TOMOSPYRE"
    >
      <defs>
        <linearGradient
          id="lgCore"
          x1="14"
          y1="52"
          x2="50"
          y2="10"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#FFB454" />
          <stop offset="0.48" stopColor="#F5F7FA" />
          <stop offset="1" stopColor="#56E4FF" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#07090D" />
      <path
        d="M18 18h28"
        fill="none"
        stroke="url(#lgCore)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M32 18v32"
        fill="none"
        stroke="url(#lgCore)"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M22 48l10-18 10 18"
        fill="none"
        stroke="#F5F7FA"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.88"
      />
      <path
        d="M32 8c4.8 5.5 5.2 11.2 0 16.4C26.8 19.2 27.2 13.5 32 8z"
        fill="#FFB454"
      />
      <circle cx="48" cy="16" r="2.8" fill="#56E4FF" />
      <circle cx="16" cy="24" r="1.8" fill="#FFB454" opacity="0.78" />
    </svg>
  );
}

export function LogoLockup() {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-[0.08em]">
          TOMOSPYRE
        </span>
        <span className="mt-1 font-mono text-[9px] tracking-[0.12em] text-ash">
          AI Creative / Human Resource / Infrastructure
        </span>
      </span>
    </span>
  );
}

import Link from "next/link";
import { navLinks, legalLinks } from "@/lib/nav";
import { services } from "@/lib/data/services";
import { jobs } from "@/lib/data/recruit";
import { company, brand } from "@/lib/data/company";
import { LogoMark } from "@/components/ui/Logo";
import IgniteWordmark from "@/components/layout/IgniteWordmark";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-bone/8 bg-void">
      <div className="px-5 pt-24 md:px-10">
        <IgniteWordmark />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:px-10">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark size={40} />
            <div className="leading-tight">
              <p className="font-display text-lg font-bold tracking-wide">
                TOMOSPYRE
              </p>
              <p className="text-xs text-ash">{company.name}</p>
            </div>
          </div>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ash">
            {brand.mainCopy}
            <br />
            {brand.locationCopy}。
          </p>
          <dl className="mt-6 space-y-1.5 font-mono text-[11px] leading-relaxed tracking-wide text-ash">
            <div>
              <dt className="sr-only">メールアドレス</dt>
              <dd>
                <a
                  href={`mailto:${company.email}`}
                  className="text-heat-2 underline-offset-4 hover:underline"
                >
                  {company.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="sr-only">所在地</dt>
              <dd>{company.address}</dd>
            </div>
            <div>
              <dt className="sr-only">労働者派遣事業許可番号</dt>
              <dd>労働者派遣事業許可番号: {company.permit}</dd>
            </div>
          </dl>
        </div>

        <nav aria-label="サイトマップ">
          <p className="font-mono text-[10px] tracking-[0.25em] text-heat-1">
            SITEMAP
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/" className="text-bone/75 hover:text-heat-2">
                トップ
              </Link>
            </li>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-bone/75 hover:text-heat-2">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="text-bone/75 hover:text-heat-2">
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="サービス一覧">
          <p className="font-mono text-[10px] tracking-[0.25em] text-heat-1">
            SERVICES
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-bone/75 hover:text-heat-2"
                >
                  {s.nameJa}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="採用情報">
          <p className="font-mono text-[10px] tracking-[0.25em] text-heat-1">
            RECRUIT
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {jobs.map((j) => (
              <li key={j.slug}>
                <Link
                  href={`/recruit/${j.slug}`}
                  className="text-bone/75 hover:text-heat-2"
                >
                  {j.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-bone/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-[11px] text-ash md:flex-row md:items-center md:justify-between md:px-10">
          <p className="font-mono tracking-wide">
            © 2025 TOMOSPYRE Inc. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-heat-2">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

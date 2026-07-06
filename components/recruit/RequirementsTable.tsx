import Reveal from "@/components/motion/Reveal";
import { recruitCommon } from "@/lib/data/recruit";
import { offices } from "@/lib/data/company";

/** 募集要項（全職種共通）+ 勤務地5拠点 */
export default function RequirementsTable({
  light = false,
}: {
  light?: boolean;
}) {
  const border = light ? "border-void/15" : "border-bone/12";
  const labelColor = light ? "text-void/60" : "text-ash";

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "雇用形態", value: recruitCommon.employment },
    { label: "給与", value: recruitCommon.salary },
    {
      label: "年収例",
      value: (
        <ul className="space-y-1">
          {recruitCommon.salaryExamples.map((e) => (
            <li key={e.income}>
              <span className="font-bold">{e.income}</span>
              <span className="ml-2 text-sm opacity-75">{e.detail}</span>
            </li>
          ))}
        </ul>
      ),
    },
    { label: "勤務時間", value: recruitCommon.hours },
    { label: "休日・休暇", value: recruitCommon.holidays },
    {
      label: "福利厚生",
      value: recruitCommon.benefits.join("／"),
    },
    {
      label: "歓迎",
      value: recruitCommon.welcome.join("／"),
    },
    {
      label: "勤務地",
      value: (
        <ul className="space-y-3">
          {offices.map((o) => (
            <li key={o.address}>
              <p>{o.address}</p>
              <p className="mt-0.5 font-mono text-xs text-heat-1">
                {o.station}
              </p>
            </li>
          ))}
        </ul>
      ),
    },
    {
      label: "応募の流れ",
      value: recruitCommon.applyFlow.join(" → "),
    },
  ];

  return (
    <Reveal>
      <dl>
        {rows.map((row) => (
          <div
            key={row.label}
            className={`grid gap-1 border-t ${border} py-5 md:grid-cols-[200px_1fr] md:gap-6`}
          >
            <dt className={`font-jp text-sm font-bold ${labelColor}`}>
              {row.label}
            </dt>
            <dd className="text-sm leading-relaxed md:text-base">
              {row.value}
            </dd>
          </div>
        ))}
        <div className={`border-t ${border}`} />
      </dl>
    </Reveal>
  );
}

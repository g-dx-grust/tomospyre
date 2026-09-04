import Reveal from "@/components/motion/Reveal";
import { recruitCommon, type Job } from "@/lib/data/recruit";
import { offices } from "@/lib/data/company";

/**
 * 募集要項テーブル。
 * job を渡すと、その職種に設定された労働条件で共通条件を上書きする。
 * job なし（採用トップ）ではAIクリエイティブ5職種の共通条件を表示する。
 */
export default function RequirementsTable({
  light = false,
  job,
}: {
  light?: boolean;
  job?: Job;
}) {
  const border = light ? "border-void/15" : "border-bone/12";
  const labelColor = light ? "text-void/60" : "text-ash";

  // 給与を職種側で上書きしている場合、共通の年収例は条件が合わないため出さない
  const showSalaryExamples = !job?.salary;

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "雇用形態", value: job?.employment ?? recruitCommon.employment },
    { label: "給与", value: job?.salary ?? recruitCommon.salary },
    ...(showSalaryExamples
      ? [
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
        ]
      : []),
    { label: "勤務時間", value: job?.hours ?? recruitCommon.hours },
    { label: "休日・休暇", value: job?.holidays ?? recruitCommon.holidays },
    ...(job?.requirements
      ? [
          {
            label: "応募資格",
            value: (
              <ul className="space-y-1.5">
                {job.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            ),
          },
        ]
      : []),
    {
      label: "福利厚生",
      value: (job?.benefits ?? recruitCommon.benefits).join("／"),
    },
    {
      label: "歓迎",
      value: (job?.welcome ?? recruitCommon.welcome).join("／"),
    },
    {
      label: "勤務地",
      value: job?.workplaces ? (
        <ul className="space-y-1.5">
          {job.workplaces.map((w) => (
            <li key={w}>{w}</li>
          ))}
        </ul>
      ) : (
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

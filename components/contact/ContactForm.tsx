"use client";

import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import { contactTypes, company } from "@/lib/data/company";

type FormState = {
  companyName: string;
  person: string;
  email: string;
  tel: string;
  type: string;
  message: string;
};

const REQUIRED: (keyof FormState)[] = ["person", "email", "type", "message"];

/**
 * お問い合わせフォーム。バックエンド未設定のため、入力内容から
 * subject/body を組み立てた mailto リンクでメーラーを起動する。
 * 入力進行に応じて熱色のプログレスバーが満ちていく。
 */
export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    companyName: "",
    person: "",
    email: "",
    tel: "",
    type: "",
    message: "",
  });

  const set =
    (key: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const filled = REQUIRED.filter((k) => form[k].trim() !== "").length;
  const progress = filled / REQUIRED.length;
  const ready = progress === 1;

  const mailto = useMemo(() => {
    const subject = `【お問い合わせ】${form.type || "未選択"}／${
      form.companyName || form.person
    }`;
    const body = [
      `会社名: ${form.companyName || "（未記入）"}`,
      `ご担当者名: ${form.person}`,
      `メールアドレス: ${form.email}`,
      `電話番号: ${form.tel || "（未記入）"}`,
      `お問い合わせ種別: ${form.type}`,
      "",
      "お問い合わせ内容:",
      form.message,
    ].join("\n");
    return `mailto:${company.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }, [form]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) return;
    window.location.href = mailto;
  };

  const inputCls =
    "w-full border border-bone/15 bg-coal px-4 py-3.5 text-sm text-bone placeholder:text-ash/50 outline-none transition-colors focus:border-heat-2/60";

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      {/* 入力プログレス */}
      <div className="mb-10">
        <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-ash">
          <span>INPUT PROGRESS</span>
          <span aria-live="polite">
            {filled} / {REQUIRED.length} REQUIRED
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={REQUIRED.length}
          aria-valuenow={filled}
          aria-label="必須項目の入力進行"
          className="mt-3 h-1 w-full overflow-hidden rounded bg-bone/10"
        >
          <div
            className="heat-bg h-full origin-left rounded transition-transform duration-500"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>

      <div className="grid gap-7 md:grid-cols-2">
        <div className="field-wrap">
          <label
            htmlFor="companyName"
            className="mb-2 block font-jp text-sm font-bold"
          >
            会社名
            <span className="ml-2 font-mono text-[9px] tracking-widest text-ash">
              OPTIONAL
            </span>
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            autoComplete="organization"
            className={inputCls}
            placeholder="株式会社◯◯"
            value={form.companyName}
            onChange={set("companyName")}
          />
        </div>

        <div className="field-wrap">
          <label
            htmlFor="person"
            className="mb-2 block font-jp text-sm font-bold"
          >
            ご担当者名
            <span className="ml-2 font-mono text-[9px] tracking-widest text-heat-1">
              REQUIRED
            </span>
          </label>
          <input
            id="person"
            name="person"
            type="text"
            required
            autoComplete="name"
            className={inputCls}
            placeholder="山田 太郎"
            value={form.person}
            onChange={set("person")}
          />
        </div>

        <div className="field-wrap">
          <label
            htmlFor="email"
            className="mb-2 block font-jp text-sm font-bold"
          >
            メールアドレス
            <span className="ml-2 font-mono text-[9px] tracking-widest text-heat-1">
              REQUIRED
            </span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputCls}
            placeholder="you@example.com"
            value={form.email}
            onChange={set("email")}
          />
        </div>

        <div className="field-wrap">
          <label htmlFor="tel" className="mb-2 block font-jp text-sm font-bold">
            電話番号
            <span className="ml-2 font-mono text-[9px] tracking-widest text-ash">
              OPTIONAL
            </span>
          </label>
          <input
            id="tel"
            name="tel"
            type="tel"
            autoComplete="tel"
            className={inputCls}
            placeholder="052-000-0000"
            value={form.tel}
            onChange={set("tel")}
          />
        </div>

        <div className="field-wrap md:col-span-2">
          <label
            htmlFor="type"
            className="mb-2 block font-jp text-sm font-bold"
          >
            お問い合わせ種別
            <span className="ml-2 font-mono text-[9px] tracking-widest text-heat-1">
              REQUIRED
            </span>
          </label>
          <select
            id="type"
            name="type"
            required
            className={`${inputCls} appearance-none`}
            value={form.type}
            onChange={set("type")}
          >
            <option value="" disabled>
              選択してください
            </option>
            {contactTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="field-wrap md:col-span-2">
          <label
            htmlFor="message"
            className="mb-2 block font-jp text-sm font-bold"
          >
            お問い合わせ内容
            <span className="ml-2 font-mono text-[9px] tracking-widest text-heat-1">
              REQUIRED
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={7}
            className={inputCls}
            placeholder="ご相談内容をご記入ください"
            value={form.message}
            onChange={set("message")}
          />
        </div>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-ash">
        ※
        送信ボタンを押すと、ご入力内容を本文にセットした状態でお使いのメールソフトが起動します（宛先:
        {company.email}）。そのまま送信してください。
      </p>

      <button
        type="submit"
        disabled={!ready}
        className={`btn-liquid mt-8 inline-flex items-center gap-3 rounded-full border px-10 py-4 font-mono text-sm uppercase tracking-[0.15em] transition-colors ${
          ready
            ? "border-heat-1/60 text-heat-2"
            : "cursor-not-allowed border-bone/10 text-ash/50"
        }`}
      >
        <Send size={15} aria-hidden="true" />
        メールソフトで送信する
      </button>
    </form>
  );
}

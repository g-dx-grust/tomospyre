import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/motion/Reveal";
import { company } from "@/lib/data/company";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: `${company.name}へのお問い合わせ。AIクリエイティブ・WEB制作・人材派遣・有料職業紹介のご相談、採用応募はこちらから。`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="CONTACT — お問い合わせ"
        titleEn="CONTACT"
        titleJa="まずは、お話を聞かせてください。"
        lead="AIクリエイティブのご相談も、人材のご相談も、採用のご応募も。内容が固まっていなくても大丈夫です。担当より折り返しご連絡いたします。"
        vertical="火を灯す相談"
      />

      <section
        className="px-5 pb-32 md:px-12"
        aria-label="お問い合わせフォーム"
      >
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.7fr_1fr]">
          <ContactForm />

          <Reveal>
            <aside className="h-fit border border-bone/10 bg-coal p-8">
              <p className="font-mono text-[10px] tracking-[0.3em] text-heat-1">
                DIRECT
              </p>
              <h2 className="mt-3 font-jp text-lg font-bold">
                その他の連絡先
              </h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.25em] text-ash">
                    E-MAIL
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={`mailto:${company.email}`}
                      className="font-mono text-heat-2 underline-offset-4 hover:underline"
                    >
                      {company.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.25em] text-ash">
                    ADDRESS
                  </dt>
                  <dd className="mt-1.5 leading-relaxed text-bone/85">
                    {company.address}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-[0.25em] text-ash">
                    LICENSE
                  </dt>
                  <dd className="mt-1.5 font-mono text-bone/85">
                    労働者派遣事業許可番号 {company.permit}
                  </dd>
                </div>
              </dl>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}

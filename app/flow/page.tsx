import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactCTA from "@/components/ui/ContactCTA";
import FlowTabs from "@/components/flow/FlowTabs";

export const metadata: Metadata = {
  title: "ご利用の流れ",
  description:
    "AIクリエイティブ制作・人材派遣・有料職業紹介、それぞれのご相談から開始・納品までの流れをご案内します。",
};

export default function FlowPage() {
  return (
    <>
      <PageHero
        label="FLOW — ご利用の流れ"
        titleEn="HOW IT WORKS"
        titleJa="ご相談から、火が灯るまで。"
        lead="AIクリエイティブ制作、人材派遣、有料職業紹介。それぞれのサービスで、お問い合わせから開始・納品までの流れをご案内します。どのサービスも、まずは無料のご相談から始まります。"
        vertical="はじめの一歩"
      />

      <section
        className="px-5 pb-32 md:px-12"
        aria-label="サービス別のご利用の流れ"
      >
        <FlowTabs />
      </section>

      <ContactCTA />
    </>
  );
}

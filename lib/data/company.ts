export const SITE_URL = "https://tomospyre.jp";

export const company = {
  name: "株式会社TOMOSPYRE",
  nameEn: "TOMOSPYRE Inc.",
  reading: "トモスパイア",
  founded: "2025年6月19日",
  foundedYear: 2025,
  capital: "2,000万円",
  ceo: "川口 凌",
  ceoTitle: "代表取締役",
  address:
    "〒460-0017 愛知県名古屋市中区松原三丁目-2-8 MATSUBARA328Building 501",
  business: "労働者派遣事業／有料職業紹介事業／モバイル販売事業",
  permit: "派23-304400",
  email: "info@tomospyre.jp",
} as const;

export const brand = {
  mainCopy: "AIとひとの力で、できることを増やしていく。",
  subThemes: [
    "明日に火を灯す",
    "人と企業の可能性に火を灯す",
    "AIの力で、企業の「作る」「届ける」「働く」を前へ進める",
  ],
  nameOrigin: {
    tomo: { word: "TOMO", meaning: "Tomorrow — 明日" },
    spyre: { word: "SPYRE", meaning: "Inspire — 鼓舞する" },
    statement: "TOMOSPYREは明日に火を灯す会社",
  },
  locationCopy: "名古屋発、東京・大阪へ。3都市5拠点で展開",
  heroLabel: "AI CREATIVE COMPANY — NAGOYA / TOKYO / OSAKA",
  marquee: "IGNITE TOMORROW — AI CREATIVE STUDIO — NAGOYA / TOKYO / OSAKA",
} as const;

export const ceoMessage = {
  paragraphs: [
    "TOMOSPYREは、一人ひとりの可能性を信じ、その可能性に火を灯すために生まれた会社です。",
    "私たちは企業と人の間に立つ会社として、何よりも誠実さを大切にしています。条件のマッチングだけで終わるのではなく、企業文化との相性や、その先にある将来性まで見据えて、双方にとって本当に良い出会いをつくること。それが私たちの仕事だと考えています。",
    "まだ若い会社です。だからこそ、一つひとつの出会いに全力で向き合えます。目の前の企業の課題に、目の前の一人のキャリアに、妥協なく伴走する。その積み重ねだけが、信頼になると信じています。",
    "そしてこれからは、AIクリエイティブの領域でも、企業や人の挑戦を支えていきます。AIは人の仕事を奪うものではなく、人の「できること」を増やす火種です。私たちはその火を、一つひとつ丁寧に灯していきます。",
    "明日に火を灯す。その名に恥じない会社であり続けます。",
  ],
  signature: "代表取締役 川口 凌",
} as const;

export const pillars = [
  {
    num: "01",
    name: "AIクリエイティブ事業",
    nameEn: "AI CREATIVE",
    heading: "AIの力で、企業の『作る』を変える",
    body: "WEBデザイン、AI画像生成、AI動画編集、AI事務効率化、AI WEBマーケティングの5領域で、企業のクリエイティブ制作とマーケティング活動を支援。AIツール活用でスピーディーかつ低コストに高品質なアウトプットを実現します。",
  },
  {
    num: "02",
    name: "人材支援事業",
    nameEn: "HUMAN RESOURCE",
    heading: "人と企業をつなぐ",
    body: "労働者派遣事業・有料職業紹介事業として、AI分野をはじめとした専門人材の紹介・派遣を行います。未経験からでも挑戦できる育成体制を整えています。（許可番号: 派23-304400）",
  },
  {
    num: "03",
    name: "総合インフラ事業",
    nameEn: "INFRASTRUCTURE",
    heading: "企業活動を支える基盤づくり",
    body: "企業の日々の業務を支えるインフラ関連サービスを提供し、安定した事業運営をバックアップします。",
  },
  {
    num: "04",
    name: "モバイル販売事業",
    nameEn: "MOBILE SALES",
    heading: "通信を「届ける」現場を、人の力で支える",
    body: "携帯電話・スマートフォンおよび通信サービスの販売・ご案内を行う事業です。商業施設やイベント会場での販売イベントの運営、店頭での接客・販売を担い、通信キャリアと生活者をつなぐ最前線を支えます。未経験から始められる研修体制のもと、販売スタッフの育成・配置まで一貫して対応します。",
  },
] as const;

export const pillarsLead =
  "TOMOSPYREは「AIクリエイティブ事業」を主軸に、「人材支援事業」「総合インフラ事業」「モバイル販売事業」の4本柱で企業の成長を支えています。";

export const offices = [
  {
    city: "名古屋・栄",
    address: "〒460-0003 愛知県名古屋市中区錦３丁目２５−１１",
    station: "栄駅から徒歩5分",
  },
  {
    city: "名古屋・名駅",
    address: "〒450-0002 愛知県名古屋市中村区名駅１丁目１−３",
    station: "名古屋駅から徒歩5分",
  },
  {
    city: "名古屋・金山",
    address: "〒460-0022 愛知県名古屋市中区金山１丁目１７−１",
    station: "金山駅から徒歩5分",
  },
  {
    city: "東京・渋谷",
    address: "〒150-0042 東京都渋谷区宇田川町２７−４",
    station: "渋谷駅から徒歩5分",
  },
  {
    city: "大阪・梅田",
    address: "〒530-0018 大阪府大阪市北区小松原町３−３",
    station: "梅田駅から徒歩5分",
  },
] as const;

export const strengths = [
  {
    num: "01",
    title: "誠実で丁寧な対応",
    titleEn: "INTEGRITY",
    body: "企業と人の間に立つ会社として、私たちは誠実さを何よりの資本と考えています。目先の成約ではなく、双方が納得できる着地点まで丁寧に対話を重ねる。その積み重ねが、長くお付き合いいただける信頼につながっています。",
  },
  {
    num: "02",
    title: "スピード感のあるご提案",
    titleEn: "SPEED",
    body: "お問い合わせへの一次回答から人材・制作のご提案まで、意思決定を待たせないスピードを徹底しています。AIを日常的に使いこなすチームだからこそ、リサーチや資料作成の初速が違います。",
  },
  {
    num: "03",
    title: "人と企業の未来を見据えた支援",
    titleEn: "FORESIGHT",
    body: "条件のマッチングだけでは、良い出会いは長続きしません。企業文化との相性、本人のキャリアの伸びしろ、事業の将来性まで見据えて、数年後にも「良かった」と言えるご縁をつくります。",
  },
  {
    num: "04",
    title: "AIを活用した制作スピードと品質",
    titleEn: "AI POWERED",
    body: "WEB制作・画像生成・動画編集・業務効率化・マーケティングの5領域でAIをフル活用。従来の制作フローでは実現できないスピードと、人の目による丁寧な仕上げを両立し、低コストで高品質なアウトプットを届けます。",
  },
  {
    num: "05",
    title: "未経験人材の育成力",
    titleEn: "EDUCATION",
    body: "現役でAI事業に携わる社員による研修体制で、未経験からAIクリエイティブの担い手を育てています。「明日に火を灯す」という理念のとおり、可能性に火が付く瞬間まで伴走することが私たちの強みです。",
  },
] as const;

export const flows = [
  {
    id: "creative",
    label: "AIクリエイティブ制作",
    labelEn: "AI CREATIVE",
    steps: [
      "お問い合わせ",
      "ヒアリング",
      "企画/設計",
      "AI制作/編集",
      "確認/修正",
      "納品/公開/運用",
    ],
  },
  {
    id: "dispatch",
    label: "人材派遣",
    labelEn: "STAFFING",
    steps: [
      "お問い合わせ・ヒアリング",
      "人材の選定・ご提案",
      "職場見学・顔合わせ",
      "派遣契約・就業開始",
      "就業後フォロー",
    ],
  },
  {
    id: "placement",
    label: "有料職業紹介",
    labelEn: "PLACEMENT",
    steps: [
      "お問い合わせ・求人のお打ち合わせ",
      "候補者の選定・ご紹介",
      "面接・選考",
      "内定・条件交渉",
      "入社・フォローアップ",
    ],
  },
] as const;

export const disclosure = {
  law: "労働者派遣法第23条第5項の規定に基づき、以下の情報を公開いたします。",
  asOf: "情報公開日: 2026年3月19日現在",
  items: [
    { label: "事業所名称", value: "株式会社TOMOSPYRE" },
    {
      label: "事業所所在地",
      value:
        "〒460-0017 愛知県名古屋市中区松原三丁目-2-8 MATSUBARA328Building",
    },
    { label: "派遣労働者の数", value: "5名" },
    { label: "派遣先事業所数", value: "2社" },
    {
      label: "労働者派遣に関する料金額の平均（1日8時間あたり）",
      value: "20,000円",
    },
    {
      label: "派遣労働者の賃金額の平均（1日8時間あたり）",
      value: "13,500円",
    },
    { label: "マージン率", value: "32.5%" },
    { label: "労使協定の締結", value: "有" },
    { label: "対象となる派遣労働者の範囲", value: "全ての派遣労働者" },
    { label: "労使協定の有効期間", value: "2026/3/1〜2027/2/28" },
    {
      label: "教育訓練",
      value:
        "安全衛生／個人情報の取り扱い／ビジネスマナー研修／各職種別スキルアップ研修",
    },
    {
      label: "マージンに含まれる費用",
      value:
        "各種保険料、福利厚生、交通費、営業・採用活動費、オフィス賃料、求人広告費、通信費、営業利益",
    },
  ],
} as const;

export const contactTypes = [
  "AIクリエイティブの相談",
  "WEB制作の相談",
  "AI画像/動画制作の相談",
  "AI事務効率化の相談",
  "AI WEBマーケティングの相談",
  "人材派遣の相談",
  "有料職業紹介の相談",
  "採用応募",
  "その他",
] as const;

export const recruitCommon = {
  h1: "AIの仕事、未経験からはじめませんか？",
  lead: "TOMOSPYREでは、WEBデザイン・AI画像デザイナー・AI動画編集スタッフ・AI事務効率化・AI WEBマーケティングの5職種で、AI業界に挑戦する仲間を募集しています。",
  employment: "正社員",
  salary:
    "月給 25万円〜48万円（インセンティブあり・昇給あり・残業手当支給／経験・スキル・前職を考慮）",
  salaryMin: 25,
  salaryMax: 48,
  salaryExamples: [
    {
      income: "年収400万円",
      detail: "1年目 役職なし（23歳／前職: アパレル販売）",
    },
    {
      income: "年収520万円",
      detail: "3年目 PM（29歳／前職: 不動産営業）",
    },
  ],
  hours: "10:00〜19:00（休憩1時間／残業月平均5時間以内）",
  holidays: "完全週休2日制（土日祝休み）・年間休日125日",
  holidayDays: 125,
  benefits: [
    "交通費全額支給",
    "健康保険",
    "厚生年金",
    "雇用保険",
    "労災保険",
    "資格取得制度",
    "外部研修補助制度",
    "1on1制度",
    "育休産休",
    "有給休暇あり",
  ],
  applyFlow: ["ご応募", "担当より案内", "面接（Web面接OK）", "内定"],
  welcome: [
    "学歴・経歴・資格不問",
    "20代大活躍中",
    "副業・WワークOK",
    "自由度高い働き方をしたい方",
    "未経験から挑戦したい方",
  ],
  badges: ["Web面接OK", "20代大活躍", "年間休日125日", "月給25万〜48万円"],
} as const;

export type Job = {
  slug: string;
  num: string;
  title: string;
  titleEn: string;
  serviceSlug: string;
  summary: string;
  duties: string[];
  recommended?: string[];
  points?: string[];
  appeal?: string[];
  training?: string;
  faq?: { q: string; a: string }[];
};

export const jobs: Job[] = [
  {
    slug: "web-designer",
    num: "01",
    title: "WEBデザイナー",
    titleEn: "WEB DESIGNER",
    serviceSlug: "web-design",
    summary:
      "未経験からAIを使ったデザインの仕事に挑戦。AIを活用してHP制作・WEBデザインを担当します。ロゴやサイト内デザインも対応。充実した研修制度があり、コードの知識は不要です。",
    duties: [
      "AIを活用したホームページ制作・WEBデザイン",
      "ロゴ・サイト内素材のデザイン",
      "クライアントの要望に沿ったデザイン提案",
    ],
    recommended: [
      "AIの仕事に興味がある",
      "未経験からスキルを身につけたい",
      "デザイン系に興味がある",
    ],
    points: [
      "未経験からプロのデザイナーになれる",
      "現役AI講師によるサポート",
      "髪色・髪型自由",
      "将来的にリモート勤務相談可能",
    ],
  },
  {
    slug: "ai-image-designer",
    num: "02",
    title: "AI画像生成デザイナー",
    titleEn: "AI IMAGE DESIGNER",
    serviceSlug: "ai-image-design",
    summary:
      "PC操作未経験からOK。AIを用いてWEBサイトに必要な画像を生成し、微修正を加えてクライアントへ提出します。先輩のサポートのもと、一から業務を学べます。",
    duties: [
      "AIによるWEBサイト用画像の生成",
      "生成画像の微修正・仕上げ",
      "クライアントへの納品対応",
    ],
    appeal: [
      "完全未経験OK",
      "年間休日125日",
      "20代大活躍中",
      "男女比4:6",
      "残業少なめ",
      "PC初心者OK",
    ],
    faq: [
      {
        q: "未経験でも大丈夫ですか？",
        a: "大丈夫です。入社後は先輩デザイナーがマンツーマンでサポートし、AIツールの使い方から仕上げの技術まで一から学べる研修体制を整えています。現在活躍中のメンバーもほとんどが未経験からのスタートです。",
      },
      {
        q: "パソコンが不安でも大丈夫ですか？",
        a: "ご安心ください。PC初心者の方でも基本操作から丁寧にレクチャーします。AIツールは直感的に使えるものが中心なので、文字入力ができれば十分スタートできます。",
      },
    ],
  },
  {
    slug: "ai-video-editor",
    num: "03",
    title: "AI動画編集スタッフ",
    titleEn: "AI VIDEO EDITOR",
    serviceSlug: "ai-video-editing",
    summary:
      "AIを使用した動画の一から制作、既存動画の編集、先輩業務のサポートを担当します。入社後はAI事業で活躍する社員から研修を受けられ、経験・実力次第で早期にAI事業へ携わることも可能です。",
    duties: [
      "AIを使用した動画の制作",
      "既存動画の編集",
      "先輩業務のサポート",
    ],
    training:
      "入社後はAI事業で活躍する社員から研修を受けられます。経験・実力次第で早期にAI事業へ携わることも可能です。",
    appeal: [
      "完全週休二日制",
      "年間休日125日",
      "完全未経験OK",
      "副業・WワークOK",
      "平均年齢27.5歳",
    ],
  },
  {
    slug: "ai-office-automation",
    num: "04",
    title: "AI事務効率化スタッフ",
    titleEn: "AI OFFICE AUTOMATION STAFF",
    serviceSlug: "ai-office-automation",
    summary:
      "最初は先輩のサポートからスタート。AIを活用した事務作業、クライアントの業務効率化を担当します。社内・社外双方の効率化をAIで推進する仕事です。",
    duties: [
      "AIを活用した事務作業",
      "クライアントの業務効率化サポート",
      "社内業務のAI活用推進",
    ],
    recommended: [
      "AIの仕事に興味がある",
      "未経験からスキルを身につけたい",
      "事務や効率化に興味がある",
    ],
  },
  {
    slug: "ai-web-marketer",
    num: "05",
    title: "AI WEBマーケター",
    titleEn: "AI WEB MARKETER",
    serviceSlug: "ai-web-marketing",
    summary:
      "未経験からAIを使ったWEBマーケティングに挑戦。AIを活用して広告運用・WEBマーケティングを担当します。広告文やSNS投稿、リサーチ資料の作成もAIで対応します。",
    duties: [
      "AIを活用した広告運用・WEBマーケティング",
      "広告文・SNS投稿の作成",
      "リサーチ資料の作成",
    ],
    points: [
      "未経験からプロのマーケターになれる",
      "現役AI講師のサポート",
      "髪色・髪型自由",
      "将来的にリモート勤務相談可能",
    ],
  },
];

export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);

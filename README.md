# TOMOSPYRE Corporate Site (v2)

株式会社TOMOSPYREのコーポレートサイト。
Next.js (App Router) + TypeScript + Tailwind CSS v4 + three.js/R3F + GSAP + Lenis。

## ローカル起動

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 本番ビルド
npm run start    # 本番ビルドの起動確認
```

## GitHubへのpush

```bash
git init
git add -A
git commit -m "TOMOSPYRE corporate site v2"
# GitHubで空リポジトリを作成した後:
git remote add origin git@github.com:<org>/<repo>.git
git branch -M main
git push -u origin main
```

## Vercelへのデプロイ

1. [vercel.com/new](https://vercel.com/new) で GitHub リポジトリを Import
2. **Framework Preset: Next.js**（自動検出。Build/Output設定の変更は不要）
3. Deploy を押すだけ。環境変数は不要
4. 以後は `main` への push で自動デプロイ

## ドメイン切替メモ（tomospyre.jp）

1. Vercel のプロジェクト → **Settings → Domains** で `tomospyre.jp` と `www.tomospyre.jp` の両方を追加する
2. **現在のネームサーバーはそのまま**とし、DNSレコードのうち **A / CNAME のみ**を変更する（ネームサーバーごとVercelへ移すのは非推奨）
   - apex（`tomospyre.jp`）: **Aレコード** → Vercelの管理画面に表示されるIPアドレスを設定
   - `www`: **CNAMEレコード** → Vercelの管理画面に表示される値（例: `cname.vercel-dns.com`）を設定
   - いずれも **Vercelの画面に表示される値を正**とすること（値は変わることがある）
3. ⚠️ **メールで使用中の MX / TXT / SPF / DKIM レコードは絶対に削除・変更しないこと。**
   `info@tomospyre.jp` の送受信はこれらのレコードに依存している。触るのはA/CNAMEのみ
4. 追加後、Vercel側の検証が通り証明書が発行されるまで待つ（通常は数分〜）

## 構成メモ

- コンテンツの正データは `lib/data/` に集約（会社情報・サービス・求人・情報公開）
- three.js を含む Hero は `next/dynamic`（`ssr: false`）で遅延ロード
- `prefers-reduced-motion: reduce` では 3D静止・アニメーション即時完了・Lenis無効化
- 全20ページ + 404 / OGP・robots・sitemap 自動生成

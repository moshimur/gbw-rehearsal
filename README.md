# YUBI

> 声がなくても、助けは届く。

YUBI は、言葉が通じない・声が出せない・通信がない緊急時に、指さしだけで状況を伝えられるコミュニケーション PWA です。

## Demo

- https://gbw-rehearsal.pages.dev

## Why

訪日旅行者、聴覚・発話に困難のある人、災害で通信を失った人。助けが必要な瞬間ほど、スマートフォンの翻訳サービスに文章を入力する余裕はありません。YUBI は「選ぶ → 見せる」の2ステップに絞り、緊急時の認知負荷を減らします。

## Features

- 医療・道迷い・危険・災害の4シナリオ
- 日本語、英語、中国語、韓国語、スペイン語
- 画面いっぱいの高視認性メッセージ
- Web Speech API による読み上げ
- Service Worker によるオフライン動作
- アカウント・位置情報・外部送信なし
- キーボード操作、Reduced Motion、セマンティックHTMLに対応

## 3-minute demo

1. 「旅行中、体調が急変したが日本語が話せない」と状況を説明
2. English を選び「体調が悪い」→「救急車を呼んでください」
3. 全画面表示と英語読み上げを実演
4. DevTools の Offline に切り替えて同じ操作が動くことを見せる
5. 「最も弱い瞬間に、最も少ない操作で」を締めのメッセージにする

## Tech

依存ゼロの HTML / CSS / JavaScript PWA。静的ファイルだけで Cloudflare Pages に配信しています。

## Local development

```sh
npx serve .
```

## Built with Codex

企画設計、情報設計、多言語データ、アクセシビリティ、PWA 実装、検証、GitHub / Cloudflare Pages へのデプロイまで Codex と協働して制作しました。

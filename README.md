# Pump Track

## アプリ概要

筋トレ記録アプリ。
日々行った筋トレの種目や回数を管理できる。

## 制作した目的

- ポートフォリオとしてアプリの開発能力を示す
  - Webアプリ開発の概観を理解している
  - プロジェクトに含まれる技術スタックを用いて、アプリ開発ができる
- 普段の筋トレ記録で使う
  - Notionで筋トレ記録をしていたが、筋トレ用のアプリではないので不便なところに目がついた。Notionを筋トレ記録に用いる際の課題として以下が挙げられる。
    - 数字入力が面倒くさい
      - 大体1セット10回のメニューを組んでいるので、そこからの差分をボタンで入力できたりすれば楽になる。
    - 定義したセット数より多いセット数で記録できない(Notionのデータベースのカラムをドロップセット数分増やせば可能)
      - できそう。
    - 重量の伸びがわかりづらい
      - 種目ごとのボリューム表示や重量のグラフ表示があれば、ひと目見てわかりやすい。

## 技術スタック

- Next.js
- Typescript
- PostgreSQL
- Jest
- Vercel
- devcontainer

## プロジェクト管理

- GitHub の issue と Project機能 を用いてタスクを管理する
- ブランチ管理は、GitHub Flow を用いる

## 制作期間

2025/3/21 〜 3/28

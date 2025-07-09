#tailwind CSS
```
shall:
#Tailwind CSS スタート
npm init -y

#関連ツールインストール
npm install -D tailwindcss@^3 postcss autoprefixer

#設定ファイルの生成
npx tailwindcss init -p

#ビルド監視
npx tailwindcss -i ./src/input.css -o ./output.css --watch

#ビルドのショートカット
npm run watch
```

- tailwind.config.js
    - module.exports.content を編集

- src/input.css
```
css:
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- ショートカットコマンドの設定
```
javascript:package.json
"scripts": {
  "watch": "tailwindcss -i ./src/input.css -o ./output.css --watch"
},
```



#Git
```
shall:
#初期化
git init

#リモートリポジトリを登録
git remote add origin https://github.com/あなたのユーザー名/リポジトリ名.git
```

- 除外設定
```
text:.gitignore
# 単一ファイルを除外
secret.txt

# 特定フォルダを除外（中身含めて）
logs/

# 特定の拡張子を除外
*.log

# 特定のフォルダ配下のファイルすべてを除外
private/**

# .env など設定ファイルを除外
.env
```



#Shopify
```
shall:
#Shopify CLIのインストール
npm install -g @shopify/cli

#開発サーバーを起動
shopify theme dev --store xn-lck6azkx98l36t.myshopify.com

#テーマのリスト取得
shopify theme list --store xn-lck6azkx98l36t.myshopify.com

##テーマIDを確認しダウンロード
shopify theme pull --store xn-lck6azkx98l36t.myshopify.com -t 179028623646

##単体でのダウンロード
shopify theme pull --only <フォルダ>/<ファイル>

#デプロイ
##既存テーマを更新
shopify theme push -t 179028623646

##新しい非公開テーマとしてアップ
shopify theme push --unpublished -n "2025-06-09 リリース候補"

##単体でのデプロイ
shopify theme push --only <フォルダ>/<ファイル>
```
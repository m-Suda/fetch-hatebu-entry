# site-scraping-base

## 概要
webサイトを[Puppeteer](https://pptr.dev/)でスクレイピングするためのベースリポジトリ。\
スクレイピングしたいサイトのモデルファイルを作成するだけで拡張可能な設計にしている。

## 前提
- `Node.js`がインストールされていること。
    - 作成者のversionは`8.10`

## 使い方
1. 必要なモジュールのインストール
`package.json`があるディレクトリで、
```
$ npm install
```

2. 実行
※ちなみにそのままだとはてブテクノロジーの人気、新着エントリーの取得を行う。
```
$ npm start
```

3. jsonファイルが生成される。
出力先ディレクトリ
```
.
├── .gitignore
├── README.md
├── dist
│   └── json // ← このディレクトリに出力される。
│       ├── entry-list.json
│       └── hot-entry.json
etc...
```

## 構成
```
.
├── .gitignore              
├── README.md               
├── dist                    // スクレイピング結果が出力される
│   └── json                // jsonファイルの出力先
│       ├── entry-list.json 
│       └── hot-entry.json  
├── interface               
│   └── EntryContent.ts     
├── package-lock.json       
├── package.json            
├── src                     // ソースディレクトリ
│   ├── app.ts              // メインで実行されるクラス
│   └── site                
│       ├── ISite.ts        // サイト抽象クラス
│       └── hatebu          // スクレイピング先サイト具象クラス
├── test
│   └── screenshot
└── tsconfig.json
```

スクレイピングしたいサイトのクラスを`src/site/ISite.ts`を継承して実装する。\
実装者は`abstract extract(browser: Browser)`メソッドのみを実装すれば良い。\
実際の`page`初期化や例外時の処理はテンプレートとして作成してあるので実装者は気にしなくてよい。
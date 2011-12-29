# GasLoader
## GasLoaderとは
- Google Apps Script用のScript Loaderです。
- Google Docsまたは公開されたサーバ上にあるjavascriptファイルを読み込んでGAS内で利用できるようにします。

## 使い方
### サーバー上にあるファイルを読み込む場合
  
  GasLoader.require("https://raw.github.com/soundTricker/gasmarty-jarty_for_google_apps_script/master/src/jarty.js",null , 0);
  
  - 第一引数 url
  - 第二引数 charset 文字コード
  - 第三引数 cacheSecond スクリプトをキャッシュする時間 0の場合はキャッシュされません。 何も指定しないとデフォルト値でキャッシュされます。

### Google Docsからファイルを読み込む場合

   GasLoader.requireFromDocs({key}  , 0);

  - 第一引数 key Google Docsのkey
  - 第二引数 cacheSecond スクリプトをキャッシュする時間 0の場合はキャッシュされません。何も指定しないとデフォルト値でキャッシュされます。

### キャッシュされたファイルを削除する。

   GasLoader.removeCache({key});
  - 第一引数 key Google Docsのkey またはurl
  
## 注意
- 外部スクリプトを読むのでセキュリティに気をつけてください。
- 外部から読み込んだファイル側にSpreadsheetなどの認証が必要なAPIへの依存関係がある場合、呼び出し側で同じAPIを呼んでないと、認証ダイアログがでません。

## やりたいなぁ
- 非同期で取ってこれるようにしたいけどAPIないよ。。。


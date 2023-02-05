# mongodbとreduxを使ったCRUDの実装

バックエンド： mongodbを使用  
フロントエンド： redux、typescriptを使用

【フロントエンド】アプリケーション画面
![img.png](img.png)

ログイン実行後  
mongodbから取得したデータを表示し、編集ができるようになる。
![img_1.png](img_1.png)

【バックエンド】mongodb画面

user： user情報に関するデータが格納されている。  
trade_informationに： trade, book, productからなるデータが格納されている。
![img_3.png](img_3.png)
![img_2.png](img_2.png)

【詳細】
バックエンド
- JWTをCRSF Tokenを用いて、不正なアクセスが行われないようにしている。  
初めての実装だったため、こちらの
[ソース](https://github.com/aekasitt/fastapi-csrf-protect)
を参考にしている。
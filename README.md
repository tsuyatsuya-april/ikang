# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
# アプリケーション名
## I can g

# アプリケーション概要
幹事向けアプリです。イベントの日程と店を決めて、参加者に通知します。そして参加者から参加状況と店の評価を記載してもらいイベントの日程を決めます。集約が取りにくい、意見が広いにくい場合を考慮して、匿名でのコメント投稿機能や行きたい店の投票機能を実装してます。

# URL
未作成(10月上旬アップ予定)

# テスト用アカウント
未作成(10月上旬アップ予定)

# 利用方法
①トップページにアクセス後、ユーザー登録を行ってください。  
②イベント作成ページに移動して、イベント名、日程、候補店を入力した後、イベント作成ボタンをクリックください。  
③次の遷移画面で記載されたURLをコピーして、参加者に通知してください。  
④参加者は回答ページに遷移し、ニックネームや日付毎の参加状況、店の評価、投票を記載し、回答ボタンをクリックください。  
⑤締め切りの日程を目処に回答状況を見て、決定フォームに主催者が日時と店を決定してください。  
⑥再度参加者に通知してください。  

# 目指した課題解決
イベントを開催する方が２点の問題を解決することを目指しました。  
参加者からの意見が拾い難いという点  
店のアンケートを取り難いという点  
特に店のアンケートとコメント機能は人の目を気にするような方でも投稿しやすいように匿名性を意識しました。

# 実装予定の機能
・カレンダーから日付を選択する機能  
・複数テーブル・複数レコードを登録する機能  
・googlemapで店の地図を反映させる機能  
・画像を投稿できる機能  
・コメント機能  
・日本語化機能  
・SNSとの連携機能  
・URL生成機能  
・モーダルウィンドウでの登録機能  

# DB設計
## users テーブル
| Column    | Type    | OPtions         |
| --------- | ------- | --------------- |
| nickname  | string  | null: false     |
| name      | string  | null: false     |
| email     | string  | null: false     |
| password  | string  | null: false     |

### Association
- has_many :events

## events テーブル
| Column    | Type    | OPtions         |
| --------- | ------- | --------------- |
| user_id | references | foreign_key: true |
| name      | string  | null: false     |
| description | text  |                |
| url       | text    |                 |

### Association
- belongs_to :user
- has_many :dates
- has_many :schedules
- has_one :decision
- has_many :joins
- has_many :comments

## schedule　テーブル
| Column    | Type    | OPtions         |
| --------- | ------- | --------------- |
| event_id | references | foreign_key: true |
| day      | save_date  | null: false     |
| string     | save_time  | null: false     |

### Association
- belongs_to :event
- has_one :date_answer
- has_one :decision

## schedules　テーブル
| Column    | Type    | OPtions         |
| --------- | ------- | --------------- |
| event_id | references | foreign_key: true |
| name     | string | null: false     |
| url      | text   | null: false     |
| googlemap | text  | null: false     |
| comment  | text   | null: false     |

### Association
- belongs_to :event
- has_one :schedule_answer
- has_one :decision

## joins　テーブル
| Column    | Type    | OPtions         |
| --------- | ------- | --------------- |
| event_id | references | foreign_key: true |
| nickname | string   | null: false     |
| email    | text     | null: false     |

### Association
- belongs_to :event
- has_many :date_answers
- has_many :schedule_answers

## date_answers
| Column    | Type    | OPtions         |
| --------- | ------- | --------------- |
| join_id | references | foreign_key: true |
| date_id | references | foreign_key: true |
| status | integer     | null: false    |

### Association
- belongs_to :date
- has_many :joins

## schedule_answers
| Column    | Type    | OPtions         |
| --------- | ------- | --------------- |
| join_id | references | foreign_key: true |
| date_id | references | foreign_key: true |
| status | integer     | null: false    |
| vote   | integer    |                 |

### Association
- belongs_to :schedule
- has_many :joins

## comments
| Column    | Type    | OPtions         |
| --------- | ------- | --------------- |
| event_id | references | foreign_key: true |
| content | text      | null: false     |

### Association
- belongs_to :user

## decisions
| Column    | Type    | OPtions         |
| --------- | ------- | --------------- |
| event_id  | references | foreign_key: true |
| date | d_date         | null: false     |
| string | d_time         | null: false     |
| schedule_name | string | null: false     |
| aggregation_time | time |             |
| station | string |                    |
| location | string |                   |
| map     | text   |                    |
| add_comment | text |                  |

### Association
- belongs_to :event
- belongs_to :date
- belongs_to :schedule
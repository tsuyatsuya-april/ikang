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
## 何だか今日もいい幹事

# アプリケーション概要
幹事向けアプリです。イベントの日程と店を決めて、参加者に通知します。そして参加者から参加状況と店の評価を記載してもらいイベントの日程を決めます。集約が取りにくい、意見が広いにくい場合を考慮して、匿名でのコメント投稿機能や行きたい店の投票機能を実装してます。

# URL
http://kyomo-ikang.com/events/5

# テスト用アカウント
ゲストログインで簡易ログインできます。

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
・モーダルウィンドウでの登録機能
・URL生成機能    
・コメント機能   
  


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

### Association
- belongs_to :user
- has_many :schedules, inverse_of: :event, dependent: :destroy
- accepts_nested_attributes_for :schedules, allow_destroy: true
- has_many :shops, inverse_of: :event, dependent: :destroy
- accepts_nested_attributes_for :shops, allow_destroy: true
- has_many :joins, dependent: :destroy
- has_one :date_decision
- has_one :shop_decision
- has_many :comments

## schedules　テーブル
| Column    | Type    | OPtions         |
| --------- | ------- | --------------- |
| event_id | references | foreign_key: true |
| savedate      | date  | null: false     |
| savetime     | string  | null: false     |

### Association
- belongs_to :event, inverse_of: :schedules
- validates_presence_of :event
- has_many :date_answer
- has_one :decision

## shops　テーブル
| Column    | Type    | OPtions         |
| --------- | ------- | --------------- |
| event_id | references | foreign_key: true |
| shop_name     | string | null: false     |
| shop_url      | text   |      |
| map_url | text  |      |
| comment  | text   |      |

### Association
- belongs_to :event, inverse_of: :shops
- validates :shop_name, presence: true
- has_many :schedule_answer
- has_one :decision

## joins　テーブル
| Column    | Type    | OPtions         |
| --------- | ------- | --------------- |
| event_id | references | foreign_key: true |
| nickname | string   | null: false     |
| email    | text     |     |

### Association
- belongs_to :event
- has_many :date_answers, dependent: :destroy
- accepts_nested_attributes_for :date_answers, allow_destroy: true
- has_many :schedule_answers, dependent: :destroy
- accepts_nested_attributes_for :shop_answers, allow_destroy: true

## date_answers
| Column    | Type    | OPtions         |
| --------- | ------- | --------------- |
| join_id | references | foreign_key: true |
| schedule_id | references | foreign_key: true |
| status | integer     | null: false    |

### Association
- belongs_to :schedule
- belongs_to :join
- validates_presence_of :join
## shop_answers
| Column    | Type    | OPtions         |
| --------- | ------- | --------------- |
| join_id | references | foreign_key: true |
| shop_id | references | foreign_key: true |
| status | integer     | null: false    |
| vote   | integer    |                 |

### Association
- belongs_to :shop
- belongs_to :join
- validates_presence_of :join

## comments
| Column    | Type    | OPtions         |
| --------- | ------- | --------------- |
| event_id | references | foreign_key: true |
| content | text      | null: false     |

### Association
- belongs_to :event

## date_decisions
| Column    | Type    | OPtions         |
| --------- | ------- | --------------- |
| event_id  | references | foreign_key: true |
| schedule_id | references | foreign_key :true |
| status | integer         | null: false     |

## shop_decisions
| Column    | Type    | OPtions         |
| --------- | ------- | --------------- |
| event_id  | references | foreign_key: true |
| shop_id  | references | foreign_key: true |
| status | integer         | null: false     |


### Association
- belongs_to :event
- belongs_to :date
- belongs_to :schedule
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|u_name|string|null: false|
|password|string|null: false|
### Association
- has_many :messages
- has_many :groups, through: :users_gruoups



## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|g_name|string|null: false|
### Association
- has_many :messages
- has_many :users, through: :users_gruoups


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|message|text|null: true|
|image|text|null: true|
|time_data|string|null: false|
|u_id|integer|null: false|
### Association
- belongs_to :user
- belongs_to :group


## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|group_id|integer|null: false|
### Association
- belongs_to :user
- belongs_to :group


FactoryBot.define do
  factory :shop do
    shop_name { "仮のお店です" }
    shop_url  { Faker::Internet.url }
    map_url { Faker::Internet.url }
    comment { "コメントです" }
    association :event
  end
end
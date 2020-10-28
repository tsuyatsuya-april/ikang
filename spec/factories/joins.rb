FactoryBot.define do
  factory :join do
    nickname { "テスト次郎" }
    email { Faker::Internet.free_email }

    trait :with_nested_instances do
      after( :create ) do |join|
        create :date_answer, id: join.id
        create :shop_answer, id: join.id
      end
    end
    association :event
  end
end
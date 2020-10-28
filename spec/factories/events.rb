FactoryBot.define do
  factory :event do
    name {"テスト太郎"}
    description { "テスト概要です" }

    trait :with_nested_instances do
      after( :create ) do |event|
        create :schedule, id: event.id
        create :shop, id: event.id
      end
    end
    association :user
  end
end
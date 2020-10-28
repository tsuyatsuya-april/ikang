FactoryBot.define do
  factory :shop_decision do
    status { 1 }
    association :event
    association :shop
  end
end
FactoryBot.define do
  factory :shop_answer do
    status { 1 }
    vote  { 1 }
    association :shop
    association :join
  end
end
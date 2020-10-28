FactoryBot.define do
  factory :schedule do
    savedate { Faker::Date.in_date_period }
    savetime  { "19:00" }
    association :event
  end
end
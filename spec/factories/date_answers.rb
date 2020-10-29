FactoryBot.define do
  factory :date_answer do
    status { 1 }
    association :schedule
    association :join
  end
end
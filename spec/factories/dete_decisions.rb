FactoryBot.define do
  factory :date_decision do
    status { 1 }
    association :event
    association :schedule
  end
end
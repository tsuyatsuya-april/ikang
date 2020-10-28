FactoryBot.define do
  factory :comment do
    context { "これはテストコメントです" }
    association :event
  end
end
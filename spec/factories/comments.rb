FactoryBot.define do
  factory :comment do
    content { "これはテストコメントです" }
    association :event
  end
end
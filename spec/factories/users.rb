FactoryBot.define do
  factory :user do
    nickname          { Faker::Name.initials(number: 2) }
    name              { Faker::Name.initials(number: 2) }
    email             { Faker::Internet.free_email }
    password = 'abcdefg8'
    password { password }
    password_confirmation { password }
  end
end

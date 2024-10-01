FactoryBot.define do
  factory :user do
    name { Faker::Name.name_with_middle }
    email { Faker::Internet.email }
    user_name { "ad#{Faker::Number.unique.number(digits: 5)}" }
    password { '123456' }
  end
end

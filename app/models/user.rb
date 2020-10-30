class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :events
  with_options presence: true do
    validates :nickname
    validates :name
  end

  def self.guest
    find_or_create_by!(email: 'test@gmail.com') do |user|
      user.password = "testtest"
    end
  end
end

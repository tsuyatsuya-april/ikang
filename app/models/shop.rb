class Shop < ApplicationRecord
  belongs_to :event, inverse_of: :shops
  validates_presence_of :event
  has_many :shop_answer, dependent: :destroy
  has_one :shop_decision

  validates :shop_name, presence: true
end

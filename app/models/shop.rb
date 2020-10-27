class Shop < ApplicationRecord
  belongs_to :event, inverse_of: :shops
  validates_presence_of :event
  has_many :shop_answer, dependent: :destroy
  has_many :shop_decisions

  validates :shop_name, presence: true

  
end

class Shop < ApplicationRecord
  belongs_to :event, inverse_of: :shops
  validates_presence_of :event
  has_many :shop_answer, dependent: :destroy
  has_one :shop_decision, dependent: :destroy

  validates :shop_name, presence: true
  validates :shop_url, format: /\A#{URI::regexp(%w(http https))}\z/


end

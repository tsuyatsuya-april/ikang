class Shop < ApplicationRecord
  belongs_to :event, inverse_of: :shops
  validates_presence_of :event
  has_many :shop_answer, dependent: :destroy
  has_one :shop_decision, dependent: :destroy

  validates :shop_name, presence: true
  url_reg = /\Ahttp(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/
  validates :shop_url, format: { with: url_reg, message: '正式なurlの添付をお願いします' }
  
end

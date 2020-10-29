class Shop < ApplicationRecord
  belongs_to :event, inverse_of: :shops
  validates_presence_of :event
  has_many :shop_answer, dependent: :destroy
  has_one :shop_decision, dependent: :destroy

  VALID_URL_REGEX = /https?:\/\/[\w\/:%#\$&\?\(\)~\.=\+\-]+|\A\z/
  validates :shop_name, presence: true
  validates :shop_url, format: { with: VALID_URL_REGEX, message: "再度入力お願いします" }

end

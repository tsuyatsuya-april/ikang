class ShopAnswer < ApplicationRecord
  belongs_to :join
  validates_presence_of :join
  belongs_to :shop
end

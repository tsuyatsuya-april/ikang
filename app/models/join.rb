class Join < ApplicationRecord
  belongs_to :event
  has_many :date_answers, dependent: :destroy
  accepts_nested_attributes_for :date_answers, allow_destroy: true
  has_many :shop_answers, dependent: :destroy
  accepts_nested_attributes_for :shop_answers, allow_destroy: true
end

class Event < ApplicationRecord
  belongs_to :user
  has_many :schedules, inverse_of: :event, dependent: :destroy
  accepts_nested_attributes_for :schedules, allow_destroy: true
  has_many :shops, inverse_of: :event, dependent: :destroy
  accepts_nested_attributes_for :shops, allow_destroy: true
  has_many :joins, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_one :date_decision
  has_one :shop_decision

  validates :name, presence: true
  validates :description, presence: true

end

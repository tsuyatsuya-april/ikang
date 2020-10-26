class Schedule < ApplicationRecord
  belongs_to :event, inverse_of: :schedules
  validates_presence_of :event
  has_many :date_answer, dependent: :destroy
  has_many :date_decisions

  validates :savedate, presence: true
end

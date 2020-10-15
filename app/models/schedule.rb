class Schedule < ApplicationRecord
  belongs_to :event, inverse_of: :schedules
  validates_presence_of :event
  has_many :date_answer, dependent: :destroy

  validates :savedate, presence: true
end

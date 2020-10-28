class Schedule < ApplicationRecord
  belongs_to :event, inverse_of: :schedules
  validates_presence_of :event
  has_many :date_answer, dependent: :destroy
  has_one :date_decision, dependent: :destroy

  validates :savedate, presence: true

  def date_time
    self.savedate.to_s.slice(5,2)+ "月" + self.savedate.to_s.slice(8, 2) + "日/" + self.savetime.to_s + "~"
  end
end

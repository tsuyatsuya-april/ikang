class DateAnswer < ApplicationRecord
  belongs_to :join
  validates_presence_of :join
  belongs_to :schedule
end

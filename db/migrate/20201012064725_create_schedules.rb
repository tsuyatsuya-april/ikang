class CreateSchedules < ActiveRecord::Migration[6.0]
  def change
    create_table :schedules do |t|
      t.references :event, null: false, foreign_key: true
      t.date :savedate, null: false
      t.string :savetime, null: false
      t.timestamps
    end
  end
end

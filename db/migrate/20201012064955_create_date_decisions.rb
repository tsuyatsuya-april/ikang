class CreateDateDecisions < ActiveRecord::Migration[6.0]
  def change
    create_table :date_decisions do |t|
      t.references :event, foreign_key: true
      t.references :schedule, foreign_key: true
      t.integer :status, null: false
      t.timestamps
    end
  end
end

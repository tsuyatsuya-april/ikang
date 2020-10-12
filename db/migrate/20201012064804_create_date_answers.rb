class CreateDateAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :date_answers do |t|
      t.references :join, foreign_key: true
      t.references :schedule, foreign_key: true
      t.integer :status
      t.timestamps
    end
  end
end

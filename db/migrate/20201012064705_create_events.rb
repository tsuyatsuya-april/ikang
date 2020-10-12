class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.references :user, foreign_key: true
      t.string :name, null: false
      t.text :description
      t.timestamps
    end
  end
end

class CreateJoins < ActiveRecord::Migration[6.0]
  def change
    create_table :joins do |t|
      t.references :event, foreign_key: true
      t.string :nickname, null: false
      t.text :email
      t.timestamps
    end
  end
end

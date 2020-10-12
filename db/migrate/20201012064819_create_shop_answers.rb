class CreateShopAnswers < ActiveRecord::Migration[6.0]
  def change
    create_table :shop_answers do |t|
      t.references :join, foreign_key: true
      t.references :shop, foreign_key: true
      t.integer :status
      t.integer :vote
      t.timestamps
    end
  end
end

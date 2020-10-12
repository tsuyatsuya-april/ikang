class CreateShops < ActiveRecord::Migration[6.0]
  def change
    create_table :shops do |t|
      t.references :event, null: false, foreign_key: true
      t.string :shop_name, null: false
      t.text :shop_url
      t.text :map_url
      t.text :comment
      t.timestamps
    end
  end
end

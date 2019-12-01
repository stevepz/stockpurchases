class CreateStocks < ActiveRecord::Migration[6.0]
  def change
    create_table :stocks do |t|
      t.string :stockname
      t.string :stockticker
      t.text :comment
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

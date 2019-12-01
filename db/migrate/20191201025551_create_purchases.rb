class CreatePurchases < ActiveRecord::Migration[6.0]
  def change
    create_table :purchases do |t|
      t.date :purchasedate
      t.float :qty
      t.float :pricepaid
      t.text :comment
      t.references :stock, null: false, foreign_key: true

      t.timestamps
    end
  end
end

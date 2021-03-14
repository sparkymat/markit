class CreateCategories < ActiveRecord::Migration[6.1]
  def change
    create_table :categories do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.string :icon, default: 'question'

      t.timestamps
    end
  end
end

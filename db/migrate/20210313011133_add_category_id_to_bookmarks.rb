class AddCategoryIdToBookmarks < ActiveRecord::Migration[6.1]
  def change
    change_table :bookmarks do |t|
      t.references :category
    end
  end
end

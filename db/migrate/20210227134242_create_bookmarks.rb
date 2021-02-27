class CreateBookmarks < ActiveRecord::Migration[6.1]
  def change
    create_table :bookmarks do |t|
      t.string :link, null: false
      t.string :title
      t.text :comment
      t.references :user, null: false, foreign_key: true
      t.datetime :archived_at
      t.text :html_content

      t.timestamps
    end
  end
end

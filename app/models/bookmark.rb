class Bookmark < ApplicationRecord
  belongs_to :user
  belongs_to :category, optional: true

  scope :unarchived, -> { where(archived_at: nil) }

  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
end

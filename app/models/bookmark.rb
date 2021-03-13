class Bookmark < ApplicationRecord
  belongs_to :user
  belongs_to :category, optional: true

  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
end

class User < ApplicationRecord
  CATEGORY_LIMIT = 20

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable, authentication_keys: [:username]

  has_many :bookmarks
  has_many :categories
end

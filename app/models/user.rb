class User < ApplicationRecord
  CATEGORY_LIMIT = 20

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :recoverable, :rememberable, :validatable, authentication_keys: [:username]

  has_many :bookmarks
  has_many :categories

  def self.admin
    User.find_by(username: 'admin')
  end

  def import_bookmarks!(content)
    raise 'invalid content' unless content.is_a?(String)

    lines = content.split("\n").map(&:chomp)
    lines.each do |line|
      link, timestamp_string = line.split(",")
      timestamp = begin
                    DateTime.parse(timestamp_string)
                  rescue
                    DateTime.now
                  end

      self.bookmarks.create!({
        link:       link,
        created_at: timestamp,
      })
    end
  end
end

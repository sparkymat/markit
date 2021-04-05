class BookmarkPresenter
  include ActionView::Helpers::DateHelper

  def initialize(bookmark)
    @bookmark = bookmark
    @category = bookmark.category
    @host = URI.parse(@bookmark.link).host rescue @bookmark.link
    @host ||= ''
  end

  def title
    @bookmark.title || '[unknown]'
  end

  def link
    @bookmark.link
  end

  def link_before
    return if @host.empty?

    @bookmark.link[0, @bookmark.link.index(@host)]
  end

  def link_after
    return if @host.empty?

    @bookmark.link[@bookmark.link.index(@host) + @host.length, @bookmark.link.length-1]
  end

  def host
    @host || @bookmark.link
  end

  def category_name
    categorised? ? @category.name : "Uncategorised"
  end

  def categorised?
    @category.present?
  end

  def category_path
    category_path(@category)
  end

  def created_at
    time_ago_in_words(@bookmark.created_at)
  end
end

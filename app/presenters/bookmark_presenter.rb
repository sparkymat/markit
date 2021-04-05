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

  def path_to_category
    Rails.application.routes.url_helpers.category_path(@category)
  end

  def path_to_edit
    Rails.application.routes.url_helpers.edit_bookmark_path(@bookmark)
  end

  def path_to_archive
    Rails.application.routes.url_helpers.archive_bookmark_path(@bookmark)
  end

  def created_at
    time_ago_in_words(@bookmark.created_at)
  end
end

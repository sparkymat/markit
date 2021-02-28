class BookmarksController < ApplicationController
  before_action :authenticate_user!

  PAGE_SIZE = 30

  def index
    @page = params[:p] || 1

    total = current_user.bookmarks.count
    @last_page = [(total.to_f/PAGE_SIZE).ceil, 1].max
    @page = [@page, @last_page].min

    offset = (@page - 1)*PAGE_SIZE

    @bookmarks = current_user.bookmarks.order(updated_at: :desc).offset(offset).limit(PAGE_SIZE)
    @has_more = @last_page > @page*PAGE_SIZE
  end

  def new
  end

  def create
    bookmark = current_user.bookmarks.create!(bookmark_params)

    FetchLinkDetailsWorker.perform_async bookmark.id

    redirect_to root_path
  end

  protected

  def bookmark_params
    params.require(:bookmark).permit(:link)
  end
end

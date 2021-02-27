class BookmarksController < ApplicationController
  def index
    @bookmarks = current_user.bookmarks.order(updated_at: :desc).limit(10)
  end

  def new
  end

  def create
    current_user.bookmarks.create!(bookmark_params)

    redirect_to bookmarks_path
  end

  protected

  def bookmark_params
    params.require(:bookmark).permit(:link)
  end
end

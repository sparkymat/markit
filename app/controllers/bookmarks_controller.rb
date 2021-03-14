class BookmarksController < ApplicationController
  before_action :authenticate_user!

  PAGE_SIZE = 10

  def index
    @categories = current_user.categories.order(name: :asc)

    @page = params[:p].to_i
    @page = 1 if @page == 0

    total = current_user.bookmarks.count
    @last_page = [(total.to_f/PAGE_SIZE).ceil, 1].max
    @page = [@page, @last_page].min

    offset = (@page - 1)*PAGE_SIZE

    @bookmarks = current_user.bookmarks.order(created_at: :desc).offset(offset).limit(PAGE_SIZE).includes(:category)
    @has_more = @last_page > @page*PAGE_SIZE
    @start_index = (@page-1)*PAGE_SIZE + 1
    @end_index = [@page*PAGE_SIZE, total].min
  end

  def create
    bookmark = current_user.bookmarks.create!(bookmark_params)

    FetchLinkDetailsWorker.perform_async bookmark.id

    redirect_to root_path
  end

  def search
    @query = params[:q]
    query = "*" + @query + "*"

    @page = params[:p].to_i
    @page = 1 if @page == 0

    total = current_user.bookmarks.search(query).records.count
    @last_page = [(total.to_f/PAGE_SIZE).ceil, 1].max
    @page = [@page, @last_page].min

    offset = (@page - 1)*PAGE_SIZE

    @bookmarks = current_user.bookmarks.search(query).records.offset(offset).limit(PAGE_SIZE).includes(:category)
    @has_more = @last_page > @page*PAGE_SIZE
    @start_index = (@page-1)*PAGE_SIZE + 1
    @end_index = [@page*PAGE_SIZE, total].min
  end

  def edit
    @categories = current_user.categories.order(name: :asc)
    @bookmark = current_user.bookmarks.find(params[:id])

    render layout: false
  end

  def update
    @bookmark = current_user.bookmarks.find(params[:id])
    permitted_params = params.require(:bookmark).permit(:category_id)
    @bookmark.update!(permitted_params)
    redirect_to request.referrer
  end

  protected

  def bookmark_params
    params.require(:bookmark).permit(:link, :category_id)
  end
end

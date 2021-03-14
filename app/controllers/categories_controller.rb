class CategoriesController < ApplicationController
  include ApplicationHelper
  before_action :authenticate_user!

  PAGE_SIZE = 10

  def index
    @categories = current_user.categories.order(name: :asc)
  end

  def create
    raise "invalid icon" unless icons.include?(category_params[:icon]&.to_sym)
    raise "limit reached" if current_user.categories.count >= User::CATEGORY_LIMIT

    current_user.categories.create!(category_params)
    redirect_to categories_path
  end

  def show
    @category = current_user.categories.find(params[:id])
    @categories = current_user.categories.order(name: :asc)

    @page = params[:p].to_i
    @page = 1 if @page == 0

    total = current_user.bookmarks.count
    @last_page = [(total.to_f/PAGE_SIZE).ceil, 1].max
    @page = [@page, @last_page].min

    offset = (@page - 1)*PAGE_SIZE

    @bookmarks = @category.bookmarks.order(updated_at: :desc).offset(offset).limit(PAGE_SIZE).includes(:category)
    @has_more = @last_page > @page*PAGE_SIZE
    @start_index = (@page-1)*PAGE_SIZE + 1
    @end_index = [@page*PAGE_SIZE, total].min
  end

  protected

  def category_params
    params.require(:category).permit(:name, :icon)
  end
end

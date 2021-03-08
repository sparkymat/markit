class CategoriesController < ApplicationController
  include ApplicationHelper
  before_action :authenticate_user!

  def index
    @categories = current_user.categories.order(name: :asc)
  end

  def create
    raise "invalid icon" unless icons.include?(category_params[:icon]&.to_sym)
    current_user.categories.create!(category_params)
    redirect_to categories_path
  end

  protected

  def category_params
    params.require(:category).permit(:name, :icon)
  end
end

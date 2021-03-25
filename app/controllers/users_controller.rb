class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    authorize! :manage, User
    @users = User.all.order(created_at: :asc)
  end

  def create
    User.create!(user_params)
    redirect_to users_path

  end

  protected

  def user_params
    params.require(:user).permit(:username, :email, :is_admin, :password)
  end
end

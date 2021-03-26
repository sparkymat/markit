class UsersController < ApplicationController
  before_action :authenticate_user!, except: [:create_admin, :new_admin, :create]

  def index
    authorize! :manage, User
    @users = User.all.order(created_at: :asc)
  end

  def create
    authenticate_user! if User.admin.present?

    User.create!(user_params)
    redirect_to users_path
  end

  def new_admin
  end

  def create_admin
    admin_params = params.require(:user).permit(:email, :password).merge({
      username: 'admin',
      is_admin: true,
    })
    User.create!(admin_params)
    redirect_to new_user_session_path
  end

  protected

  def user_params
    params.require(:user).permit(:username, :email, :is_admin, :password)
  end
end

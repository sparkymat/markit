class ApplicationController < ActionController::Base
  before_action :redirect_to_new_admin, unless: :admin_user_present?
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def redirect_to_new_admin
    redirect_to new_admin_users_path unless [new_admin_users_path, create_admin_users_path, users_path].include?(request.path)
  end

  def admin_user_present?
    User.admin.present?
  end

  def configure_permitted_parameters
    added_attrs = [:username, :email, :password, :password_confirmation, :remember_me]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :sign_in, keys: [:login, :password]
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end
end

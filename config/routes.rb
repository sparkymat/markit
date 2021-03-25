Rails.application.routes.draw do
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout' }, controllers: {
    sessions: 'users/sessions'
  }

  resources :bookmarks, only: [:create, :edit, :update]
  resources :categories, only: [:index, :create, :show]
  resources :users, only: [:index, :create] do
    post 'reset_password', on: :member, as: :reset_password
  end

  get 'search', to: 'bookmarks#search', as: 'search'
  root to: 'bookmarks#index'

  mount Sidekiq::Web => "/sidekiq"
end

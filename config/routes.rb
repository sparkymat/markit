Rails.application.routes.draw do
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout' }, controllers: {
    sessions: 'users/sessions'
  }

  resources :bookmarks, only: [:create, :edit, :update] do
    get :new_import, on: :collection
    post :import,    on: :collection
  end
  resources :categories, only: [:index, :create, :show]
  resources :users, only: [:index, :create] do
    get :new_admin,     on: :collection
    post :create_admin, on: :collection
  end

  get 'search', to: 'bookmarks#search', as: 'search'
  root to: 'bookmarks#index'

  mount Sidekiq::Web => "/sidekiq"
end

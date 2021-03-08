Rails.application.routes.draw do
  devise_for :users, path: '', path_names: { sign_in: 'login', sign_out: 'logout' }, controllers: {
    sessions: 'users/sessions'
  }

  resources :bookmarks, only: [:create]
  resources :categories, only: [:index]

  get 'search', to: 'bookmarks#search', as: 'search'
  root to: 'bookmarks#index'

  mount Sidekiq::Web => "/sidekiq"
end

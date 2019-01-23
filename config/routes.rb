Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => 'users/omniauth_callbacks' }
  root to: 'pages#home'
  get 'pages/home'
  get 'hello_world', to: 'hello_world#index'
  resources :locations, only: [:create]
end

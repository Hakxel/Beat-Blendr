Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => 'users/omniauth_callbacks' }
  root to: 'pages#home'
  get 'hello_world', to: 'hello_world#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

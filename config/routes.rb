Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    passwords: 'users/passwords'
  }
  devise_scope :user do
    post 'users/guest_sign_in', to: 'users/sessions#new_guest'
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "events#index"
  resources :events do
    resources :schedules
    resources :shops
    resources :joins
    resources :comments
    resources :date_decisions
    resources :shop_decisions
  end
  
end

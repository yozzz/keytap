Rails.application.routes.draw do
  root to: 'keyboards#index'
  get '/text', to: 'text#index'
end

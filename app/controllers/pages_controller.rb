class PagesController < ApplicationController
  def home
    @user = current_user
    @playlist_id = "78Jsi7l1WpSuvQGUjfI72L"
  end

  def show
  end
end

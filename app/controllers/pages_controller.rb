class PagesController < ApplicationController
  def home
    @playlist = current_user.playlist if user_signed_in?
  end

  def show
  end
end

class PagesController < ApplicationController
  def home
    if user_signed_in?
      @playlist = current_user.playlist
      @artists  = current_user.tracks.pluck(:artist).uniq.shuffle
    end
  end

  def show
  end
end

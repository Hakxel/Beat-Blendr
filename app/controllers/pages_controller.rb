class PagesController < ApplicationController
  def home

    if user_signed_in?
      @playlist = current_user.playlist
      artists = []
      User.near([current_user.latitude, current_user.longitude], 0.25)
          .each do |user|
            user.tracks.pluck(:artist).each do |artist|
              artists << artist
            end
      @artists  = artists.uniq.shuffle
      end
    end
  end
  def show
  end
end

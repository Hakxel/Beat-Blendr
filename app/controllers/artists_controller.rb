class ArtistsController < ApplicationController
  def index
    latitude = params[:latitude]&.to_f
    longitude = params[:longitude]&.to_f
    puts "==============="
    puts latitude
    puts longitude
    puts "==============="
    artists = []
    User.near([latitude, longitude], 0.25).each do |user|
      user.tracks.pluck(:artist).each do |artist|
        artists << artist
      end
    end
    artists  = artists.uniq.shuffle
    render json: artists
  end
end

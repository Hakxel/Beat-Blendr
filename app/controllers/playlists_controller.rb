class PlaylistsController < ApplicationController
  require 'pry'

  def create
    require 'json'
    response = HTTParty.post("https://api.spotify.com/v1/users/#{current_user.uid}/playlists",
       :headers => { "Authorization" => "Bearer #{current_user.token}", "Content-Type" => "application/json" }, :body => { "name" => "BeatBlender Event Playlist" }.to_json
    )

    # distance slider will need to be implemented here
    # User.near(
    #   [current_user.latitude, current_user.longitude], 0.1
    # ).each do |user|
    #   user.tracks.each do |track|
    #   response = HTTParty.post("https://api.spotify.com/v1/playlists/#{response["id"]}}/tracks",
    #     :headers => { "Authorization" => "Bearer #{current_user.token}", "Content-Type" => "application/json" }, :body => {"uris": ["spotify:track:#{track.spotify_id}"]}.to_json
    #   )
    # binding.pry
    #   end
    # end
    redirect_to pages_home_path
  end
end

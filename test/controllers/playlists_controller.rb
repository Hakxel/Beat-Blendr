class PlaylistsController < ApplicationController
  include 'httparty'

  def create
    ## Make a post request to spotify API
    ## using current user's token
    HTTParty.post("https://api.spotify.com/v1/users/#{current_user.spotify_id}/playlists",
      headers: { "Authorization" => "Bearer #{current_user.token}"}, body: { name: "BeatBlender Playlist" }
    )

    ## This is where Lester's distance slider will change distance radius
    # User.near(
    #   [current_user.latitude, current_user.longitude], 0.1
    # ).each do |user|
    #   user.tracks.each do |track|
    #     ### this is the magic happens...
    #     ### add tracks to playlist here....
    #   end
    # end
  end
end

#   def add
#     @tracks = Track.all
#     @tracks.each do |item|
#       HTTParty.post("https://api.spotify.com/v1/playlists/{playlist_id}/tracks",
#         headers: { "Authorization" => "Bearer #{@user.token}"}) item.spotify_id
#   end
# end

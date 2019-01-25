class PlaylistsController < ApplicationController

  def create
    playlist_response = HTTParty.post("https://api.spotify.com/v1/users/#{current_user.uid}/playlists",
       :headers => { "Authorization" => "Bearer #{current_user.token}", "Content-Type" => "application/json" }, :body => { "name" => "BeatBlender Event Playlist" }.to_json
    )

    ## distance slider will need to be implemented here

    # User.near(
    #   [current_user.latitude, current_user.longitude], 0.25
    # ).each do |user|
      # sharable_tracks = user.tracks.pluck(:spotify_id)

      ## sharable_tracks is currently grabbing spotify_id of ALL tracks in Track model.
      sharable_tracks = Track.all.pluck(:spotify_id)
      formatted_track_ids = sharable_tracks.map { |x| "spotify:track:#{x}"}
      track_response = HTTParty.post("https://api.spotify.com/v1/playlists/#{playlist_response["id"]}/tracks", :headers => { "Authorization" => "Bearer #{current_user.token}", "Content-Type" => "application/json" }, :body => { "uris" => formatted_track_ids }.to_json)
    # end
    redirect_to pages_home_path
  end
end

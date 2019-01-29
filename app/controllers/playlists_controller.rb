class PlaylistsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    if current_user.playlist
        playlist_id = current_user.playlist["playlist_id"]
        tracks = []
        User.near([current_user.latitude, current_user.longitude], 0.25)
            .each{ |user| tracks << user.tracks.send(params[:playlistType]).pluck(:spotify_id) }
        tracks.flatten!
        tracks.map!{|spotify_id| "spotify:track:#{spotify_id}"}
        replaced_playlist = HTTParty.put(
                              "https://api.spotify.com/v1/playlists/#{playlist_id}/tracks",
                              headers: {
                              "Authorization" => "Bearer #{current_user.token}",
                              "Content-Type" => "application/json"
                              },
                              body: { "uris" => tracks }.to_json
                            )
    else
      playlist_response = HTTParty.post(
                            "https://api.spotify.com/v1/users/#{current_user.uid}/playlists",
                            headers: {
                              "Authorization" => "Bearer #{current_user.token}",
                              "Content-Type" => "application/json"
                            },
                            body: {
                              "name" => "BeatBlender Event Playlist"
                            }.to_json
                          )
      playlist_id = playlist_response['id']
      current_user.create_playlist(playlist_id: playlist_id)

      tracks = []
      User.near([current_user.latitude, current_user.longitude], 0.25)
          .each{ |user| tracks << user.tracks.send(params[:playlistType]).pluck(:spotify_id) }
      tracks.flatten!
      tracks.map!{|spotify_id| "spotify:track:#{spotify_id}"}
      track_response  = HTTParty.post(
                          "https://api.spotify.com/v1/playlists/#{playlist_id}/tracks",
                          headers: {
                          "Authorization" => "Bearer #{current_user.token}",
                          "Content-Type" => "application/json"
                          },
                          body: { "uris" => tracks }.to_json
                        )
    end
    render json: { playlistId: playlist_id }
  end
end
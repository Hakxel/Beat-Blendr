class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def spotify
    @user = User.from_omniauth(request.env['omniauth.auth'])
    @user.refresh_my_token if @user.token_is_expired?

    top_response = HTTParty.get("https://api.spotify.com/v1/me/top/tracks",
                   headers: { "Authorization" => "Bearer #{@user.token}"})

    track_ids = []
    feature_ids = ''
    top_response["items"].each do |item|
      track_ids << item["id"]
      feature_ids = track_ids.join(",")
    end

    features_response = HTTParty.get("https://api.spotify.com/v1/audio-features/?ids=#{feature_ids}",
                        headers: { "Authorization" => "Bearer #{@user.token}"})

    UserTrack.where(user: @user).delete_all

    top_response["items"].each do |item|
      track = Track.find_or_create_by(
        name: item["name"],
        spotify_id: item["id"],
      )
    UserTrack.find_or_create_by(user: @user, track: track)
    end

    features_response["audio_features"].each do |audio_features|
      Track.where(spotify_id: audio_features["id"]).update_all(audio_features: audio_features)
    end

    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication
      set_flash_message(:notice, :success, :kind => "Spotify") if is_navigational_format?
    else
      session['devise.spotify_data'] = request.env['omniauth.auth']
      redirect_to new_user_registration_url
    end
  end

  def failure
    redirect_to root_path
  end

end

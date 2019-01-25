class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def spotify
    @user = User.from_omniauth(request.env['omniauth.auth'])

    response = HTTParty.get("https://api.spotify.com/v1/me/top/tracks",
      headers: { "Authorization" => "Bearer #{@user.token}"})

    UserTrack.where(user: @user).delete_all

    response["items"].each do |item|
      track = Track.find_or_create_by(
        name: item["name"],
        spotify_id: item["id"],
      )
      UserTrack.find_or_create_by(user: @user, track: track)
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

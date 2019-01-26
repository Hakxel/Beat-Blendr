class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable, omniauth_providers: %i[spotify]

  geocoded_by :address

  # def self.new_with_session(params, session)
  #   super.tap do |user|
  #     if data = session['devise.spotify_data'] && session['devise.spotify_data']['extra']['raw_info']
  #       user.email = data['email'] if user.email.blank?
  #       user.info = data['info'] if user.info.blank?
  #       user.name = data['name'] if user.name.blank?
  #     end
  #   end
  # end

  has_many :user_tracks
  has_many :tracks, through: :user_tracks
  has_one :playlist

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.info = auth.info
      user.image = auth.info.image
      user.email = auth.info.email
      user.name = auth.info.nickname
      user.token = auth.credentials.token
      user.refresh_token = auth.credentials.refresh_token
      user.expires_at = auth.credentials.expires_at
      # user.favtracks = auth.extra['raw_info']
      user.password = Devise.friendly_token[0,20]
      # If you are using confirmable and the provider(s) you use validate emails,
      # uncomment the line below to skip the confirmation emails.
      # user.skip_confirmation!
    end
  end

  def token_is_expired?
    self.expires_at.to_i < Time.now.to_i
  end

  def refresh_my_token
    response =  HTTParty.post(
                "https://accounts.spotify.com/api/token",
                headers: {
                  "Authorization" => "Basic #{Base64.strict_encode64((ENV['SPOTIFY_CLIENT_ID'])+":"+(ENV['SPOTIFY_CLIENT_SECRET']))}"
                },
                body: {
                  "grant_type" => "refresh_token",
                  "refresh_token" => "#{self.refresh_token}"
                }
              )

    refreshhash = JSON.parse(response.body)

    self.token      = refreshhash['access_token']
    self.expires_at = Time.now.to_i + refreshhash["expires_in"]

    self.save
  end

end

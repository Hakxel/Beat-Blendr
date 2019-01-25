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

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.info = auth.info
      user.image = auth.info.image
      user.email = auth.info.email
      user.name = auth.info.nickname
      user.token = auth.credentials.token
      # user.favtracks = auth.extra['raw_info']
      user.password = Devise.friendly_token[0,20]
      # If you are using confirmable and the provider(s) you use validate emails,
      # uncomment the line below to skip the confirmation emails.
      # user.skip_confirmation!
    end
  end
end

class Track < ApplicationRecord
  has_many :user_tracks
  scope :party, -> { where("danceability > 0.6") }
  scope :chill, -> { where("danceability < 0.6") }
end

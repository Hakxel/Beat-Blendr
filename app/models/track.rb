class Track < ApplicationRecord
  scope :party, -> { where("danceability > 0.6") }
  scope :chill, -> { where("danceability < 0.6") }
end

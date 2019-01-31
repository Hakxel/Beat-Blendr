class Playlist < ApplicationRecord
  belongs_to :user
  validates :user_id, uniqueness: true

  def as_json(options={})
    {
      playlistId:   playlist_id,
      playlistType: playlist_type
    }
  end
end

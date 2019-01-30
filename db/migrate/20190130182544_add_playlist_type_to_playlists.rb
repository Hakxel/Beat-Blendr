class AddPlaylistTypeToPlaylists < ActiveRecord::Migration[5.2]
  def change
    add_column :playlists, :playlist_type, :string
  end
end

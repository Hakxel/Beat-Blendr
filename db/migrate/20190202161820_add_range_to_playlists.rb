class AddRangeToPlaylists < ActiveRecord::Migration[5.2]
  def change
    add_column :playlists, :range, :float
  end
end

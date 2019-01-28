class AddFeaturesToTracks < ActiveRecord::Migration[5.2]
  def change
    add_column :tracks, :danceability, :float
    add_column :tracks, :energy, :float
    add_column :tracks, :speechiness, :float
    add_column :tracks, :tempo, :float
  end
end

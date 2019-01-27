class AddFeaturesToTracks < ActiveRecord::Migration[5.2]
  def change
    add_column :tracks, :audio_features, :json
  end
end

class AddFavtracksToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :favtracks, :json
  end
end

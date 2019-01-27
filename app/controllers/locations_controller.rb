class LocationsController < ApplicationController

  def create
    if current_user
    current_user.update(location_params)
    render json: location_params
    end
  end

  private

  def location_params
    params.require(:location).permit(:latitude, :longitude)
  end

end

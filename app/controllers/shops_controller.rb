class ShopsController < ApplicationController
  def destroy
    @shop = Shop.find(params[:id])
    if @shop.destroy
      redirect_to edit_event_path(params[:event_id])
    else
      render "events/edit"
    end
  end
end

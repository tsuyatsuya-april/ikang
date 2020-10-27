class ShopsController < ApplicationController
  before_action :authenticate_user!, only: :destroy
  
  def create
    @event = Event.find(params[:event_id])
    @shop= Shop.new(shop_params)
    if @shop.save
      @event.joins.map do |join|
        @shop_answer = ShopAnswer.new(shop_id: @shop.id, join_id: join.id, status: "3", vote: "0")
        @shop_answer.save
      end 
    else
      redirect_to root_path
    end
    if params[:show_event]
      redirect_to event_path(params[:event_id])
    else
      redirect_to edit_event_path(params[:event_id])
    end
  end

  def destroy
    @event = Event.find(params[:event_id])
    @shop = Shop.find(params[:id]) 
    if @shop.destroy
      redirect_to edit_event_path(params[:event_id])
    else
      redirect_to root_path
    end
  end

  private 
  
  def shop_params
    params.require(:shop).permit(:shop_name, :shop_url, :map_url, :comment).merge(event_id: params[:event_id])
  end

end

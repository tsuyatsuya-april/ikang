class ShopsController < ApplicationController
  def create
    @event = Event.find(params[:event_id])
    @shop= Shop.new(shop_params)
    binding.pry
    if @shop.save
      @event.joins.map do |join|
        @shop_answer = ShopAnswer.new(shop_id: @shop.id, join_id: join.id, status: "3", vote: "0")
        if @shop_answer.save
        else
          redirect_to root_path
        end
      end
      redirect_to edit_event_path(params[:event_id])
    else
      redirect_to root_path
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

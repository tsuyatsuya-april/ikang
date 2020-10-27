class ShopDecisionsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update]
  before_action :set_event

  def create
    @shop_decision = ShopDecision.new(shop_decision_params)
    binding.pry
    @shop_decision.save
    redirect_to event_path(params[:event_id])
  end

  def update
    @shop_decision = ShopDecision.find(params[:id])
    binding.pry
    @shop_decision.update(shop_decision_params)
    redirect_to event_path(params[:event_id])
  end

  
  private
  def set_event
    @event = Event.find(params[:event_id])
  end

  def shop_decision_params
    params.require(:shop_decision).permit(:shop_id, :status).merge(event_id: params[:event_id])
  end
end

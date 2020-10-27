class DateDecisionsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update]
  before_action :set_event

  def create
    @date_decision = DateDecision.new(date_decision_params)
    @date_decision.save
    redirect_to event_path(params[:event_id])
  end

  def update
    @date_decision = DateDecision.find(params[:id])
    @date_decision.update(date_decision_params)
    redirect_to event_path(params[:event_id])
  end

  
  private
  def set_event
    @event = Event.find(params[:event_id])
  end

  def date_decision_params
    params.require(:date_decision).permit(:schedule_id, :status).merge(event_id: params[:event_id])
  end
end

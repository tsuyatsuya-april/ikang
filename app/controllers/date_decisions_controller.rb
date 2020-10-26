class DateDecisionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_event

  def create
    date_decision = DateDecision.create(event_id: params[:event_id], schedule_id: params[:schedule_id], status: 1)
  end

  def destroy
    date_decision = DateDecision.find_by(event_id: params[:event_id], schedule_id: params[:schedule_id], status: 1)
    date_decision.delete
  end
  
  private
  def set_event
    @event = Event.find(params[:event_id])
  end
end

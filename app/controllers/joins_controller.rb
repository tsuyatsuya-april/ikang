class JoinsController < ApplicationController
  before_action :set_event, only: :create

  def create
    @join = Join.new(join_params)
    @join.event_id = @event.id
    if @join.save
      flash[:success] = 'join created!'
      redirect_to event_path(params[:event_id])
    else
      render "events/show"
    end
  end

  private
  def join_params
    params.require(:join).permit(:nickname, :email, 
      date_answers_attributes: [:schedule_id, :status], 
      shop_answers_attributes: [:shop_id, :status, :vote])
      .merge(event_id: :event_id)
  end
  def set_event
    @event = Event.find(params[:event_id])
  end
end

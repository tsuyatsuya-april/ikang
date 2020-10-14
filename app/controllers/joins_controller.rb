class JoinsController < ApplicationController
  before_action :set_event, only: [:create, :update, :destroy] 
  before_action :set_join, only: [:update, :destroy]

  def create
    @join = Join.new(join_params)
    @join.event_id = @event.id
    if @join.save
      redirect_to event_path(params[:event_id])
    else
      render "events/show"
    end
  end

  def update
    if @join.update(join_update_params)
      redirect_to event_path(params[:event_id])
    else
      render "events/show"
    end
  end

  def destroy
    if @join.destroy
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
      .merge(event_id: params[:event_id])
  end

  def join_update_params
    params.require(:join).permit(:nickname, :email, 
      date_answers_attributes: [:id,:schedule_id, :status, :_destroy], 
      shop_answers_attributes: [:id,:shop_id, :status, :vote,:_destroy])
  end

  def set_join
    @join = Join.find(params[:id])
  end

  def set_event
    @event = Event.find(params[:event_id])
  end
end

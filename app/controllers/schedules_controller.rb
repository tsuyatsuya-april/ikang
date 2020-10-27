class SchedulesController < ApplicationController
  before_action :authenticate_user!, only: [:create, :destroy]
  def create
    @event = Event.find(params[:event_id])
    @schedule = Schedule.new(schedule_params)
    if @schedule.save
      @event.joins.map do |join|
        @date_answer = DateAnswer.new(schedule_id: @schedule.id, join_id: join.id, status: '3')
        @date_answer.save
      end
      redirect_to edit_event_path(params[:event_id])
    else
      render "events/edit"
    end

  end

  def destroy
    @event = Event.find(params[:event_id])
    @schedule = Schedule.find(params[:id])
    if @schedule.destroy
      redirect_to edit_event_path(params[:event_id])
    else
      render "events/edit"
    end
  end

  private 
  
  def schedule_params
    params.require(:schedule).permit(:savedate, :savetime).merge(event_id: params[:event_id])
  end

end

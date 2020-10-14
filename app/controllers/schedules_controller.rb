class SchedulesController < ApplicationController

  def create
    @event = Event.find(params[:event_id])
    @schedule = Schedule.new(schedule_params)
    if @schedule.save
      @event.joins.map do |join|
        @date_answer = DateAnswer.new(schedule_id: @schedule.id, join_id: join.id, status: '3')
        if @date_answer.save
        else
          redirect_to root_path
        end
      end
      redirect_to edit_event_path(params[:event_id])
    else
      render "events/edit"
    end

  end

  def destroy
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

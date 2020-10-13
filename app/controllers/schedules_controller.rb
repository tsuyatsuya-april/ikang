class SchedulesController < ApplicationController

  def create
    

  end

  def destroy
    @schedule = Schedule.find(params[:id])
    if @schedule.destroy
      redirect_to edit_event_path(params[:event_id])
    else
      render "events/edit"
    end
  end

end

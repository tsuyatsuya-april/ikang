class EventsController < ApplicationController
  def index
    user = User.find(params[:id])
    @events = user.events
  end

end

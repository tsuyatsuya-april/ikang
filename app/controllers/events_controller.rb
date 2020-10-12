class EventsController < ApplicationController
  # before_action :move_to_index, except: [:index, :show]
  before_action :set_event, only: [:show,:edit, :update, :destroy]

  def index
    if user_signed_in?
      user = User.find(current_user.id)
      @events = user.events
    end
  end

  def new
    @event = Event.new
    1.times { @event.schedules.build }
    1.times { @event.shops.build } 
  end 

  def create
    @event = Event.new(event_params)
    @event.user_id = current_user.id
    if @event.save
      redirect_to root_url
    else
      render 'new'
    end
  end

  def show
  end

  def edit
  end

  def update
    if @event.update(event_update_params)
      redirect_to root_path
    else
      render "edit"
    end
  end

  def destroy
    if @event.destroy
      redirect_to root_path
    else
      render "edit"
    end
  end

  private 

  def event_params
    params.require(:event).permit(:name, :description, schedules_attributes: [:savedate, :savetime], shops_attributes: [:shop_name, :shop_url, :map_url, :comment])
  end

  def event_update_params
    params.require(:event).permit(:name, :description, schedules_attributes: [:id, :savedate, :savetime,:_destroy], shops_attributes: [:id, :shop_name, :shop_url, :map_url, :comment, :_destroy])
  end

  def set_event
    @event = Event.find(params[:id])
  end

  def move_to_index
    unless user_signed_in?
      redirect_to action: :index
    end
  end
end

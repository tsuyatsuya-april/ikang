class EventsController < ApplicationController
  # before_action :move_to_index, except: [:index, :show]
  before_action :authenticate_user!, only: [:new, :create, :edit,:update, :destroy]
  before_action :set_event, only: [:show,:edit, :update, :destroy]

  def index
    if user_signed_in?
      user = User.find(current_user.id)
      @events = user.events.reverse
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
      redirect_to event_path(@event.id)
    else
      render "new"
    end
  end

  def show

    @comment = Comment.new
    @comments = Comment.all
    @joins = Join.all
    @shop = Shop.new
    set_date_decision
    @shops = Shop.find_by(event_id: params[:id])
    if params[:join_id]
      set_join
    else
      @join = Join.new
      1.times { @join.date_answers.build }
      1.times { @join.shop_answers.build }
    end
  end

  def edit
    @schedule = Schedule.new
    @shop = Shop.new
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

  def set_join
    @join = Join.find(params[:join_id])
  end

  def move_to_index
    unless user_signed_in?
      redirect_to action: :index
    end
  end

  def set_date_decision
    if DateDecision.find_by(event_id: params[:id])
      @date_decision = DateDecision.find_by(event_id: params[:id])
    else
      @date_decision = DateDecision.new
    end
    @schedules = Schedule.where(event_id: params[:id])
  end

  
end

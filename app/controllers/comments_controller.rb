class CommentsController < ApplicationController
  def create
    comment = Comment.create(event_id: params[:event_id],content: params[:content])
    render json:{ comment: comment}
  end
end

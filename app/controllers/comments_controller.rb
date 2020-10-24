class CommentsController < ApplicationController
  def create
    post = Post.create(content: parmas[:content])
    render json:{ post: post}
end

class SessionsController < ApplicationController
skip_before_action :require_login
  def create
    u = User.find_by(username: params[:username])
    if u && u.authenticate(params[:password])
      session[:user_id] = u.id
      h = Hash.new()
      render json: {userId: u.id, status: 200}
    else
      render json: {userId: 0, status: 401}
    end

  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

end
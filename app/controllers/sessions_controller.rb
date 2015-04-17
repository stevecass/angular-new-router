class SessionsController < ApplicationController
skip_before_action :require_login
  def create
    u = User.find_by(username: params[:username])
    if u && u.authenticate(params[:password])
      session[:user_id] = u.id
    end
    render text: 'Hello'
  end

  def destroy
    session[:user_id] = nil
  end

end
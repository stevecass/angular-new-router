class CatsController < ApplicationController
  def index
    cats = Cat.all
    render json: cats
  end

  def show
    cat = Cat.find(params[:id])
    render json: cat
  end

  def create
    meas = Cat.new(cat_params)
    if meas.save
      render json: meas, status: 201
    else
      p meas.errors
      render text: 'Failed', status: 422
    end
  end

  private
  def weight_params
    params.permit(:taken_on, :weight).merge(user_id: current_user.id)
  end

end
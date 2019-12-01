class StocksController < ApplicationController

  before_action :authorize_request

  def index
    @stocks = Stock.all
    render json: @stocks, include: :purchases, status: :ok
  end

  def show
    @stock = Stock.find(params[:id])
    render json: @stock, include: :purchases, status: :ok
  end



  def create
    @stock = Stock.new(stock_params)
    if @stock.save
      render json: @stock, status: :created
    else
      render json: { errors: @stock.errors }, status: :unprocessable_entity
    end
  end
  
  def update
    @stock = Stock.find(params[:id])
    if @stock.update(stock_params)
      render json: @stock, status: :ok
    else
      render json: { errors: @stock.errors }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @stock = Stock.find(params[:id])
    @stock.destroy
    head 204
  end
  
  private
  
  def stock_params
    params.require(:stock).permit(:id, :stockname, :stockticker, :comment, :user_id)
  end




end
class StocksController < ApplicationController
  before_action :set_stock, only: %i[show update destroy]
  before_action :authorize_request

  def index
    @stocks = Stock.all
    render json: @stocks, include: :purchases, status: :ok
  end

  def show
  
    render json: @stock, include: :purchases, status: :ok
  end



  def create
    @stock = Stock.new(stock_params)
    if @current_user.stocks << @stock
    # if @stock.save
      render json: @stock, status: :created
    else
      render json: { errors: @stock.errors }, status: :unprocessable_entity
    end
  end
  
  def update
    if @stock.user == @current_user
      # @stock = Stock.find(params[:id])
      if @stock.update(stock_params)
        render json: @stock, status: :ok
      else
        render json: { errors: @stock.errors }, status: :unprocessable_entity
      end
    else
      render json: { errors: "not authorized" }, status: :unauthorized
    end
  end
  
  def destroy
    if @stock.user == @current_user
    # @stock = Stock.find(params[:id])
      @stock.destroy
    # head 204
    else
      render json: { errors: "not authorized" }, status: :unauthorized
    end
  end
  private
  
  def set_stock
    @stock = Stock.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { message: 'no stock matches that ID' }, status: 404
  end


  def stock_params
    params.require(:stock).permit(:id, :stockname, :stockticker, :comment, :user_id)
  end




end
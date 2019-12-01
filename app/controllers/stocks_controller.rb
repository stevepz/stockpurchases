class StocksController < ApplicationController
  def index
    @stocks = Stock.all
    render json: @stocks, include: :purchases, status: :ok
  end

  def show
    @stock = Stock.find(params[:id])
    render json: @stock, include: :purchases, status: :ok
  end
end
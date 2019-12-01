class PurchasesController < ApplicationController
  def index
    purchases = Purchase.all
    render json: purchases, status: :ok
  end

  def show
    purchase = Purchase.find(params[:id])
    render json: purchase, status: :ok
  end
end
class PurchasesController < ApplicationController
  
  before_action :set_purchase, only: %i[show update destroy]
  before_action :authorize_request

  def index
    purchases = Purchase.all
    render json: purchases, status: :ok
  end

  def show
    # purchase = Purchase.find(params[:id])
    render json: purchase, status: :ok
  end




  def create
    @purchase = Purchase.new(purchase_params)
    if @purchase.save
      render json: @purchase, status: :created
    else
      render json: { errors: @purchase.errors }, status: :unprocessable_entity
    end
  end
  
  def update
    # @purchase = Purchase.find(params[:id])
    if @purchase.update(purchase_params)
      render json: @purchase, status: :ok
    else
      render json: { errors: @purchase.errors }, status: :unprocessable_entity
    end
  end
  
  def destroy
    # @purchase = Purchase.find(params[:id])
    @purchase.destroy
    head 204
  end
  
  private

  def set_purchase
    @purchase = Purchase.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { message: 'no purchase matches that ID' }, status: 404
  end
  
  def purchase_params
    params.require(:purchase).permit(:id, :purchasedate, :qty, :pricepaid, :comment, :stock_id)
  end


end
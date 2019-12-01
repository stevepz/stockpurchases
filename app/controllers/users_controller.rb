class UsersController < ApplicationController
  
  before_action :authorize_request, except: :create

  #  will need to comment this out later once app is built and add back for admin function
  def index
    @users = User.all
    render json: @users, include: {stocks: {include: :purchases}}, status: :ok
  end

  def show
    @user = User.find(params[:id])
    render json: @user, include: {stocks: {include: :purchases}}, status: :ok
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: { errors: @user.errors }, status: :unprocessable_entity
    end
  end
  #  will need to comment this out later once app is built and add back for admin function
  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render json: @user, status: :ok
    else
      render json: { errors: @user.errors }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @user = User.find(params[:id])
    @user.destroy
    head 204
  end
  
  private
  
  def user_params
    params.require(:user).permit(:id, :username, :password)
  end






end

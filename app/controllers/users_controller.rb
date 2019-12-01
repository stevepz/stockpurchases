class UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users, include: {stocks: {include: :purchases}}, status: :ok
  end

  def show
    @user = User.find(params[:id])
    render json: @user, include: {stocks: {include: :purchases}}, status: :ok
  end
end

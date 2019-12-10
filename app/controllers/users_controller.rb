class UsersController < ApplicationController
  
  before_action :authorize_request, except: :create
  before_action :set_user, only: [:show , :update , :destroy]

  #  will need to comment this out later once app is built and add back for admin function
  def index
    @users = User.all
    render json: @users, include: {stocks: {include: :purchases}}, status: :ok
  end

  def show
    @user.password_digest=''
    render json: @user, include: {stocks: {include: :purchases}}, status: :ok
  end

  def create
    @user = User.new(user_params)
    #   puts "two", user_params
    # puts "four", @user.username, params[:password], params[:username], @user.password, 
    # @user.password_digest, @user.save, @user.errors, user_params

    if @user.save
      token = encode(id: @user.id, username: @user.username)
      render json: {token: token , user: {id: @user.id, username: @user.username} }, status: :ok
      # render json: @user, status: :created, location: @user
    else
      render json: @user.errors , status: :unprocessable_entity
    end
  end
  #  will need to comment this out later once app is built and add back for admin function
  def update
    
    if @user.update(user_params)
      @user.password_digest=''
      render json: @user, status: :ok
    else
      render json: { errors: @user.errors }, status: :unprocessable_entity
    end
  end
  
  def destroy
  
    @user.destroy
    head 204
  end
  
  private

  def set_user
    @user = User.find(params[:id])
  end
  
  def user_params
    params.require(:user).permit(:username, :password)
    # puts "this one ", :username, :password
  end


end
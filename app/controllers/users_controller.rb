class UsersController < ApplicationController

  before_action :user_find, only: [:add_coin, :minus_coin]
  def index
    if params[:role].present?
      @users = User.where(role: params[:role], user_id: current_user)
    end
  end

  def new
    @user = User.new
    @user.role = params[:role] if params[:role].present?
  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:notice] = "User successfully created."
      redirect_to users_path(role: params['user']['role'])
    else
      flash[:alert] = "Error creating user."
      render :new
    end
  end

  def update_coin_limit
    if params[:role].present?
      @users = User.where(role: params[:role], user_id: current_user)
    end
  end

  def add_coin
    if params[:my_coin].present?
      @user.my_coin += params[:my_coin].to_i
      if @user.save
        flash[:notice] = "#{params[:my_coin]} deposited successfully"
        redirect_to update_coin_limit_users_path(role: params[:role])
      else
        flash[:alert] = "Please enter Amount"
      end
    end
  end

  def minus_coin
    if params[:my_coin].present?
      @user.my_coin -= params[:my_coin].to_i
      if @user.save
        flash[:notice] = "#{params[:my_coin]} Withdraw successfully"
        redirect_to update_coin_limit_users_path(role: params[:role])
       else
        flash[:alert] = "Please enter Amount"
      end
    end
  end

  private 

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :role, :user_id, :user_name, :reference, :my_coin, :share_type, :my_match_share, :my_match_comm, :my_sess_comm, :match_share, :match_comm, :sess_comm, :my_casino_share, :my_casino_comm, :casino_share, :casino_comm)
  end

  def user_find
    @user = User.find(params[:id])
  end
end

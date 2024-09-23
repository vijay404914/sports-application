class AddColumnUserIdUser < ActiveRecord::Migration[7.1]
  def change
    add_reference :users, :user, foreign_key: true
    add_column :users, :user_name, :string
    add_column :users, :reference, :string
    add_column :users, :my_coin, :integer
    add_column :users, :share_type, :string
    add_column :users, :my_match_share, :float
    add_column :users, :my_match_comm, :float
    add_column :users, :my_sess_comm, :float
    add_column :users, :match_share, :float
    add_column :users, :match_comm, :float
    add_column :users, :sess_comm, :float
    add_column :users, :my_casino_share, :float
    add_column :users, :my_casino_comm, :float
    add_column :users, :casino_share, :float
    add_column :users, :casino_comm, :float
  end
end

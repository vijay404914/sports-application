class AddIndexToUsersUserName < ActiveRecord::Migration[7.1]
  def change
    add_index :users, :user_name, unique: true
    remove_index :users, name: "index_users_on_email" if index_exists?(:users, :email)
  end
end

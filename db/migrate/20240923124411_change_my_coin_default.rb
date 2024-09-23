class ChangeMyCoinDefault < ActiveRecord::Migration[7.1]
  def change
    change_column_default :users, :my_coin, 0
  end
end

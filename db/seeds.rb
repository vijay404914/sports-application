# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
User.create(user_name: 'AD00001', password: '123456' , password_confirmation: '123456', my_coin: 50000, my_casino_share: 50, my_casino_comm: 34, my_match_share: 94, my_match_comm: 85, my_sess_comm: 78)
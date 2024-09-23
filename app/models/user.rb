class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: { admin: 0, super_master: 1, agent: 2, client: 3 }
  validates :user_name, presence: true, uniqueness: true

  def random_password
    chars = ('a'..'z').to_a + ('A'..'Z').to_a + (0..9).to_a
    Array.new(6) { chars.sample }.join
  end

  def random_generate_user_name(role_type)
    last_number = User.last.user_name.present? ? User.last.user_name[-5..-1].to_i : 0
    prefix = case role_type
              when 'super_admin'
                'SUP'
              when 'agent'
                'AGT'
              when 'client'
                'CLT'
             else
               'USR'
             end
    sequence_number = (last_number + 1).to_s.rjust(5, '0')
    
    "#{prefix}#{sequence_number}"
  end
end

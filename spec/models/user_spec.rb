require 'rails_helper'

RSpec.describe User, type: :model do
  context 'When creating a user' do
    let(:user) {build :user}
    it 'Should be valid with all attributes' do
      expect(user.valid?).to eq(true)
    end
  end 
end

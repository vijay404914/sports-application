require 'rails_helper'
RSpec.describe UsersController do 
  describe 'GET index' do 
    let(:user) { create :user }

    before(:each) do
      sign_in(user)
      get :index
    end

    it 'assigns @users' do
      # expect(assigns(:users)).to eq([user])
    end

    it 'renders the index page template' do 
      expect(response).to render_template('index')
    end

    it 'return the status code ok' do 
      expect(response).to have_http_status(:ok)
    end
  end

  describe 'Post create' do
    let(:user) { create :user }

    before(:each) do
      sign_in(user)
    end

    it 'should accepts the params with html format' do
      post :create, params: {
        user: {
          name: Faker::Name.name_with_middle,
          email: Faker::Internet.email,
          user_name: "ad#{Faker::Number.unique.number(digits: 5)}",
          password: '123456'
        }
      }
      expect(response.media_type).to eq('text/html')
      expect(response.content_type).to eq('text/html; charset=utf-8')
    end
  end
end
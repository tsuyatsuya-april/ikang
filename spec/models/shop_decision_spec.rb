require "rails_helper"

RSpec.describe ShopDecision, type: :model do
  describe "#create" do
    before do
      @shop_decision = FactoryBot.build(:shop_decision)
    end

    describe "参加者新規登録" do
      it "全ての項目があれば登録できる" do
        expect(@shop_decision).to be_valid
      end
    end
  end
end
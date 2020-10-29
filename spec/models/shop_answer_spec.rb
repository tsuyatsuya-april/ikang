require "rails_helper"

RSpec.describe ShopAnswer, type: :model do
  describe "#create" do
    before do
      @shop_answer = FactoryBot.build(:shop_answer)
    end

    describe "参加者新規登録" do
      it "全ての項目があれば登録できる" do
        expect(@shop_answer).to be_valid
      end
      it "投票が空白でも登録できる" do
        @shop_answer.vote = ""
        expect(@shop_answer).to be_valid
      end
    end
  end
end
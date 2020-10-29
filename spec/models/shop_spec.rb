require "rails_helper"

RSpec.describe Shop, type: :model do
  describe "#create" do
    before do
      @shop = FactoryBot.build(:shop)
    end

    describe "イベント新規登録" do
      it "全ての項目があれば登録できる" do
        expect(@shop).to be_valid
      end

      it "店名が空だと登録できない" do
        @shop.shop_name = ""
        @shop.valid?
        expect(@shop.errors.full_messages).to include("Shop name can't be blank")
      end

      it "urlが空でも登録できる" do
        @shop.shop_url = ""
        expect(@shop).to be_valid
      end

      it "urlに全角かな漢字カタカナだと登録できない" do
        @shop.shop_url = "山程人がいる"
        @shop.valid?
        expect(@shop.errors.full_messages).to include("Shop url 再度入力お願いします")
      end

      it "地図のURLが空でも登録できる" do
        @shop.map_url = ""
        expect(@shop).to be_valid
      end

      it "コメントが空でも登録できる" do
        @shop.comment = ""
        expect(@shop).to be_valid
      end
    end
  end
end
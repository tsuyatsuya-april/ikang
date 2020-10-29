require "rails_helper"

RSpec.describe Join, type: :model do
  describe "#create" do
    before do
      @join = FactoryBot.build(:join)
    end

    describe "イベント新規登録" do
      it "全ての項目があれば登録できる" do
        expect(@join).to be_valid
      end

      it "ニックネームが空だと登録できない" do
        @join.nickname = ""
        @join.valid?
        expect(@join.errors.full_messages).to include("Nickname can't be blank")
      end
      it "emailが空でも登録できる" do
        @join.email = ""
        expect(@join).to be_valid
      end
    end
  end
end
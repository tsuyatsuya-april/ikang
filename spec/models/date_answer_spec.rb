require "rails_helper"

RSpec.describe DateAnswer, type: :model do
  describe "#create" do
    before do
      @date_answer = FactoryBot.build(:date_answer)
    end

    describe "参加者新規登録" do
      it "全ての項目があれば登録できる" do
        expect(@date_answer).to be_valid
      end
    end
  end
end
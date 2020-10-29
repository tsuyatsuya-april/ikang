require "rails_helper"

RSpec.describe DateDecision, type: :model do
  describe "#create" do
    before do
      @date_decision = FactoryBot.build(:date_decision)
    end

    describe "参加者新規登録" do
      it "全ての項目があれば登録できる" do
        expect(@date_decision).to be_valid
      end
    end
  end
end
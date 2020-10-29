require "rails_helper"

RSpec.describe Schedule, type: :model do
  describe "#create" do
    before do
      @schedule = FactoryBot.build(:schedule)
    end

    describe "イベント新規登録" do
      it "全ての項目があれば登録できる" do
        expect(@schedule).to be_valid
      end

      it "店名が空だと登録できない" do
        @schedule.savedate = ""
        @schedule.valid?
        expect(@schedule.errors.full_messages).to include("Savedate can't be blank")
      end
    end
  end
end
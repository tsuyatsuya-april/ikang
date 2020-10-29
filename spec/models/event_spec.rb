require "rails_helper"

RSpec.describe Event, type: :model do
  describe "#create" do
    before do
      @event = FactoryBot.build(:event)
    end

    describe "イベント新規登録" do
      it "全ての項目があれば登録できる" do
        expect(@event).to be_valid
      end

      it "イベント名が空だと登録できない" do
        @event.name = ""
        @event.valid?
        expect(@event.errors.full_messages).to include("Name can't be blank")
      end

      it "詳細が空だと登録できない" do
        @event.description = ""
        @event.valid?
        expect(@event.errors.full_messages).to include("Description can't be blank")
      end
    end
  end
end
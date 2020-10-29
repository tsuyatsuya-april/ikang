require "rails_helper"

RSpec.describe Comment, type: :model do
  describe "#create" do
    before do
      @comment = FactoryBot.build(:comment)
    end

    describe "コメント投稿" do
      it "全ての項目があれば登録できる" do
        expect(@comment).to be_valid
      end
      it "コメントがなければ投稿できない" do
        @comment.content = ""
        @comment.valid?
        expect(@comment.errors.full_messages).to include("Content can't be blank")
      end
    end
  end
end
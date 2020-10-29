require "rails_helper"

RSpec.describe User, type: :model do
  describe "#create" do
    before do
      @user = FactoryBot.build(:user)
    end

    describe "ユーザー新規登録" do
      it "全ての項目があれば登録できる" do
        expect(@user).to be_valid
      end

      it "ニックネームが空だと登録できない" do
        @user.nickname = ""
        @user.valid?
        expect(@user.errors.full_messages).to include("Nickname can't be blank")
      end

      it "名前が空だと登録できない" do
        @user.name = ""
        @user.valid?
        expect(@user.errors.full_messages).to include("Name can't be blank")
      end
      
      it "メールアドレスが空だと登録できない" do
        @user.email = ""
        @user.valid?
        expect(@user.errors.full_messages).to include("Email can't be blank")
      end

      it "メールアドレスが重複していると登録できない" do
        @user.save
        @another = FactoryBot.build(:user)
        @another.email = @user.email
        @another.valid?
        expect(@another.errors.full_messages).to include("Email has already been taken")
      end

      it "パスワードが６文字より少ないと登録できない" do
        @user.password = "aaaa"
        @user.password_confirmation = @user.password
        @user.valid?
        expect(@user.errors.full_messages).to include("Password is too short (minimum is 6 characters)")
      end

      it "確認用パスワードがパスワードと異なっていれば登録できない" do
        @user.password_confirmation = ''
        @user.valid?
        expect(@user.errors.full_messages).to include("Password confirmation doesn't match Password")
      end


    end
  end
end
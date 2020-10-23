const path = location.pathname;
const query = location.search;
if(path.length >= 8 && path.slice(0,7) === "/events"){
  function join(){
    manySaveOk();
    DateStatusValue();
    shopStatusValue();
    CountDateStatus();
    CountShopStatus();
    noOneDirection();
    //Count系のメソッドでまるばつサンカクを集計した後にexpect系メソッドで集計後の◯の最高値に対して背景色をつける
    //なので、Count系メソッド→expect系メソッドの順番でなければならない
    expectDay();
    expectShop();
    if(query.includes("join_id")){
      transEditLabel();
      shopEditStatusValue();
      DateEditStatusValue();
      modalCloseJoin();
    } else {
      modalAddJoin();
      modalAddShop();
    }
    
    
    function manySaveOk(){
      let targetList0 = document.querySelectorAll("#schedule-status");
      let targetNum0 = targetList0.length;
      for(let i=0; i<targetNum0; i++){
        targetList0[i].removeAttribute("name","join[date_answers_attributes][0][status]")
        targetList0[i].setAttribute("name",`join[date_answers_attributes][${i}][status]`)
      }

      let targetList2 = document.querySelectorAll("#join_date_answers_attributes_0_schedule_id");
      let targetNum2 = targetList2.length;
      for(let i=0; i<targetNum2; i++){
        targetList2[i].removeAttribute("name","join[date_answers_attributes][0][schedule_id]")
        targetList2[i].setAttribute("name",`join[date_answers_attributes][${i}][schedule_id]`)
      }

      let targetList3 = document.querySelectorAll("#join_shop_answers_attributes_0_shop_id");
      let targetNum3 = targetList3.length;
      for(let i=0; i<targetNum3; i++){
        targetList3[i].removeAttribute("name","join[shop_answers_attributes][0][shop_id]")
        targetList3[i].setAttribute("name",`join[shop_answers_attributes][${i}][shop_id]`)
      }

      let targetList4 = document.querySelectorAll("#shops-status");
      let targetNum4 = targetList4.length;
      for(let i=0; i<targetNum4; i++){
        targetList4[i].removeAttribute("name","join[shop_answers_attributes][0][status]")
        targetList4[i].setAttribute("name",`join[shop_answers_attributes][${i}][status]`)
      }

      let targetList5 = document.querySelectorAll("#shops-vote");
      let targetNum5 = targetList5.length;
      for(let i=0; i<targetNum5; i++){
        targetList5[i].removeAttribute("name","join[shop_answers_attributes][0][vote]")
        targetList5[i].setAttribute("name",`join[shop_answers_attributes][${i}][vote]`)
      }
        
    }
    //お店のスケジュールステータスの状態変化
    function shopStatusValue(){
      let shopYes = document.querySelectorAll("#shop-yes");
      let shopNo = document.querySelectorAll("#shop-no");
      let shopDelta = document.querySelectorAll("#shop-delta");
      let shopStatus = document.querySelectorAll("#shops-status");
      let shopLength = shopStatus.length;
      let sc=0;
      for (let i=0; i < shopLength; i++){
        // 初回のメソッドループ内のみ、valueの値に応じて、◯×△にチョイスを与える。
        if(sc < shopLength && shopStatus[i].value == 1){
          shopDelta[i].classList.remove("choice");
          shopYes[i].classList.add("choice");
        } else if(sc < shopLength && shopStatus[i].value == 3){
          shopDelta[i].classList.remove("choice");
          shopNo[i].classList.add("choice");
        }
        // valueがnullなら初期値の2を与える
        if(shopStatus[i].value != 1 && shopStatus[i].value != 2 && shopStatus[i].value != 3){
          shopStatus[i].value = 2;
        }
        //yesをクリックした時にchoiceクラスの追加、それ以外のフォームのchoiceクラスの削除、フォームのバリューを１に設定
        shopYes[i].onclick = function(){
          if(shopYes[i].classList.contains("choice") == false){
            if(shopNo[i].classList.contains("choice") == true){
              shopNo[i].classList.remove("choice");
            }else if(shopDelta[i].classList.contains("choice") == true){
              shopDelta[i].classList.remove("choice");
            }
            shopYes[i].classList.add("choice");
            shopStatus[i].value = 1;
          }
        };
        //デルタをクリックした時にchoiceクラスの追加、それ以外のフォームのchoiceクラスの削除、フォームのバリューを2に設定
        shopDelta[i].onclick = function(){
          if(shopDelta[i].classList.contains("choice") == false){
            if(shopNo[i].classList.contains("choice") == true){
              shopNo[i].classList.remove("choice");
            }else if(shopYes[i].classList.contains("choice") == true){
              shopYes[i].classList.remove("choice");
            }
            shopDelta[i].classList.add("choice");
            shopStatus[i].value = 2;
          }
        };
        //noをクリックした時にchoiceクラスの追加、それ以外のフォームのchoiceクラスの削除、フォームのバリューを3に設定
        shopNo[i].onclick = function(){
          if(shopNo[i].classList.contains("choice") == false){
            if(shopYes[i].classList.contains("choice") == true){
              shopYes[i].classList.remove("choice");
            }else if(shopDelta[i].classList.contains("choice") == true){
              shopDelta[i].classList.remove("choice");
            }
            shopNo[i].classList.add("choice");
            shopStatus[i].value = 3;
          }
        };
      };
    }
    //日付のスケジュールステータスの状態変化
    function DateStatusValue(){
      let dateYes = document.querySelectorAll("#date-yes");
      let dateNo = document.querySelectorAll("#date-no");
      let dateDelta = document.querySelectorAll("#date-delta");
      let dateStatus = document.querySelectorAll("#schedule-status");
      let dateLength = dateStatus.length;
      //ループカウンタを変数dcとする
      let dc=0;
      for (let i=0; i < dateLength; i++){
        // 初回のメソッドループ内のみ、valueの値に応じて、◯×△にチョイスを与える。
        if(dc < dateLength && dateStatus[i].value == 1){
          dateDelta[i].classList.remove("choice");
          dateYes[i].classList.add("choice");
        } else if(dc < dateLength && dateStatus[i].value == 3){
          dateDelta[i].classList.remove("choice");
          dateNo[i].classList.add("choice");
        }
        // valueがnullなら初期値の2を与える。
        if(dateStatus[i].value != 1 && dateStatus[i].value != 2 && dateStatus[i].value != 3){
          dateStatus[i].value = 2;
        }
        //yesをクリックした時にchoiceクラスの追加、それ以外のフォームのchoiceクラスの削除、フォームのバリューを１に設定
        dateYes[i].onclick = function(){
          if(dateYes[i].classList.contains("choice") == false){
            if(dateNo[i].classList.contains("choice") == true){
              dateNo[i].classList.remove("choice");
            }else if(dateDelta[i].classList.contains("choice") == true){
              dateDelta[i].classList.remove("choice");
            }
            dateYes[i].classList.add("choice");
            dateStatus[i].value = 1;
          }
        };
        //デルタをクリックした時にchoiceクラスの追加、それ以外のフォームのchoiceクラスの削除、フォームのバリューを2に設定
        dateDelta[i].onclick = function(){
          if(dateDelta[i].classList.contains("choice") == false){
            if(dateNo[i].classList.contains("choice") == true){
              dateNo[i].classList.remove("choice");
            }else if(dateYes[i].classList.contains("choice") == true){
              dateYes[i].classList.remove("choice");
            }
            dateDelta[i].classList.add("choice");
            dateStatus[i].value = 2;
          }
        };
        //noをクリックした時にchoiceクラスの追加、それ以外のフォームのchoiceクラスの削除、フォームのバリューを3に設定
        dateNo[i].onclick = function(){
          if(dateNo[i].classList.contains("choice") == false){
            if(dateYes[i].classList.contains("choice") == true){
              dateYes[i].classList.remove("choice");
            }else if(dateDelta[i].classList.contains("choice") == true){
              dateDelta[i].classList.remove("choice");
            }
            dateNo[i].classList.add("choice");
            dateStatus[i].value = 3;
          }
        };
        dc++;
      };
    }
  }
  //モーダルウィンドウで参加者を追加できる回答フォームを出力する
  function modalAddJoin(){
    const open = document.getElementById("open");
    const close = document.getElementById("close");
    const modal = document.getElementById("modal");
    const mask = document.getElementById("mask");

    open.onclick = function(){
      modal.classList.remove("hidden");
      mask.classList.remove("hidden");
    };

    close.onclick = function(){
      modal.classList.add("hidden");
      mask.classList.add("hidden");
    };
  }
  //モーダルウィンドウで参加者情報を編集できる回答フォームの閉じるボタンを押せば、閉じるようにする。
  function modalCloseJoin(){
    const close = document.getElementById("edit-close");
    const modal = document.getElementById("edit-modal");
    const mask = document.getElementById("edit-mask");

    close.onclick = function(){
      modal.classList.add("hidden");
      mask.classList.add("hidden");
    };
  }
  //モーダルウィンドウでお店情報を追加できる回答フォームを出力する
  function modalAddShop(){
    const open = document.getElementById("shop-open");
    const close = document.getElementById("shop-close");
    const modal = document.getElementById("shop-modal");
    const mask = document.getElementById("shop-mask");

    open.onclick = function(){
      modal.classList.remove("hidden");
      mask.classList.remove("hidden");
    };

    close.onclick = function(){
      modal.classList.add("hidden");
      mask.classList.add("hidden");
    };
  }

  // 編集フォームに一覧表の日付：時間、お店：urlの項目を追加する
  function transEditLabel(){
    let transSaveDate = document.querySelectorAll("#trans-savedate");
    let transSaveTime = document.querySelectorAll("#trans-savetime");
    let transShopName = document.querySelectorAll("#trans-shop-name");
    let transShopUrl = document.querySelectorAll("#trans-shop-url");
    let passSaveDate = document.querySelectorAll("#pass-savedate");
    let passSaveTime = document.querySelectorAll("#pass-savetime");
    let passShopName = document.querySelectorAll("#pass-shop-name");
    let passShopUrl = document.querySelectorAll("#pass-shop-url");
    let transSaveLength = transSaveDate.length;
    let transShopLength = transShopName.length;
    for (let i=0; i < transSaveLength; i++){
      transSaveDate[i].innerHTML = passSaveDate[i].innerHTML;
      transSaveTime[i].innerHTML = passSaveTime[i].innerHTML;
    }
    for (let d=0; d < transShopLength; d++){
      transShopUrl[d].innerHTML = passShopUrl[d].innerHTML;
      transShopName[d].innerHTML = passShopName[d].innerHTML;
    }
  }
  
  //お店のスケジュールステータスの状態変化
  function shopEditStatusValue(){
    let shopEditYes = document.querySelectorAll("#shop-edit-yes");
    let shopEditNo = document.querySelectorAll("#shop-edit-no");
    let shopEditDelta = document.querySelectorAll("#shop-edit-delta");
    let shopEditStatus = document.querySelectorAll("#shops-edit-status");
    let shopEditLength = shopEditStatus.length;
    let sec = 0;
    for (let i=0; i < shopEditLength; i++){
      // 初回のメソッドループ内のみ、valueの値に応じて、◯×△にチョイスを与える。
      if(sec < shopEditLength && shopEditStatus[i].value == 1){
        shopEditDelta[i].classList.remove("choice");
        shopEditYes[i].classList.add("choice");
      } else if(sec < shopEditLength && shopEditStatus[i].value == 3){
        shopEditDelta[i].classList.remove("choice");
        shopEditNo[i].classList.add("choice");
      }
      // valueがnullなら初期値の2を与える。
      if(shopEditStatus[i].value != 1 && shopEditStatus[i].value != 2 && shopEditStatus[i].value != 3){
        shopEditStatus[i].value = 2;
      }
      //yesをクリックした時にchoiceクラスの追加、それ以外のフォームのchoiceクラスの削除、フォームのバリューを１に設定
      shopEditYes[i].onclick = function(){
        if(shopEditYes[i].classList.contains("choice") == false){
          if(shopEditNo[i].classList.contains("choice") == true){
            shopEditNo[i].classList.remove("choice");
          }else if(shopEditDelta[i].classList.contains("choice") == true){
            shopEditDelta[i].classList.remove("choice");
          }
          shopEditYes[i].classList.add("choice");
          shopEditStatus[i].value = 1;
        }
      };
      //デルタをクリックした時にchoiceクラスの追加、それ以外のフォームのchoiceクラスの削除、フォームのバリューを2に設定
      shopEditDelta[i].onclick = function(){
        if(shopEditDelta[i].classList.contains("choice") == false){
          if(shopEditNo[i].classList.contains("choice") == true){
            shopEditNo[i].classList.remove("choice");
          }else if(shopEditYes[i].classList.contains("choice") == true){
            shopEditYes[i].classList.remove("choice");
          }
          shopEditDelta[i].classList.add("choice");
          shopEditStatus[i].value = 2;
        }
      };
      //noをクリックした時にchoiceクラスの追加、それ以外のフォームのchoiceクラスの削除、フォームのバリューを3に設定
      shopEditNo[i].onclick = function(){
        if(shopEditNo[i].classList.contains("choice") == false){
          if(shopEditYes[i].classList.contains("choice") == true){
            shopEditYes[i].classList.remove("choice");
          }else if(shopEditDelta[i].classList.contains("choice") == true){
            shopEditDelta[i].classList.remove("choice");
          }
          shopEditNo[i].classList.add("choice");
          shopEditStatus[i].value = 3;
        }
      };
    };
  }

  //日付のスケジュールステータスの状態変化
  function DateEditStatusValue(){
    let dateEditYes = document.querySelectorAll("#date-edit-yes");
    let dateEditNo = document.querySelectorAll("#date-edit-no");
    let dateEditDelta = document.querySelectorAll("#date-edit-delta");
    let dateEditStatus = document.querySelectorAll("#schedule-edit-status");
    let dateEditLength = dateEditStatus.length;
    //ループカウンタを変数dcとする
    let dc=0;
    for (let i=0; i < dateEditLength; i++){
      // 初回のメソッドループ内のみ、valueの値に応じて、◯×△にチョイスを与える。
      if(dc < dateEditLength && dateEditStatus[i].value == 1){
        dateEditDelta[i].classList.remove("choice");
        dateEditYes[i].classList.add("choice");
      } else if(dc < dateEditLength && dateEditStatus[i].value == 3){
        dateEditDelta[i].classList.remove("choice");
        dateEditNo[i].classList.add("choice");
      }
      // valueがnullなら初期値の2を与える。
      if(dateEditStatus[i].value != 1 && dateEditStatus[i].value != 2 && dateEditStatus[i].value != 3){
        dateEditStatus[i].value = 2;
      }
      //yesをクリックした時にchoiceクラスの追加、それ以外のフォームのchoiceクラスの削除、フォームのバリューを１に設定
      dateEditYes[i].onclick = function(){
        if(dateEditYes[i].classList.contains("choice") == false){
          if(dateEditNo[i].classList.contains("choice") == true){
            dateEditNo[i].classList.remove("choice");
          }else if(dateEditDelta[i].classList.contains("choice") == true){
            dateEditDelta[i].classList.remove("choice");
          }
          dateEditYes[i].classList.add("choice");
          dateEditStatus[i].value = 1;
        }
      };
      //デルタをクリックした時にchoiceクラスの追加、それ以外のフォームのchoiceクラスの削除、フォームのバリューを2に設定
      dateEditDelta[i].onclick = function(){
        if(dateEditDelta[i].classList.contains("choice") == false){
          if(dateEditNo[i].classList.contains("choice") == true){
            dateEditNo[i].classList.remove("choice");
          }else if(dateEditYes[i].classList.contains("choice") == true){
            dateEditYes[i].classList.remove("choice");
          }
          dateEditDelta[i].classList.add("choice");
          dateEditStatus[i].value = 2;
        }
      };
      //noをクリックした時にchoiceクラスの追加、それ以外のフォームのchoiceクラスの削除、フォームのバリューを3に設定
      dateEditNo[i].onclick = function(){
        if(dateEditNo[i].classList.contains("choice") == false){
          if(dateEditYes[i].classList.contains("choice") == true){
            dateEditYes[i].classList.remove("choice");
          }else if(dateEditDelta[i].classList.contains("choice") == true){
            dateEditDelta[i].classList.remove("choice");
          }
          dateEditNo[i].classList.add("choice");
          dateEditStatus[i].value = 3;
        }
      };
      dc++;
    };
  }
  // 一番投票機能の実装
  function noOneDirection(){
    let receiveVote = document.querySelectorAll("#shops-vote");
    let passVote = document.querySelectorAll("#shop-vote");
    let receiveVoteLength = receiveVote.length;
  
    for(let i=0; i < receiveVoteLength;i++){  
      passVote[i].onclick = function(){
        for(let j=0; j<receiveVoteLength; j++){
          if(i != j){
            if(passVote[j].classList.contains("choice") == true){
              passVote[j].classList.remove("choice");
            }
            receiveVote[j].value = 0;
          }
        }
        if(receiveVote[i].value == 1){
          receiveVote[i].value = 0;
          if(passVote[i].classList.contains("choice") == true){
            passVote[i].classList.remove("choice");
          }
        }else{
          receiveVote[i].value = 1;
          if(passVote[i].classList.contains("choice") == false){
            passVote[i].classList.add("choice");
          }
        }
      }
    }
  }

  // 日程の一覧表にマルバツサンカクの集計を反映させる
  function CountDateStatus(){
    let dateTbl = document.getElementById("date-table");
    for(let i=0;i<dateTbl.rows.length;i++){
      let circle=0;
      let delta=0;
      let cross=0;
      for(let j=0;j<dateTbl.rows[i].cells.length;j++){ 
        let Cells = dateTbl.rows[i].cells[j].innerText;
        if (i>0 && j > 4){
          if (Cells == "◯"){
            circle++;
          } else if(Cells == "△"){
            delta++;
          } else if(Cells == "×"){
            cross++;
          }
        }
      }
      if (i>0){
        dateTbl.rows[i].cells[2].innerHTML = circle;
        dateTbl.rows[i].cells[3].innerHTML = delta;
        dateTbl.rows[i].cells[4].innerHTML = cross;
      }
    }
  }
  // お店の一覧表にマルバツサンカクの集計を反映させる
  function CountShopStatus(){
    let shopTbl = document.getElementById("shop-table");
    for(let i=0;i<shopTbl.rows.length;i++){
      let circle=0;
      let delta=0;
      let cross=0;
      for(let j=0;j<shopTbl.rows[i].cells.length;j++){ 
        let Cells = shopTbl.rows[i].cells[j].innerText;
        if (i>0 && j > 4){
          if (Cells == "◯"){
            circle++;
          } else if(Cells == "△"){
            delta++;
          } else if(Cells == "×"){
            cross++;
          }
        }
      }
      if (i>0){
        shopTbl.rows[i].cells[2].innerHTML = circle;
        shopTbl.rows[i].cells[3].innerHTML = delta;
        shopTbl.rows[i].cells[4].innerHTML = cross;
      }
    }
  }
  // 日程の一覧表で◯の集計が最高値の行に背景色を付与
  function expectDay() {
    let dateTbl = document.getElementById("date-table");
    let row = dateTbl.rows.length;
    let mc = 0;
    for(i=1;i<row;i++){
      if(dateTbl.rows[i].cells[2].innerHTML > mc){
        mc = dateTbl.rows[i].cells[2].innerHTML;
      }
    }
    for(j=0;j<row;j++){
      if(dateTbl.rows[j].cells[2].innerHTML == mc && mc > 0){
        dateTbl.rows[j].style.backgroundColor = "pink";
      }
    }
  }

  // お店の一覧表で◯の集計が最高値の行に背景色を付与
  function expectShop() {
    let shopTbl = document.getElementById("shop-table");
    let row = shopTbl.rows.length;
    let mc = 0;
    for(i=1;i<row;i++){
      if(shopTbl.rows[i].cells[2].innerHTML > mc){
        mc = shopTbl.rows[i].cells[2].innerHTML;
      }
    }
    for(j=0;j<row;j++){
      if(shopTbl.rows[j].cells[2].innerHTML == mc && mc > 0){
        shopTbl.rows[j].style.backgroundColor = "pink";
      }
    }
  }


  function check_name() {
      const userName = document.getElementById("join-user");
      if (userName.value == ""){
        window.alert("名前を入力してください");
        return false;
      }
  }
  window.addEventListener("load", join);
}
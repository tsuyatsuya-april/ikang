const path = location.pathname;
if(path === "/events/new" || path === "/events" 
|| path.slice(0,7) === "/events" && path.length <= 8 
|| path.slice(0,7) === "/events" && path.slice(-4) === "edit" 
|| path.slice(0,7) === "/events" && !path.includes("join")){
  function main (){
    console.clear();

    // 最初のレイアウトを削除する方法
    // firstDelete();
    // function firstDelete() {
    //   const firstUl = document.getElementById("add_date_style");
    //   const path = location.pathname
    //   if (path === "/") {
    //   firstUl.remove();
    //   }
    // }

    

    { 
      newShopAdd();
      shopDelete();
      const today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth();

      function getCalendarHead() {
        const dates = [];
        const d = new Date(year, month, 0).getDate();
        const n = new Date(year, month, 1).getDay();

        for (let i = 0; i < n; i++) {
          dates.unshift({
            date: d - i,
            isToday: false,
            isDisabled: true,
          });
        }
        return dates;
      }

      function getCalendarTail() {
        const dates = [];
        const lastDay = new Date(year, month + 1, 0).getDay();

        for (let i = 1; i < 7 - lastDay; i++) {
          dates.push({
            date: i,
            isToday: false,
            isDisabled: true,
          });
        }
        
        return dates;
      }


      function getCalendarBody() {
        const dates =[];
        const lastDate = new Date(year, month + 1, 0).getDate();

        for(let i = 1; i <= lastDate; i++){
          dates.push({
            date: i,
            isToday: false,
            isDisabled: false,
          });
        }
        if (year === today.getFullYear() && month === today.getMonth()) {
          dates[today.getDate() - 1].isToday = true;
        }
        
        return dates;
      }
      function renderTitle() {
        const title = `${year}/${String(month + 1).padStart(2, "0")}`;
        document.getElementById("title").textContent = title;
      }

      function clearCalendar() {
        const tbody = document.querySelector("tbody");
        while (tbody.firstChild){
          tbody.removeChild(tbody.firstChild);
        }
      }

      function renderWeeks() {
        const dates = [
          ...getCalendarHead(),
          ...getCalendarBody(),
          ...getCalendarTail(),
        ];
        const weeks = [];
        const weeksCount = dates.length / 7;

        for( let i = 0; i < weeksCount; i++){
          weeks.push(dates.splice(0, 7))
        }
        weeks.forEach(week => {
          const tr = document.createElement("tr");
          week.forEach(date => {
            const td = document.createElement("td");

            td.textContent = date.date;
            if (date.isToday) {
              td.classList.add("today");
            }
            if (date.isDisabled) {
              td.classList.add("disabled");
            }

            tr.appendChild(td);
          });
          document.querySelector("tbody").appendChild(tr);
        });
      }

      function createCalendar() {
        clearCalendar();
        renderTitle();
        renderWeeks();
        getDays();
      }

      document.getElementById("prev").addEventListener("click", () => {
        month--;
        if(month < 0) {
          year--;
          month = 11;
        }
        createCalendar();
      });
      document.getElementById("next").addEventListener("click", () => {
        month++;
        if(month > 11) {
          year++;
          month = 0;
        }
        createCalendar();
      });
      
      createCalendar();
      removeHTML();
      function getDays() {
        let myTbl = document.getElementById("days");
        for (let i=0;i<myTbl.rows.length;i++){
          for(let j=0;j<myTbl.rows[i].cells.length; j++){
            let Cells=myTbl.rows[i].cells[j];
            Cells.onclick = function(){
              direction(this);
            }
          }
        } 
      }
      
      function direction(Cell){
        let judgePlus = document.getElementsByClassName("savedate-input");
        let nowClass = Cell.className;
        let rowINX = Cell.parentNode.rowIndex;
        let cellVal = Cell.innerHTML;
        let year_month = document.getElementById("title").innerHTML;
        let year = year_month.slice(0,4);
        let month = year_month.slice(5);
        let date_string = `${year}-${month}-${cellVal.padStart(2, "0")}`;
        if (nowClass != "disabled"){
          if (rowINX > 1 ){
            if ( judgePlus[0].value != ""){
            createHTML(date_string);
            } else {
              judgePlus[0].value = date_string;
            }
          }
        }
      }
      //HTML要素を作成して、追加するメソッド
      function createHTML (date_string) {
        nameNumberDateAdjust();
        const ParentNode = document.getElementById("select-days");

        //選択フォームを作成する元となるul要素を生成
        const SecondParentUl = document.createElement("ul");
        SecondParentUl.setAttribute("id", "add-date-style");
        let ulElementNum = document.querySelectorAll("#add-date-style").length;

        //inputの親となるli要素の生成
        const inputParentLi = document.createElement("li");
        inputParentLi.setAttribute("class", "date-input");

        //input要素の生成
        const inputHTML = document.createElement("input");
        inputHTML.setAttribute("id", `event_schedules_attributes_${ulElementNum}_savedate`);
        inputHTML.setAttribute("class", `savedate-input`);
        inputHTML.setAttribute("name", `event[schedules_attributes][${ulElementNum}][savedate]`);
        inputHTML.setAttribute("value", date_string);
        inputHTML.setAttribute("type", "date");

        //selectの親となるli要素の生成
        const selectParentLi = document.createElement("li");
        selectParentLi.setAttribute("class", "date-time");

        //select要素の生成
        const selectHTML = document.createElement("select");
        selectHTML.setAttribute("name", `event[schedules_attributes][${ulElementNum}][savetime]`);
        selectHTML.setAttribute("id", `event_schedules_attributes_${ulElementNum}_savetime`);
        selectHTML.setAttribute("class", `date-time-input`);
        
        
        //削除の親となるli要素の生成
        const deleteParentLi = document.createElement("li");
        deleteParentLi.setAttribute("id", "schedule-delete");

        // 削除機能をつけるa要素の生成
        const deleteHTML = document.createElement("p");
        deleteHTML.setAttribute("class", `btn-flat-border-red`);
        deleteHTML.setAttribute("class", `btn-flat-border-red`);
        deleteHTML.innerText = "日程削除";
        // 要素を追加
        ParentNode.appendChild(SecondParentUl);
        SecondParentUl.appendChild(inputParentLi);
        SecondParentUl.appendChild(selectParentLi);
        SecondParentUl.appendChild(deleteParentLi);
        inputParentLi.appendChild(inputHTML);
        selectParentLi.appendChild(selectHTML);
        deleteParentLi.appendChild(deleteHTML);
        
        // option要素の追加

        // option要素の作成（下記オリジンを複製してループ内の要素を追加）
        const optionOriginHTML = document.createElement("option");
        for (let i=0;i<49;i++){
          let optionHTML = optionOriginHTML.cloneNode(true);
          //optionの選択肢の作成 i÷２をした時の商を時間、余りを分として表示させたい。例)12:00
          let selectHour = Math.floor(i/2);
          let selectMinute = Math.floor(i%2);
          let optionText = `${String(selectHour)}:${String(selectMinute*30).padStart(2, "0")} ~`;
          let optionValue = `${String(selectHour).padStart(2, "0")}:${String(selectMinute*30).padStart(2, "0")}`;
          
          if (i === 0){
            // 最初の未選択の場合の項目を作成
            optionHTML.innerText = "";
            optionHTML.setAttribute("value", "選択");
          } else if(i=== 39){
            // 反映した時に表示したい時刻を設定するため
            optionHTML.setAttribute("value", optionValue);
            optionHTML.setAttribute("selected", true);
            optionHTML.innerText = optionText;
          } else {
            // 通常状態の設定
            optionHTML.setAttribute("value", optionValue);
            optionHTML.innerText = optionText;
          }
          // select要素にoption要素を追加
          selectHTML.appendChild(optionHTML);
        }
        removeHTML();
        shopDelete();
      }
      
      // 日程削除ボタンの実装
      function removeHTML(){
        let targetList = document.querySelectorAll("#schedule-delete");
        let targetUl = document.querySelectorAll("#add-date-style");
        let targetNum = targetList.length;
        for (let i=0; i < targetNum; i++){
          targetList[i].onclick = function(){
            let conformLength = document.querySelectorAll("#add-date-style").length;
            if (conformLength != 1){
              return targetUl[i].remove();
            }
          }
        };
      };
      
      function newShopAdd(){
        nameNumberShopAdjust();
        const shopParent = document.getElementById("new-shop-top");
        const addShopBtn = document.getElementById("shop-add-btn");
        let currentShopLength = document.querySelectorAll("#new-shop").length;
        let nextNum = currentShopLength;
        let shopHtml = `
          <div id="new-shop">
            <div id="shop-name-box">
              <div id="shop-name"><p>店名(必須)</p></div>
              <input class="shop-name-input" type="text" name="event[shops_attributes][${nextNum}][shop_name]" id="event_shops_attributes_${nextNum}_shop_name">
            </div>
            <div id="shop-url-box">
              <div id="shop-url"><p>店のURL(任意)</p></div>
              <input class="shop-url-input" type="text" name="event[shops_attributes][${nextNum}][shop_url]" id="event_shops_attributes_${nextNum}_shop_url">
            </div>
            <div id="shop-map-box">
              <div id="shop-map"><p>地図のURL(任意)</p></div>
              <input class="shop-map-input" type="text" name="event[shops_attributes][${nextNum}][map_url]" id="event_shops_attributes_${nextNum}_map_url">
            </div>
            <div id="shop-comment-box">
              <div id="shop-comment"><p>コメント(任意)</p></div>
              <input class="shop-comment-input" type="text" name="event[shops_attributes][${nextNum}][comment]" id="event_shops_attributes_${nextNum}_comment">
            </div>
            <div id="shop-delete-box">
              <a class="btn-flat-border-red" id="shop-delete" href="#">お店削除</a>
            </div>
          </div>`;
        addShopBtn.onclick = function(){
          shopParent.insertAdjacentHTML("beforeend", shopHtml);
          shopDelete();
          newShopAdd();
        };
        
      }

      function shopDelete(){
        let shopParent = document.querySelectorAll("#new-shop");
        let shopDeleteBtn = document.querySelectorAll("#shop-delete");
        let shopParentLength = shopParent.length;
        for (let i=0; i < shopParentLength; i++){
          shopDeleteBtn[i].onclick = function(){
            let conformShopLength = document.querySelectorAll("#new-shop").length;
            if(conformShopLength != 1){  
              return shopParent[i].remove();
            }
          };
        };
      }

      function nameNumberDateAdjust(){
        let saveDate = document.querySelectorAll(".savedate-input");
        let saveTime = document.querySelectorAll(".date-time-input");
        let saveDateLength = saveDate.length;
        for(let i=0; i<saveDateLength; i++){
          saveDate[i].removeAttribute("name");
          saveDate[i].setAttribute("name",`event[schedules_attributes][${i}][savedate]`);
          saveTime[i].removeAttribute("name");
          saveTime[i].setAttribute("name",`event[schedules_attributes][${i}][savetime]`);
        }
      }


      function nameNumberShopAdjust(){
        let saveShop = document.querySelectorAll(".shop-name-input");
        let saveShopUrl= document.querySelectorAll(".shop-url-input");
        let saveShopMap = document.querySelectorAll(".shop-map-input");
        let saveShopComment = document.querySelectorAll(".shop-comment-input");
        let saveShopLength = saveShop.length;
        for(let j=0; j<saveShopLength; j++){
          saveShop[j].removeAttribute("name");
          saveShop[j].setAttribute("name",`event[shops_attributes][${j}][shop_name]`);
          saveShopUrl[j].removeAttribute("name");
          saveShopUrl[j].setAttribute("name",`event[shops_attributes][${j}][shop_url]`);
          saveShopMap[j].removeAttribute("name");
          saveShopMap[j].setAttribute("name",`event[shops_attributes][${j}][map_url]`);
          saveShopComment[j].removeAttribute("name");
          saveShopComment[j].setAttribute("name",`event[shops_attributes][${j}][comment]`);
        }
      }
    } 
  };
  window.addEventListener("load", main);
}
      

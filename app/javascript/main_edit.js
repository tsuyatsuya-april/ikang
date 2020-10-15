function edit(){
  const passWord = document.getElementById("edit-pass").innerHTML;
  if(passWord == "イベント編集ページです"){
      console.clear();
    {
      editShopAdd();
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
        document.getElementById("edit-title").textContent = title;
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

      document.getElementById("edit-prev").addEventListener("click", () => {
        month--;
        if(month < 0) {
          year--;
          month = 11;
        }
        createCalendar();
      });
      document.getElementById("edit-next").addEventListener("click", () => {
        month++;
        if(month > 11) {
          year++;
          month = 0;
        }
        createCalendar();
      });
      
      createCalendar();
      function getDays() {
        let myTbl = document.getElementById("edit-days");
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
        let nowClass = Cell.className;
        let rowINX = Cell.parentNode.rowIndex;
        let cellVal = Cell.innerHTML;
        let year_month = document.getElementById("edit-title").innerHTML;
        let year = year_month.slice(0,4);
        let month = year_month.slice(5);
        let date_string = `${year}-${month}-${cellVal.padStart(2, "0")}`;
        if (nowClass != "disabled"){
          if (rowINX > 1 ){
            editScheduleAdd(date_string);
          }
        }
      }


      function editScheduleAdd(date_string){
        let setDate = document.getElementById("only-date-input");
        const scheduleForm = document.getElementById("edit-schedule-form")
        setDate.setAttribute("value", date_string);
        scheduleForm.submit();
      } 
      function editShopAdd(){
        document.getElementById("edit-shop-add-btn").addEventListener("click", () => {
        const shopForm = document.getElementById("edit-shop-form");
        let targetShopName = document.getElementById("only-shop-name");
          targetShopName.setAttribute("value", "店名登録お願いします");
          shopForm.submit();
        });
      }
    } 
  } 
};
window.addEventListener("load", edit);





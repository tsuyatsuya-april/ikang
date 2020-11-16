new Vue({
  el:"#create-calender",
  data:{
    today:"",
    selectedDay:"",
    currentYear:0,
    currentMonth:0,
    currentDate:0,
    weeks:["月","火","水","木","金","土","日"],
    calendar:[],
    holidays:[]
  },
  created(){
    const date = new Date();
    [this.currentYear, this.currentMonth, this.currentDate] = [date.getFullYear(),date.getMonth() + 1, date.getDate()];
    this.today = this.selectedDay = `${this.currentYear}-${('0' + this.currentMonth).slice(-2)}-${this.currentDate}`;
  },
  methods:{
    checkSelectedDay(day){
      return{
        'selectedDay':`${this.currentYear}-${('0' + this.currentMonth).slice(-2)}-${('0' + day).slice(-2)}` == this.selectedDay
      }
    },
    movePrevMonth(){
      this.currentMonth = this.currentMonth != 1 ? this.currentMonth - 1 : 12;
      this.currentYear = this.currentMonth != 12 ? this.currentYear : this.currentYear - 1;
    },
    moveNextMonth(){
      this.currentMonth = this.currentMonth != 12 ? this.currentMonth + 1 : 1;
      this.currentYear = this.currentMonth != 1 ? this.currentYear : this.currentYear + 1;
    },
  },
  computed:{
    calendarMake(){
      const firstday = new Date(this.currentYear, this.currentMonth - 1, 1).getDay();
      const lastdate = new Date(this.currentYear, this.currentMonth, 0).getDate();
      const necessarySpace = firstday == 0 ? 6 : firstday - 1;
      const list = [[...Array(necessarySpace)].map(i=>" "), [...Array(lastdate)].map((_, i) => i+1)];
      const week = list.reduce((pre,current) => {pre.push(...current);return pre},[]);
      return week;
    },
  }
});
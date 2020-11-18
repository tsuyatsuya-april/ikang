/* eslint no-console: 0 */
// Run this example by adding <%= javascript_pack_tag 'hello_vue' %> (and
// <%= stylesheet_pack_tag 'hello_vue' %> if you have styles in your component)
// to the head of your layout file,
// like app/views/layouts/application.html.erb.
// All it does is render <div>Hello Vue</div> at the bottom of the page.

import Vue from 'vue'


document.addEventListener('DOMContentLoaded', () => {
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
})

// The above code uses Vue without the compiler, which means you cannot
// use Vue to target elements in your existing html templates. You would
// need to always use single file components.
// To be able to target elements in your existing html/erb templates,
// comment out the above code and uncomment the below
// Add <%= javascript_pack_tag 'hello_vue' %> to your layout
// Then add this markup to your html template:
//
// <div id='hello'>
//   {{message}}
//   <app></app>
// </div>


// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// document.addEventListener('DOMContentLoaded', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: {
//       message: "Can you say hello?"
//     },
//     components: { App }
//   })
// })
//
//
//
// If the project is using turbolinks, install 'vue-turbolinks':
//
// yarn add vue-turbolinks
//
// Then uncomment the code block below:
//
// import TurbolinksAdapter from 'vue-turbolinks'
// import Vue from 'vue/dist/vue.esm'
// import App from '../app.vue'
//
// Vue.use(TurbolinksAdapter)
//
// document.addEventListener('turbolinks:load', () => {
//   const app = new Vue({
//     el: '#hello',
//     data: () => {
//       return {
//         message: "Can you say hello?"
//       }
//     },
//     components: { App }
//   })
// })

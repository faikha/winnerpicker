import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { saveAs } from 'file-saver';


import '@/assets/tailwind.css'

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

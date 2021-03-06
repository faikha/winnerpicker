import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { saveAs } from 'file-saver'
import VueConfetti from 'vue-confetti'

import '@/assets/tailwind.css'

Vue.config.productionTip = false;

Vue.use(VueConfetti)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

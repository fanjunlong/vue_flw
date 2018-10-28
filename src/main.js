import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import _ from 'lodash'
import Navigation from 'vue-navigation' // keep-alive 生命周期
Vue.use(Navigation, {router, store}); //生命周期挂载到url以及store中

Vue.config.productionTip = false;
const FastClick = require('fastclick'); // 防点透处理
FastClick.attach(document.body);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

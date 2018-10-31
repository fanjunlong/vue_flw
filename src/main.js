import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import _ from 'lodash'
import lrz from 'lrz'
import Navigation from 'vue-navigation' // keep-alive 生命周期
Vue.use(Navigation, {router, store}); //生命周期挂载到url以及store中

Vue.config.productionTip = false;
const FastClick = require('fastclick'); // 防点透处理
FastClick.attach(document.body);

import Popup from 'vux/src/components/popup'
import Alert from 'vux/src/components/alert'
import Confirm from 'vux/src/components/confirm'
import Cell from 'vux/src/components/cell'
import Group from 'vux/src/components/group'
import XInput from 'vux/src/components/x-input'
import ToastPlugin from 'vux/src/plugins/toast'
import LoadingPlugin from 'vux/src/plugins/loading'

Vue.component('popup', Popup);
Vue.component('group', Group);
Vue.component('Cell', Cell);
Vue.component('alert', Alert);
Vue.component('x-input', XInput);
Vue.component('confirm', Confirm);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);

import TransferDom from 'vux/src/directives/transfer-dom';
Vue.directive('transfer-dom', TransferDom);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

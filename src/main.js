import '@babel/polyfill';

import Vue from 'vue'
import App from './App.vue'

import './plugins/ant-ui';

import VueFilterDateFormat from 'vue-filter-date-format';
import VueFilterDateParse from 'vue-filter-date-parse';

Vue.use(VueFilterDateFormat);
Vue.use(VueFilterDateParse);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

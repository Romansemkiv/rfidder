import Vue from 'vue'
import './plugins/axios'
import {format, parseJSON } from 'date-fns'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import vuetify from './plugins/vuetify';
import VueMqtt from 'vue-mqtt';
import config from './config';

Vue.prototype.$date_format = format;
Vue.prototype.$date_json = parseJSON;
Vue.use(VueMqtt, config.MQTTServer, {clientId: 'WebClient-' + parseInt(Math.random() * 100000)});

Vue.config.productionTip = false

// Vue.prototype.$http = axios

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

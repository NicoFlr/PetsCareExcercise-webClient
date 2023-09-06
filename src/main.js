import Vue from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './config/i18n';
import store from './store/Store';
import vuetify from './plugins/vuetify';
import './GlobalStyle.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app');


/*
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/Store'
import i18n from './config/i18n'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
  })



 createApp(App).use(i18n).use(store).use(router).use(vuetify).mount('#app')*/

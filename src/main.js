import Vue from 'vue';
import { BootstrapVue, IconsPlugin, FormSelectPlugin, NavbarPlugin } from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import moment from 'moment-timezone';
import vuemoment from 'vue-moment';
import Datetime from 'vue-datetime';
import Toasted from 'vue-toasted';
import VueCarousel from 'vue-carousel';
import '@babel/polyfill';
import 'mutationobserver-shim';
import './plugins/bootstrap-vue';
import { lowerCase } from 'lodash';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

import VueCookies from 'vue-cookies';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import initializeFilters from './filters';

Vue.use(BootstrapVue, {
  breakpoints: [`xs`, 'sm', 'md', 'lg', 'xl', 'xxl'],
});
Vue.use(Vuelidate);
Vue.use(IconsPlugin);
Vue.use(NavbarPlugin);
Vue.use(FormSelectPlugin);
Vue.use(vuemoment, { moment });
Vue.use(Datetime);
Vue.use(VueCarousel);
Vue.use(Toasted, {
  theme: 'toasted-primary',
  position: 'bottom-right',
  duration: 5000,
  containerClass: 'notification-bottom-right',
});
Vue.use(VueCookies);
Vue.config.productionTip = false;
Vue.$cookies.config('7d', null, process.env.VUE_APP_COOKIE_HOST_NAME);
initializeFilters(Vue);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

Sentry.init({
  enabled: process.env.VUE_APP_SENTRY_ENABLED,
  environment: process.env.NODE_ENV,
  dsn: process.env.VUE_APP_SENTRY_URL,
  integrations: [new Integrations.Vue({ Vue, attachProps: true })],
});

Sentry.configureScope(scope => {
  scope.setLevel(lowerCase(process.env.VUE_APP_SENTRY_LEVEL));
});

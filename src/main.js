import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import VueGoogleMaps from '@fawmi/vue-google-maps';
import moment from 'moment';
import payments from '@sendyit/pay';
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import i18n from './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import store from './store';

const VueTelInputOptions = {
  mode: 'international',
  onlyCountries: ['NG', 'KE', 'UG', 'TZ', 'CI'],
};
library.add(faUserSecret);
createApp(App).use(store).use(router).use(ElementPlus)
  .use(i18n)
  .use(VueGoogleMaps, {
    load: {
      libraries: ['places', 'geometry'],
      key: process.env.GOOGLE_API_KEY_TEST,
    },
  })
  .use(moment)
  .use(VueTelInput, VueTelInputOptions)
  .use('font-awesome-icon', FontAwesomeIcon)
  .use(payments, {
    store,
    router,
    config: {
      BASE_URL: process.env.VUE_APP_BASE_URL,
      VGS_VAULT_ID: process.env.VUE_APP_VGS_VAULT_ID,
      VGS_ENVIRONMENT: process.env.VUE_APP_VGS_ENVIRONMENT,
    },
  })
  .mount('#app');

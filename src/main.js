// eslint-disable
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
import { datadogRum } from '@datadog/browser-rum';
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
datadogRum.init({
  applicationId: '2a6825f4-1339-409a-9180-44b0c904e781',
  clientToken: 'pub6c0dd7a5d33deda005dfa3d1c0770e2e',
  site: 'datadoghq.eu',
  service: 'fulfillment-buyerapp',
  env: process.env.DOCKER_ENV,
  sampleRate: 100,
  sessionReplaySampleRate: 20,
  trackInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
});
datadogRum.startSessionReplayRecording();
createApp(App).use(store).use(ElementPlus)
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
  .use(router)
  .mount('#app');

/* eslint-disable import/no-unresolved */

import Vue from 'vue';
import moment from 'moment';
import { initializeApp } from 'firebase/app';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import * as VueGoogleMaps from 'vue2-google-maps';
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  Badge,
  Pagination,
  Dropdown,
  Dialog,
  DropdownMenu,
  DropdownItem,
  Divider,
  Input,
  InputNumber,
  Radio,
  Checkbox,
  Card,
  Select,
  Form,
  FormItem,
  Option,
  Button,
  Table,
  Tag,
  TableColumn,
  DatePicker,
  TimeSelect,
  Timeline,
  TimelineItem,
  TimePicker,
  Icon,
  Rate,
  Steps,
  Step,
  Row,
  Col,
  Loading,
  MessageBox,
  Message,
  Notification,
  Popover,
  RadioGroup,
  RadioButton,
  Autocomplete,
  Upload,
  CheckboxGroup,
  Progress,
} from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.prototype.moment = moment;
locale.use(lang);

Vue.use(Pagination);
Vue.use(Badge);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Dropdown);
Vue.use(Dialog);
Vue.use(Divider);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Card);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Select);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Option);
Vue.use(Button);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Icon);
Vue.use(Rate);
Vue.use(Popover);
Vue.use(Autocomplete);
Vue.use(Loading.directive);
Vue.use(Upload);
Vue.use(CheckboxGroup);
Vue.use(Progress);
Vue.use(VueGoogleMaps, {
  load: {
    libraries: ['places', 'geometry'],
    key: process.env.GOOGLE_API_KEY_TEST,
  },
});
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

library.add(faSpinner, faThumbsUp, faThumbsDown);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

initializeApp({
  apiKey: 'AIzaSyCgetfUGhkVy1c_QePUgxtyr8vDOvB0Ru4',
  authDomain: 'buyer-fulfillment.firebaseapp.com',
  projectId: 'buyer-fulfillment',
  storageBucket: 'buyer-fulfillment.appspot.com',
  messagingSenderId: '809840261046',
  appId: '1:809840261046:web:173c5b76f2f807c1657317',
  measurementId: 'G-7CLVXLT1BW',
});
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('firebase-messaging-sw.js', { scope: './' });
  });
}
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

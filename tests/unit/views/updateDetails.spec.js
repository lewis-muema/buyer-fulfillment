import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import VueTelInput from 'vue-tel-input';
import * as VueGoogleMaps from 'vue2-google-maps';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';
import VueI18n from 'vue-i18n';
import messages from './messages';
import './localstorage';
// eslint-disable-next-line import/no-unresolved
import UpdateDetails from '@/views/fulfillment/updateDetails.vue';
import StatusMixin from '../../../src/mixins/status_mixin';
import store from './store';

Vue.use(Vuelidate);
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});
Vue.use(VueTelInput);
Vue.use(VueGoogleMaps, {
  load: {
    libraries: ['places', 'geometry'],
    key: process.env.GOOGLE_API_KEY_TEST,
  },
});
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(ElementUI);
localVue.use(VueRouter);
const router = new VueRouter();
let wrapper;

describe('UpdateDetails.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(UpdateDetails, {
      i18n, store, mixins: [StatusMixin], localVue, router, sync: false,
    });
  });
  it('should bind the location long and lat coordintes to params', () => {
    wrapper.vm.setLocation({
      geometry: {
        location: { lat() { return -1.2994605; }, lng() { return 36.7906854; } },
      },
      name: 'Ngong Road',
    });
    expect(wrapper.vm.params.deliveryLocation.description).to.equal('Ngong Road');
    expect(wrapper.vm.params.deliveryLocation.latitude).to.equal(-1.2994605);
    expect(wrapper.vm.params.deliveryLocation.longitude).to.equal(36.7906854);
  });
});

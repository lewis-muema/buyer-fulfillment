/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import moxios from 'moxios';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';
import VueI18n from 'vue-i18n';
import messages from './messages';
import './localstorage';
import reviewChanges from '@/views/fulfillment/reviewChanges.vue';
import StatusMixin from '../../../src/mixins/status_mixin';
import store from './store';

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});
const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(ElementUI);
localVue.use(VueRouter);
const router = new VueRouter();
let wrapper;

describe('ReviewChanges.vue', () => {
  beforeEach(() => {
    moxios.install(axios);
    window.axios = axios;
    wrapper = shallowMount(reviewChanges, { i18n, store, mixins: [StatusMixin], localVue, router, sync: false, });
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should render member props in the component', () => {
    expect(wrapper.props()).to.have.any.keys('name');
    expect(wrapper.props()).to.have.any.keys('deliveryLocationDescription');
    expect(wrapper.props()).to.have.any.keys('deliveryLocationLongitude');
    expect(wrapper.props()).to.have.any.keys('deliveryLocationLatitude');
    expect(wrapper.props()).to.have.any.keys('houseLocation');
    expect(wrapper.props()).to.have.any.keys('deliveryOption');
  });
  it('submits the updated details', () => {
    wrapper.vm.updateDeliveryInfo();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: {
            message: 'order.reschedule.success',
            data: null,
            errors:[]
          },
        })
        .then((response) => {
          expect(response.data.message).to.equal('order.reschedule.success');
          expect(store.getters.getDetailsDialogVisible).to.equal(false);
          done();
        })
        .catch(error => {
          console.log('caught', error.message);
        });
    });
  });
});

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
import ChangeInfo from '@/views/fulfillment/reschedule.vue';
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

describe('Reschedule.vue', () => {
  beforeEach(() => {
    moxios.install(axios);
    window.axios = axios;
    wrapper = shallowMount(ChangeInfo, {
      i18n, store, mixins: [StatusMixin], localVue, router, sync: false,
    });
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should set dialog to false', async () => {
    expect(wrapper.vm.visibleDatePicker).to.equal(false);
  });
  it('show allowed dates on date picker', async () => {
    expect(wrapper.vm.allowedDates(1634386603000)).to.equal(false);
  });
  it('submits the reschedule date', (done) => {
    wrapper.vm.rescheduleDelivery();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: {
            message: 'order.recipient.update.success',
            data: {
              name: 'Lewis M',
              phone_number: '+254 795 510441',
              delivery_location: {
                description: 'Ngong Road, Nairobi, Kenya',
                longitude: 36.7906854,
                latitude: -1.2994605,
                region: null,
              },
              house_location: 'Not set',
              delivery_instructions: 'Leave with guard',
            },
            errors: [],
          },
        })
        .then((response) => {
          expect(response.data.message).to.equal('order.recipient.update.success');
          expect(store.getters.getDetailsDialogVisible).to.equal(false);
          expect(wrapper.vm.visibleDatePicker).to.equal(false);
          done();
        })
        .catch((error) => {
          console.log('caught', error.message);
        });
    });
  });
});

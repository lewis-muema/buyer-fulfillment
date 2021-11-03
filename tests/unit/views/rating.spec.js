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
import rating from '@/views/fulfillment/rating.vue';
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

describe('Rating.vue', () => {
  beforeEach(() => {
    moxios.install(axios);
    window.axios = axios;
    wrapper = shallowMount(rating, { i18n, store, mixins: [StatusMixin], localVue, router, sync: false, });
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('submits the rating and changes the rating status', done => {
    wrapper.vm.submitRating(2);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: {
            status: true,
            data: {
              message:"order.rate.success",
              data:{
                data:{
                  love:false,
                  comment:"Reason"
                }},
              errors: [],
            },
          },
        })
        .then((response) => {
          expect(response.data.data.message).to.equal('order.rate.success');
          expect(wrapper.vm.submitStatus).to.equal(true);
          done();
        })
        .catch(error => {
          console.log('caught', error.message);
        });
    });
  });
});

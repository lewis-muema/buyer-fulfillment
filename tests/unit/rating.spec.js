import ElementPlus from 'element-plus';
import { createI18n } from 'vue-i18n';
import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import moxios from 'moxios';
import axios from 'axios';
import messages from './messages';
import Rating from '../../src/views/fulfillment/rating/ratingCard.vue';
import store from './store';
import './localStorage';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

describe('Rating.vue', () => {
  let wrapper;
  beforeEach(() => {
    moxios.install(axios);
    window.axios = axios;
    wrapper = mount(Rating, {
      global: {
        plugins: [store, ElementPlus, i18n],
      },
    });
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('submits the rating and changes the rating status', (done) => {
    wrapper.vm.submitRating(2);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request
        .respondWith({
          status: 200,
          response: {
            status: true,
            data: {
              message: 'order.rate.success',
              data: {
                data: {
                  love: false,
                  comment: 'Reason',
                },
              },
              errors: [],
            },
          },
        })
        .then((response) => {
          expect(response.data.data.message).to.equal('order.rate.success');
          expect(wrapper.vm.submitStatus).to.equal(true);
          done();
        })
        .catch((error) => {
          console.log('caught', error.message);
        });
    });
  });
});

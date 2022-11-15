/* eslint-disable */
import ElementPlus from 'element-plus';
import { createI18n } from 'vue-i18n';
import messages from './messages';
import { expect } from 'chai';
import DeliveryPin from '../../src/views/fulfillment/deliveryTimelines/deliveryPin.vue'
import store from './store';
import { mount } from '@vue/test-utils'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: messages,
});

describe('DeliveryPin.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(DeliveryPin, {
      global: {
        plugins: [store, ElementPlus, i18n]
      }
    })
  })
  it('check if show otp is rendered correctly ',  () => {
    wrapper.vm.showOTP;
    expect(wrapper.vm.showOTP).to.be.a('boolean');
  });
});

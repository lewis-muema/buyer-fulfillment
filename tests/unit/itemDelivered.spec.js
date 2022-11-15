/* eslint-disable */
import ElementPlus from 'element-plus';
import { createI18n } from 'vue-i18n';
import messages from './messages';
import { expect } from 'chai';
import ItemDelivered from '../../src/views/fulfillment/deliveryTimelines/itemDelivered.vue'
import store from './store';
import { mount } from '@vue/test-utils'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: messages,
});

describe('ItemDelivered.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(ItemDelivered, {
      global: {
        plugins: [store, ElementPlus, i18n]
      }
    })
  })
  it('check if the component renders if an order has been  completed ',  () => {
    wrapper.vm.itemDelivered;
    expect(wrapper.vm.itemDelivered).to.be.a('boolean');
  });
});

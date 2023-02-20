/* eslint-disable */
import ElementPlus from 'element-plus';
import { createI18n } from 'vue-i18n';
import messages from './messages';
import { expect } from 'chai';
import OrderItems from '../../src/views/fulfillment/orderedItems/orderItems.vue'
import store from './store';
import { mount } from '@vue/test-utils'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: messages,
});

describe('OrderItems.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(OrderItems, {
      global: {
        plugins: [store, ElementPlus, i18n]
      }
    })
  })
  it('check if products are retrieved correctly ', async () => {
    await wrapper.vm.orderItems;
    expect(wrapper.vm.orderItems).to.be.an('array').with.lengthOf(1);
  });
});

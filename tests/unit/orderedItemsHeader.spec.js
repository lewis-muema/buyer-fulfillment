/* eslint-disable */
import ElementPlus from 'element-plus';
import { createI18n } from 'vue-i18n';
import messages from './messages';
import { expect } from 'chai';
import OrderedItemsHeader from '../../src/views/fulfillment/orderedItems/orderedItemsHeader.vue'
import store from './store';
import { mount } from '@vue/test-utils'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: messages,
});

describe('OrderItemsHeader.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(OrderedItemsHeader, {
      global: {
        plugins: [store, ElementPlus, i18n]
      }
    })
  })
  it('check if show items dropdown is set to false ', () => {
    expect(wrapper.vm.showItems).to.equal(false);
  });
  it('check if order name is formatted to uppercase ', () => {
    expect(wrapper.vm.formatOrderName('peter pans')).to.equal('Peter pans');
  });
});

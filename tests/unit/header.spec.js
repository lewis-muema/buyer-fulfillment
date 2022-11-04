/* eslint-disable */
import ElementPlus from 'element-plus';
import { createI18n } from 'vue-i18n';
import messages from './messages';
import { expect } from 'chai';
import Header from '../../src/views/fulfillment/header.vue'
import store from './store';
import { mount } from '@vue/test-utils'
import './localStorage';

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: messages,
});

describe('Header.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Header, {
      global: {
        plugins: [store, ElementPlus, i18n]
      }
    })
  })
  it('checks if language changes on selecting dropdown', () => {
    wrapper.vm.changeLanguage('en');
    expect(wrapper.vm.language).to.equal('en');
  });
});
